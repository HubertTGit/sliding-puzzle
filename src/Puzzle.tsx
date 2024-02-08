import Card from './Card';
import { ICard } from './util/logic';

interface PuzzleProps {
  puzzle: ICard[];
  onClick: (idx: number) => void;
}

export default function Puzzle({ puzzle, onClick }: PuzzleProps) {
  return (
    <div className="flex flex-wrap w-[300px]">
      {puzzle.map((d, i) => (
        <Card key={i} card={d} index={i} onCardClick={onClick} />
      ))}
    </div>
  );
}
