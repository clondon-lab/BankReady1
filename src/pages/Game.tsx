import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Trophy, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { buildGameQuestions, calcPoints, QUESTION_DURATION_MS, type GameQuestion } from '../lib/game';

type GameStatus = 'lobby' | 'countdown' | 'question' | 'review' | 'completed';

interface Participant { user_id: string; display_name: string; ready: boolean; total_score: number; }
interface Session {
  id: string; hub_id: string; created_by: string; status: GameStatus;
  rounds: number; category: string; current_round: number;
  questions_json: GameQuestion[] | null; round_started_at: string | null;
}

function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'lg' ? 'w-14 h-14 text-xl' : size === 'md' ? 'w-10 h-10 text-base' : 'w-7 h-7 text-xs';
  return (
    <div className={`${sz} rounded-full bg-amber-500/20 flex items-center justify-center font-bold text-amber-400`}>
      {name[0].toUpperCase()}
    </div>
  );
}

// ── Countdown overlay ─────────────────────────────────────────────────────────
function CountdownOverlay({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(3);
  useEffect(() => {
    if (count === 0) { onDone(); return; }
    const t = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, onDone]);
  return (
    <div className="fixed inset-0 bg-slate-950/90 flex items-center justify-center z-50">
      <div key={count} className="text-9xl font-black text-amber-400 animate-bounce-in">
        {count === 0 ? 'GO!' : count}
      </div>
    </div>
  );
}

// ── Progress ring timer ───────────────────────────────────────────────────────
function TimerRing({ timeLeftMs, totalMs }: { timeLeftMs: number; totalMs: number }) {
  const pct = timeLeftMs / totalMs;
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;
  const color = pct > 0.5 ? '#f59e0b' : pct > 0.25 ? '#f97316' : '#ef4444';
  return (
    <svg width="72" height="72" className="-rotate-90">
      <circle cx="36" cy="36" r={r} stroke="#1e293b" strokeWidth="6" fill="none" />
      <circle cx="36" cy="36" r={r} stroke={color} strokeWidth="6" fill="none"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.1s linear' }} />
      <text x="36" y="36" dominantBaseline="middle" textAnchor="middle" className="rotate-90 origin-center"
        style={{ fill: color, fontSize: 16, fontWeight: 700, transform: 'rotate(90deg)', transformOrigin: '36px 36px' }}>
        {Math.ceil(timeLeftMs / 1000)}
      </text>
    </svg>
  );
}

export default function Game() {
  const { hubId, sessionId } = useParams<{ hubId: string; sessionId: string }>();
  const navigate = useNavigate();

  const [session, setSession] = useState<Session | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [userId, setUserId] = useState('');
  const [isHost, setIsHost] = useState(false);

  const [showCountdown, setShowCountdown] = useState(false);
  const [timeLeftMs, setTimeLeftMs] = useState(QUESTION_DURATION_MS);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [roundAnswers, setRoundAnswers] = useState<Record<string, boolean>>({});

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const advancingRef = useRef(false);

  const currentQuestion: GameQuestion | null =
    session?.questions_json && session.current_round > 0
      ? session.questions_json[session.current_round - 1] ?? null
      : null;

  // ── Load initial state ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!sessionId) return;
    const init = async () => {
      const { data: { session: authSession } } = await supabase.auth.getSession();
      if (!authSession) return;
      setUserId(authSession.user.id);
      const name = authSession.user.user_metadata?.full_name || authSession.user.email?.split('@')[0] || 'User';

      const { data: sess } = await supabase.from('game_sessions').select('*').eq('id', sessionId).single();
      if (sess) {
        setSession(sess);
        setIsHost(sess.created_by === authSession.user.id);
      }

      const { data: parts } = await supabase.from('game_participants').select('*').eq('session_id', sessionId);
      setParticipants(parts || []);

      // Auto-join as participant
      const alreadyIn = (parts || []).some(p => p.user_id === authSession.user.id);
      if (!alreadyIn) {
        await supabase.from('game_participants').insert({
          session_id: sessionId, user_id: authSession.user.id, display_name: name,
        });
      }
    };
    init();
  }, [sessionId]);

  // ── Realtime subscriptions ──────────────────────────────────────────────────
  useEffect(() => {
    if (!sessionId) return;
    const channel = supabase
      .channel(`game:${sessionId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'game_sessions', filter: `id=eq.${sessionId}` },
        payload => {
          const updated = payload.new as Session;
          setSession(prev => {
            if (updated.status === 'countdown' && prev?.status !== 'countdown') setShowCountdown(true);
            if (updated.status === 'question') {
              setSelectedAnswer(null);
              setAnswered(false);
              setRoundAnswers({});
            }
            return updated;
          });
        })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'game_participants', filter: `session_id=eq.${sessionId}` },
        () => { supabase.from('game_participants').select('*').eq('session_id', sessionId).then(({ data }) => setParticipants(data || [])); })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'game_answers', filter: `session_id=eq.${sessionId}` },
        payload => {
          const a = payload.new as { user_id: string; correct: boolean; round_number: number };
          setSession(prev => {
            if (prev && a.round_number === prev.current_round) {
              setRoundAnswers(r => ({ ...r, [a.user_id]: a.correct }));
            }
            return prev;
          });
        })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [sessionId]);

  // ── Question timer ──────────────────────────────────────────────────────────
  const advanceRound = useCallback(async () => {
    if (!session || !isHost || advancingRef.current) return;
    advancingRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);

    const nextRound = session.current_round + 1;
    if (nextRound > session.rounds) {
      await supabase.from('game_sessions').update({ status: 'completed' }).eq('id', sessionId);
    } else {
      await supabase.from('game_sessions').update({ status: 'review' }).eq('id', sessionId);
      await new Promise(r => setTimeout(r, 3500));
      await supabase.from('game_sessions').update({
        status: 'question',
        current_round: nextRound,
        round_started_at: new Date().toISOString(),
      }).eq('id', sessionId);
    }
    advancingRef.current = false;
  }, [session, isHost, sessionId]);

  useEffect(() => {
    if (session?.status !== 'question' || !session.round_started_at) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    const startedAt = new Date(session.round_started_at).getTime();

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const left = Math.max(0, QUESTION_DURATION_MS - elapsed);
      setTimeLeftMs(left);
      if (left === 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        advanceRound();
      }
    }, 100);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [session?.status, session?.round_started_at, advanceRound]);

  // ── Actions ─────────────────────────────────────────────────────────────────
  const markReady = async () => {
    await supabase.from('game_participants').update({ ready: true }).eq('session_id', sessionId).eq('user_id', userId);
  };

  const startGame = async () => {
    if (!session) return;
    const questions = buildGameQuestions(session.category, session.rounds);
    await supabase.from('game_sessions').update({
      status: 'countdown',
      questions_json: questions,
    }).eq('id', sessionId);
  };

  const handleCountdownDone = async () => {
    setShowCountdown(false);
    if (isHost) {
      await supabase.from('game_sessions').update({
        status: 'question',
        current_round: 1,
        round_started_at: new Date().toISOString(),
      }).eq('id', sessionId);
    }
  };

  const submitAnswer = async (option: string) => {
    if (answered || !session || !currentQuestion) return;
    const timeTaken = QUESTION_DURATION_MS - timeLeftMs;
    const correct = option === currentQuestion.correctAnswer;
    const points = correct ? calcPoints(timeTaken, QUESTION_DURATION_MS) : 0;

    setSelectedAnswer(option);
    setAnswered(true);

    await supabase.from('game_answers').insert({
      session_id: sessionId, user_id: userId,
      round_number: session.current_round,
      answer: option, time_ms: timeTaken, correct, points_earned: points,
    });

    await supabase.from('game_participants')
      .update({ total_score: (participants.find(p => p.user_id === userId)?.total_score ?? 0) + points })
      .eq('session_id', sessionId).eq('user_id', userId);
  };

  // ── Render helpers ───────────────────────────────────────────────────────────
  const OPTION_COLORS = [
    'bg-red-500/20 border-red-500/40 hover:bg-red-500/30 text-red-200',
    'bg-blue-500/20 border-blue-500/40 hover:bg-blue-500/30 text-blue-200',
    'bg-green-500/20 border-green-500/40 hover:bg-green-500/30 text-green-200',
    'bg-purple-500/20 border-purple-500/40 hover:bg-purple-500/30 text-purple-200',
  ];

  const sortedParticipants = [...participants].sort((a, b) => b.total_score - a.total_score);

  if (!session) return <div className="text-slate-500 text-center py-20">Loading game...</div>;

  // ── LOBBY ────────────────────────────────────────────────────────────────────
  if (session.status === 'lobby') {
    const allReady = participants.length > 0 && participants.every(p => p.ready);
    const meReady = participants.find(p => p.user_id === userId)?.ready;
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users size={28} className="text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Game Lobby</h1>
          <p className="text-slate-400 text-sm">{session.rounds} rounds · {session.category === 'all' ? 'All Topics' : session.category}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-3">Players</p>
          <div className="space-y-2">
            {participants.map(p => (
              <div key={p.user_id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar name={p.display_name} size="sm" />
                  <span className="text-white text-sm">{p.display_name}</span>
                  {p.user_id === session.created_by && <span className="text-amber-400 text-xs">Host</span>}
                </div>
                <span className={`text-xs font-semibold ${p.ready ? 'text-green-400' : 'text-slate-500'}`}>
                  {p.ready ? '✓ Ready' : 'Waiting...'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {!meReady && (
          <button onClick={markReady} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 rounded-xl mb-3 transition-all">
            I'm Ready
          </button>
        )}

        {isHost && allReady && (
          <button onClick={startGame} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3.5 rounded-xl transition-all">
            Start Game →
          </button>
        )}

        {isHost && !allReady && participants.length > 0 && (
          <p className="text-slate-500 text-sm">Waiting for all players to ready up...</p>
        )}
      </div>
    );
  }

  // ── COUNTDOWN ────────────────────────────────────────────────────────────────
  if (showCountdown) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <CountdownOverlay onDone={handleCountdownDone} />
        <div className="text-center text-slate-400">Get ready...</div>
      </div>
    );
  }

  // ── COMPLETED ────────────────────────────────────────────────────────────────
  if (session.status === 'completed') {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <Trophy size={56} className="text-amber-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-1">Game Over!</h1>
          <p className="text-slate-400">Final standings</p>
        </div>
        <div className="space-y-3 mb-8">
          {sortedParticipants.map((p, i) => (
            <div key={p.user_id} className={`flex items-center gap-4 p-4 rounded-xl border ${i === 0 ? 'bg-amber-500/10 border-amber-500/30' : 'bg-slate-900 border-slate-800'}`}>
              <span className="text-xl w-8 text-center">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`}</span>
              <Avatar name={p.display_name} size="sm" />
              <span className="flex-1 text-white font-medium">{p.display_name}</span>
              <span className={`font-bold text-lg ${i === 0 ? 'text-amber-400' : 'text-slate-300'}`}>{p.total_score.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <button onClick={() => navigate(`/hubs/${hubId}`)} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3.5 rounded-xl transition-all">
          Back to Hub
        </button>
      </div>
    );
  }

  // ── QUESTION + REVIEW ────────────────────────────────────────────────────────
  const answeredCount = Object.keys(roundAnswers).length;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-slate-400 text-sm">
          Round <span className="text-white font-bold">{session.current_round}</span> / {session.rounds}
        </div>
        {session.status === 'question' && (
          <TimerRing timeLeftMs={timeLeftMs} totalMs={QUESTION_DURATION_MS} />
        )}
        {session.status === 'review' && (
          <span className="text-slate-400 text-sm">Next question coming...</span>
        )}
        <div className="flex items-center gap-1 text-slate-400 text-sm">
          <Users size={13} />
          <span>{answeredCount}/{participants.length}</span>
        </div>
      </div>

      {/* Question */}
      {currentQuestion && (
        <>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 text-center">
            <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full mb-3 inline-block">
              {currentQuestion.category}
            </span>
            <h2 className="text-xl font-bold text-white leading-snug">{currentQuestion.question}</h2>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {currentQuestion.options.map((option, i) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              const showResult = session.status === 'review' || (answered && isSelected);

              let classes = `p-4 rounded-xl border-2 text-sm font-medium text-left transition-all cursor-pointer leading-snug ${OPTION_COLORS[i]}`;
              if (showResult && isCorrect) classes = 'p-4 rounded-xl border-2 border-green-400 bg-green-500/20 text-green-200 text-sm font-medium text-left leading-snug';
              else if (showResult && isSelected && !isCorrect) classes = 'p-4 rounded-xl border-2 border-red-400 bg-red-500/20 text-red-200 text-sm font-medium text-left leading-snug';
              else if (answered || session.status === 'review') classes += ' opacity-50 cursor-default';

              return (
                <button
                  key={option}
                  onClick={() => !answered && session.status === 'question' && submitAnswer(option)}
                  className={classes}
                  disabled={answered || session.status === 'review'}
                >
                  <span className="font-bold mr-2">{['A', 'B', 'C', 'D'][i]}.</span>
                  {option}
                  {showResult && isCorrect && <CheckCircle size={14} className="inline ml-1 text-green-400" />}
                  {showResult && isSelected && !isCorrect && <XCircle size={14} className="inline ml-1 text-red-400" />}
                </button>
              );
            })}
          </div>

          {/* Answered feedback */}
          {answered && session.status === 'question' && (
            <div className={`text-center p-3 rounded-xl text-sm font-semibold ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
              {selectedAnswer === currentQuestion.correctAnswer
                ? `+${calcPoints(QUESTION_DURATION_MS - timeLeftMs, QUESTION_DURATION_MS)} pts`
                : 'Incorrect — 0 pts'}
            </div>
          )}
        </>
      )}

      {/* Live scoreboard strip */}
      <div className="mt-6 flex gap-2 justify-center flex-wrap">
        {sortedParticipants.map((p, i) => (
          <div key={p.user_id} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs ${p.user_id === userId ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
            <span className="font-bold">{i + 1}.</span>
            <span>{p.display_name}</span>
            <span className="font-semibold">{p.total_score.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
