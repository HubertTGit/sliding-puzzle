import './App.css';
import { useEffect, useState } from 'react';
import { PuzzleComponent } from './components/Puzzle';
import {
  findEmptyIndex,
  initialPuzzle,
  setAdjacentCards,
  shuffleArray,
} from './utils/puzzle.util';

import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { Card } from './interfaces/puzzle.interface';

function App() {
  const [pieces, setPieces] = useState(initialPuzzle);
  const [difficulty, setDifficulty] = useState<number>(9);
  const [win, setWin] = useState(false);
  const { width, height } = useWindowSize();

  // check if player has won based on the original position
  useEffect(() => {
    if (pieces.every((p, i) => p.originalPosition === i)) {
      setWin(true);
    }
  }, [pieces]);

  // update and reshuffle puzzle on dificulty change
  useEffect(() => {
    console.log('difficulty', difficulty);
  }, [difficulty]);

  // rearrange adjacent cards
  const rearrangeAdjacentCards = (idx: number) => {
    const emptyIndex = findEmptyIndex(pieces);
    const newPuzzle = [...pieces];
    [newPuzzle[idx], newPuzzle[emptyIndex]] = [
      newPuzzle[emptyIndex],
      newPuzzle[idx],
    ];
    setPieces(setAdjacentCards(newPuzzle));
  };

  // shuffle and set adjacent cards
  const shuffleAndSetAdjacentCards = (pieces: Card[]) => {
    const shuffled = shuffleArray(pieces);
    return setAdjacentCards(shuffled);
  };

  return (
    <main>
      {win && (
        <>
          <Confetti width={width} height={height} />
          <h1 className="text-center">Conngratulation 🎉🤡</h1>
          <p className="text-center">{`you have completed ${difficulty}x${difficulty} puzzle`}</p>
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

      <div className=" flex justify-between items-center py-4">
        <label htmlFor="chooseDifficulty">Select level:</label>
        <select
          className="border-2 border-black rounded-md p-2"
          id="chooseDifficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as unknown as number)}
        >
          <option value="9">9x9 puzzle</option>
          <option value="16">16x16 puzzle</option>
          <option value="25">25x25 puzzle</option>
        </select>
      </div>

      <PuzzleComponent
        puzzle={pieces}
        onClick={rearrangeAdjacentCards}
        dimension={pieces[0].dimension}
      />
    </main>
  );
}

export default App;
