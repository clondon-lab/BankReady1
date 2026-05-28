import { useState, useCallback } from 'react';
import { CheckCircle, XCircle, ChevronRight, RotateCcw, Trophy, Target } from 'lucide-react';
import { questions, type Question, type Category, getRandomQuestions, getQuestionsByCategory } from '../data/questions';

type QuizMode = 'select' | 'quiz' | 'results';

const categoryLabels: Record<Category, string> = {
  accounting: '📊 Accounting',
  valuation: '💰 Valuation',
  dcf: '📉 DCF Analysis',
  ma: '🤝 M&A',
  lbo: '📈 LBO',
  brainteasers: '🧠 Brain Teasers',
};

const difficultyColors = {
  easy: 'bg-green-500/20 text-green-400 border-green-500/30',
  medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  hard: 'bg-red-500/20 text-red-400 border-red-500/30',
};

function QuestionCard({
  question,
  questionNum,
  totalQuestions,
  onAnswer,
}: {
  question: Question;
  questionNum: number;
  totalQuestions: number;
  onAnswer: (knew: boolean) => void;
}) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => setRevealed(true);

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <span className="text-slate-400 text-sm">
          Question {questionNum} of {totalQuestions}
        </span>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${difficultyColors[question.difficulty]}`}>
          {question.difficulty}
        </span>
      </div>

      <div className="w-full bg-slate-800 rounded-full h-1.5 mb-6">
        <div
          className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${((questionNum - 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Category badge */}
      <span className="text-xs font-medium text-slate-400 bg-slate-800 px-3 py-1 rounded-full mb-4 inline-block">
        {categoryLabels[question.category]}
      </span>

      {/* Question */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-4">
        <h2 className="text-lg font-semibold text-white leading-relaxed">{question.question}</h2>
      </div>

      {/* Answer */}
      {!revealed ? (
        <button
          onClick={handleReveal}
          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 rounded-xl transition-all"
        >
          Reveal Answer
        </button>
      ) : (
        <div className="animate-fade-in-up">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-4">
            <p className="text-slate-300 text-sm leading-relaxed mb-4">{question.answer}</p>
            {question.keyPoints && question.keyPoints.length > 0 && (
              <div>
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Key Points</p>
                <ul className="space-y-1.5">
                  {question.keyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-amber-400 font-bold mt-0.5 flex-shrink-0">→</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <p className="text-center text-slate-400 text-sm mb-3">Did you know this?</p>
          <div className="flex gap-3">
            <button
              onClick={() => onAnswer(false)}
              className="flex-1 flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 font-semibold py-3 rounded-xl transition-all"
            >
              <XCircle size={20} />
              Not quite
            </button>
            <button
              onClick={() => onAnswer(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 font-semibold py-3 rounded-xl transition-all"
            >
              <CheckCircle size={20} />
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultsScreen({
  score,
  total,
  questions: qs,
  answers,
  onRestart,
}: {
  score: number;
  total: number;
  questions: Question[];
  answers: boolean[];
  onRestart: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const grade = pct >= 90 ? 'A' : pct >= 80 ? 'B' : pct >= 70 ? 'C' : pct >= 60 ? 'D' : 'F';
  const gradeColor = pct >= 80 ? 'text-green-400' : pct >= 60 ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="animate-bounce-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center mb-6">
        <Trophy size={48} className="text-amber-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h2>
        <div className={`text-7xl font-bold ${gradeColor} my-4`}>{grade}</div>
        <p className="text-slate-400">
          You got <span className="text-white font-bold">{score}</span> out of{' '}
          <span className="text-white font-bold">{total}</span> correct ({pct}%)
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {qs.map((q, i) => (
          <div
            key={q.id}
            className={`flex items-center gap-3 p-4 rounded-xl border ${
              answers[i]
                ? 'bg-green-500/10 border-green-500/20'
                : 'bg-red-500/10 border-red-500/20'
            }`}
          >
            {answers[i] ? (
              <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
            ) : (
              <XCircle size={18} className="text-red-400 flex-shrink-0" />
            )}
            <p className="text-sm text-slate-300 flex-1">{q.question}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 rounded-xl transition-all"
      >
        <RotateCcw size={20} />
        Try Again
      </button>
    </div>
  );
}

export default function Quiz() {
  const [mode, setMode] = useState<QuizMode>('select');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [quizSize, setQuizSize] = useState(10);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const startQuiz = useCallback(() => {
    const pool = selectedCategory === 'all'
      ? getRandomQuestions(quizSize)
      : getRandomQuestions(quizSize, selectedCategory);
    setQuizQuestions(pool);
    setCurrentIdx(0);
    setAnswers([]);
    setMode('quiz');
  }, [selectedCategory, quizSize]);

  const handleAnswer = (knew: boolean) => {
    const newAnswers = [...answers, knew];
    setAnswers(newAnswers);
    if (currentIdx + 1 >= quizQuestions.length) {
      setMode('results');
    } else {
      setCurrentIdx(i => i + 1);
    }
  };

  const restart = () => {
    setMode('select');
    setAnswers([]);
    setCurrentIdx(0);
  };

  const score = answers.filter(Boolean).length;

  if (mode === 'select') {
    const categoryCounts: Record<string, number> = { all: questions.length };
    Object.keys(categoryLabels).forEach(cat => {
      categoryCounts[cat] = getQuestionsByCategory(cat as Category).length;
    });

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Quiz & Practice</h1>
          <p className="text-slate-400">Test your IB technical knowledge with real interview questions.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
            <Target size={18} className="text-amber-400" />
            Select Category
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedCategory === 'all'
                  ? 'border-amber-500 bg-amber-500/10'
                  : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
              }`}
            >
              <p className="font-semibold text-white text-sm">🎯 All Topics</p>
              <p className="text-slate-400 text-xs mt-0.5">{categoryCounts.all} questions</p>
            </button>
            {(Object.entries(categoryLabels) as [Category, string][]).map(([cat, label]) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedCategory === cat
                    ? 'border-amber-500 bg-amber-500/10'
                    : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
                }`}
              >
                <p className="font-semibold text-white text-sm">{label}</p>
                <p className="text-slate-400 text-xs mt-0.5">{categoryCounts[cat] || 0} questions</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-white mb-4">Number of Questions</h2>
          <div className="flex gap-3">
            {[5, 10, 15, 20].map(n => {
              const maxAvail = selectedCategory === 'all'
                ? questions.length
                : getQuestionsByCategory(selectedCategory as Category).length;
              const disabled = n > maxAvail;
              return (
                <button
                  key={n}
                  disabled={disabled}
                  onClick={() => setQuizSize(n)}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all disabled:opacity-30 ${
                    quizSize === n
                      ? 'bg-amber-500 text-slate-900'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={startQuiz}
          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-lg"
        >
          Start Quiz <ChevronRight size={22} />
        </button>
      </div>
    );
  }

  if (mode === 'results') {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <ResultsScreen
          score={score}
          total={quizQuestions.length}
          questions={quizQuestions}
          answers={answers}
          onRestart={restart}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <button onClick={restart} className="text-slate-400 hover:text-white text-sm mb-6 flex items-center gap-1 transition-colors">
        ← Exit Quiz
      </button>
      <QuestionCard
        key={currentIdx}
        question={quizQuestions[currentIdx]}
        questionNum={currentIdx + 1}
        totalQuestions={quizQuestions.length}
        onAnswer={handleAnswer}
      />
    </div>
  );
}
