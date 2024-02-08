import { useEffect, useState } from 'react';
import './App.css';
import Puzzle from './Puzzle';
import {
  findEmptyIndex,
  initialPuzzle,
  setAdjacentCards,
  shuffleArray,
} from './util/logic';

function App() {
  const [pieces, setPieces] = useState(initialPuzzle);
  const [win, setWin] = useState(false);

  useEffect(() => {
    if (pieces.every((p, i) => p.originalPosition === i)) {
      setWin(true);
    }
  }, [pieces]);

  function rearrangeAdjacentCards(idx: number) {
    const emptyIndex = findEmptyIndex(pieces);
    const newPuzzle = [...pieces];
    [newPuzzle[idx], newPuzzle[emptyIndex]] = [
      newPuzzle[emptyIndex],
      newPuzzle[idx],
    ];
    setPieces(setAdjacentCards(newPuzzle));
  }

  function shuffleAndSetAdjacentCards(pieces: typeof initialPuzzle) {
    const shuffled = shuffleArray(pieces);
    return setAdjacentCards(shuffled);
  }

  return (
    <main>
      <h1>{win && 'you have won 🎉🤡'}</h1>
      <button onClick={() => setPieces(shuffleAndSetAdjacentCards)}>
        shuffle
      </button>
      <Puzzle puzzle={pieces} onClick={rearrangeAdjacentCards} />
    </main>
  );
}

export default App;
