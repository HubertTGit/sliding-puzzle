import './App.css';
import { PuzzleComponent } from './components/Puzzle';
import {
  findEmptyIndex,
  initialPuzzle,
  setAdjacentCards,
  shuffleArray,
  initial_matrix,
  createMatrix,
  CARD_SIZE,
} from './utils/puzzle.util';
import stuck from './assets/stuck.jpg';

import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { useGameStatus } from './custom-hooks/game.hook';
import { usePuzzle } from './custom-hooks/puzzle.hook';

function App() {
  // custom hook for puzzle
  const { pieces, difficulty, setDifficulty, matrices, setMatrix, setPieces } =
    usePuzzle(initialPuzzle, initial_matrix);
  const { win, setWin } = useGameStatus(pieces);
  const { width, height } = useWindowSize();

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

  // shuffle the cards
  const shuffleHandler = () => {
    const shuffled = shuffleArray(difficulty);
    const newCards = setAdjacentCards(shuffled, matrices);
    setPieces(newCards);
    setWin(false);
  };

  // change difficulty
  const changeDifficultyHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as unknown as number;
    const newMatrix = createMatrix(+value);
    setMatrix(newMatrix);
    setDifficulty(+value);
  };

  const sqr = Math.sqrt(difficulty);
  const imgSize = sqr * CARD_SIZE;

  return (
    <main data-testid="app">
      {win && (
        <>
          <Confetti width={width} height={height} data-testid="confetti" />
          <h1 className="text-center">Congrats 🎉🤡</h1>
          <p className="text-center">{`you have completed ${sqr}x${sqr} puzzle`}</p>
        </>
      )}

      <button onClick={shuffleHandler} data-testid="shuffler">
        {win ? 'start again' : 'shuffle cards'}
      </button>

      <div className=" flex justify-between items-center py-4">
        <label htmlFor="chooseDifficulty">Select level:</label>
        <select
          className="border-2 border-black rounded-md p-2"
          id="chooseDifficulty"
          value={difficulty}
          onChange={changeDifficultyHandler}
        >
          <option value="9">3x3 puzzle</option>
          <option value="16">4x4 puzzle</option>
          <option value="25">5x5 puzzle</option>
          <option value="36">6x6 puzzle</option>
          <option value="49">7x7 puzzle</option>
        </select>
      </div>

      {win ? (
        <img
          src={stuck}
          alt="alt"
          width={imgSize}
          height={imgSize}
          className="border border-orange-300 border-3 rounded-md"
        />
      ) : (
        <PuzzleComponent
          puzzle={pieces}
          onClick={swapAdjacentCards}
          dimension={pieces[0].dimension}
        />
      )}
    </main>
  );
}

export default App;
