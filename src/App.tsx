import React, { useState, useEffect } from 'react';
import ReelsFeed from './components/ReelsFeed';
import DifficultySelect from './components/DifficultySelect';
import PodcastPractice from './components/PodcastPractice';
import JustOneMinute from './components/JustOneMinute';
import Progress from './components/Progress';
import { fetchReels } from './data/reels';
import { Reel } from './types';
import posthog from 'posthog-js'
// import posthog from './posthog';

// import posthog from 'posthog-js'

// posthog.init(import.meta.env.VITE_POSTHOG_API_KEY, {
//   api_host: 'https://app.posthog.com', 
//   capture_pageview: true,
//   disable_session_recording: false 
// })

posthog.init(import.meta.env.VITE_POSTHOG_API_KEY, {
    api_host: 'https://us.i.posthog.com',
    loaded: (posthog) => {
      if (import.meta.env.DEV) posthog.debug();
    },
    capture_pageview: true, // Tracks pageviews automatically
    capture_performance: true, // Tracks performance
    disable_session_recording: false, // Enables session recording
    session_recording: {
      maskAllInputs: false,
      maskInputOptions: {
          password: true
      }
    }
  });

// export default posthog;

type Tab = 'browse' | 'podcast' | 'justOneMinute' | 'progress';

function App() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('browse');

  // useEffect(() => {
  //   posthog.capture('pageview');
  // }, []);

  useEffect(() => {
    const loadReels = async () => {
      const fetchedReels = await fetchReels();
      setReels(fetchedReels);
      setLoading(false);
    };

    loadReels();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!difficulty) {
    return <DifficultySelect onSelect={setDifficulty} />;
  }

  return (
    <div className="h-screen w-full bg-white text-black flex flex-col items-center">
      {/* Tab Navigation */}
      <div className="w-full max-w-[800px] border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              activeTab === 'browse'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Browse
          </button>
          <button
            onClick={() => setActiveTab('podcast')}
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              activeTab === 'podcast'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Podcast Practice
          </button>
          <button
            onClick={() => setActiveTab('justOneMinute')}
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              activeTab === 'justOneMinute'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Just One Minute!
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              activeTab === 'progress'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Progress
          </button>
        </div>
      </div>

      <main className="flex-1 overflow-hidden w-full max-w-[800px]">
        {activeTab === 'browse' ? (
          <ReelsFeed 
            reels={reels} 
            difficulty={difficulty}
          />
        ) : activeTab === 'podcast' ? (
          <PodcastPractice />
        ) : activeTab === 'justOneMinute' ? (
          <JustOneMinute />
        ) : (
          <Progress />
        )}
      </main>
    </div>
  );
}

export default App;