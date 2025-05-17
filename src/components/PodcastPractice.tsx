import React, { useState } from 'react';
import { Play, Square } from 'lucide-react';
import { startPodcast, stopPodcast } from '../Vapi';

const PodcastPractice: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async () => {
    try {
      setIsLoading(true);
      const success = await startPodcast();
      if (success) {
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Failed to start podcast:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStop = async () => {
    try {
      setIsLoading(true);
      const success = await stopPodcast();
      if (success) {
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Failed to stop podcast:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white p-4">
      <h1 className="text-3xl font-bold mb-4">Podcast Practice</h1>
      <p className="text-gray-600 text-center max-w-md mb-8">
        This section will help you practice your language skills through engaging podcast content.
      </p>

      <div className="flex gap-4">
        <button
          onClick={handleStart}
          disabled={isPlaying || isLoading}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            isPlaying || isLoading
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
          ) : (
            <Play className="h-5 w-5" />
          )}
          Start
        </button>
        <button
          onClick={handleStop}
          disabled={!isPlaying || isLoading}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            !isPlaying || isLoading
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
          ) : (
            <Square className="h-5 w-5" />
          )}
          Stop
        </button>
      </div>
    </div>
  );
};

export default PodcastPractice; 