import { useState, useEffect, useCallback, useRef } from 'react';
import { Zap, Grid, Trophy, RotateCcw, ChevronRight, Star, Timer } from 'lucide-react';
import { questions } from '../data/questions';

type GameMode = 'menu' | 'blitz' | 'match' | 'jeopardy' | 'speedround';

// ========================
// BLITZ MODE
// ========================
function BlitzGame({ onExit }: { onExit: () => void }) {
  const TIME_LIMIT = 60;
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [shuffled] = useState(() => [...questions].sort(() => Math.random() - 0.5));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, []);

  const handleAnswer = (knew: boolean) => {
    if (!revealed) return;
    if (knew) {
      const bonus = streak >= 4 ? 3 : streak >= 2 ? 2 : 1;
      setScore(s => s + bonus);
      setStreak(s => {
        const ns = s + 1;
        setMaxStreak(m => Math.max(m, ns));
        return ns;
      });
    } else {
      setStreak(0);
    }
    setRevealed(false);
    setCurrentQ(i => i + 1);
  };

  const q = shuffled[currentQ % shuffled.length];
  const timerPct = (timeLeft / TIME_LIMIT) * 100;
  const timerColor = timeLeft > 30 ? 'bg-green-500' : timeLeft > 15 ? 'bg-amber-500' : 'bg-red-500';

  if (gameOver) {
    return (
      <div className="text-center animate-bounce-in">
        <Trophy size={56} className="text-amber-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">Time's Up!</h2>
        <div className="text-6xl font-bold text-amber-400 my-4">{score}</div>
        <p className="text-slate-400 mb-2">Points scored</p>
        <div className="flex gap-6 justify-center text-sm text-slate-400 mb-8">
          <span>Questions: <strong className="text-white">{currentQ}</strong></span>
          <span>Best streak: <strong className="text-white">{maxStreak}🔥</strong></span>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={() => window.location.reload()} className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2">
            <RotateCcw size={18} /> Play Again
          </button>
          <button onClick={onExit} className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl transition-all">
            Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-white">{score}</div>
          <div className="text-sm text-amber-400">pts</div>
          {streak >= 2 && (
            <div className="bg-amber-500/20 text-amber-400 text-xs font-bold px-2 py-1 rounded-full animate-pulse-glow">
              {streak}🔥 streak
            </div>
          )}
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${timeLeft <= 15 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
            {timeLeft}s
          </div>
          <div className="text-xs text-slate-400">remaining</div>
        </div>
      </div>

      {/* Timer bar */}
      <div className="w-full bg-slate-800 rounded-full h-2 mb-6">
        <div className={`${timerColor} h-2 rounded-full transition-all duration-1000`} style={{ width: `${timerPct}%` }} />
      </div>

      {/* Question */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-4">
        <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider">{q.category} · {q.difficulty}</div>
        <p className="text-white font-semibold leading-relaxed">{q.question}</p>
      </div>

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 rounded-xl transition-all text-lg"
        >
          Show Answer
        </button>
      ) : (
        <div className="animate-fade-in-up">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 mb-4 text-sm text-slate-200 leading-relaxed">
            {q.answer}
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleAnswer(false)} className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 font-bold py-3 rounded-xl transition-all">
              ✗ Missed
            </button>
            <button onClick={() => handleAnswer(true)} className="flex-1 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 font-bold py-3 rounded-xl transition-all">
              ✓ Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ========================
// MATCH GAME
// ========================
const matchPairs = [
  { term: 'EBITDA', def: 'Earnings before interest, taxes, D&A' },
  { term: 'EV', def: 'Mkt Cap + Debt – Cash' },
  { term: 'WACC', def: 'Weighted avg cost of capital' },
  { term: 'LBO', def: 'Acquisition with significant debt' },
  { term: 'DCF', def: 'Value via discounted cash flows' },
  { term: 'IRR', def: 'Annualized rate of return' },
  { term: 'MOIC', def: 'Exit proceeds / initial equity' },
  { term: 'Goodwill', def: 'Price paid above fair asset value' },
  { term: 'Comps', def: 'Peer company trading multiples' },
  { term: 'NWC', def: 'Current assets – current liabilities' },
  { term: 'Control Premium', def: '20–40% above trading price for control' },
  { term: 'UFCF', def: 'EBIT(1-t) + D&A – CapEx – ΔNWC' },
];

type MatchCard = { id: string; text: string; type: 'term' | 'def'; pairId: number; matched: boolean; selected: boolean };

function MatchGame({ onExit }: { onExit: () => void }) {
  const PAIR_COUNT = 6;
  const initCards = useCallback(() => {
    const selected = [...matchPairs].sort(() => Math.random() - 0.5).slice(0, PAIR_COUNT);
    const cards: MatchCard[] = [];
    selected.forEach((p, i) => {
      cards.push({ id: `t-${i}`, text: p.term, type: 'term', pairId: i, matched: false, selected: false });
      cards.push({ id: `d-${i}`, text: p.def, type: 'def', pairId: i, matched: false, selected: false });
    });
    return cards.sort(() => Math.random() - 0.5);
  }, []);

  const [cards, setCards] = useState<MatchCard[]>(initCards);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [complete, setComplete] = useState(false);
  const [shake, setShake] = useState<string[]>([]);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (complete) return;
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(t);
  }, [complete, startTime]);

  const handleSelect = (id: string) => {
    const card = cards.find(c => c.id === id);
    if (!card || card.matched || selectedIds.includes(id)) return;
    if (selectedIds.length === 0) {
      setSelectedIds([id]);
      setCards(prev => prev.map(c => c.id === id ? { ...c, selected: true } : c));
    } else if (selectedIds.length === 1) {
      const firstId = selectedIds[0];
      const first = cards.find(c => c.id === firstId)!;
      const isMatch = first.pairId === card.pairId && first.type !== card.type;

      if (isMatch) {
        setCards(prev => prev.map(c =>
          c.id === id || c.id === firstId ? { ...c, matched: true, selected: false } : c
        ));
        const allMatched = cards.filter(c => !c.matched).length === 2;
        if (allMatched) setComplete(true);
      } else {
        setShake([id, firstId]);
        setMistakes(m => m + 1);
        setTimeout(() => {
          setShake([]);
          setCards(prev => prev.map(c =>
            c.id === id || c.id === firstId ? { ...c, selected: false } : c
          ));
        }, 600);
      }
      setSelectedIds([]);
    }
  };

  const restart = () => {
    setCards(initCards());
    setSelectedIds([]);
    setMistakes(0);
    setComplete(false);
  };

  const matched = cards.filter(c => c.matched).length / 2;

  if (complete) {
    const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
    return (
      <div className="text-center animate-bounce-in">
        <div className="flex justify-center gap-1 mb-4">
          {[1, 2, 3].map(i => (
            <Star key={i} size={36} className={i <= stars ? 'text-amber-400 fill-amber-400' : 'text-slate-600'} />
          ))}
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">All Matched!</h2>
        <p className="text-slate-400 mb-4">
          Completed in <strong className="text-white">{elapsed}s</strong> with{' '}
          <strong className={mistakes === 0 ? 'text-green-400' : 'text-amber-400'}>{mistakes} mistake{mistakes !== 1 ? 's' : ''}</strong>
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={restart} className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all">
            <RotateCcw size={18} /> New Game
          </button>
          <button onClick={onExit} className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl transition-all">Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4 text-sm">
        <span className="text-slate-400">Matched: <strong className="text-white">{matched}/{PAIR_COUNT}</strong></span>
        <span className="text-slate-400">Mistakes: <strong className="text-red-400">{mistakes}</strong></span>
        <span className="text-slate-400">Time: <strong className="text-white">{elapsed}s</strong></span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-1.5 mb-6">
        <div className="bg-amber-500 h-1.5 rounded-full transition-all" style={{ width: `${(matched / PAIR_COUNT) * 100}%` }} />
      </div>
      <p className="text-slate-400 text-sm text-center mb-4">Match each term with its definition</p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => handleSelect(card.id)}
            className={`p-3 rounded-xl text-xs font-medium text-center transition-all border leading-tight ${shake.includes(card.id) ? 'shake' : ''}
              ${card.matched
                ? 'bg-green-500/20 border-green-500/30 text-green-400 cursor-default'
                : card.selected
                ? 'bg-amber-500/30 border-amber-500 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-700 cursor-pointer'
              }`}
          >
            {card.text}
          </button>
        ))}
      </div>
    </div>
  );
}

