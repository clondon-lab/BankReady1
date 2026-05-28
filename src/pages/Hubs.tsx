import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, LogIn, Trophy, Copy, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Hub {
  id: string;
  name: string;
  join_code: string;
  owner_id: string;
  member_count?: number;
}

function generateJoinCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function Hubs() {
  const navigate = useNavigate();
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [userId, setUserId] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [newHubName, setNewHubName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUserId(session.user.id);
      const name = session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User';
      setDisplayName(name);

      const { data: memberRows } = await supabase
        .from('hub_members')
        .select('hub_id')
        .eq('user_id', session.user.id);

      if (!memberRows?.length) { setLoading(false); return; }

      const hubIds = memberRows.map(r => r.hub_id);
      const { data: hubData } = await supabase
        .from('study_hubs')
        .select('*')
        .in('id', hubIds);

      setHubs(hubData || []);
      setLoading(false);
    };
    load();
  }, []);

  const createHub = async () => {
    setError('');
    if (!newHubName.trim()) return;
    const code = generateJoinCode();
    const { data, error: err } = await supabase
      .from('study_hubs')
      .insert({ name: newHubName.trim(), owner_id: userId, join_code: code })
      .select()
      .single();
    if (err) { setError('Failed to create hub.'); return; }
    await supabase.from('hub_members').insert({ hub_id: data.id, user_id: userId, display_name: displayName });
    setHubs(prev => [...prev, data]);
    setNewHubName('');
    setShowCreate(false);
    navigate(`/hubs/${data.id}`);
  };

  const joinHub = async () => {
    setError('');
    const code = joinCode.trim().toUpperCase();
    const { data: hub } = await supabase
      .from('study_hubs')
      .select('*')
      .eq('join_code', code)
      .single();
    if (!hub) { setError('Hub not found. Check the code.'); return; }

    const { data: members } = await supabase
      .from('hub_members')
      .select('user_id')
      .eq('hub_id', hub.id);

    if (members && members.length >= 5) { setError('Hub is full (max 5 members).'); return; }
    const alreadyIn = members?.some(m => m.user_id === userId);
    if (!alreadyIn) {
      await supabase.from('hub_members').insert({ hub_id: hub.id, user_id: userId, display_name: displayName });
    }
    setJoinCode('');
    setShowJoin(false);
    navigate(`/hubs/${hub.id}`);
  };

  const copyCode = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Study Hubs</h1>
          <p className="text-slate-400">Compete with friends on IB interview prep.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setShowJoin(true); setShowCreate(false); setError(''); }}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <LogIn size={15} />
            Join
          </button>
          <button
            onClick={() => { setShowCreate(true); setShowJoin(false); setError(''); }}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
          >
            <Plus size={15} />
            Create
          </button>
        </div>
      </div>

      {(showCreate || showJoin) && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-6">
          <h2 className="font-semibold text-white mb-4">{showCreate ? 'Create Hub' : 'Join Hub'}</h2>
          {showCreate ? (
            <div className="flex gap-3">
              <input
                value={newHubName}
                onChange={e => setNewHubName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && createHub()}
                placeholder="Hub name (e.g. Goldman Group)"
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
              />
              <button onClick={createHub} className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-4 py-2 rounded-lg text-sm transition-colors">
                Create
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <input
                value={joinCode}
                onChange={e => setJoinCode(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === 'Enter' && joinHub()}
                placeholder="6-digit code"
                maxLength={6}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500 uppercase tracking-widest"
              />
              <button onClick={joinHub} className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-4 py-2 rounded-lg text-sm transition-colors">
                Join
              </button>
            </div>
          )}
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>
      )}

      {loading ? (
        <div className="text-center text-slate-500 py-16">Loading...</div>
      ) : hubs.length === 0 ? (
        <div className="text-center py-20">
          <Trophy size={40} className="text-slate-700 mx-auto mb-4" />
          <p className="text-slate-400 mb-2">No hubs yet.</p>
          <p className="text-slate-600 text-sm">Create one or ask a friend for their join code.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {hubs.map(hub => (
            <div
              key={hub.id}
              onClick={() => navigate(`/hubs/${hub.id}`)}
              className="bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-2xl p-5 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Users size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{hub.name}</p>
                    {hub.owner_id === userId && (
                      <span className="text-xs text-amber-400">Owner</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); copyCode(hub.join_code, hub.id); }}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors"
                >
                  {copiedId === hub.id ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                  {hub.join_code}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
