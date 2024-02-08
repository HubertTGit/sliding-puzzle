import { useState } from 'react';
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

  function rearrangeAdjacentCards(idx: number) {
    const emptyIndex = findEmptyIndex(pieces);
    // swap the empty card with the clicked card
    const newPuzzle = [...pieces];
    [newPuzzle[idx], newPuzzle[emptyIndex]] = [
      newPuzzle[emptyIndex],
      newPuzzle[idx],
    ];

    //set the adjacent cards
    const _moved = setAdjacentCards(newPuzzle);

    //set the new state
    setPieces(_moved);
  }

  return (
    <main>
      <button
        onClick={() =>
          setPieces((pieces) => {
            const shuffled = shuffleArray(pieces);
            return setAdjacentCards(shuffled);
          })
        }
      >
        shuffle
      </button>
      <Puzzle puzzle={pieces} onClick={rearrangeAdjacentCards} />
    </main>
  );
}

export default App;
