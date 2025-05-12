import React, { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { Flashcard as FlashcardType } from '../types';

interface FlashcardProps {
  card: FlashcardType;
  onComplete: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ card, onComplete }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasBeenCompleted, setHasBeenCompleted] = useState(false);

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (isFlipped) {
      speakText(card.back);
    }
  }, [isFlipped, card.back]);

  const handleFlip = () => {
    if (!isFlipped && !hasBeenCompleted) {
      onComplete();
      setHasBeenCompleted(true);
    }
    setIsFlipped(!isFlipped);
  };

  const handleAudioClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakText(card.back);
  };

  return (
    <div className="flex flex-col">
      <div
        className="w-full aspect-square cursor-pointer perspective-1000"
        onClick={handleFlip}
      >
        <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front side - no audio button */}
          <div className="absolute w-full h-full bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center backface-hidden border-2 border-gray-200">
            <span className="text-3xl sm:text-4xl font-semibold text-center px-4 break-words">{card.front}</span>
          </div>
          
          {/* Back side - with audio button */}
          <div className="absolute w-full h-full bg-blue-500 text-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center backface-hidden rotate-y-180 border-2 border-blue-600">
            <span className="text-3xl sm:text-4xl font-semibold text-center px-4 break-words mb-4">{card.back}</span>
            <button
              onClick={handleAudioClick}
              className="absolute bottom-4 right-4 p-2 hover:bg-opacity-20 hover:bg-black rounded-full transition-colors"
              aria-label="Listen to pronunciation"
            >
              <Volume2 className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;