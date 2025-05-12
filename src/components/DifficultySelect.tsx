import React from 'react';

interface DifficultySelectProps {
  onSelect: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

const DifficultySelect: React.FC<DifficultySelectProps> = ({ onSelect }) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
      <h1 className="text-3xl font-bold mb-8">Select Difficulty</h1>
      <div className="flex flex-col gap-4 w-full max-w-md px-4">
        <button
          onClick={() => onSelect('easy')}
          className="w-full py-4 px-6 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors text-lg font-medium"
        >
          Easy
        </button>
        <button
          onClick={() => onSelect('medium')}
          className="w-full py-4 px-6 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors text-lg font-medium"
        >
          Medium
        </button>
        <button
          onClick={() => onSelect('hard')}
          className="w-full py-4 px-6 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors text-lg font-medium"
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default DifficultySelect; 