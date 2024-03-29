import { useState, useEffect } from 'react';
import { Card } from '../interfaces/puzzle.interface';
import {
  INITIAL_SIZE,
  shuffleArray,
  setAdjacentCards,
} from '../utils/puzzle.util';

// Custom hook for puzzle
export const usePuzzle = (
  initialPuzzle: Card[],
  initialMatrix: Map<number, number[]>
) => {
  const [pieces, setPieces] = useState(initialPuzzle);
  const [difficulty, setDifficulty] = useState<number>(INITIAL_SIZE);
  const [matrices, setMatrix] = useState<Map<number, number[]>>(initialMatrix);

  useEffect(() => {
    const shuffled = shuffleArray(difficulty);
    setPieces(setAdjacentCards(shuffled, matrices));
  }, [difficulty, matrices]);

  return { pieces, difficulty, setDifficulty, matrices, setMatrix, setPieces };
};
