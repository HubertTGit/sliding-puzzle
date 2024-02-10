export interface ICard {
  originalPosition: number;
  isEnabled: boolean;
  isEmpty?: boolean;
  positionX?: number;
  positionY?: number;
}

export const CARD_SIZE = 100;

/**initial puzzle base structure
 * allowed puzzle sizes are 3x3, 4x4, 5x5 (must be a perfect square)
 */
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
  // divide by the row length event example size 9 = 3x3..
  const dimension = Math.sqrt(size);
  //get the remainder of the division and use it to offset horizontally by multiplying by the card size
  const columnPosition = idx % dimension;
  //offset horizontally
  return columnPosition * CARD_SIZE * -1;
}

function calculatePosY(idx: number, size: number): number {
  // divide by the column length event example size 9 = 3x3..
  const dimension = Math.sqrt(size);
  //floor by division to get the column position
  const rowPosition = Math.floor(idx / dimension);
  //using the column position offset vertically
  return rowPosition * CARD_SIZE * -1;
}

function createMatrix<T>(size: 9 | 16 | 25): Map<T, T[]> {
  //TODO:calculate the matrix based in size which is 3x3, 4x4, 5x5
  // divide by the row length event example size 9 = 3x3..
  const dimension = Math.sqrt(size);

  Array.from({ length: size }, (_, i) => {
    const colPosition = i % dimension;
    const rowPosition = Math.floor(i / dimension);
    const lastRowOrColumn = dimension - 1;

    //top left corner or top right corner or bottom left corner or bottom right corner
    if (
      (colPosition === 0 && rowPosition === 0) || //top left corner
      (colPosition === lastRowOrColumn && rowPosition === 0) || //top right corner
      (colPosition === 0 && rowPosition === lastRowOrColumn) || //bottom left corner
      (colPosition === lastRowOrColumn && rowPosition === lastRowOrColumn) //bottom right corner
    ) {
      // top left corner
      if (colPosition === 0 && rowPosition === 0) {
        const targetmatrix = [colPosition + 1, (rowPosition + 1) * dimension];
        console.log('corner', targetmatrix);
      }

      // top right corner
      if (colPosition === lastRowOrColumn && rowPosition === 0) {
        const targetmatrix = [
          colPosition - 1,
          lastRowOrColumn * lastRowOrColumn + 1,
        ];
        console.log('corner', targetmatrix);
      }

      // bottom left corner
      if (colPosition === 0 && rowPosition === lastRowOrColumn) {
        const targetmatrix = [
          lastRowOrColumn + 1,
          lastRowOrColumn * dimension + 1,
        ];
        console.log('corner', targetmatrix);
      }

      // bottom right corner
      if (colPosition === lastRowOrColumn && rowPosition === lastRowOrColumn) {
        const targetmatrix = [
          lastRowOrColumn * dimension - 1,
          lastRowOrColumn * dimension + 1,
        ];
        console.log('corner', targetmatrix);
      }
    }

    //top row or left column or right column or bottom row
    if (
      (rowPosition === 0 &&
        colPosition !== 0 &&
        colPosition !== lastRowOrColumn) || //top row
      (colPosition === 0 &&
        rowPosition !== 0 &&
        rowPosition !== lastRowOrColumn) || //left column
      (colPosition === lastRowOrColumn &&
        rowPosition !== 0 &&
        rowPosition !== lastRowOrColumn) || //right column
      (rowPosition === lastRowOrColumn &&
        colPosition !== 0 &&
        colPosition !== lastRowOrColumn) //bottom row
    ) {
      console.log('wall', 3);
    }

    //middle
    if (
      rowPosition !== 0 &&
      colPosition !== 0 &&
      rowPosition !== lastRowOrColumn &&
      colPosition !== lastRowOrColumn &&
      size > 1
    ) {
      console.log('middle', 4);
    }
  });

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
const matrix = createMatrix<number>(9);

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
