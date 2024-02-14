import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import React from 'react';
import { createBase } from './utils/puzzle.util';
import { vi } from 'vitest';

describe('test App component', () => {
  test('renders the App component basic', async () => {
    render(<App />);
    const cmp = screen.getByTestId('app');
    const shuffler = screen.getByTestId('shuffler');
    const select = screen.getByRole('combobox');
    expect(cmp).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(shuffler).toBeInTheDocument();
  });

  test('test change difficulties', () => {
    render(<App />);
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: '25' } });

    expect(select).toHaveValue('25');

    const puzzle = screen.getByTestId('puzzle');

    expect(puzzle).toBeInTheDocument();
    expect(puzzle.childElementCount).toBe(25);

    fireEvent.change(select, { target: { value: '49' } });

    const cards = screen.getAllByTestId('card');

    expect(puzzle.childElementCount).toBe(49);
    expect(cards.length).toBe(49);
  });

  test('test if shuffling works', () => {
    render(<App />);
    const shuffler = screen.getByTestId('shuffler');

    fireEvent.click(shuffler);

    const cards = screen.getAllByTestId('card');
    const _first: unknown[] = [];
    cards.forEach((f) => {
      _first.push(f.textContent?.length && +f.textContent);
    });

    fireEvent.click(shuffler);

    const _second: unknown[] = [];
    cards.forEach((f) => {
      _second.push(f.textContent?.length && +f.textContent);
    });

    expect(_first).not.toStrictEqual(_second);
  });
});
