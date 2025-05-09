import React, { useState, useEffect } from 'react';
import { Button, Label, Select, ToggleSwitch, Tooltip, Card, Range } from 'flowbite-react';
import { HiX, HiInformationCircle } from 'react-icons/hi';

const SubtitleCustomizationPanel = ({ isOpen, onClose, currentSubtitleSettings, onSettingsChange }) => {
  const [settings, setSettings] = useState({
    enabled: true,
    language: 'en',
    size: 100,
    color: '#FFFFFF',
    backgroundColor: '#000000',
    backgroundOpacity: 50,
    ...currentSubtitleSettings
  });

  useEffect(() => {
    if (currentSubtitleSettings) {
      setSettings(prev => ({ ...prev, ...currentSubtitleSettings }));
    }
  }, [currentSubtitleSettings]);

  const handleChange = (field, value) => {
    const newSettings = { ...settings, [field]: value };
    setSettings(newSettings);
    if (onSettingsChange) {
      onSettingsChange(newSettings);
    }
  };

  const subtitleLanguages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'zh', label: 'Chinese' }
  ];

  const subtitleSizes = [
    { value: 75, label: 'Small' },
    { value: 100, label: 'Medium' },
    { value: 125, label: 'Large' },
    { value: 150, label: 'Extra Large' }
  ];

  const subtitleColors = [
    { value: '#FFFFFF', label: 'White' },
    { value: '#FFFF00', label: 'Yellow' },
    { value: '#00FF00', label: 'Green' },
    { value: '#FF0000', label: 'Red' },
    { value: '#00FFFF', label: 'Cyan' }
  ];

  const backgroundColors = [
    { value: '#000000', label: 'Black' },
    { value: '#333333', label: 'Dark Gray' },
    { value: '#0000FF', label: 'Blue' },
    { value: '#808080', label: 'Gray' },
    { value: 'transparent', label: 'Transparent' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <Card className="w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Subtitle Settings</h3>
          <Button color="gray" size="sm" onClick={onClose}>
            <HiX className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4">
          {/* Enable/Disable Subtitles */}
          <div className="flex items-center justify-between">
            <Label htmlFor="subtitle-toggle" className="flex items-center gap-2">
              Enable Subtitles
              <Tooltip content="Turn subtitles on or off">
                <HiInformationCircle className="h-4 w-4 text-gray-400" />
              </Tooltip>
            </Label>
            <ToggleSwitch
              id="subtitle-toggle"
              checked={settings.enabled}
              onChange={(checked) => handleChange('enabled', checked)}
            />
          </div>

          {/* Language Selection */}
          <div>
            <Label htmlFor="subtitle-language">Subtitle Language</Label>
            <Select
              id="subtitle-language"
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              disabled={!settings.enabled}
            >
              {subtitleLanguages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Size Selection */}
          <div>
            <Label htmlFor="subtitle-size">Size</Label>
            <Select
              id="subtitle-size"
              value={settings.size}
              onChange={(e) => handleChange('size', parseInt(e.target.value))}
              disabled={!settings.enabled}
            >
              {subtitleSizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Text Color */}
          <div>
            <Label htmlFor="subtitle-color">Text Color</Label>
            <div className="flex gap-2">
              <Select
                id="subtitle-color"
                value={settings.color}
                onChange={(e) => handleChange('color', e.target.value)}
                disabled={!settings.enabled}
              >
                {subtitleColors.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.label}
                  </option>
                ))}
              </Select>
              <div
                className="w-10 h-10 border border-gray-300"
                style={{ backgroundColor: settings.color }}
              />
            </div>
          </div>

          {/* Background Color */}
          <div>
            <Label htmlFor="subtitle-bg-color">Background Color</Label>
            <div className="flex gap-2">
              <Select
                id="subtitle-bg-color"
                value={settings.backgroundColor}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                disabled={!settings.enabled}
              >
                {backgroundColors.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.label}
                  </option>
                ))}
              </Select>
              <div
                className="w-10 h-10 border border-gray-300"
                style={{ backgroundColor: settings.backgroundColor }}
              />
            </div>
          </div>

          {/* Background Opacity */}
          <div>
            <div className="flex justify-between">
              <Label htmlFor="subtitle-bg-opacity">Background Opacity</Label>
              <span>{settings.backgroundOpacity}%</span>
            </div>
            <Range
              id="subtitle-bg-opacity"
              min={0}
              max={100}
              step={10}
              value={settings.backgroundOpacity}
              onChange={(e) => handleChange('backgroundOpacity', parseInt(e.target.value))}
              disabled={!settings.enabled || settings.backgroundColor === 'transparent'}
            />
          </div>

          {/* Preview */}
          <div>
            <Label>Preview</Label>
            <div 
              className="mt-2 p-4 flex justify-center items-center border border-gray-300 rounded-lg h-20"
              style={{
                backgroundColor: settings.backgroundColor !== 'transparent' 
                  ? `${settings.backgroundColor}${Math.round(settings.backgroundOpacity * 2.55).toString(16).padStart(2, '0')}` 
                  : 'transparent'
              }}
            >
              <p 
                style={{ 
                  color: settings.color,
                  fontSize: `${settings.size}%`,
                }}
              >
                Sample subtitle text
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button color="gray" onClick={onClose}>Cancel</Button>
          <Button onClick={() => {
            if (onSettingsChange) onSettingsChange(settings);
            if (onClose) onClose();
          }}>Save</Button>
        </div>
      </Card>
    </div>
  );
};

export default SubtitleCustomizationPanel;