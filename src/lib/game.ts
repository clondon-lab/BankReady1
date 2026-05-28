import { flashcards } from '../data/flashcards';

export interface GameQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  category: string;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function buildGameQuestions(category: string, count: number): GameQuestion[] {
  const pool = category === 'all' ? flashcards : flashcards.filter(f => f.category === category);
  const selected = shuffle(pool).slice(0, Math.min(count, pool.length));

  return selected.map(card => {
    const distractors = flashcards
      .filter(f => f.id !== card.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(f => f.back.split('\n')[0].slice(0, 80));

    const correct = card.back.split('\n')[0].slice(0, 80);
    const options = shuffle([correct, ...distractors]);

    return {
      id: card.id,
      question: card.front,
      options,
      correctAnswer: correct,
      category: card.category,
    };
  });
}

export function calcPoints(timeTakenMs: number, questionDurationMs: number): number {
  const ratio = Math.min(timeTakenMs / questionDurationMs, 1);
  return Math.round(Math.max(100, 1000 - ratio * 900));
}

export const QUESTION_DURATION_MS = 20_000;
export const REVIEW_DURATION_MS = 4_000;
