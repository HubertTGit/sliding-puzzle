import { Card } from '../interfaces/puzzle.interface';
import {
  calculatePosX,
  calculatePosY,
  createMatrixAlgorithmBasedOnSquareSize,
} from './puzzle.algo';

/**initial puzzle base structure
 * allowed puzzle sizes are 3x3, 4x4, 5x5 (must be a perfect square)
 */
function createBase(size: 9 | 16 | 25): Card[] {
  const dimension = Math.sqrt(size);
  return Array.from({ length: size }, (_, i) => ({
    originalPosition: i,
    isEnabled: false,
    isEmpty: i === size - 1,
    positionX: calculatePosX(i, size),
    positionY: calculatePosY(i, size),
    dimension,
  }));
}

function createMatrix(size: 9 | 16 | 25): Map<number, number[]> {
  return createMatrixAlgorithmBasedOnSquareSize(size);
}

const base = createBase(16);
const matrix = createMatrix(16);

export function shuffleArray(inputArray: Card[]): Card[] {
  // copy the array
  const array = [...inputArray];

  // shuffle the array
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  // return shuffled array
  return array;
}

export function findEmptyIndex(cards: Card[]): number {
  return cards.findIndex((c) => c.isEmpty);
}

export function setAdjacentCards(cards: Card[]): Card[] {
  //reset isEnabled = false
  const _cards = cards.map((d) => {
    d.isEnabled = false;
    return d;
  });

  // find the empty card
  const idxOfEmpty = findEmptyIndex(_cards);

  //enable card indexes
  const enabledCardIndexes = matrix.get(idxOfEmpty);

  //return the new cards
  return cards.map((card, i) => ({
    ...card,
    isEnabled: enabledCardIndexes ? enabledCardIndexes.includes(i) : false,
  }));
}
// Usage
const shuffled = shuffleArray(base);
export const initialPuzzle = setAdjacentCards(shuffled);
