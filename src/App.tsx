import React, { useState, useEffect } from 'react';
import ReelsFeed from './components/ReelsFeed';
import Sidebar from './components/Sidebar';
import { FileText } from 'lucide-react';
import { fetchReels } from './data/reels';
import { Reel } from './types';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [completedWords, setCompletedWords] = useState(0);
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="h-screen w-full bg-white text-black flex flex-col items-center">
      <main className="flex-1 overflow-hidden w-full max-w-[800px]">
        <ReelsFeed 
          reels={reels} 
          onWordComplete={() => setCompletedWords(prev => prev + 1)}
        />
      </main>
      
      <div className="fixed top-4 right-4 bg-white text-black px-4 py-2 rounded-xl shadow-lg z-20 backdrop-blur-sm border border-black/20">
        <span className="text-sm font-medium">Words Completed: {completedWords}</span>
      </div>

      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-4 left-4 bg-white text-black px-4 py-2 rounded-xl shadow-lg hover:bg-gray-50 transition-all flex items-center gap-2 z-20 backdrop-blur-sm border border-black/20"
      >
        <FileText className="h-5 w-5" />
        <span className="text-sm font-medium">Paste your vocab list</span>
      </button>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </div>
  );
}

export default App;