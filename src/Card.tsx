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
      className={`w-24 h-24 flex justify-center items-center border rounded-sm ${
        card.isEnabled
          ? 'bg-blue-500 cursor-pointer'
          : 'bg-gray-300 text-blue-700'
      } ${card.isEmpty && 'bg-transparent'}`}
    >
      {card.isEmpty ? '' : card.originalPosition + 1}
    </div>
  );
}
