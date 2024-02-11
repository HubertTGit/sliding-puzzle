import { Card } from '../interfaces/puzzle.interface';
import { CardComponent } from './Card';

interface PuzzleProps {
  puzzle: Card[];
  onClick: (idx: number) => void;
  dimension: number;
}

export const PuzzleComponent = ({
  puzzle,
  onClick,
  dimension,
}: PuzzleProps) => {
  const css = `grid grid-cols-${dimension}`;

  return (
    <div className="flex justify-center items-center">
      <div className={css}>
        {puzzle.map((d, i) => (
          <CardComponent key={i} card={d} index={i} onCardClick={onClick} />
        ))}
      </div>
    </div>
  );
};
