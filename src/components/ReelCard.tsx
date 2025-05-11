import React, { useRef, useState } from 'react';
import { Reel } from '../types';
import VideoPlayer from './VideoPlayer';
import ReelActions from './ReelActions';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface ReelCardProps {
  reel: Reel;
  isActive: boolean;
}

const ReelCard: React.FC<ReelCardProps> = ({ reel, isActive }) => {
  const [likes, setLikes] = useState(reel.likes);
  const [liked, setLiked] = useState(reel.liked);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver({
    target: ref,
    threshold: 0.6,
  });

  const handleLike = (isLiked: boolean) => {
    setLiked(isLiked);
    setLikes(prev => isLiked ? prev + 1 : prev - 1);
  };

  return (
    <div 
      ref={ref} 
      className="relative w-full h-[calc(100vh-8rem)] flex flex-col snap-center snap-always bg-gray-100 rounded-lg overflow-hidden shadow-lg my-4"
    >
      <div className="relative flex-1 bg-black">
        <VideoPlayer 
          videoUrl={reel.videoUrl} 
          isActive={isActive && isVisible} 
        />
        
        {/* User info top */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
          <div className="flex items-center">
            <img 
              src={reel.user.profileImage} 
              alt={reel.user.username} 
              className="w-8 h-8 rounded-full object-cover border border-white"
            />
            <span className="ml-2 text-white font-medium">{reel.user.username}</span>
          </div>
        </div>
        
        {/* Caption and actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex">
          <div className="flex-1 pr-4">
            <p className="text-white text-sm line-clamp-2 mb-2">{reel.caption}</p>
          </div>
          <div>
            <ReelActions 
              likes={likes} 
              liked={liked} 
              onLike={handleLike} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelCard;