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
  const [isEasy, setIsEasy] = useState<boolean | null>(null);
  const [showButtons, setShowButtons] = useState(true);

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

  const handleFeedback = (e: React.MouseEvent, easy: boolean) => {
    e.stopPropagation();
    setIsEasy(easy);
    setShowButtons(false);
  };

  const getCardColor = () => {
    if (isEasy === null) return 'bg-blue-500 border-blue-600';
    return isEasy ? 'bg-green-500 border-green-600' : 'bg-red-500 border-red-600';
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
          <div className={`absolute w-full h-full ${getCardColor()} text-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center backface-hidden rotate-y-180 border-2`}>
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
      
      {/* Feedback buttons */}
      {isFlipped && showButtons && (
        <div className="flex justify-center gap-4 mt-4 transition-all duration-300">
          <button
            onClick={(e) => handleFeedback(e, true)}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            Easy
          </button>
          <button
            onClick={(e) => handleFeedback(e, false)}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Hard
          </button>
        </div>
      )}
    </div>
  );
};

export default Flashcard;