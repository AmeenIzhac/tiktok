import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface ReelActionsProps {
  likes: number;
  liked: boolean;
  onLike: (isLiked: boolean) => void;
}

const ReelActions: React.FC<ReelActionsProps> = ({ likes, liked, onLike }) => {
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);

  const handleLikeClick = () => {
    setIsLikeAnimating(true);
    onLike(!liked);
    setTimeout(() => setIsLikeAnimating(false), 600);
  };

  const formatLikeCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="py-4 space-y-2">
      <button
        className="flex flex-col items-center"
        onClick={handleLikeClick}
      >
        <Heart
          className={`w-8 h-8 transition-all duration-300 ease-out ${liked ? 'fill-red-500 text-red-500' : 'text-white'} ${
            isLikeAnimating ? 'scale-150' : 'scale-100'
          }`}
        />
      </button>
      <span className="text-xs text-white font-medium">{formatLikeCount(likes)}</span>
    </div>
  );
};

export default ReelActions;