// ========================
// JEOPARDY GAME
// ========================
const jeopardyData = [
  {
    category: 'Accounting',
    color: 'from-blue-700 to-blue-900',
    questions: [
      { points: 100, q: 'This statement starts with Net Income and reconciles to cash.', a: 'Cash Flow Statement' },
      { points: 200, q: 'Revenue minus COGS equals this.', a: 'Gross Profit' },
      { points: 300, q: 'If AR increases by $50M, this is the CFS impact.', a: '-$50M (use of cash)' },
      { points: 400, q: 'ROIC stands for this. Bonus: give the formula.', a: 'Return on Invested Capital. NOPAT / Invested Capital' },
      { points: 500, q: 'Depreciation ↑$10, tax rate 40%. What happens to CFO?', a: 'CFO increases by $4 (tax shield: $10 × 60%)' },
    ],
  },
  {
    category: 'Valuation',
    color: 'from-emerald-700 to-emerald-900',
    questions: [
      { points: 100, q: 'The most common IB valuation multiple for industrials.', a: 'EV/EBITDA' },
      { points: 200, q: 'LTM stands for this.', a: 'Last Twelve Months' },
      { points: 300, q: 'Why are precedent transaction multiples higher than comps?', a: 'Control premium (20–40%)' },
      { points: 400, q: 'Walk me through the EV-to-Equity Value bridge.', a: 'EV – Debt – Preferred – Minority Interest + Cash = Equity Value' },
      { points: 500, q: 'Which valuation method is most appropriate for a bank? Why?', a: 'P/Book or P/E — interest is core revenue, not financing cost' },
    ],
  },
  {
    category: 'DCF',
    color: 'from-teal-700 to-teal-900',
    questions: [
      { points: 100, q: 'The discount rate used in a standard corporate DCF.', a: 'WACC' },
      { points: 200, q: 'Terminal Value as a % of total DCF value (approximate).', a: '60–80%' },
      { points: 300, q: 'State the Gordon Growth Model formula for Terminal Value.', a: 'TV = FCFn+1 / (WACC – g)' },
      { points: 400, q: 'Walk me through how to unlever and re-lever beta.', a: 'βu = βl / (1+(1-T)×D/E) → re-lever at target: βl = βu × (1+(1-T)×D/E)' },
      { points: 500, q: 'What is UFCF? State the formula and why we use it.', a: 'EBIT(1-t)+D&A-CapEx-ΔNWC. Unlevered → discount at WACC → Enterprise Value' },
    ],
  },
  {
    category: 'M&A',
    color: 'from-purple-700 to-purple-900',
    questions: [
      { points: 100, q: 'An acquisition is this when pro forma EPS exceeds standalone EPS.', a: 'Accretive' },
      { points: 200, q: 'Name two types of synergies in M&A.', a: 'Cost synergies and revenue synergies' },
      { points: 300, q: 'Goodwill formula: Price paid minus what?', a: 'FMV of net assets + identifiable intangibles' },
      { points: 400, q: 'In a stock deal, when is it definitively accretive without synergies?', a: 'When Acquirer P/E > Target acquisition P/E' },
      { points: 500, q: 'Walk through the full M&A sell-side process in 5 steps.', a: 'Prep CIM → NDA/teaser → 1st round IOIs → 2nd round bids → sign & close' },
    ],
  },
  {
    category: 'LBO',
    color: 'from-amber-700 to-amber-900',
    questions: [
      { points: 100, q: 'Typical LBO equity contribution as % of deal.', a: '30–40%' },
      { points: 200, q: 'Three return drivers in an LBO.', a: 'EBITDA growth, multiple expansion, debt paydown' },
      { points: 300, q: 'MOIC if PE invests $200M equity and exits at $700M.', a: '3.5x MOIC' },
      { points: 400, q: 'What is a cash sweep in an LBO model?', a: 'Excess FCF used to pay down debt ahead of schedule' },
      { points: 500, q: '$150M EBITDA, 5x leverage, 30% equity, exit at 8x after 5 yrs EBITDA grows to $220M. Estimate IRR.', a: 'Exit EV=$1,760M, payoff ~$600M debt, equity≈$1,160M. Entry equity=$225M. ~4x MOIC≈32% IRR approx.' },
    ],
  },
];

