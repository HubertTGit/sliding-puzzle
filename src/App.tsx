import './App.css';
import { useEffect, useState } from 'react';
import { PuzzleComponent } from './components/Puzzle';
import {
  findEmptyIndex,
  initialPuzzle,
  setAdjacentCards,
  shuffleArray,
} from './utils/logic';

import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

function App() {
  const [pieces, setPieces] = useState(initialPuzzle);
  const [win, setWin] = useState(false);
  const { width, height } = useWindowSize();

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
      {win && (
        <>
          <Confetti width={width} height={height} />
          <h1>'you have won 🎉🤡'</h1>
        </>
      )}

      <button
        onClick={() => {
          setPieces(shuffleAndSetAdjacentCards);
          setWin(false);
        }}
      >
        shuffle
      </button>
      <PuzzleComponent puzzle={pieces} onClick={rearrangeAdjacentCards} />
    </main>
  );
}

export default App;
