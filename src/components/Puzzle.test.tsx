import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { PuzzleComponent } from './Puzzle';

describe('test Puzzle component', () => {
  const props = {
    puzzle: [
      {
        originalPosition: 0,
        isEnabled: true,
        isEmpty: false,
        positionX: 0,
        positionY: 0,
        dimension: 3,
      },
      {
        originalPosition: 1,
        isEnabled: false,
        isEmpty: true,
        positionX: -100,
        positionY: 0,
        dimension: 3,
      },
      {
        originalPosition: 2,
        isEnabled: true,
        isEmpty: false,
        positionX: -200,
        positionY: 0,
        dimension: 3,
      },
    ],
    onClick: vi.fn(),
    dimension: 3,
  };

  test('renders the puzzle component basic', async () => {
    render(<PuzzleComponent {...props} />);
    const cmp = screen.getByTestId('puzzle');

    expect(cmp).toBeInTheDocument();
  });

  test('class name is equal grid-cols-${dimension} and dimension is the prop of dimension', () => {
    render(<PuzzleComponent {...props} />);
    const cmp = screen.getByTestId('puzzle');
    // Click on the shuffle button
    expect(props.dimension).toEqual(props.puzzle[0].dimension);
    expect(cmp).toHaveClass(`grid-cols-${props.dimension}`);
  });
});
