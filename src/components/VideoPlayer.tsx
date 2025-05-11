import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  isActive: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && !isPlaying) {
        videoRef.current.play().catch(() => {
          // Autoplay prevented by browser
          setIsPlaying(false);
        });
        setIsPlaying(true);
      } else if (!isActive && isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive, isPlaying]);

  useEffect(() => {
    const updateProgress = () => {
      if (videoRef.current) {
        const { currentTime, duration } = videoRef.current;
        setProgress((currentTime / duration) * 100);
      }
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('timeupdate', updateProgress);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          // Handle play error
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoClick = () => {
    setShowControls(true);
    setTimeout(() => setShowControls(false), 3000);
    togglePlay();
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        loop
        playsInline
        onClick={handleVideoClick}
      />
      
      {/* Video progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
        <div 
          className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Video controls */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <button 
          className="bg-black bg-opacity-50 p-3 rounded-full"
          onClick={togglePlay}
        >
          {isPlaying ? 
            <Pause className="w-10 h-10 text-white" /> : 
            <Play className="w-10 h-10 text-white" />
          }
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;