function JeopardyGame({ onExit }: { onExit: () => void }) {
  const [answered, setAnswered] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<{ cat: number; q: number } | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const select = (ci: number, qi: number) => {
    const key = `${ci}-${qi}`;
    if (answered.has(key)) return;
    setActive({ cat: ci, q: qi });
    setShowAnswer(false);
  };

  const finish = (correct: boolean) => {
    if (!active) return;
    const q = jeopardyData[active.cat].questions[active.q];
    if (correct) setTotalScore(s => s + q.points);
    setAnswered(prev => new Set([...prev, `${active.cat}-${active.q}`]));
    setActive(null);
  };

  const remaining = jeopardyData.flatMap((cat, ci) =>
    cat.questions.map((_, qi) => `${ci}-${qi}`)
  ).filter(k => !answered.has(k));

  const activeQ = active ? jeopardyData[active.cat].questions[active.q] : null;

  return (
    <div>
      {active && activeQ && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-8 animate-bounce-in">
            <div className="text-center mb-2">
              <span className="text-amber-400 font-bold text-lg">{activeQ.points} pts</span>
            </div>
            <p className="text-white text-lg text-center leading-relaxed mb-6">{activeQ.q}</p>
            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 rounded-xl transition-all"
              >
                Reveal Answer
              </button>
            ) : (
              <div className="animate-fade-in-up">
                <div className="bg-slate-800 rounded-xl p-4 mb-5 text-slate-200 text-sm text-center leading-relaxed">
                  {activeQ.a}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => finish(false)} className="flex-1 bg-red-500/20 border border-red-500/30 text-red-400 font-bold py-3 rounded-xl transition-all">
                    ✗ Wrong
                  </button>
                  <button onClick={() => finish(true)} className="flex-1 bg-green-500/20 border border-green-500/30 text-green-400 font-bold py-3 rounded-xl transition-all">
                    ✓ Correct
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold">IB Jeopardy</h3>
        <span className="text-amber-400 font-bold text-xl">${totalScore.toLocaleString()}</span>
      </div>

      {remaining.length === 0 && (
        <div className="text-center mb-4 py-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <p className="text-amber-400 font-bold">Board complete! Final score: ${totalScore.toLocaleString()}</p>
          <button onClick={onExit} className="text-slate-400 text-sm hover:text-white mt-1 transition-colors">Return to menu</button>
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Category headers */}
          <div className="grid grid-cols-5 gap-2 mb-2">
            {jeopardyData.map((cat, i) => (
              <div key={i} className={`bg-gradient-to-b ${cat.color} rounded-lg py-3 px-2 text-center`}>
                <p className="text-white font-bold text-xs leading-tight">{cat.category}</p>
              </div>
            ))}
          </div>

          {/* Point cells */}
          {[0, 1, 2, 3, 4].map(qi => (
            <div key={qi} className="grid grid-cols-5 gap-2 mb-2">
              {jeopardyData.map((cat, ci) => {
                const key = `${ci}-${qi}`;
                const isDone = answered.has(key);
                return (
                  <button
                    key={ci}
                    onClick={() => select(ci, qi)}
                    disabled={isDone}
                    className={`py-4 rounded-lg font-bold text-lg transition-all ${
                      isDone
                        ? 'bg-slate-800/50 text-slate-700 cursor-default'
                        : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 hover:border-amber-500/50'
                    }`}
                  >
                    {isDone ? '' : `$${cat.questions[qi].points}`}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========================
// SPEED ROUND
// ========================
const speedQuestions = [
  { q: 'EBITDA stands for?', a: 'Earnings Before Interest, Taxes, D&A' },
  { q: 'EV = Mkt Cap + ?', a: 'Net Debt + Preferred + Minority Interest' },
  { q: 'Control premium range?', a: '20–40%' },
  { q: 'LBO debt as % of deal?', a: '60–70%' },
  { q: 'Terminal Value % of DCF?', a: '60–80%' },
  { q: 'WACC discount rate for...?', a: 'Unlevered Free Cash Flow (UFCF)' },
  { q: 'Accretive vs dilutive depends on?', a: 'Pro forma EPS vs standalone EPS' },
  { q: '3x in 5 years ≈ ? IRR', a: '~25%' },
  { q: 'Hamada equation unlevered beta?', a: 'βu = βl / (1 + (1-T)×D/E)' },
  { q: 'NWC = ?', a: 'Current Assets – Current Liabilities' },
  { q: 'UFCF formula?', a: 'EBIT(1-t) + D&A – CapEx – ΔNWC' },
  { q: 'DSO formula?', a: '(AR / Revenue) × 365' },
  { q: 'Gordon Growth TV formula?', a: 'FCF × (1+g) / (WACC – g)' },
  { q: 'Goodwill = Price – ?', a: 'FMV of net assets + identifiable intangibles' },
  { q: 'CAPM formula?', a: 'Rf + β × (Rm – Rf)' },
  { q: 'ROIC creates value when?', a: 'ROIC > WACC' },
  { q: '2x MOIC in 4 years ≈ ?', a: '~19% IRR' },
  { q: 'What does a cash sweep do in LBO?', a: 'Uses excess FCF to repay debt early' },
];

function SpeedRound({ onExit }: { onExit: () => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [shown, setShown] = useState(false);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const shuffled = useRef([...speedQuestions].sort(() => Math.random() - 0.5));

  const q = shuffled.current[idx];

  const answer = (correct: boolean) => {
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);
    if (correct) setScore(s => s + 1);
    if (idx + 1 >= shuffled.current.length) {
      setDone(true);
    } else {
      setIdx(i => i + 1);
      setShown(false);
    }
  };

  if (done) {
    const pct = Math.round((score / shuffled.current.length) * 100);
    return (
      <div className="text-center animate-bounce-in">
        <Trophy size={48} className="text-amber-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Speed Round Complete!</h2>
        <div className="text-5xl font-bold text-amber-400 my-4">{score}/{shuffled.current.length}</div>
        <p className="text-slate-400 mb-6">{pct}% accuracy</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => { shuffled.current.sort(() => Math.random() - 0.5); setIdx(0); setScore(0); setAnswers([]); setShown(false); setDone(false); }}
            className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all">
            <RotateCcw size={18} /> Again
          </button>
          <button onClick={onExit} className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl transition-all">Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4 text-sm">
        <span className="text-slate-400">{idx + 1} / {shuffled.current.length}</span>
        <span className="text-green-400 font-bold">{score} correct</span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-1.5 mb-6">
        <div className="bg-amber-500 h-1.5 rounded-full transition-all" style={{ width: `${(idx / shuffled.current.length) * 100}%` }} />
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center mb-4 min-h-[140px] flex items-center justify-center">
        <p className="text-white text-xl font-semibold">{q.q}</p>
      </div>
      {!shown ? (
        <button onClick={() => setShown(true)} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 rounded-xl transition-all">
          Show Answer
        </button>
      ) : (
        <div className="animate-fade-in-up">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 text-center text-white font-semibold mb-4">
            {q.a}
          </div>
          <div className="flex gap-3">
            <button onClick={() => answer(false)} className="flex-1 bg-red-500/20 border border-red-500/30 text-red-400 font-bold py-3 rounded-xl transition-all">
              ✗ Wrong
            </button>
            <button onClick={() => answer(true)} className="flex-1 bg-green-500/20 border border-green-500/30 text-green-400 font-bold py-3 rounded-xl transition-all">
              ✓ Correct
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ========================
// MENU
// ========================
const gameOptions = [
  {
    id: 'blitz' as GameMode,
    icon: Zap,
    title: 'Blitz Mode',
    description: '60-second rapid fire. Answer as many questions as possible. Build streaks for bonus points.',
    color: 'from-amber-600/20 to-amber-800/10 border-amber-500/20',
    accent: 'text-amber-400',
  },
  {
    id: 'match' as GameMode,
    icon: Grid,
    title: 'Term Match',
    description: 'Match IB terms to their definitions. Race against time with zero mistakes for 3 stars.',
    color: 'from-blue-600/20 to-blue-800/10 border-blue-500/20',
    accent: 'text-blue-400',
  },
  {
    id: 'jeopardy' as GameMode,
    icon: Trophy,
    title: 'IB Jeopardy',
    description: 'Classic jeopardy format with 5 IB categories. Answer questions for $100-$500 points.',
    color: 'from-purple-600/20 to-purple-800/10 border-purple-500/20',
    accent: 'text-purple-400',
  },
  {
    id: 'speedround' as GameMode,
    icon: Timer,
    title: 'Speed Round',
    description: 'Quick-fire definitions and formulas. Perfect for last-minute review before your superday.',
    color: 'from-green-600/20 to-green-800/10 border-green-500/20',
    accent: 'text-green-400',
  },
];

export default function Games() {
  const [mode, setMode] = useState<GameMode>('menu');

  if (mode === 'blitz') return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <button onClick={() => setMode('menu')} className="text-slate-400 hover:text-white text-sm mb-6 flex items-center gap-1 transition-colors">← Menu</button>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><Zap className="text-amber-400" />Blitz Mode</h2>
      <BlitzGame onExit={() => setMode('menu')} />
    </div>
  );

  if (mode === 'match') return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <button onClick={() => setMode('menu')} className="text-slate-400 hover:text-white text-sm mb-6 flex items-center gap-1 transition-colors">← Menu</button>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><Grid className="text-blue-400" />Term Match</h2>
      <MatchGame onExit={() => setMode('menu')} />
    </div>
  );

  if (mode === 'jeopardy') return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <button onClick={() => setMode('menu')} className="text-slate-400 hover:text-white text-sm mb-6 flex items-center gap-1 transition-colors">← Menu</button>
      <JeopardyGame onExit={() => setMode('menu')} />
    </div>
  );

  if (mode === 'speedround') return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <button onClick={() => setMode('menu')} className="text-slate-400 hover:text-white text-sm mb-6 flex items-center gap-1 transition-colors">← Menu</button>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><Timer className="text-green-400" />Speed Round</h2>
      <SpeedRound onExit={() => setMode('menu')} />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Games</h1>
        <p className="text-slate-400">Make IB prep competitive. Play games to reinforce concepts under pressure.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {gameOptions.map(({ id, icon: Icon, title, description, color, accent }) => (
          <button
            key={id}
            onClick={() => setMode(id)}
            className={`group bg-gradient-to-br ${color} border rounded-2xl p-6 text-left transition-all hover:translate-y-[-2px] hover:shadow-xl hover:shadow-black/20`}
          >
            <Icon size={32} className={`${accent} mb-4`} />
            <h3 className={`text-xl font-bold text-white mb-2 group-hover:${accent} transition-colors`}>{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">{description}</p>
            <div className={`flex items-center gap-1 ${accent} text-sm font-medium`}>
              Play now <ChevronRight size={16} />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
        <p className="text-slate-400 text-sm">
          💡 <strong className="text-white">Pro tip:</strong> Start with Flashcards to learn, then use Blitz Mode to stress-test your knowledge under time pressure — just like a real interview.
        </p>
      </div>
    </div>
  );
}
