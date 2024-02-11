import './App.css';
import { useEffect, useState } from 'react';
import { PuzzleComponent } from './components/Puzzle';
import {
  findEmptyIndex,
  initialPuzzle,
  setAdjacentCards,
  shuffleArray,
  initial_matrix,
  INITIAL_SIZE,
  createMatrix,
} from './utils/puzzle.util';

import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

function App() {
  const [pieces, setPieces] = useState(initialPuzzle);
  const [difficulty, setDifficulty] = useState<number>(INITIAL_SIZE);
  const [matrices, setMatrix] = useState<Map<number, number[]>>(initial_matrix);
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
  }, [difficulty, matrices]);

  // rearrange adjacent cards
  const swapAdjacentCards = (idx: number) => {
    const emptyIndex = findEmptyIndex(pieces);
    const newPuzzle = [...pieces];
    [newPuzzle[idx], newPuzzle[emptyIndex]] = [
      newPuzzle[emptyIndex],
      newPuzzle[idx],
    ];
    setPieces(setAdjacentCards(newPuzzle, matrices));
  };

  return (
    <main>
      {win && (
        <>
          <Confetti width={width} height={height} />
          <h1 className="text-center">Congrats 🎉🤡</h1>
          <p className="text-center">{`you have completed ${difficulty}x${difficulty} puzzle`}</p>
        </>
      )}

      <button
        onClick={() => {
          const shuffled = shuffleArray(difficulty);
          const newCards = setAdjacentCards(shuffled, matrices);
          setPieces(newCards);
          setWin(false);
        }}
      >
        {win ? 'start again' : 'shuffle cards'}
      </button>

      <div className=" flex justify-between items-center py-4">
        <label htmlFor="chooseDifficulty">Select level:</label>
        <select
          className="border-2 border-black rounded-md p-2"
          id="chooseDifficulty"
          value={difficulty}
          onChange={(e) => {
            const value = e.target.value as unknown as number;
            const newMatrix = createMatrix(+value);
            setMatrix(newMatrix);
            setDifficulty(+value);
          }}
        >
          <option value="9">3x3 puzzle</option>
          <option value="16">4x4 puzzle</option>
          <option value="25">5x5 puzzle</option>
        </select>
      </div>

      <PuzzleComponent
        puzzle={pieces}
        onClick={swapAdjacentCards}
        dimension={pieces[0].dimension}
      />
    </main>
  );
}

export default App;
