export interface ICard {
  originalPosition: number;
  isEnabled: boolean;
  isEmpty?: boolean;
}

const base: ICard[] = [
  { originalPosition: 0, isEnabled: false },
  { originalPosition: 1, isEnabled: false },
  { originalPosition: 2, isEnabled: false },
  { originalPosition: 3, isEnabled: false },
  { originalPosition: 4, isEnabled: false },
  { originalPosition: 5, isEnabled: false },
  { originalPosition: 6, isEnabled: false },
  { originalPosition: 7, isEnabled: false },
  { originalPosition: 8, isEnabled: false, isEmpty: true },
];

//matrix for 3x3 grid
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

//card shuffler
export function shuffleArray(inputArray: ICard[]): ICard[] {
  const array = [...inputArray];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

//find empty card index helper function
export function findEmptyIndex(cards: ICard[]): number {
  return cards.findIndex((c) => c.isEmpty);
}

export function setAdjacentCards(cards: ICard[]): ICard[] {
  //reset isEnabled = false
  const _cards = cards.map((d) => {
    d.isEnabled = false;
    return d;
  });

  //find the index of the empty card
  const idxOfEmpty = findEmptyIndex(_cards);

  //get the adjacent card indexes
  const enabledCardIndexes = matrix.get(idxOfEmpty);

  //set enable of adjacent cards to true
  return _cards.map((d, i) => {
    if (enabledCardIndexes.includes(i)) {
      d.isEnabled = true;
    }
    return d;
  });
}
// Usage
const shuffled = shuffleArray(base);
export const initialPuzzle = setAdjacentCards(shuffled);
