import React, { useState } from 'react';
import { Card, Toggle, Select, Label, Button, Dropdown, ColorPicker, Range } from 'flowbite-react';
import { HiOutlineGlobe, HiCog, HiOutlineColorSwatch, HiOutlineAdjustments } from 'react-icons/hi';

const SubtitleDisplay = ({ isEnabled, currentLanguage, availableLanguages, subtitleStyle, onToggle, onLanguageChange, onStyleChange }) => {
  const [showStyleOptions, setShowStyleOptions] = useState(false);
  
  // Default values if props are not provided
  const subtitleEnabled = isEnabled !== undefined ? isEnabled : false;
  const language = currentLanguage || 'English';
  const languages = availableLanguages || ['English', 'Spanish', 'French', 'German', 'Japanese'];
  const style = subtitleStyle || {
    fontSize: 16,
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'bottom'
  };

  // Preview text for subtitle styling
  const previewText = 'This is how your subtitles will appear';

  const handleToggleChange = () => {
    if (onToggle) onToggle(!subtitleEnabled);
  };

  const handleLanguageChange = (e) => {
    if (onLanguageChange) onLanguageChange(e.target.value);
  };

  const handleStyleChange = (property, value) => {
    if (onStyleChange) {
      onStyleChange({ ...style, [property]: value });
    }
  };

  const toggleStyleOptions = () => {
    setShowStyleOptions(!showStyleOptions);
  };

  return (
    <Card className="w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-bold">Subtitle Settings</h5>
        <Toggle 
          checked={subtitleEnabled}
          onChange={handleToggleChange}
          label="Enable Subtitles"
        />
      </div>
      
      {subtitleEnabled && (
        <>
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <HiOutlineGlobe className="text-gray-500" />
              <Label htmlFor="subtitle-language">Subtitle Language</Label>
            </div>
            <Select 
              id="subtitle-language"
              value={language}
              onChange={handleLanguageChange}
              disabled={!subtitleEnabled}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </Select>
          </div>

          <div className="mb-4">
            <Button 
              color="light" 
              size="sm" 
              onClick={toggleStyleOptions}
              disabled={!subtitleEnabled}
            >
              <HiCog className="mr-2" />
              {showStyleOptions ? 'Hide Style Options' : 'Customize Appearance'}
            </Button>
          </div>
          
          {showStyleOptions && (
            <div className="space-y-4 p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineAdjustments className="text-gray-500" />
                  <Label htmlFor="font-size">Font Size: {style.fontSize}px</Label>
                </div>
                <Range 
                  id="font-size"
                  min={10}
                  max={32}
                  step={1}
                  value={style.fontSize}
                  onChange={(e) => handleStyleChange('fontSize', parseInt(e.target.value))}
                />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineColorSwatch className="text-gray-500" />
                  <Label>Text Color</Label>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded border border-gray-300" 
                    style={{ backgroundColor: style.color }}
                  />
                  <Dropdown label="Select Color">
                    <Dropdown.Item onClick={() => handleStyleChange('color', '#ffffff')}>White</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStyleChange('color', '#ffff00')}>Yellow</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStyleChange('color', '#00ffff')}>Cyan</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStyleChange('color', '#ff9900')}>Orange</Dropdown.Item>
                  </Dropdown>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label>Background Opacity</Label>
                </div>
                <Range 
                  min={0}
                  max={100}
                  step={5}
                  value={parseFloat(style.backgroundColor.split(',')[3]) * 100}
                  onChange={(e) => {
                    const opacity = parseInt(e.target.value) / 100;
                    handleStyleChange('backgroundColor', `rgba(0, 0, 0, ${opacity})`);
                  }}
                />
              </div>
              
              <div>
                <Label className="mb-2">Position</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    color={style.position === 'bottom' ? 'dark' : 'light'}
                    size="sm"
                    onClick={() => handleStyleChange('position', 'bottom')}
                  >
                    Bottom
                  </Button>
                  <Button 
                    color={style.position === 'top' ? 'dark' : 'light'}
                    size="sm"
                    onClick={() => handleStyleChange('position', 'top')}
                  >
                    Top
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-4 p-3 border border-gray-200 rounded-lg">
            <Label className="mb-2 block text-sm font-medium text-gray-700">Preview</Label>
            <div 
              className="p-2 rounded text-center" 
              style={{
                color: style.color,
                backgroundColor: style.backgroundColor,
                fontSize: `${style.fontSize}px`
              }}
            >
              {previewText}
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default SubtitleDisplay;