import { type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, CreditCard, BarChart2, Gamepad2, Home, TrendingUp, LogOut, Briefcase, Users } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/courses', label: 'Courses', icon: BookOpen },
  { path: '/flashcards', label: 'Flashcards', icon: CreditCard },
  { path: '/quiz', label: 'Quiz', icon: BarChart2 },
  { path: '/games', label: 'Games', icon: Gamepad2 },
  { path: '/hubs', label: 'Hubs', icon: Users },
  { path: '/tracker', label: 'Tracker', icon: Briefcase },
];

export default function Layout({ children, onLogout }: { children: ReactNode; onLogout?: () => void }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Top Nav */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <TrendingUp size={18} className="text-slate-900" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">BankReady</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 ml-auto mr-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === path
                      ? 'bg-amber-500 text-slate-900'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}
            </nav>

            {onLogout && (
              <button
                onClick={onLogout}
                className="hidden md:flex items-center gap-1.5 text-slate-500 hover:text-white px-3 py-2 rounded-lg text-sm transition-colors hover:bg-slate-800"
                title="Sign out"
              >
                <LogOut size={15} />
                <span className="font-medium">Sign out</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 z-50">
        <div className="flex">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                location.pathname === path
                  ? 'text-amber-400'
                  : 'text-slate-500'
              }`}
            >
              <Icon size={20} />
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
    </div>
  );
}
