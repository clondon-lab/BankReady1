import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Shuffle, RotateCcw, Filter } from 'lucide-react';
import { flashcards, flashcardCategories, type Flashcard } from '../data/flashcards';
import { supabase } from '../lib/supabase';

function FlashcardView({ card, isFlipped, onFlip }: { card: Flashcard; isFlipped: boolean; onFlip: () => void }) {
  return (
    <div className="flip-card w-full" style={{ height: '340px' }} onClick={onFlip}>
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div className="flip-card-front">
          <div className="w-full h-full bg-slate-900 border border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500/50 transition-colors">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-4 bg-amber-500/10 px-3 py-1 rounded-full">
              {card.category}
            </span>
            <h2 className="text-2xl font-bold text-white text-center leading-snug">{card.front}</h2>
            <p className="text-slate-500 text-sm mt-6">Click to reveal answer</p>
          </div>
        </div>

        {/* Back */}
        <div className="flip-card-back">
          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/30 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer overflow-auto">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-4 bg-amber-500/10 px-3 py-1 rounded-full">
              Answer
            </span>
            <div className="text-slate-200 text-sm text-center leading-relaxed whitespace-pre-line max-h-72 overflow-y-auto w-full">
              {card.back}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Flashcards() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deck, setDeck] = useState<Flashcard[]>(flashcards);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
  const [studyMode, setStudyMode] = useState<'all' | 'unknown'>('all');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUserId(session.user.id);
      const { data } = await supabase.from('known_flashcards').select('card_id');
      if (data) setKnownCards(new Set(data.map(r => r.card_id)));
    };
    load();
  }, []);

  const filteredDeck = selectedCategory === 'All'
    ? deck
    : deck.filter(c => c.category === selectedCategory);

  const studyDeck = studyMode === 'unknown'
    ? filteredDeck.filter(c => !knownCards.has(c.id))
    : filteredDeck;

  const currentCard = studyDeck[currentIndex] || null;
  const progress = studyDeck.length > 0 ? ((currentIndex + 1) / studyDeck.length) * 100 : 0;

  const goNext = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex(i => (i + 1) % studyDeck.length), 150);
  }, [studyDeck.length]);

  const goPrev = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex(i => (i - 1 + studyDeck.length) % studyDeck.length), 150);
  }, [studyDeck.length]);

  const shuffle = () => {
    setDeck(prev => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const markKnown = async () => {
    if (!currentCard) return;
    setKnownCards(prev => new Set([...prev, currentCard.id]));
    goNext();
    if (userId) {
      await supabase.from('known_flashcards')
        .upsert({ user_id: userId, card_id: currentCard.id }, { onConflict: 'user_id,card_id' });
    }
  };

  const resetDeck = async () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCards(new Set());
    if (userId) {
      await supabase.from('known_flashcards').delete().eq('user_id', userId);
    }
  };

  const changeCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Flashcards</h1>
        <p className="text-slate-400">Key formulas, concepts, and definitions. Click a card to flip it.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={shuffle} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm px-4 py-2 rounded-lg transition-colors">
          <Shuffle size={16} />
          Shuffle
        </button>
        <button onClick={resetDeck} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm px-4 py-2 rounded-lg transition-colors">
          <RotateCcw size={16} />
          Reset
        </button>
        <button
          onClick={() => { setStudyMode(m => m === 'all' ? 'unknown' : 'all'); setCurrentIndex(0); }}
          className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-colors ${
            studyMode === 'unknown'
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
        >
          <Filter size={16} />
          {studyMode === 'unknown' ? 'Showing Unknown' : 'Study Unknown Only'}
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['All', ...flashcardCategories].map(cat => (
          <button
            key={cat}
            onClick={() => changeCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-900'
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between text-sm mb-3">
        <span className="text-slate-400">
          Card {studyDeck.length > 0 ? currentIndex + 1 : 0} of {studyDeck.length}
        </span>
        <span className="text-green-400 font-medium">
          {knownCards.size} known ✓
        </span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-1.5 mb-6">
        <div className="bg-amber-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      {/* Card */}
      {currentCard ? (
        <FlashcardView
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped(f => !f)}
        />
      ) : (
        <div className="h-80 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center">
          <p className="text-slate-400">
            {studyMode === 'unknown' && knownCards.size > 0
              ? '🎉 You\'ve marked all cards as known!'
              : 'No cards in this category.'}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={goPrev}
          disabled={studyDeck.length === 0}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white px-5 py-3 rounded-xl transition-colors"
        >
          <ChevronLeft size={20} />
          Previous
        </button>

        {isFlipped && currentCard && (
          <button
            onClick={markKnown}
            className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors animate-bounce-in"
          >
            Got it ✓
          </button>
        )}

        <button
          onClick={goNext}
          disabled={studyDeck.length === 0}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white px-5 py-3 rounded-xl transition-colors"
        >
          Next
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Tags */}
      {currentCard && (
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {currentCard.tags.map(tag => (
            <span key={tag} className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
