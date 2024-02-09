import { ICard } from './util/logic';
interface CardProps {
  card: ICard;
  onCardClick: (idx: number) => void;
  index: number;
}

export default function Card({ card, onCardClick, index }: CardProps) {
  return (
    <div
      onClick={() => {
        if (card.isEnabled) {
          onCardClick(index);
        }
      }}
      className={`w-24 h-24 flex justify-center items-center border rounded-sm  ${
        card.isEmpty && 'bg-transparent'
      } ${card.originalPosition === index && 'bg-green-300'} ${
        card.isEnabled && 'transition-colors hover:bg-green-400'
      }`}
    >
      {card.isEmpty ? '' : card.originalPosition + 1}
    </div>
  );
}
