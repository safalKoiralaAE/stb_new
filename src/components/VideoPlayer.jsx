import React, { useState, useRef, useEffect } from 'react';
import { Button, Dropdown, Progress, Tooltip, ToggleSwitch } from 'flowbite-react';
import { 
  FaPlay, 
  FaPause, 
  FaVolumeUp, 
  FaVolumeMute, 
  FaCog, 
  FaExpand, 
  FaCompress, 
  FaClosedCaptioning, 
  FaLanguage 
} from 'react-icons/fa';

const VideoPlayer = ({ videoUrl, autoPlay = false, initialTime = 0, onVideoEnd, videoThumbnail, videoTitle, videoDescription }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(initialTime > 0);
  const [selectedQuality, setSelectedQuality] = useState('Auto');
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [selectedSubtitleLanguage, setSelectedSubtitleLanguage] = useState('English');
  const [selectedAudioTrack, setSelectedAudioTrack] = useState('English');

  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const controlsTimerRef = useRef(null);

  // Available options for settings
  const qualityOptions = [
    { value: 'Auto', label: 'Auto', info: 'Adjusts based on connection' },
    { value: '4K', label: '4K', info: '20 GB/hour' },
    { value: '1080p', label: '1080p', info: '7 GB/hour' },
    { value: '720p', label: '720p', info: '4 GB/hour' },
    { value: '480p', label: '480p', info: '2 GB/hour' },
  ];

  const subtitleLanguages = [
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
  ];

  const audioTracks = [
    { value: 'English', label: 'English', quality: 'Stereo' },
    { value: 'English-5.1', label: 'English', quality: '5.1 Surround' },
    { value: 'Spanish', label: 'Spanish', quality: 'Stereo' },
    { value: 'French', label: 'French', quality: 'Stereo' },
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;

      if (isPlaying) {
        videoRef.current.play().catch(error => {
          console.error("Playback failed:", error);
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, volume, isMuted]);

  useEffect(() => {
    const hideControlsTimer = () => {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }

      controlsTimerRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
          setShowVolumeSlider(false);
          setShowSettings(false);
        }
      }, 3000);
    };

    if (showControls) {
      hideControlsTimer();
    }

    return () => {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    };
  }, [showControls, isPlaying]);

  const handleVideoClick = () => {
    setShowControls(true);
    setIsPlaying(!isPlaying);
  };

  const handleMouseMove = () => {
    setShowControls(true);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      videoRef.current.currentTime = initialTime;
    }
  };

  const handleProgressClick = (e) => {
    if (videoRef.current && duration) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / progressBar.offsetWidth;
      videoRef.current.currentTime = pos * duration;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().then(() => {
        setIsFullScreen(true);
      }).catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return [
      hours > 0 ? hours : null,
      minutes < 10 && hours > 0 ? `0${minutes}` : minutes,
      seconds < 10 ? `0${seconds}` : seconds
    ].filter(Boolean).join(':');
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (onVideoEnd) {
      onVideoEnd();
    }
  };

  const handleResumePlayback = () => {
    setShowResumeDialog(false);
    videoRef.current.currentTime = initialTime;
    setIsPlaying(true);
  };

  const handleStartFromBeginning = () => {
    setShowResumeDialog(false);
    videoRef.current.currentTime = 0;
    setIsPlaying(true);
  };

  return (
    <div 
      className="relative w-full aspect-video bg-black" 
      ref={playerRef}
      onMouseMove={handleMouseMove}
    >
      {showResumeDialog && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-800 p-4 rounded-lg max-w-md text-white">
            <h3 className="text-xl font-bold mb-2">Resume Watching?</h3>
            <div className="flex items-center mb-4">
              {videoThumbnail && (
                <img src={videoThumbnail} alt="Thumbnail" className="w-24 h-auto mr-4 rounded" />
              )}
              <div>
                <p className="font-semibold">{videoTitle}</p>
                <p className="text-sm text-gray-300">You were at {formatTime(initialTime)}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button color="gray" onClick={handleStartFromBeginning}>
                Start from Beginning
              </Button>
              <Button onClick={handleResumePlayback}>
                Resume
              </Button>
            </div>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        className="w-full h-full"
        src={videoUrl}
        onClick={handleVideoClick}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleVideoEnd}
        poster={videoThumbnail}
      />

      {showControls && (
        <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/70 via-transparent to-black/30">
          {/* Top bar - title */}
          <div className="p-4 text-white">
            {videoTitle && <h2 className="text-xl font-bold">{videoTitle}</h2>}
            {videoDescription && <p className="text-sm opacity-80">{videoDescription}</p>}
          </div>

          {/* Bottom controls */}
          <div className="p-4 space-y-2">
            {/* Progress bar */}
            <div 
              className="w-full h-2 bg-gray-600 rounded cursor-pointer relative"
              onClick={handleProgressClick}
            >
              <Progress 
                progress={(currentTime / duration) * 100} 
                color="red" 
                size="sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Play/Pause button */}
                <Button color="gray" size="sm" pill onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </Button>

                {/* Time display */}
                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                {/* Volume control */}
                <div className="relative">
                  <Button 
                    color="gray" 
                    size="sm" 
                    pill 
                    onClick={toggleMute}
                    onMouseEnter={() => setShowVolumeSlider(true)}
                  >
                    {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                  </Button>

                  {showVolumeSlider && (
                    <div 
                      className="absolute bottom-10 -left-4 bg-gray-800 p-3 rounded-lg shadow-lg z-10 flex flex-col items-center"
                      onMouseLeave={() => setShowVolumeSlider(false)}
                    >
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="h-24 w-2 appearance-none bg-gray-600 rounded-full outline-none cursor-pointer transform -rotate-90 mb-3"
                      />
                      <Button size="xs" color="gray" onClick={toggleMute}>
                        {isMuted ? "Unmute" : "Mute"}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Subtitles toggle */}
                <Tooltip content="Subtitles">
                  <Button 
                    color={subtitlesEnabled ? "light" : "gray"} 
                    size="sm" 
                    pill 
                    onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                  >
                    <FaClosedCaptioning />
                  </Button>
                </Tooltip>
              </div>

              <div className="flex items-center space-x-4">
                {/* Settings menu */}
                <div className="relative">
                  <Button 
                    color="gray" 
                    size="sm" 
                    pill 
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    <FaCog />
                  </Button>

                  {showSettings && (
                    <div className="absolute bottom-10 right-0 bg-gray-800 rounded-lg shadow-lg z-10 w-64 p-2">
                      <div className="text-white p-2 font-medium border-b border-gray-700">Settings</div>
                      
                      {/* Quality settings */}
                      <Dropdown label={`Quality: ${selectedQuality}`} color="gray" size="sm" className="w-full my-1">
                        {qualityOptions.map((option) => (
                          <Dropdown.Item 
                            key={option.value}
                            onClick={() => setSelectedQuality(option.value)}
                            className={selectedQuality === option.value ? "bg-gray-700" : ""}
                          >
                            <div className="flex justify-between w-full">
                              <span>{option.label}</span>
                              <span className="text-xs text-gray-400">{option.info}</span>
                            </div>
                          </Dropdown.Item>
                        ))}
                      </Dropdown>

                      {/* Subtitle settings */}
                      <div className="p-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white text-sm">Subtitles</span>
                          <ToggleSwitch 
                            checked={subtitlesEnabled}
                            onChange={setSubtitlesEnabled}
                          />
                        </div>

                        {subtitlesEnabled && (
                          <Dropdown 
                            label={`Language: ${selectedSubtitleLanguage}`} 
                            color="gray" 
                            size="sm"
                            className="w-full mt-2"
                          >
                            {subtitleLanguages.map((lang) => (
                              <Dropdown.Item 
                                key={lang.value}
                                onClick={() => setSelectedSubtitleLanguage(lang.value)}
                                className={selectedSubtitleLanguage === lang.value ? "bg-gray-700" : ""}
                              >
                                {lang.label}
                              </Dropdown.Item>
                            ))}
                          </Dropdown>
                        )}
                      </div>

                      {/* Audio settings */}
                      <div className="p-2 border-t border-gray-700">
                        <div className="text-white text-sm mb-2 flex items-center">
                          <FaLanguage className="mr-2" /> Audio Track
                        </div>
                        <Dropdown 
                          label={`Language: ${selectedAudioTrack}`} 
                          color="gray" 
                          size="sm"
                          className="w-full"
                        >
                          {audioTracks.map((track) => (
                            <Dropdown.Item 
                              key={track.value}
                              onClick={() => setSelectedAudioTrack(track.value)}
                              className={selectedAudioTrack === track.value ? "bg-gray-700" : ""}
                            >
                              <div className="flex justify-between w-full">
                                <span>{track.label}</span>
                                <span className="text-xs text-gray-400">{track.quality}</span>
                              </div>
                            </Dropdown.Item>
                          ))}
                        </Dropdown>
                      </div>
                    </div>
                  )}
                </div>

                {/* Full screen toggle */}
                <Button color="gray" size="sm" pill onClick={toggleFullScreen}>
                  {isFullScreen ? <FaCompress /> : <FaExpand />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen notification */}
      {isFullScreen && (
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm transition-opacity duration-500 opacity-0 animate-fade">
          Fullscreen mode (Press ESC to exit)
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
