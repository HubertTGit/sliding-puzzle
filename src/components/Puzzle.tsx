import { CardComponent } from './Card';
import { ICard } from '../utils/logic';

interface PuzzleProps {
  puzzle: ICard[];
  onClick: (idx: number) => void;
}

export const PuzzleComponent = ({ puzzle, onClick }: PuzzleProps) => {
  return (
    <div className="flex flex-wrap w-[300px]">
      {puzzle.map((d, i) => (
        <CardComponent key={i} card={d} index={i} onCardClick={onClick} />
      ))}
    </div>
  );
};
