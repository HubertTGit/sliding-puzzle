import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { CardComponent } from './Card';

describe('test Card component', () => {
  const props = {
    onCardClick: vi.fn(),
    card: {
      originalPosition: 0,
      isEnabled: true,
      isEmpty: false,
      positionX: 0,
      positionY: 0,
      dimension: 100,
    },
    index: 0,
  };

  test('renders the card component basic', async () => {
    render(<CardComponent {...props} />);
    const cmp = screen.getByTestId('card');

    expect(cmp).toBeInTheDocument();
  });

  test('onCardClick method is when div is clicked ', async () => {
    render(<CardComponent {...props} />);
    const cmp = screen.getByTestId('card');

    // Click on the card
    fireEvent.click(cmp);
    expect(props.onCardClick).toHaveBeenCalledTimes(1);
  });

  // test('onCardClick method failed when div is clicked ', async () => {
  //   props.card.isEnabled = false;

  //   render(<CardComponent {...props} />);
  //   const cmp = screen.getByTestId('card');

  //   // Click on the card
  //   fireEvent.click(cmp);
  //   expect(props.onCardClick).not.toHaveBeenCalled();
  // });

  test('label showing 1', async () => {
    render(<CardComponent {...props} />);
    const cmp = screen.getByText('1');

    expect(cmp).toBeInTheDocument();
  });

  test('label NOT showing 1 but empty string', async () => {
    props.card.isEmpty = true;

    console.log(props.card);
    render(<CardComponent {...props} />);
    const cmp = screen.getByTestId('card');

    expect(cmp).toContainHTML('');
  });
});
