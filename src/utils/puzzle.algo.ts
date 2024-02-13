import { CARD_SIZE } from './puzzle.util';

export const calculatePosX = (idx: number, size: number): number => {
  // divide by the row length event example size 9 = 3x3..
  const dimension = Math.sqrt(size);
  //get the remainder of the division and use it to offset horizontally by multiplying by the card size
  const columnPosition = idx % dimension;

  const result = columnPosition * CARD_SIZE * -1;
  //offset horizontally
  return result === 0 ? 0 : result;
};

export const calculatePosY = (idx: number, size: number): number => {
  // divide by the column length event example size 9 = 3x3..
  const dimension = Math.sqrt(size);
  //floor by division to get the column position
  const rowPosition = Math.floor(idx / dimension);

  const result = rowPosition * CARD_SIZE * -1;
  //using the column position offset vertically
  return result === 0 ? 0 : result;
};

/**
 * Define a function createMatrix that takes a size as an argument.
 * - Calculate the square root of the size to get the length of the sides of the puzzle.
 * - Initialize an empty Map.
 * - Loop over each cell in the puzzle (from 0 to size - 1).
 * - For each cell, calculate its adjacent cells:
 * - If the cell is not on the left edge, add the cell to its left (cell - 1).
 * - If the cell is not on the right edge, add the cell to its right (cell + 1).
 * - If the cell is not on the top edge, add the cell above it (cell - sideLength).
 * - If the cell is not on the bottom edge, add the cell below it (cell + sideLength).
 * - Add the cell and its adjacent cells to the Map.
 * - After the loop, return the Map.
 * @param size - the size of the puzzle (must be square number like 9, 16, 25, etc.)
 * @returns a Map of cell indices and their adjacent cells  (Map<number, number[]>)
 */

export const createMatrixAlgorithmBasedOnSquareSize = (
  size: number
): Map<number, number[]> => {
  // Calculate the length of the sides of the puzzle
  const sideLength = Math.sqrt(size);

  // Check if the size is a perfect square
  if (sideLength !== Math.floor(sideLength)) {
    throw new Error('Size must be a perfect square');
  }
  // Initialize an empty Map
  const matrix = new Map();

  // Loop over each cell in the puzzle
  for (let cell = 0; cell < size; cell++) {
    // Calculate the adjacent cells for the current cell
    const adjacentCells = [];

    // If the cell is not on the left edge, add the cell to its left
    if (cell % sideLength !== 0) {
      // not on the left edge
      adjacentCells.push(cell - 1);
    }

    // If the cell is not on the right edge, add the cell to its right
    if ((cell + 1) % sideLength !== 0) {
      // not on the right edge
      adjacentCells.push(cell + 1);
    }

    // If the cell is not on the top edge, add the cell above it
    if (cell >= sideLength) {
      // not on the top edge
      adjacentCells.push(cell - sideLength);
    }

    // If the cell is not on the bottom edge, add the cell below it
    if (cell < size - sideLength) {
      // not on the bottom edge
      adjacentCells.push(cell + sideLength);
    }

    // Add the cell and its adjacent cells to the Map
    matrix.set(cell, adjacentCells);
  }

  return matrix;
};
