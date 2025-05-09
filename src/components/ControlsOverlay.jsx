import React, { useState, useEffect, useRef } from 'react';
import { Button, Progress, Dropdown, Tooltip } from 'flowbite-react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaCog, FaExpand, FaCompress, FaClosedCaptioning } from 'react-icons/fa';

const ControlsOverlay = ({ 
  isPlaying = false, 
  duration = 0, 
  currentTime = 0, 
  volume = 1, 
  isMuted = false, 
  quality = 'Auto', 
  subtitlesEnabled = false, 
  audioTrack = 'English', 
  isFullScreen = false,
  onPlayPause = () => {}, 
  onSeek = () => {}, 
  onVolumeChange = () => {}, 
  onMuteToggle = () => {}, 
  onQualityChange = () => {}, 
  onSubtitleToggle = () => {}, 
  onSubtitleChange = () => {}, 
  onAudioTrackChange = () => {}, 
  onFullScreenToggle = () => {} 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsTab, setSettingsTab] = useState('quality'); // 'quality', 'subtitles', 'audio'
  const hideTimeout = useRef(null);
  
  // Format time (seconds) to MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Auto-hide controls after inactivity
  useEffect(() => {
    const handleActivity = () => {
      setIsVisible(true);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      hideTimeout.current = setTimeout(() => setIsVisible(false), 3000);
    };

    document.addEventListener('mousemove', handleActivity);
    document.addEventListener('click', handleActivity);
    document.addEventListener('keydown', handleActivity);

    // Initial timeout
    handleActivity();

    return () => {
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('click', handleActivity);
      document.removeEventListener('keydown', handleActivity);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  // Reset settings panel when controls hide
  useEffect(() => {
    if (!isVisible) {
      setShowSettings(false);
      setShowVolumeSlider(false);
    }
  }, [isVisible]);

  // Handle progress bar interaction
  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    onSeek(position * duration);
  };

  // Quality options with data usage info
  const qualityOptions = [
    { label: 'Auto', value: 'Auto', usage: 'Adapts to your connection' },
    { label: '4K', value: '4K', usage: '~7.2 GB/hr' },
    { label: '1080p', value: '1080p', usage: '~3.0 GB/hr' },
    { label: '720p', value: '720p', usage: '~1.5 GB/hr' },
    { label: '480p', value: '480p', usage: '~0.7 GB/hr' }
  ];

  // Subtitle options
  const subtitleOptions = [
    { label: 'Off', value: 'off' },
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' }
  ];

  // Audio track options
  const audioOptions = [
    { label: 'English (5.1 Surround)', value: 'en-5.1' },
    { label: 'English (Stereo)', value: 'en-stereo' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' }
  ];

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300">
      {/* Progress bar */}
      <div className="w-full mb-2" onClick={handleProgressClick}>
        <Progress 
          progress={duration > 0 ? (currentTime / duration) * 100 : 0} 
          color="red" 
          className="cursor-pointer"
        />
      </div>
      
      {/* Time indicators */}
      <div className="flex justify-between text-xs text-white mb-2">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      
      {/* Control buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Play/Pause button */}
          <Button 
            color="dark" 
            pill 
            size="sm" 
            onClick={onPlayPause}
          >
            {isPlaying ? <FaPause className="mr-1" /> : <FaPlay className="mr-1" />}
          </Button>
          
          {/* Volume control */}
          <div className="relative">
            <Button 
              color="dark" 
              pill 
              size="sm" 
              onClick={onMuteToggle}
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              {isMuted || volume === 0 ? 
                <FaVolumeMute className="mr-1" /> : 
                <FaVolumeUp className="mr-1" />}
            </Button>
            
            {/* Volume slider */}
            {showVolumeSlider && (
              <div 
                className="absolute bottom-12 -left-6 p-2 bg-gray-800 rounded-lg w-24"
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={isMuted ? 0 : volume}
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            )}
          </div>
          
          {/* Subtitles toggle */}
          <Button 
            color={subtitlesEnabled ? "light" : "dark"} 
            pill 
            size="sm" 
            onClick={onSubtitleToggle}
          >
            <FaClosedCaptioning className="mr-1" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Settings button */}
          <div className="relative">
            <Button 
              color={showSettings ? "light" : "dark"} 
              pill 
              size="sm" 
              onClick={() => setShowSettings(!showSettings)}
            >
              <FaCog className="mr-1" />
            </Button>
            
            {/* Settings panel */}
            {showSettings && (
              <div className="absolute bottom-12 right-0 p-3 bg-gray-800 rounded-lg w-64 text-white">
                <div className="flex border-b border-gray-700 mb-2">
                  <button 
                    className={`px-3 py-1 ${settingsTab === 'quality' ? 'border-b-2 border-red-500' : ''}`}
                    onClick={() => setSettingsTab('quality')}
                  >
                    Quality
                  </button>
                  <button 
                    className={`px-3 py-1 ${settingsTab === 'subtitles' ? 'border-b-2 border-red-500' : ''}`}
                    onClick={() => setSettingsTab('subtitles')}
                  >
                    Subtitles
                  </button>
                  <button 
                    className={`px-3 py-1 ${settingsTab === 'audio' ? 'border-b-2 border-red-500' : ''}`}
                    onClick={() => setSettingsTab('audio')}
                  >
                    Audio
                  </button>
                </div>
                
                {/* Quality settings */}
                {settingsTab === 'quality' && (
                  <div className="space-y-2">
                    {qualityOptions.map((option) => (
                      <div 
                        key={option.value} 
                        className={`flex justify-between items-center p-1 rounded cursor-pointer hover:bg-gray-700 ${quality === option.value ? 'bg-gray-700' : ''}`}
                        onClick={() => onQualityChange(option.value)}
                      >
                        <span>{option.label}</span>
                        <span className="text-xs text-gray-400">{option.usage}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Subtitle settings */}
                {settingsTab === 'subtitles' && (
                  <div className="space-y-2">
                    {subtitleOptions.map((option) => (
                      <div 
                        key={option.value} 
                        className={`p-1 rounded cursor-pointer hover:bg-gray-700 ${subtitlesEnabled && option.value !== 'off' ? 'bg-gray-700' : ''}`}
                        onClick={() => {
                          if (option.value === 'off') {
                            onSubtitleToggle(false);
                          } else {
                            onSubtitleToggle(true);
                            onSubtitleChange(option.value);
                          }
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Audio settings */}
                {settingsTab === 'audio' && (
                  <div className="space-y-2">
                    {audioOptions.map((option) => (
                      <div 
                        key={option.value} 
                        className={`p-1 rounded cursor-pointer hover:bg-gray-700 ${audioTrack === option.value ? 'bg-gray-700' : ''}`}
                        onClick={() => onAudioTrackChange(option.value)}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Fullscreen button */}
          <Button 
            color="dark" 
            pill 
            size="sm" 
            onClick={onFullScreenToggle}
          >
            {isFullScreen ? <FaCompress className="mr-1" /> : <FaExpand className="mr-1" />}
          </Button>
        </div>
      </div>
      
      {/* Fullscreen indicator */}
      {isFullScreen && (
        <Tooltip 
          content="Press Esc to exit full screen"
          placement="top"
          trigger="hover"
          className="absolute top-4 right-4"
        >
          <div className="text-white text-sm bg-black/50 px-3 py-1 rounded-full">
            Full Screen
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default ControlsOverlay;