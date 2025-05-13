import React from 'react';

const JustOneMinute: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white p-4">
      <h1 className="text-3xl font-bold mb-4">Just One Minute!</h1>
      <p className="text-gray-600 text-center max-w-md">
        Coming soon! Practice speaking for exactly one minute and see how you score based on vocab, hesitation, fluency and pronunciation. Compete against yourself for a highscore!
      </p>
    </div>
  );
};

export default JustOneMinute; 