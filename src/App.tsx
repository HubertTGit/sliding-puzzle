import './App.css';
import { useEffect, useState } from 'react';
import { Puzzle } from './components/Puzzle';
import {
  findEmptyIndex,
  initialPuzzle,
  setAdjacentCards,
  shuffleArray,
} from './utils/logic';

function App() {
  const [pieces, setPieces] = useState(initialPuzzle);
  const [win, setWin] = useState(false);

  // check if player has won
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
      <button
        onClick={() => {
          setPieces(shuffleAndSetAdjacentCards);
          setWin(false);
        }}
      >
        shuffle
      </button>
      <Puzzle puzzle={pieces} onClick={rearrangeAdjacentCards} />
    </main>
  );
}

export default App;
