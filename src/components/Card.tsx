import { Card } from '../interfaces/puzzle.interface';
import { CARD_SIZE } from '../utils/puzzle.util';
import BGIMAGE from './../assets/stuck.jpg';

interface CardProps {
  card: Card;
  onCardClick: (idx: number) => void;
  index: number;
}

export const CardComponent = ({ card, onCardClick, index }: CardProps) => {
  return (
    <div
      style={{
        backgroundImage: `url(${card.isEmpty ? '' : BGIMAGE})`,
        backgroundPositionX: `${card.positionX}px`,
        backgroundPositionY: `${card.positionY}px`,
        height: `${CARD_SIZE}px`,
        width: `${CARD_SIZE}px`,
        backgroundSize: `${CARD_SIZE * card.dimension}px ${
          CARD_SIZE * card.dimension
        }px`,
      }}
      onClick={() => {
        if (card.isEnabled) {
          onCardClick(index);
        }
      }}
      className={`flex justify-center items-center border rounded-sm  ${
        !card.isEmpty && ' hover:text-black hover:cursor-grab'
      } ${card.isEmpty && 'bg-transparent'} ${
        card.originalPosition === index && 'text-green'
      } ${card.isEnabled && 'transition-colors'}`}
    >
      {card.isEmpty ? '' : card.originalPosition + 1}
    </div>
  );
};
