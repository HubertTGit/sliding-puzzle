import { createMatrix } from './puzzle.util';
import { calculatePosX, calculatePosY } from './puzzle.algo';

describe('Puzzle Algorithm Tests', () => {
  describe('matrix for 3X3 (9) set', () => {
    const matrix = createMatrix(9);

    it('should have 9 keys', () => {
      expect(matrix).toBeDefined();
      expect(matrix.size).toEqual(9);
      expect(matrix).toBeInstanceOf(Map);
    });

    it('should have 2 adjacent cells for the first cell', () => {
      const adjacentCells = matrix.get(0);
      expect(adjacentCells).toBeDefined();
      expect(adjacentCells).toHaveLength(2);
    });

    it('should have 3 adjacent cells for the second cell', () => {
      const adjacentCells = matrix.get(1);
      expect(adjacentCells).toBeDefined();
      expect(adjacentCells).toHaveLength(3);
    });

    it('should have 4 adjacent cells for the fitfth cell', () => {
      const adjacentCells = matrix.get(4);
      expect(adjacentCells).toBeDefined();
      expect(adjacentCells).toHaveLength(4);
    });

    /**
     * here is the matrix for 3X3 where empty cell is position 4 (0,1,2,3,x,5,6,7,8)
     * as array it will be [0,1,2,3,4,5,6,7,8]
     *  [0 (1) 2]
     *  [(3) x (5)]
     *  [6 (7) 8]
     *
     * x is where the empty cell is
     */
    it('should have value of the adjancent cell on 4th position of [1,3,5,7]', () => {
      const adjacentCells = matrix.get(4);
      expect(adjacentCells?.sort()).toStrictEqual([1, 3, 5, 7]);
    });
  });

  describe('matrix for 5X5 (25) set', () => {
    const matrix = createMatrix(25);

    it('should have 25 keys', () => {
      expect(matrix).toBeDefined();
      expect(matrix.size).toEqual(25);
      expect(matrix).toBeInstanceOf(Map);
    });

    it('should have 2 adjacent cells for the first cell', () => {
      const adjacentCells = matrix.get(0);
      expect(adjacentCells).toBeDefined();
      expect(adjacentCells).toHaveLength(2);
    });

    it('should have 3 adjacent cells for the 11th cell', () => {
      const adjacentCells = matrix.get(10);
      expect(adjacentCells).toBeDefined();
      expect(adjacentCells).toHaveLength(3);
    });

    it('should have 4 adjacent cells for the 13th cell', () => {
      const adjacentCells = matrix.get(12);
      expect(adjacentCells).toBeDefined();
      expect(adjacentCells).toHaveLength(4);
    });

    /**
     * here is the matrix for 5X5 where empty cell is position 13 (0,1,2,3,x,5,6,7,8...24)
     * as array it will be [0,1,2,3,4,5,6,7,8,... 24]
     * [0 1 2 3 4]
     * [5 6 (7) 8 9]
     * [10 (11) x (13) 14]
     * [15 16 (17) 18 19]
     * [20 21 22 23 24]
     *
     * x is where the empty cell is
     */
    it('should have value of the adjancent cell for the 12th position of [7,11,13,17]', () => {
      const adjacentCells = matrix.get(12);
      console.log(adjacentCells);
      expect(adjacentCells?.sort((a, b) => a - b)).toStrictEqual([
        7, 11, 13, 17,
      ]);
    });
  });

  describe('x/y position of image based on 3x3 matrix with card size = 100px, (3x3) = 300x300px image', () => {
    const size = 9;

    it('should have x position 0 for the first cell', () => {
      const x = calculatePosX(0, size);
      expect(x).toEqual(0);
    });

    it('should have x position -200 for the 3rd cell', () => {
      const x = calculatePosX(2, size);
      expect(x).toEqual(-200);
    });

    it('should have y position 0 for the first cell', () => {
      const x = calculatePosY(0, size);
      expect(x).toEqual(0);
    });

    it('should have y position -200 for the 3rd cell', () => {
      const x = calculatePosY(2, size);
      expect(x).toEqual(0);
    });
  });

  describe('x/y position of image based on 5x5 matrix with card size = 100px, (5x5) = 500x500px image', () => {
    const size = 25;

    it('should have x position 0 for the first cell', () => {
      const x = calculatePosX(0, size);
      expect(x).toEqual(0);
    });

    it('should have x position -200 for the 4rd cell', () => {
      const x = calculatePosX(4, size);
      expect(x).toEqual(-400);
    });

    it('should have x position -200 for the 17th cell', () => {
      const x = calculatePosX(17, size);
      expect(x).toEqual(-200);
    });

    it('should have y position -300 for the 17th cell', () => {
      const x = calculatePosY(17, size);
      expect(x).toEqual(-300);
    });
  });
});
