import { CardComponent } from './Card';
import { ICard } from '../utils/logic';

interface PuzzleProps {
  puzzle: ICard[];
  onClick: (idx: number) => void;
}

export const PuzzleComponent = ({ puzzle, onClick }: PuzzleProps) => {
  return (
    <div className="grid-cols-3 grid">
      {puzzle.map((d, i) => (
        <CardComponent key={i} card={d} index={i} onCardClick={onClick} />
      ))}
    </div>
  );
};
