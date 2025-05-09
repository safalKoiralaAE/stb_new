import React, { useState } from 'react';
import { Progress } from 'flowbite-react';

const ProgressBar = ({ progress, bufferProgress, duration, currentTime, onSeek, className }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [hoverPosition, setHoverPosition] = useState(null);

  // Format time from seconds to MM:SS
  const formatTime = (timeInSeconds) => {
    if (typeof timeInSeconds !== 'number' || isNaN(timeInSeconds)) {
      return '00:00';
    }
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const position = ((e.clientX - rect.left) / rect.width) * 100;
    setHoverPosition(Math.max(0, Math.min(100, position)));
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setHoverPosition(null);
    }
  };

  const handleClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const seekTime = clickPosition * duration;
    onSeek && onSeek(seekTime);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = (e) => {
    if (isDragging) {
      handleClick(e);
      setIsDragging(false);
    }
  };

  // Calculate the hover time based on hover position
  const hoverTime = hoverPosition !== null ? (hoverPosition / 100) * duration : null;

  return (
    <div className={`relative ${className || ''}`}>
      <div 
        className="relative h-2 cursor-pointer group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
      >
        {/* Buffer progress */}
        <div className="absolute w-full h-full bg-gray-700 rounded-full">
          {bufferProgress && (
            <div 
              className="absolute h-full bg-gray-500 rounded-full" 
              style={{ width: `${Math.min(100, bufferProgress)}%` }}
            ></div>
          )}
        </div>
        
        {/* Actual progress */}
        <Progress 
          progress={progress || 0} 
          color="red"
          size="sm"
          className="z-10"
        />
        
        {/* Hover tooltip */}
        {hoverPosition !== null && (
          <div 
            className="absolute bottom-full mb-2 bg-black text-white text-xs px-2 py-1 rounded transform -translate-x-1/2"
            style={{ left: `${hoverPosition}%` }}
          >
            {formatTime(hoverTime)}
          </div>
        )}
        
        {/* Hover indicator line */}
        {hoverPosition !== null && (
          <div 
            className="absolute h-full w-0.5 bg-white opacity-70 transform -translate-x-1/2 z-20"
            style={{ left: `${hoverPosition}%` }}
          ></div>
        )}
      </div>
      
      {/* Time display */}
      <div className="flex justify-between text-xs text-white mt-1">
        <span>{formatTime(currentTime || 0)}</span>
        <span>{formatTime(duration || 0)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;