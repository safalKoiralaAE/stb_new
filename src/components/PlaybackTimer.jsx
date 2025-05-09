import React, { useState } from 'react';
import { Progress } from 'flowbite-react';

const PlaybackTimer = ({ currentTime, totalDuration, onSeek }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [tempTime, setTempTime] = useState(null);

  // Format time from seconds to MM:SS or HH:MM:SS
  const formatTime = (timeInSeconds) => {
    if (!timeInSeconds && timeInSeconds !== 0) return '--:--';
    
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progressPercentage = totalDuration > 0 ? ((isDragging ? tempTime : currentTime) / totalDuration) * 100 : 0;

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = totalDuration * clickPosition;
    
    if (onSeek) {
      onSeek(newTime);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setTempTime(currentTime);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    const progressBar = e.currentTarget.parentElement;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setTempTime(totalDuration * clickPosition);
  };

  const handleDragEnd = () => {
    if (isDragging && onSeek) {
      onSeek(tempTime);
    }
    setIsDragging(false);
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <div 
        className="w-full cursor-pointer relative"
        onClick={handleProgressClick}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <Progress
          progress={progressPercentage}
          color="red"
          size="sm"
          className="rounded-full"
        />
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full transform -translate-x-1/2 cursor-grab active:cursor-grabbing"
          style={{ left: `${progressPercentage}%` }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        />
      </div>
      <div className="flex justify-between text-xs text-white">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(totalDuration)}</span>
      </div>
    </div>
  );
};

export default PlaybackTimer;