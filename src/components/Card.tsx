import { ICard } from '../utils/logic';
import classes from './Card.module.scss';

interface CardProps {
  card: ICard;
  onCardClick: (idx: number) => void;
  index: number;
}

export const Card = ({ card, onCardClick, index }: CardProps) => {
  return (
    <div
      style={{
        backgroundPositionX: `${card.positionX}px`,
        backgroundPositionY: `${card.positionY}px`,
      }}
      onClick={() => {
        if (card.isEnabled) {
          onCardClick(index);
        }
      }}
      className={`w-[100px] h-[100px] flex justify-center items-center border rounded-sm ${
        !card.isEmpty && classes.cardbg
      } ${!card.isEmpty && 'bg[center_top_1rem]'} ${
        card.isEmpty && 'bg-transparent'
      } ${card.originalPosition === index && 'text-green'} ${
        card.isEnabled && 'transition-colors hover:text-green-400'
      }`}
    >
      {card.isEmpty ? '' : card.originalPosition}
    </div>
  );
};
