import { useState, useEffect } from 'react';
import { Card } from '../interfaces/puzzle.interface';

// Custom hook for game status
export const useGameStatus = (pieces: Card[]) => {
  const [win, setWin] = useState(false);

  useEffect(() => {
    if (pieces.every((p, i) => p.originalPosition === i)) {
      setWin(true);
    }
  }, [pieces]);

  return { win, setWin };
};
