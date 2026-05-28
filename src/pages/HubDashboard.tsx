import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, Plus, Play, Copy, Check, ChevronLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { flashcards } from '../data/flashcards';

interface Member { user_id: string; display_name: string; total_score?: number; }
interface BankQuestion { id: string; bank: string; question: string; correct_answer: string; wrong_answers: string[]; category: string; submitted_by: string; }
interface Hub { id: string; name: string; join_code: string; owner_id: string; }
interface LeaderboardEntry { user_id: string; display_name: string; total_score: number; }

const CATEGORIES = ['all', 'Accounting', 'Valuation', 'DCF', 'M&A', 'LBO'];

export default function HubDashboard() {
  const { hubId } = useParams<{ hubId: string }>();
  const navigate = useNavigate();

  const [hub, setHub] = useState<Hub | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [bankQuestions, setBankQuestions] = useState<BankQuestion[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userId, setUserId] = useState('');
  const [tab, setTab] = useState<'game' | 'questions' | 'leaderboard'>('game');
  const [copied, setCopied] = useState(false);

  // Game settings
  const [rounds, setRounds] = useState(5);
  const [category, setCategory] = useState('all');
  const [starting, setStarting] = useState(false);

  // Submit question form
  const [showForm, setShowForm] = useState(false);
  const [qBank, setQBank] = useState('');
  const [qQuestion, setQQuestion] = useState('');
  const [qCorrect, setQCorrect] = useState('');
  const [qWrong, setQWrong] = useState(['', '', '']);
  const [qCategory, setQCategory] = useState('general');

  useEffect(() => {
    if (!hubId) return;
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setUserId(session.user.id);

      const [{ data: hubData }, { data: memberData }, { data: bqData }] = await Promise.all([
        supabase.from('study_hubs').select('*').eq('id', hubId).single(),
        supabase.from('hub_members').select('user_id, display_name').eq('hub_id', hubId),
        supabase.from('bank_questions').select('*').eq('hub_id', hubId),
      ]);

      setHub(hubData);
      setMembers(memberData || []);
      setBankQuestions(bqData || []);

      // Build leaderboard from game_answers
      const { data: sessions } = await supabase
        .from('game_sessions')
        .select('id')
        .eq('hub_id', hubId)
        .eq('status', 'completed');

      if (sessions?.length) {
        const sessionIds = sessions.map(s => s.id);
        const { data: answers } = await supabase
          .from('game_answers')
          .select('user_id, points_earned')
          .in('session_id', sessionIds);

        const scores: Record<string, number> = {};
        (answers || []).forEach(a => {
          scores[a.user_id] = (scores[a.user_id] || 0) + a.points_earned;
        });

        const lb: LeaderboardEntry[] = (memberData || [])
          .map(m => ({ user_id: m.user_id, display_name: m.display_name, total_score: scores[m.user_id] || 0 }))
          .sort((a, b) => b.total_score - a.total_score);
        setLeaderboard(lb);
      } else {
        setLeaderboard((memberData || []).map(m => ({ ...m, total_score: 0 })));
      }
    };
    load();
  }, [hubId]);

  const startGame = async () => {
    if (!hubId) return;
    setStarting(true);
    const { data, error } = await supabase
      .from('game_sessions')
      .insert({ hub_id: hubId, created_by: userId, status: 'lobby', rounds, category })
      .select()
      .single();
    if (!error && data) navigate(`/hubs/${hubId}/game/${data.id}`);
    setStarting(false);
  };

  const submitQuestion = async () => {
    if (!qBank || !qQuestion || !qCorrect || qWrong.some(w => !w)) return;
    await supabase.from('bank_questions').insert({
      hub_id: hubId, submitted_by: userId,
      bank: qBank, question: qQuestion,
      correct_answer: qCorrect, wrong_answers: qWrong,
      category: qCategory,
    });
    const { data } = await supabase.from('bank_questions').select('*').eq('hub_id', hubId);
    setBankQuestions(data || []);
    setShowForm(false);
    setQBank(''); setQQuestion(''); setQCorrect(''); setQWrong(['', '', '']);
  };

  const copyCode = async () => {
    if (!hub) return;
    await navigator.clipboard.writeText(hub.join_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const availableQ = category === 'all' ? flashcards.length : flashcards.filter(f => f.category === category).length;
  const maxRounds = Math.min(20, availableQ);

  if (!hub) return <div className="text-slate-500 text-center py-20">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <button onClick={() => navigate('/hubs')} className="text-slate-400 hover:text-white text-sm mb-4 flex items-center gap-1 transition-colors">
          <ChevronLeft size={16} /> All Hubs
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{hub.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Users size={13} className="text-slate-500" />
              <span className="text-slate-500 text-sm">{members.length}/5 members</span>
            </div>
          </div>
          <button onClick={copyCode} className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm px-3 py-2 rounded-lg transition-colors">
            {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
            {hub.join_code}
          </button>
        </div>
      </div>

      {/* Members row */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {members.map(m => (
          <div key={m.user_id} className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-full">
            <div className="w-5 h-5 rounded-full bg-amber-500/30 flex items-center justify-center text-xs font-bold text-amber-400">
              {m.display_name[0].toUpperCase()}
            </div>
            <span className="text-slate-300 text-xs">{m.display_name}</span>
            {m.user_id === hub.owner_id && <span className="text-amber-400 text-xs">★</span>}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-900 p-1 rounded-xl mb-6">
        {(['game', 'questions', 'leaderboard'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${tab === t ? 'bg-amber-500 text-slate-900' : 'text-slate-400 hover:text-white'}`}
          >
            {t === 'leaderboard' ? '🏆 Board' : t === 'game' ? '🎮 Play' : '📝 Questions'}
          </button>
        ))}
      </div>

      {/* PLAY TAB */}
      {tab === 'game' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="font-semibold text-white mb-4">Game Settings</h2>

            <div className="mb-4">
              <label className="text-slate-400 text-xs uppercase tracking-wider mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(c => (
                  <button
                    key={c}
                    onClick={() => { setCategory(c); setRounds(r => Math.min(r, Math.min(20, c === 'all' ? flashcards.length : flashcards.filter(f => f.category === c).length))); }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${category === c ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                  >
                    {c === 'all' ? 'All Topics' : c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="text-slate-400 text-xs uppercase tracking-wider mb-2 block">Rounds — {rounds}</label>
              <div className="flex gap-2">
                {[5, 10, 15, 20].filter(n => n <= maxRounds).map(n => (
                  <button
                    key={n}
                    onClick={() => setRounds(n)}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${rounds === n ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={startGame}
              disabled={starting || members.length < 1}
              className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-900 font-bold py-3.5 rounded-xl transition-all text-base"
            >
              <Play size={18} fill="currentColor" />
              {starting ? 'Creating...' : 'Start Game'}
            </button>
            <p className="text-slate-600 text-xs text-center mt-2">Only the hub owner can start — others will join via the lobby link.</p>
          </div>
        </div>
      )}

      {/* QUESTIONS TAB */}
      {tab === 'questions' && (
        <div className="space-y-4">
          <button
            onClick={() => setShowForm(f => !f)}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 rounded-xl transition-colors text-sm"
          >
            <Plus size={16} />
            Submit a Bank Question
          </button>

          {showForm && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <input value={qBank} onChange={e => setQBank(e.target.value)} placeholder="Bank (e.g. Goldman Sachs)" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500" />
              <textarea value={qQuestion} onChange={e => setQQuestion(e.target.value)} placeholder="Question asked" rows={2} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500 resize-none" />
              <input value={qCorrect} onChange={e => setQCorrect(e.target.value)} placeholder="Correct answer" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-green-400 text-sm focus:outline-none focus:border-green-500" />
              {qWrong.map((w, i) => (
                <input key={i} value={w} onChange={e => setQWrong(prev => prev.map((v, j) => j === i ? e.target.value : v))} placeholder={`Wrong answer ${i + 1}`} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-red-400 text-sm focus:outline-none focus:border-red-500" />
              ))}
              <select value={qCategory} onChange={e => setQCategory(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 text-sm focus:outline-none">
                <option value="general">General</option>
                {CATEGORIES.filter(c => c !== 'all').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <button onClick={submitQuestion} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-2.5 rounded-lg text-sm transition-colors">
                Submit Question
              </button>
            </div>
          )}

          {bankQuestions.length === 0 ? (
            <p className="text-slate-500 text-center py-8 text-sm">No questions submitted yet. Be the first!</p>
          ) : (
            <div className="space-y-3">
              {bankQuestions.map(q => (
                <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">{q.bank}</span>
                    <span className="text-xs text-slate-500">{q.category}</span>
                  </div>
                  <p className="text-slate-200 text-sm">{q.question}</p>
                  <p className="text-green-400 text-xs mt-2">✓ {q.correct_answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* LEADERBOARD TAB */}
      {tab === 'leaderboard' && (
        <div className="space-y-2">
          {leaderboard.length === 0 ? (
            <p className="text-slate-500 text-center py-8 text-sm">Play a game to see scores here.</p>
          ) : (
            leaderboard.map((entry, i) => (
              <div key={entry.user_id} className={`flex items-center gap-4 p-4 rounded-xl border ${i === 0 ? 'bg-amber-500/10 border-amber-500/30' : 'bg-slate-900 border-slate-800'}`}>
                <span className={`text-lg font-bold w-7 text-center ${i === 0 ? 'text-amber-400' : i === 1 ? 'text-slate-300' : i === 2 ? 'text-amber-700' : 'text-slate-600'}`}>
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-white">
                  {entry.display_name[0].toUpperCase()}
                </div>
                <span className="flex-1 text-white font-medium">{entry.display_name}</span>
                <span className={`font-bold ${i === 0 ? 'text-amber-400' : 'text-slate-300'}`}>
                  {entry.total_score.toLocaleString()} pts
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
