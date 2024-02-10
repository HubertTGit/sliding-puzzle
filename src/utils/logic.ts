export interface ICard {
  originalPosition: number;
  isEnabled: boolean;
  isEmpty?: boolean;
  positionX?: number;
  positionY?: number;
}

const CARD_SIZE = 100;

// allowed puzzle sizes are 3x3, 4x4, 5x5
function createBase(size: 9 | 16 | 25): ICard[] {
  return Array.from({ length: size }, (_, i) => ({
    originalPosition: i,
    isEnabled: false,
    isEmpty: i === size - 1,
    positionX: calculatePosX(i, size),
    positionY: calculatePosY(i, size),
  }));
}

function calculatePosX(idx: number, size: number): number {
  const rowLength = Math.sqrt(size);
  const multiplication = idx % rowLength;
  //offset horizontally
  return multiplication * CARD_SIZE * -1;
}

function calculatePosY(idx: number, size: number): number {
  const colLength = Math.sqrt(size);
  const row = Math.floor(idx / colLength);
  //offset vertically
  return row * CARD_SIZE * -1;
}

function createMatrix<T>(): Map<T, T[]> {
  const matrix = new Map();
  matrix.set(0, [1, 3]);
  matrix.set(1, [0, 2, 4]);
  matrix.set(2, [1, 5]);
  matrix.set(3, [0, 4, 6]);
  matrix.set(4, [1, 3, 5, 7]);
  matrix.set(5, [2, 4, 8]);
  matrix.set(6, [3, 7]);
  matrix.set(7, [4, 6, 8]);
  matrix.set(8, [5, 7]);
  return matrix;
}

const base = createBase(9);
const matrix = createMatrix<number>();

export function shuffleArray(inputArray: ICard[]): ICard[] {
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

export function findEmptyIndex(cards: ICard[]): number {
  return cards.findIndex((c) => c.isEmpty);
}

export function setAdjacentCards(cards: ICard[]): ICard[] {
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
