import { ICard, CARD_SIZE } from '../utils/logic';
import classes from './Card.module.scss';

interface CardProps {
  card: ICard;
  onCardClick: (idx: number) => void;
  index: number;
}

export const CardComponent = ({ card, onCardClick, index }: CardProps) => {
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
      className={`w-[${CARD_SIZE}px] h-[${CARD_SIZE}px] flex justify-center items-center border rounded-sm ${
        !card.isEmpty && classes.cardbg
      } ${!card.isEmpty && ' hover:text-black hover:cursor-grab'} ${
        card.isEmpty && 'bg-transparent'
      } ${card.originalPosition === index && 'text-green'} ${
        card.isEnabled && 'transition-colors'
      }`}
    >
      {card.isEmpty ? '' : card.originalPosition + 1}
    </div>
  );
};
