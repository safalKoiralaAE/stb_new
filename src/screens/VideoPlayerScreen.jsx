import React, { useState, useRef, useEffect } from 'react';
import { Button, Progress, Dropdown, Card, ToggleSwitch, Radio } from 'flowbite-react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaCog, FaExpandAlt, FaCompressAlt } from 'react-icons/fa';

const VideoPlayerScreen = ({ videoUrl, videoTitle, videoThumbnail, currentTime = 0, duration = 0, subtitleOptions = [], audioTracks = [], qualityOptions = [] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(currentTime);
  const [showControls, setShowControls] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showSubtitleMenu, setShowSubtitleMenu] = useState(false);
  const [showAudioMenu, setShowAudioMenu] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('Auto');
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState('None');
  const [selectedAudioTrack, setSelectedAudioTrack] = useState('English');
  const [showResumeDialog, setShowResumeDialog] = useState(currentTime > 0);
  
  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // Hide controls after inactivity
  useEffect(() => {
    if (showControls) {
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => clearTimeout(controlsTimeoutRef.current);
  }, [showControls]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, would control the actual video playback
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    // In a real implementation, would set the video volume
  };

  const handleProgressChange = (newProgress) => {
    setProgress(newProgress);
    // In a real implementation, would seek the video
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In a real implementation, would mute/unmute the video
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (playerContainerRef.current.requestFullscreen) {
        playerContainerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  const handleMouseMove = () => {
    setShowControls(true);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const resumePlayback = () => {
    setShowResumeDialog(false);
    // In a real implementation, would resume from saved position
    setIsPlaying(true);
  };

  const startFromBeginning = () => {
    setShowResumeDialog(false);
    setProgress(0);
    // In a real implementation, would reset to beginning
    setIsPlaying(true);
  };

  return (
    <div 
      ref={playerContainerRef} 
      className="relative w-full h-screen bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={videoThumbnail}
        src={videoUrl}
      />

      {/* Resume Dialog */}
      {showResumeDialog && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-20">
          <Card className="w-96">
            <h5 className="text-xl font-bold">Continue Watching?</h5>
            <div className="flex items-center space-x-4 mb-4">
              <img src={videoThumbnail} alt="Thumbnail" className="w-24 h-16 object-cover rounded" />
              <div>
                <p className="font-medium">{videoTitle}</p>
                <p className="text-sm text-gray-500">Stopped at {formatTime(currentTime)}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button color="light" onClick={startFromBeginning}>Start from beginning</Button>
              <Button onClick={resumePlayback}>Resume</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Controls Overlay */}
      {showControls && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 flex flex-col justify-between p-4 z-10">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <h2 className="text-white text-xl font-bold">{videoTitle}</h2>
          </div>

          {/* Bottom Controls */}
          <div className="space-y-2">
            {/* Progress Bar */}
            <div className="flex items-center space-x-2">
              <span className="text-white text-sm">{formatTime(progress)}</span>
              <Progress 
                progress={Math.round((progress / duration) * 100)} 
                size="sm"
                className="w-full cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickPosition = (e.clientX - rect.left) / rect.width;
                  handleProgressChange(clickPosition * duration);
                }}
              />
              <span className="text-white text-sm">{formatTime(duration)}</span>
            </div>
            
            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Play/Pause Button */}
                <Button color="gray" size="sm" pill onClick={handlePlayPause}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </Button>
                
                {/* Volume Control */}
                <div className="relative">
                  <Button color="gray" size="sm" pill onClick={toggleMute} onMouseEnter={() => setShowVolumeSlider(true)}>
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                  </Button>
                  
                  {showVolumeSlider && (
                    <div 
                      className="absolute bottom-full mb-2 bg-gray-800 p-2 rounded-lg"
                      onMouseLeave={() => setShowVolumeSlider(false)}
                    >
                      <input 
                        type="range"
                        min="0"
                        max="100"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                        className="w-24 h-1.5 bg-gray-400 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Settings Button */}
                <div className="relative">
                  <Button color="gray" size="sm" pill onClick={() => setShowSettingsMenu(!showSettingsMenu)}>
                    <FaCog />
                  </Button>
                  
                  {/* Settings Menu */}
                  {showSettingsMenu && (
                    <Card className="absolute bottom-full right-0 mb-2 w-56 z-10">
                      <ul className="space-y-2">
                        <li onClick={() => {
                          setShowQualityMenu(true);
                          setShowSubtitleMenu(false);
                          setShowAudioMenu(false);
                        }} className="cursor-pointer hover:bg-gray-100 p-2 rounded flex justify-between items-center">
                          <span>Quality</span>
                          <span className="text-sm text-gray-500">{selectedQuality}</span>
                        </li>
                        <li onClick={() => {
                          setShowSubtitleMenu(true);
                          setShowQualityMenu(false);
                          setShowAudioMenu(false);
                        }} className="cursor-pointer hover:bg-gray-100 p-2 rounded flex justify-between items-center">
                          <span>Subtitles</span>
                          <span className="text-sm text-gray-500">{subtitlesEnabled ? selectedSubtitle : 'Off'}</span>
                        </li>
                        <li onClick={() => {
                          setShowAudioMenu(true);
                          setShowQualityMenu(false);
                          setShowSubtitleMenu(false);
                        }} className="cursor-pointer hover:bg-gray-100 p-2 rounded flex justify-between items-center">
                          <span>Audio</span>
                          <span className="text-sm text-gray-500">{selectedAudioTrack}</span>
                        </li>
                      </ul>
                      
                      {/* Quality Submenu */}
                      {showQualityMenu && (
                        <Card className="absolute right-full top-0 mr-2 w-64">
                          <h5 className="text-lg font-bold mb-2">Video Quality</h5>
                          <div className="space-y-2">
                            {qualityOptions.length > 0 ? qualityOptions.map((option) => (
                              <div key={option.value} className="flex items-center space-x-2">
                                <Radio 
                                  id={`quality-${option.value}`}
                                  name="quality"
                                  value={option.value}
                                  checked={selectedQuality === option.value}
                                  onChange={() => setSelectedQuality(option.value)}
                                />
                                <div>
                                  <label htmlFor={`quality-${option.value}`} className="text-sm font-medium">{option.label}</label>
                                  {option.dataUsage && <p className="text-xs text-gray-500">{option.dataUsage}</p>}
                                </div>
                              </div>
                            )) : [
                              { value: 'Auto', label: 'Auto', dataUsage: 'Adapts based on connection' },
                              { value: '4K', label: '4K', dataUsage: '~7.2GB per hour' },
                              { value: '1080p', label: '1080p HD', dataUsage: '~3GB per hour' },
                              { value: '720p', label: '720p HD', dataUsage: '~1.5GB per hour' },
                              { value: '480p', label: '480p', dataUsage: '~700MB per hour' }
                            ].map((option) => (
                              <div key={option.value} className="flex items-center space-x-2">
                                <Radio 
                                  id={`quality-${option.value}`}
                                  name="quality"
                                  value={option.value}
                                  checked={selectedQuality === option.value}
                                  onChange={() => setSelectedQuality(option.value)}
                                />
                                <div>
                                  <label htmlFor={`quality-${option.value}`} className="text-sm font-medium">{option.label}</label>
                                  <p className="text-xs text-gray-500">{option.dataUsage}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <Button size="xs" outline onClick={() => setShowQualityMenu(false)}>Back</Button>
                        </Card>
                      )}
                      
                      {/* Subtitle Submenu */}
                      {showSubtitleMenu && (
                        <Card className="absolute right-full top-0 mr-2 w-64">
                          <h5 className="text-lg font-bold mb-2">Subtitles</h5>
                          <ToggleSwitch
                            checked={subtitlesEnabled}
                            onChange={setSubtitlesEnabled}
                            label="Enable subtitles"
                          />
                          {subtitlesEnabled && (
                            <div className="mt-3 space-y-2">
                              <h6 className="font-medium text-sm">Subtitle Language</h6>
                              {subtitleOptions.length > 0 ? subtitleOptions.map((option) => (
                                <div key={option} className="flex items-center space-x-2">
                                  <Radio 
                                    id={`subtitle-${option}`}
                                    name="subtitle"
                                    value={option}
                                    checked={selectedSubtitle === option}
                                    onChange={() => setSelectedSubtitle(option)}
                                  />
                                  <label htmlFor={`subtitle-${option}`} className="text-sm">{option}</label>
                                </div>
                              )) : [
                                'English', 'Spanish', 'French', 'German', 'Japanese'
                              ].map((option) => (
                                <div key={option} className="flex items-center space-x-2">
                                  <Radio 
                                    id={`subtitle-${option}`}
                                    name="subtitle"
                                    value={option}
                                    checked={selectedSubtitle === option}
                                    onChange={() => setSelectedSubtitle(option)}
                                  />
                                  <label htmlFor={`subtitle-${option}`} className="text-sm">{option}</label>
                                </div>
                              ))}
                              
                              <div className="mt-3">
                                <h6 className="font-medium text-sm">Subtitle Appearance</h6>
                                <div className="bg-gray-100 p-2 mt-1 rounded text-center">
                                  <p className="text-sm">Sample subtitle text</p>
                                </div>
                              </div>
                            </div>
                          )}
                          <Button size="xs" outline className="mt-3" onClick={() => setShowSubtitleMenu(false)}>Back</Button>
                        </Card>
                      )}
                      
                      {/* Audio Submenu */}
                      {showAudioMenu && (
                        <Card className="absolute right-full top-0 mr-2 w-64">
                          <h5 className="text-lg font-bold mb-2">Audio Track</h5>
                          <div className="space-y-2">
                            {audioTracks.length > 0 ? audioTracks.map((track) => (
                              <div key={track.language} className="flex items-center space-x-2">
                                <Radio 
                                  id={`audio-${track.language}`}
                                  name="audio"
                                  value={track.language}
                                  checked={selectedAudioTrack === track.language}
                                  onChange={() => setSelectedAudioTrack(track.language)}
                                />
                                <div>
                                  <label htmlFor={`audio-${track.language}`} className="text-sm font-medium">{track.language}</label>
                                  {track.quality && <p className="text-xs text-gray-500">{track.quality}</p>}
                                </div>
                              </div>
                            )) : [
                              { language: 'English', quality: '5.1 Surround' },
                              { language: 'English', quality: 'Stereo' },
                              { language: 'Spanish', quality: 'Stereo' },
                              { language: 'French', quality: 'Stereo' }
                            ].map((track) => (
                              <div key={`${track.language}-${track.quality}`} className="flex items-center space-x-2">
                                <Radio 
                                  id={`audio-${track.language}-${track.quality}`}
                                  name="audio"
                                  value={track.language}
                                  checked={selectedAudioTrack === track.language}
                                  onChange={() => setSelectedAudioTrack(track.language)}
                                />
                                <div>
                                  <label htmlFor={`audio-${track.language}-${track.quality}`} className="text-sm font-medium">{track.language}</label>
                                  <p className="text-xs text-gray-500">{track.quality}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <Button size="xs" outline onClick={() => setShowAudioMenu(false)}>Back</Button>
                        </Card>
                      )}
                    </Card>
                  )}
                </div>
                
                {/* Fullscreen Button */}
                <Button color="gray" size="sm" pill onClick={toggleFullScreen}>
                  {isFullScreen ? <FaCompressAlt /> : <FaExpandAlt />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Fullscreen Status Indicator */}
      {isFullScreen && !showControls && (
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm transition-opacity duration-300">
          Press Esc to exit fullscreen
        </div>
      )}
    </div>
  );
};

export default VideoPlayerScreen;