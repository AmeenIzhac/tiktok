import React from 'react';
import { Flashcard as FlashcardType } from '../types';
import Flashcard from './Flashcard';

interface FlashcardRowProps {
  cards: FlashcardType[];
  isActive: boolean;
  onWordComplete: () => void;
}

const FlashcardRow: React.FC<FlashcardRowProps> = ({ cards, isActive, onWordComplete }) => {
  return (
    <div className="min-h-[calc(100vh-8rem)] w-full snap-center snap-always my-4 flex items-center">
      <div className="grid grid-cols-3 gap-3 w-full px-2">
        {cards.map((card) => (
          <div key={card.id}>
            <Flashcard card={card} onComplete={onWordComplete} />
          </div>
        ))}
        {/* Add placeholder cards if less than 3 cards */}
        {Array.from({ length: Math.max(0, 3 - cards.length) }).map((_, index) => (
          <div key={`placeholder-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default FlashcardRow;