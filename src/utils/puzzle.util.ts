import { Card } from '../interfaces/puzzle.interface';
import {
  calculatePosX,
  calculatePosY,
  createMatrixAlgorithmBasedOnSquareSize,
} from './puzzle.algo';

export const INITIAL_SIZE = 9;

/**initial puzzle base structure
 * allowed puzzle sizes are 3x3, 4x4, 5x5 (must be a perfect square)
 */
function createBase(size: number): Card[] {
  const dimension = Math.sqrt(size);
  return Array.from({ length: size }, (_, i) => ({
    originalPosition: i,
    isEnabled: false,
    isEmpty: i === size - 1, //set last card as empty
    positionX: calculatePosX(i, size),
    positionY: calculatePosY(i, size),
    dimension,
  }));
}

function createMatrix(size: number): Map<number, number[]> {
  return createMatrixAlgorithmBasedOnSquareSize(size);
}
export const initial_matrix = createMatrix(INITIAL_SIZE);

export function shuffleArray(size: number): Card[] {
  const base = createBase(size);

  // copy the array
  const array = [...base];

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

export function setAdjacentCards(
  cards: Card[],
  matrix: Map<number, number[]>
): Card[] {
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
const shuffled = shuffleArray(INITIAL_SIZE);
export const initialPuzzle = setAdjacentCards(shuffled, initial_matrix);
