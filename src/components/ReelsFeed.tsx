import React, { useState, useRef, useEffect } from 'react';
import { Reel } from '../types';
import ReelCard from './ReelCard';
import FlashcardRow from './FlashcardRow';
import { flashcardsData } from '../data/flashcards';

interface ReelsFeedProps {
  reels: Reel[];
  difficulty: 'easy' | 'medium' | 'hard';
}

const ReelsFeed: React.FC<ReelsFeedProps> = ({ reels, difficulty }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, clientHeight } = containerRef.current;
      const newIndex = Math.round(scrollTop / clientHeight);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Set initial scroll position to show the first flashcard row
      container.scrollTop = container.clientHeight;
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const totalItems = reels.length + (reels.length - 1); // Reels + Flashcard rows

  return (
    <div 
      ref={containerRef}
      className="h-full overflow-y-auto snap-y snap-mandatory px-4"
    >
      {reels.map((reel, index) => {
        const itemIndex = index * 2;
        return (
          <React.Fragment key={reel.id}>
            <div className="w-full">
              <ReelCard 
                reel={reel} 
                isActive={itemIndex === activeIndex} 
              />
            </div>
            {index < reels.length - 1 && flashcardsData[index] && (
              <FlashcardRow 
                cards={flashcardsData[index]} 
                isActive={itemIndex + 1 === activeIndex}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default ReelsFeed