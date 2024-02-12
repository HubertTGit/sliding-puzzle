import {
  createBase,
  createMatrix,
  shuffleArray,
  findEmptyIndex,
  setAdjacentCards,
} from './puzzle.util';

describe('Puzzle Utils', () => {
  describe('createBase', () => {
    it('should create a base structure with the specified size that is a perfect square eg. 3x3 4x4...', () => {
      try {
        const base = createBase(9);
        expect(base).toBeDefined();

        createBase(10);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('createMatrix', () => {
    it('should create a mathematical matrix of the puzzle with the specified size eg. 3x3 4x4...', () => {
      const matrix = createMatrix(9);

      expect(matrix.size).toEqual(9);
      matrix.forEach((value, key) => {
        expect(value).toBeDefined();
        expect(key).toBeDefined();
      });

      expect(matrix.get(0)?.length).toEqual(2);
      expect(matrix.get(1)?.length).toEqual(3);
      expect(matrix.get(2)?.length).toEqual(2);
      expect(matrix.get(3)?.length).toEqual(3);
      expect(matrix.get(4)?.length).toEqual(4);
      expect(matrix.get(5)?.length).toEqual(3);
      expect(matrix.get(6)?.length).toEqual(2);
      expect(matrix.get(7)?.length).toEqual(3);
      expect(matrix.get(8)?.length).toEqual(2);
    });
  });

  describe('shuffleArray', () => {
    it('should shuffle the array of cards', () => {
      const size = 9;
      const cards = createBase(size);
      const shuffled = shuffleArray(9);
      expect(shuffled).toHaveLength(cards.length);
      expect(shuffled).not.toEqual(cards);
    });
  });

  describe('findEmptyIndex', () => {
    it('should find the index of the empty card in the list of cards', () => {
      const cards = createBase(9);
      const emptyIndex = findEmptyIndex(cards);
      expect(emptyIndex).toBeGreaterThanOrEqual(0);
      expect(emptyIndex).toBeLessThan(cards.length);
    });
  });

  describe('setAdjacentCards', () => {
    it('should set the adjacent cards based on the mathematical matrix', () => {
      const size = 9;
      const cards = createBase(size);
      const matrix = createMatrix(size);
      const adjacentCards = setAdjacentCards(cards, matrix);
      expect(adjacentCards).toHaveLength(cards.length);
      //TODO: Add more assertions as needed
    });
  });
});
