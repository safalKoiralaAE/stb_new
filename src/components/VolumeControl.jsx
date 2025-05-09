import React, { useState } from 'react';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { Tooltip, Dropdown } from 'flowbite-react';

const VolumeControl = ({ volume, isMuted, onVolumeChange, onMuteToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleVolumeClick = () => {
    setIsOpen(!isOpen);
  };

  const handleVolumeChange = (e) => {
    if (onVolumeChange) {
      onVolumeChange(Number(e.target.value));
    }
  };

  const handleMuteToggle = () => {
    if (onMuteToggle) {
      onMuteToggle();
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleVolumeClick}
        className="p-2 text-white hover:bg-gray-700 rounded-full transition-colors duration-200"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        <Tooltip content={isMuted ? "Unmute" : "Mute"}>
          {isMuted ? (
            <HiVolumeOff className="text-xl" />
          ) : (
            <HiVolumeUp className="text-xl" />
          )}
        </Tooltip>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 rounded-lg p-3 shadow-lg z-10 w-40">
          <div className="flex flex-col gap-2">
            <button
              onClick={handleMuteToggle}
              className="text-white hover:text-gray-300"
            >
              {isMuted ? "Unmute" : "Mute"}
            </button>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full accent-blue-500"
                disabled={isMuted}
              />
              <span className="text-white text-sm">
                {isMuted ? 0 : Math.round(volume)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolumeControl;
