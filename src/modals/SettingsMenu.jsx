import React, { useState } from 'react';
import { Dropdown, Button, Label, ToggleSwitch, Select, Tabs, TextInput, ColorPicker } from 'flowbite-react';
import { IoMdClose } from 'react-icons/io';
import { FaCog, FaClosedCaptioning, FaVolumeUp } from 'react-icons/fa';
import { MdHighQuality } from 'react-icons/md';

const SettingsMenu = ({ 
  isOpen, 
  onClose, 
  currentQuality = 'Auto', 
  onQualityChange, 
  subtitlesEnabled = false, 
  onSubtitlesToggle, 
  currentSubtitleLanguage = 'English', 
  onSubtitleLanguageChange, 
  currentAudioTrack = 'English (5.1)', 
  onAudioTrackChange,
  subtitleSettings = {
    size: 'Medium',
    color: '#FFFFFF',
    background: 'rgba(0, 0, 0, 0.5)'
  },
  onSubtitleSettingsChange
}) => {
  const [activeTab, setActiveTab] = useState('quality');

  if (!isOpen) return null;

  const qualityOptions = [
    { value: 'Auto', label: 'Auto (Recommended)', dataUsage: 'Varies based on connection' },
    { value: '4K', label: '4K', dataUsage: '~7 GB per hour' },
    { value: '1080p', label: '1080p', dataUsage: '~3 GB per hour' },
    { value: '720p', label: '720p', dataUsage: '~1.5 GB per hour' },
    { value: '480p', label: '480p', dataUsage: '~700 MB per hour' },
    { value: '360p', label: '360p', dataUsage: '~300 MB per hour' }
  ];

  const subtitleLanguages = [
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Korean', label: 'Korean' }
  ];

  const audioTracks = [
    { value: 'English (5.1)', label: 'English (5.1 Surround)' },
    { value: 'English (Stereo)', label: 'English (Stereo)' },
    { value: 'Spanish (Stereo)', label: 'Spanish (Stereo)' },
    { value: 'French (Stereo)', label: 'French (Stereo)' },
    { value: 'German (Stereo)', label: 'German (Stereo)' },
    { value: 'Original (5.1)', label: 'Original (5.1 Surround)' }
  ];

  const subtitleSizes = [
    { value: 'Small', label: 'Small' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Large', label: 'Large' },
    { value: 'X-Large', label: 'X-Large' }
  ];

  const handleSubtitleSettingChange = (setting, value) => {
    if (onSubtitleSettingsChange) {
      onSubtitleSettingsChange({
        ...subtitleSettings,
        [setting]: value
      });
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-gray-900 text-white z-50 overflow-y-auto shadow-lg">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold flex items-center">
          <FaCog className="mr-2" /> Settings
        </h2>
        <Button color="gray" size="sm" onClick={onClose} className="rounded-full p-2">
          <IoMdClose size={20} />
        </Button>
      </div>
      
      <Tabs.Group 
        style="underline"
        className="mt-4"
        onActiveTabChange={(tab) => setActiveTab(tab)}
      >
        <Tabs.Item 
          title="Quality" 
          icon={MdHighQuality}
          active={activeTab === 'quality'}
        >
          <div className="p-4">
            <h3 className="mb-4 font-medium">Video Quality</h3>
            <div className="space-y-4">
              {qualityOptions.map((option) => (
                <div 
                  key={option.value}
                  onClick={() => onQualityChange && onQualityChange(option.value)}
                  className={`flex justify-between items-center p-3 rounded cursor-pointer ${currentQuality === option.value ? 'bg-blue-700' : 'hover:bg-gray-700'}`}
                >
                  <div>
                    <div>{option.label}</div>
                    <div className="text-xs text-gray-400">{option.dataUsage}</div>
                  </div>
                  {currentQuality === option.value && (
                    <div className="h-3 w-3 bg-blue-400 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Tabs.Item>
        
        <Tabs.Item 
          title="Subtitles" 
          icon={FaClosedCaptioning}
          active={activeTab === 'subtitles'}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Label htmlFor="subtitle-toggle">Enable Subtitles</Label>
              <ToggleSwitch
                id="subtitle-toggle"
                checked={subtitlesEnabled}
                onChange={onSubtitlesToggle}
              />
            </div>
            
            {subtitlesEnabled && (
              <>
                <div className="mb-4">
                  <Label htmlFor="subtitle-language" className="mb-2 block">Subtitle Language</Label>
                  <Select 
                    id="subtitle-language"
                    value={currentSubtitleLanguage}
                    onChange={(e) => onSubtitleLanguageChange && onSubtitleLanguageChange(e.target.value)}
                  >
                    {subtitleLanguages.map(lang => (
                      <option key={lang.value} value={lang.value}>{lang.label}</option>
                    ))}
                  </Select>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="subtitle-size" className="mb-2 block">Subtitle Size</Label>
                  <Select
                    id="subtitle-size"
                    value={subtitleSettings.size}
                    onChange={(e) => handleSubtitleSettingChange('size', e.target.value)}
                  >
                    {subtitleSizes.map(size => (
                      <option key={size.value} value={size.value}>{size.label}</option>
                    ))}
                  </Select>
                </div>
                
                <div className="mb-4">
                  <Label className="mb-2 block">Subtitle Color</Label>
                  <input 
                    type="color" 
                    value={subtitleSettings.color} 
                    onChange={(e) => handleSubtitleSettingChange('color', e.target.value)}
                    className="w-full h-10 cursor-pointer rounded"
                  />
                </div>
                
                <div className="mb-4">
                  <Label className="mb-2 block">Background Opacity</Label>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1"
                    value={parseFloat(subtitleSettings.background.split(',')[3])}
                    onChange={(e) => {
                      const opacity = e.target.value;
                      handleSubtitleSettingChange('background', `rgba(0, 0, 0, ${opacity})`);
                    }}
                    className="w-full"
                  />
                </div>
                
                <div className="p-4 bg-gray-800 rounded mt-4">
                  <div className="text-center">Subtitle Preview</div>
                  <div 
                    className="text-center p-2 mt-2 rounded" 
                    style={{
                      color: subtitleSettings.color,
                      background: subtitleSettings.background,
                      fontSize: {
                        'Small': '14px',
                        'Medium': '16px',
                        'Large': '18px',
                        'X-Large': '22px'
                      }[subtitleSettings.size]
                    }}
                  >
                    This is how your subtitles will appear
                  </div>
                </div>
              </>
            )}
          </div>
        </Tabs.Item>
        
        <Tabs.Item 
          title="Audio" 
          icon={FaVolumeUp}
          active={activeTab === 'audio'}
        >
          <div className="p-4">
            <h3 className="mb-4 font-medium">Audio Track</h3>
            <div className="space-y-3">
              {audioTracks.map((track) => (
                <div 
                  key={track.value}
                  onClick={() => onAudioTrackChange && onAudioTrackChange(track.value)}
                  className={`flex justify-between items-center p-3 rounded cursor-pointer ${currentAudioTrack === track.value ? 'bg-blue-700' : 'hover:bg-gray-700'}`}
                >
                  <div>{track.label}</div>
                  {currentAudioTrack === track.value && (
                    <div className="h-3 w-3 bg-blue-400 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
};

export default SettingsMenu;