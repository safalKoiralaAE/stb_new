import React from 'react';
import { Card, Button } from 'flowbite-react';
import { FaPlay, FaRedo, FaTimes } from 'react-icons/fa';

const ResumeNotification = ({ videoTitle, thumbnailUrl, timestamp, onResume, onStartOver, onDismiss }) => {
  // Format the timestamp (e.g., convert seconds to MM:SS format)
  const formatTimestamp = (seconds) => {
    if (!seconds && seconds !== 0) return '--:--';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-20 right-8 z-50 max-w-sm">
      <Card className="bg-gray-900 text-white border-gray-700 shadow-lg">
        <div className="flex items-start space-x-4">
          {thumbnailUrl && (
            <img 
              src={thumbnailUrl} 
              alt={videoTitle || 'Video thumbnail'} 
              className="w-24 h-16 object-cover rounded"
            />
          )}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h5 className="text-lg font-semibold truncate">
                {videoTitle || 'Continue Watching'}
              </h5>
              <Button 
                color="gray" 
                pill 
                size="xs" 
                onClick={onDismiss}
                className="hover:bg-gray-700"
              >
                <FaTimes />
              </Button>
            </div>
            <p className="text-sm text-gray-400 mb-2">
              {timestamp ? `Resume from ${formatTimestamp(timestamp)}` : 'Resume watching?'}
            </p>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                color="blue" 
                onClick={onResume}
                className="flex items-center"
              >
                <FaPlay className="mr-1" /> Resume
              </Button>
              <Button 
                size="sm" 
                color="gray" 
                onClick={onStartOver}
                className="flex items-center"
              >
                <FaRedo className="mr-1" /> Start Over
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResumeNotification;