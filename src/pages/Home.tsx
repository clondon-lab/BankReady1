import { Link } from 'react-router-dom';
import { BookOpen, CreditCard, BarChart2, Gamepad2, TrendingUp, ChevronRight, Target, Zap, Award } from 'lucide-react';

const features = [
  {
    path: '/courses',
    icon: BookOpen,
    title: 'Courses',
    description: 'Structured lessons on Accounting, Valuation, DCF, M&A, and LBO from BIWS & WSP frameworks',
    color: 'from-blue-600 to-blue-800',
    accent: 'bg-blue-500/20 text-blue-400',
  },
  {
    path: '/flashcards',
    icon: CreditCard,
    title: 'Flashcards',
    description: '60+ notecards covering key formulas, concepts, and definitions. Flip to reveal answers.',
    color: 'from-emerald-600 to-emerald-800',
    accent: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    path: '/quiz',
    icon: BarChart2,
    title: 'Quiz & Tests',
    description: 'Practice with real IB technical questions. Category quizzes and full mock tests.',
    color: 'from-purple-600 to-purple-800',
    accent: 'bg-purple-500/20 text-purple-400',
  },
  {
    path: '/games',
    icon: Gamepad2,
    title: 'Games',
    description: 'Blitz Mode, IB Jeopardy, Term Match, and Speed Round to make learning competitive.',
    color: 'from-amber-600 to-amber-800',
    accent: 'bg-amber-500/20 text-amber-400',
  },
];

const stats = [
  { label: 'Technical Questions', value: '105+', icon: Target },
  { label: 'Flashcards', value: '60+', icon: Zap },
  { label: 'Topic Modules', value: '5', icon: BookOpen },
  { label: 'Game Modes', value: '4', icon: Award },
];

const topics = [
  { label: 'Accounting', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  { label: 'Valuation', color: 'bg-green-500/20 text-green-300 border-green-500/30' },
  { label: 'DCF Analysis', color: 'bg-teal-500/20 text-teal-300 border-teal-500/30' },
  { label: 'M&A / Mergers', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  { label: 'LBO Analysis', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  { label: 'Brain Teasers', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-6">
          <TrendingUp size={16} className="text-amber-400" />
          <span className="text-amber-400 text-sm font-medium">Investment Banking Recruiting Prep</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
          Crack Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            IB Interview
          </span>
        </h1>
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
          Master the technical questions that matter. Built on BIWS 400 Questions and WSP Red Book frameworks — the same material used by analysts at Goldman, Morgan Stanley, and Blackstone.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/courses"
            className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            Start Learning <ChevronRight size={20} />
          </Link>
          <Link
            to="/quiz"
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-4 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2"
          >
            Take a Quiz <BarChart2 size={18} />
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center">
            <Icon size={24} className="text-amber-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-slate-400 text-sm">{label}</div>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Everything You Need to Prep</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map(({ path, icon: Icon, title, description, accent }) => (
            <Link
              key={path}
              to={path}
              className="group bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all hover:translate-y-[-2px] hover:shadow-xl hover:shadow-black/20"
            >
              <div className={`inline-flex p-3 rounded-xl ${accent} mb-4`}>
                <Icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                {title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              <div className="mt-4 flex items-center gap-1 text-amber-400 text-sm font-medium">
                Get started <ChevronRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Topics Covered */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-3">Topics Covered</h2>
        <p className="text-slate-400 text-center mb-8">All the core technical areas tested in IB superday interviews</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {topics.map(({ label, color }) => (
            <span key={label} className={`px-4 py-2 rounded-full border text-sm font-medium ${color}`}>
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Ready to land the offer?</h2>
        <p className="text-slate-400 mb-6">Start with flashcards for a quick review, or dive into the full course series.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/flashcards" className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-xl transition-all">
            Quick Review (Flashcards)
          </Link>
          <Link to="/games" className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition-all">
            Play Games
          </Link>
        </div>
      </div>
    </div>
  );
}
