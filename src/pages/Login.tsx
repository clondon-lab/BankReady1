import { useState, useEffect } from 'react';
import { TrendingUp, Lock, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Mode = 'login' | 'signup';

export default function Login() {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const handleGoogle = async () => {
    setIsLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      });
      if (error) {
        setError(error.message);
        triggerShake();
        setIsLoading(false);
      }
    } catch {
      setError('Unable to connect. Please check your connection and try again.');
      triggerShake();
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setInfo('');

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setError(error.message);
          triggerShake();
        }
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          setError(error.message);
          triggerShake();
        } else {
          setInfo('Check your email for a confirmation link, then sign in.');
          setMode('login');
          setPassword('');
        }
      }
    } catch {
      setError('Unable to connect. Please check your connection and try again.');
      triggerShake();
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(m => m === 'login' ? 'signup' : 'login');
    setError('');
    setInfo('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">

      {/* ── Left panel: branding ───────────────────────── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[52%] bg-slate-900 border-r border-slate-800 p-14 relative overflow-hidden"
        style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease' }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(251,191,36,0.06) 1px,transparent 1px),' +
              'linear-gradient(90deg,rgba(251,191,36,0.06) 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Ambient orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-blue-600/5 rounded-full blur-3xl" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
            <TrendingUp size={20} className="text-slate-900" />
          </div>
          <span className="font-bold text-white text-xl tracking-tight">BankReady</span>
        </div>

        {/* Centre copy */}
        <div className="relative space-y-9">
          <div>
            <h1 className="text-[2.6rem] font-bold text-white leading-[1.15] tracking-tight">
              Your gateway to<br />
              <span className="text-amber-400">Wall Street mastery.</span>
            </h1>
            <p className="mt-5 text-slate-400 text-base leading-relaxed max-w-sm">
              Institutional-grade training for the next generation of investment banking professionals.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: '2,400+', label: 'Practice Questions' },
              { value: '94%',    label: 'Offer Rate'         },
              { value: '15+',    label: 'Deal Types'         },
            ].map(({ value, label }) => (
              <div key={label} className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4">
                <div className="text-2xl font-bold text-amber-400 tabular-nums">{value}</div>
                <div className="text-[11px] text-slate-500 mt-1 leading-tight">{label}</div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-slate-800/30 border border-slate-700/30 rounded-2xl p-5">
            <p className="text-slate-300 text-sm italic leading-relaxed">
              "BankReady was the edge I needed — got my Goldman offer after two weeks of prep."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/20 flex items-center justify-center shrink-0">
                <span className="text-[11px] font-bold text-amber-400">JL</span>
              </div>
              <div>
                <div className="text-xs font-semibold text-white">J. Liu</div>
                <div className="text-[11px] text-slate-500">Investment Banking Analyst, Goldman Sachs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative flex items-center gap-2 text-slate-600 text-xs">
          <Shield size={13} />
          <span>256-bit SSL encrypted · SOC 2 Type II certified</span>
        </div>
      </div>

      {/* ── Right panel: form ──────────────────────────── */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-8 py-12"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
        }}
      >
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-10">
          <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center">
            <TrendingUp size={19} className="text-slate-900" />
          </div>
          <span className="font-bold text-white text-xl tracking-tight">BankReady</span>
        </div>

        <div className={`w-full max-w-[360px] ${shake ? 'shake' : ''}`}>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
            </h2>
            <p className="mt-1.5 text-slate-400 text-sm">
              {mode === 'login' ? 'Access your training dashboard' : 'Start your Wall Street prep today'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="analyst@bank.com"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'At least 6 characters' : 'Enter your password'}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 pr-11 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/10 transition-all"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2.5 bg-red-500/8 border border-red-500/20 rounded-xl px-4 py-3">
                <AlertCircle size={15} className="text-red-400 shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {info && (
              <div className="flex items-center gap-2.5 bg-emerald-500/8 border border-emerald-500/20 rounded-xl px-4 py-3">
                <p className="text-emerald-400 text-sm">{info}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-500 hover:bg-amber-400 active:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed text-slate-900 font-bold py-3.5 rounded-xl transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:-translate-y-px text-sm"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-900/25 border-t-slate-900 rounded-full animate-spin" />
                  {mode === 'login' ? 'Authenticating…' : 'Creating account…'}
                </>
              ) : (
                <>
                  <Lock size={15} />
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-xs text-slate-600">or</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={isLoading}
            className="mt-4 w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-all duration-150 text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.7-.4-4z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.5 35.6 26.9 36.5 24 36.5c-5.2 0-9.6-3-11.5-7.2l-6.6 5.1C9.5 40 16.3 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6l6.2 5.2C40.5 35.5 44 30.2 44 24c0-1.3-.1-2.7-.4-4z"/>
            </svg>
            Continue with Google
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={switchMode}
                className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[11px] text-slate-700">
              © 2024 BankReady, Inc.&ensp;·&ensp;
              <span className="hover:text-slate-400 cursor-pointer transition-colors">Terms</span>
              &ensp;·&ensp;
              <span className="hover:text-slate-400 cursor-pointer transition-colors">Privacy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
