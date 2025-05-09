import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';
import VideoPlayer from '../components/VideoPlayer';
import ControlsOverlay from '../components/ControlsOverlay';
import ResumeNotification from '../components/ResumeNotification';
import ResumePlaybackDialog from '../modals/ResumePlaybackDialog';
import SettingsMenu from '../modals/SettingsMenu';
import SubtitleCustomizationPanel from '../modals/SubtitleCustomizationPanel';
import FullScreenConfirmation from '../modals/FullScreenConfirmation';
import BufferingNotification from '../modals/BufferingNotification';
import ErrorDialog from '../modals/ErrorDialog';

const VideoPlayerScreen = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const videoContainerRef = useRef(null);
  
  // State variables
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [error, setError] = useState(null);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [resumePosition, setResumePosition] = useState(0);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showSubtitlePanel, setShowSubtitlePanel] = useState(false);
  const [showFullScreenConfirmation, setShowFullScreenConfirmation] = useState(false);
  
  // Video settings
  const [selectedQuality, setSelectedQuality] = useState('Auto');
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [subtitleLanguage, setSubtitleLanguage] = useState('English');
  const [subtitleSize, setSubtitleSize] = useState('Medium');
  const [subtitleColor, setSubtitleColor] = useState('#FFFFFF');
  const [audioTrack, setAudioTrack] = useState('English');
  
  // Mock video data
  const videoData = {
    id: videoId || '123',
    title: 'Sample Video Content',
    source: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnail: 'https://sample-videos.com/img/Sample-jpg-image-50kb.jpg',
    lastPosition: 45, // seconds
  };

  // Control overlay timeout
  useEffect(() => {
    let timeout;
    if (showControls && isPlaying) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [showControls, isPlaying]);

  // Check for resume position on load
  useEffect(() => {
    const checkForResumePosition = () => {
      if (videoData.lastPosition > 0) {
        setResumePosition(videoData.lastPosition);
        setShowResumeDialog(true);
      }
    };
    
    if (videoLoaded) {
      checkForResumePosition();
    }
  }, [videoLoaded]);

  // Mock video loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle full screen toggle
  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      }
      setIsFullScreen(true);
      setShowFullScreenConfirmation(true);
      setTimeout(() => setShowFullScreenConfirmation(false), 2000);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullScreen(false);
    }
  };

  // Handle resume dialog options
  const handleResumeOption = (resume) => {
    setShowResumeDialog(false);
    if (resume) {
      setCurrentTime(resumePosition);
    } else {
      setCurrentTime(0);
    }
    setIsPlaying(true);
  };

  // Handle settings menu
  const openSettingsMenu = () => {
    setShowSettingsMenu(true);
    setShowControls(true);
  };

  // Handle subtitle customization
  const openSubtitlePanel = () => {
    setShowSettingsMenu(false);
    setShowSubtitlePanel(true);
  };

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  // Mock buffering event
  const simulateBuffering = () => {
    setIsBuffering(true);
    setTimeout(() => setIsBuffering(false), 2000);
  };

  // Show controls on mouse move or touch
  const handleInteraction = () => {
    setShowControls(true);
  };

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center">
      {!videoLoaded ? (
        <div className="flex flex-col items-center">
          <Spinner size="xl" />
          <p className="text-white mt-4">Loading video...</p>
        </div>
      ) : (
        <div 
          ref={videoContainerRef}
          className="relative w-full max-w-7xl h-full max-h-[80vh]"
          onMouseMove={handleInteraction}
          onTouchStart={handleInteraction}
        >
          <VideoPlayer 
            source={videoData.source}
            isPlaying={isPlaying}
            currentTime={currentTime}
            volume={volume}
            isMuted={isMuted}
            onTimeUpdate={(time) => setCurrentTime(time)}
            onDurationChange={(dur) => setDuration(dur)}
            onEnded={() => setIsPlaying(false)}
            onError={(err) => setError(err)}
          />
          
          {showControls && (
            <ControlsOverlay 
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={duration}
              volume={volume}
              isMuted={isMuted}
              isFullScreen={isFullScreen}
              onPlayPause={togglePlay}
              onVolumeChange={setVolume}
              onMuteToggle={() => setIsMuted(!isMuted)}
              onSeek={setCurrentTime}
              onFullScreenToggle={toggleFullScreen}
              onSettingsClick={openSettingsMenu}
            />
          )}
          
          {subtitlesEnabled && (
            <div className="absolute bottom-16 left-0 right-0 flex justify-center">
              <div 
                className="px-4 py-2 rounded bg-black bg-opacity-70"
                style={{ color: subtitleColor, fontSize: subtitleSize === 'Small' ? '14px' : subtitleSize === 'Medium' ? '18px' : '22px' }}
              >
                Sample subtitle text
              </div>
            </div>
          )}
          
          {isBuffering && <BufferingNotification />}
          
          {showResumeDialog && (
            <ResumePlaybackDialog 
              timestamp={resumePosition}
              thumbnail={videoData.thumbnail}
              onResume={() => handleResumeOption(true)}
              onStartOver={() => handleResumeOption(false)}
              onClose={() => setShowResumeDialog(false)}
            />
          )}
          
          {showSettingsMenu && (
            <SettingsMenu 
              selectedQuality={selectedQuality}
              subtitlesEnabled={subtitlesEnabled}
              subtitleLanguage={subtitleLanguage}
              audioTrack={audioTrack}
              onQualityChange={setSelectedQuality}
              onSubtitleToggle={() => setSubtitlesEnabled(!subtitlesEnabled)}
              onSubtitleLanguageChange={setSubtitleLanguage}
              onAudioTrackChange={setAudioTrack}
              onCustomizeSubtitles={openSubtitlePanel}
              onClose={() => setShowSettingsMenu(false)}
            />
          )}
          
          {showSubtitlePanel && (
            <SubtitleCustomizationPanel 
              subtitleSize={subtitleSize}
              subtitleColor={subtitleColor}
              onSizeChange={setSubtitleSize}
              onColorChange={setSubtitleColor}
              onClose={() => {
                setShowSubtitlePanel(false);
                setShowSettingsMenu(true);
              }}
            />
          )}
          
          {showFullScreenConfirmation && (
            <FullScreenConfirmation isFullScreen={isFullScreen} />
          )}
          
          {error && (
            <ErrorDialog 
              message={error.message || "An error occurred during playback"}
              onClose={() => setError(null)}
              onRetry={() => {
                setError(null);
                // Retry logic here
              }}
            />
          )}
        </div>
      )}
      
      <div className="mt-4 flex space-x-4">
        {['Home Screen', 'Content Library', 'User Profile', 'Content Details Page', 'Watch Later List', 'Help Center'].map((link) => (
          <Button 
            key={link}
            color="gray" 
            size="sm"
            onClick={() => navigate(`/${link.toLowerCase().replace(/ /g, '-')}`)}
          >
            {link}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayerScreen;
