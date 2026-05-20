import { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Pencil, Check, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface BankEntry {
  id: string;
  name: string;
  deadline: string;
  notes: string;
  prepNotes: string;
}

const emptyForm = { name: '', deadline: '', notes: '', prepNotes: '' };

export default function RecruitingTracker() {
  const [entries, setEntries] = useState<BankEntry[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<BankEntry>>({});
  const [adding, setAdding] = useState(false);
  const [newEntry, setNewEntry] = useState(emptyForm);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUserId(session.user.id);

      const { data } = await supabase
        .from('bank_entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setEntries(data.map(row => ({
          id: row.id,
          name: row.name,
          deadline: row.deadline,
          notes: row.notes,
          prepNotes: row.prep_notes,
        })));
      }
      setLoading(false);
    };
    load();
  }, []);

  const addEntry = async () => {
    if (!newEntry.name.trim() || !userId) return;
    const { data } = await supabase
      .from('bank_entries')
      .insert({ user_id: userId, name: newEntry.name.trim(), deadline: newEntry.deadline, notes: newEntry.notes, prep_notes: newEntry.prepNotes })
      .select()
      .single();
    if (data) {
      const entry: BankEntry = { id: data.id, name: data.name, deadline: data.deadline, notes: data.notes, prepNotes: data.prep_notes };
      setEntries(prev => [entry, ...prev]);
      setNewEntry(emptyForm);
      setAdding(false);
      setExpandedId(entry.id);
    }
  };

  const deleteEntry = async (id: string) => {
    await supabase.from('bank_entries').delete().eq('id', id);
    setEntries(prev => prev.filter(e => e.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const startEdit = (entry: BankEntry) => {
    setEditingId(entry.id);
    setDraft({ name: entry.name, deadline: entry.deadline, notes: entry.notes, prepNotes: entry.prepNotes });
  };

  const saveEdit = async (id: string) => {
    await supabase
      .from('bank_entries')
      .update({ name: draft.name, deadline: draft.deadline, notes: draft.notes, prep_notes: draft.prepNotes })
      .eq('id', id);
    setEntries(prev => prev.map(e => e.id === id ? { ...e, ...draft } as BankEntry : e));
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  const inputCls = 'w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500/70';

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-slate-500 text-sm">Loading…</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Recruiting Tracker</h1>
          <p className="text-slate-400 text-sm mt-1">Track your applications, deadlines, and prep notes.</p>
        </div>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold text-sm px-4 py-2 rounded-xl transition-colors"
          >
            <Plus size={16} /> Add Bank
          </button>
        )}
      </div>

      {/* Add form */}
      {adding && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-4 space-y-3">
          <h2 className="text-white font-semibold">New Bank Entry</h2>
          <input autoFocus placeholder="Bank name (e.g. Goldman Sachs)" value={newEntry.name}
            onChange={e => setNewEntry(p => ({ ...p, name: e.target.value }))} className={inputCls} />
          <input placeholder="Deadline (e.g. Aug 1, 2025)" value={newEntry.deadline}
            onChange={e => setNewEntry(p => ({ ...p, deadline: e.target.value }))} className={inputCls} />
          <textarea placeholder="Notes" rows={2} value={newEntry.notes}
            onChange={e => setNewEntry(p => ({ ...p, notes: e.target.value }))} className={`${inputCls} resize-none`} />
          <textarea placeholder="Interview prep notes" rows={2} value={newEntry.prepNotes}
            onChange={e => setNewEntry(p => ({ ...p, prepNotes: e.target.value }))} className={`${inputCls} resize-none`} />
          <div className="flex gap-2 pt-1">
            <button onClick={addEntry}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold text-sm px-4 py-2 rounded-xl transition-colors">
              <Check size={15} /> Save
            </button>
            <button onClick={() => { setAdding(false); setNewEntry(emptyForm); }}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm px-4 py-2 rounded-xl hover:bg-slate-800 transition-colors">
              <X size={15} /> Cancel
            </button>
          </div>
        </div>
      )}

      {entries.length === 0 && !adding && (
        <div className="text-center py-16 text-slate-600 text-sm">
          No banks added yet. Click <span className="text-amber-500">Add Bank</span> to get started.
        </div>
      )}

      <div className="space-y-3">
        {entries.map(entry => {
          const isExpanded = expandedId === entry.id;
          const isEditing = editingId === entry.id;

          return (
            <div key={entry.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              {/* Card header */}
              <div
                className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-800/50 transition-colors"
                onClick={() => !isEditing && setExpandedId(isExpanded ? null : entry.id)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {isEditing ? (
                    <input
                      autoFocus
                      value={draft.name ?? ''}
                      onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
                      onClick={e => e.stopPropagation()}
                      className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-1 text-white text-sm font-semibold focus:outline-none focus:border-amber-500/70 w-48"
                    />
                  ) : (
                    <span className="text-white font-semibold truncate">{entry.name}</span>
                  )}
                  {entry.deadline && !isEditing && (
                    <span className="text-xs text-amber-400/80 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full shrink-0">
                      {entry.deadline}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-3" onClick={e => e.stopPropagation()}>
                  {isEditing ? (
                    <>
                      <button onClick={() => saveEdit(entry.id)} title="Save"
                        className="text-amber-400 hover:text-amber-300 p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                        <Check size={15} />
                      </button>
                      <button onClick={cancelEdit} title="Cancel"
                        className="text-slate-500 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                        <X size={15} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { setExpandedId(entry.id); startEdit(entry); }} title="Edit"
                        className="text-slate-500 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => deleteEntry(entry.id)} title="Delete"
                        className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                        <Trash2 size={14} />
                      </button>
                      {isExpanded
                        ? <ChevronUp size={16} className="text-slate-500 ml-1" />
                        : <ChevronDown size={16} className="text-slate-500 ml-1" />}
                    </>
                  )}
                </div>
              </div>

              {/* Expanded body */}
              {isExpanded && (
                <div className="border-t border-slate-800 px-5 py-4 space-y-4">
                  {isEditing ? (
                    <>
                      <Field label="Deadline">
                        <input value={draft.deadline ?? ''} placeholder="e.g. Aug 1, 2025"
                          onChange={e => setDraft(d => ({ ...d, deadline: e.target.value }))} className={inputCls} />
                      </Field>
                      <Field label="Notes">
                        <textarea rows={3} value={draft.notes ?? ''} placeholder="Application notes, contacts, status…"
                          onChange={e => setDraft(d => ({ ...d, notes: e.target.value }))} className={`${inputCls} resize-none`} />
                      </Field>
                      <Field label="Interview Prep Notes">
                        <textarea rows={3} value={draft.prepNotes ?? ''} placeholder="Questions asked, topics to study…"
                          onChange={e => setDraft(d => ({ ...d, prepNotes: e.target.value }))} className={`${inputCls} resize-none`} />
                      </Field>
                    </>
                  ) : (
                    <>
                      {entry.deadline && <Field label="Deadline"><p className="text-slate-300 text-sm">{entry.deadline}</p></Field>}
                      {entry.notes && <Field label="Notes"><p className="text-slate-300 text-sm whitespace-pre-wrap">{entry.notes}</p></Field>}
                      {entry.prepNotes && <Field label="Interview Prep Notes"><p className="text-slate-300 text-sm whitespace-pre-wrap">{entry.prepNotes}</p></Field>}
                      {!entry.deadline && !entry.notes && !entry.prepNotes && (
                        <p className="text-slate-600 text-sm">No details yet. Click the pencil icon to add notes.</p>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">{label}</div>
      {children}
    </div>
  );
}
