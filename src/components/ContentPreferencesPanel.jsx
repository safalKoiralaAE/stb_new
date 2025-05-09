import React, { useState } from 'react';
import { Card, Button, Label, ToggleSwitch, Select, Checkbox, Accordion } from 'flowbite-react';
import { FaFilm, FaTv, FaGlobe, FaCog, FaClosedCaptioning } from 'react-icons/fa';
import GenreFilter from '../components/GenreFilter';
import LanguageSelector from '../components/LanguageSelector';

const ContentPreferencesPanel = ({ profileId, onSave, onCancel }) => {
  const [preferences, setPreferences] = useState({
    genres: [],
    languages: ['English'],
    subtitlesEnabled: true,
    defaultSubtitleLanguage: 'English',
    autoplayEnabled: true,
    showRecommendations: true,
    maturityLevel: 'standard',
    notificationsEnabled: true
  });

  const handleGenreChange = (selectedGenres) => {
    setPreferences(prev => ({
      ...prev,
      genres: selectedGenres
    }));
  };

  const handleLanguageChange = (selectedLanguages) => {
    setPreferences(prev => ({
      ...prev,
      languages: selectedLanguages
    }));
  };

  const handleToggleChange = (field) => {
    setPreferences(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSelectChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSavePreferences = () => {
    if (onSave) onSave(preferences);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaCog className="mr-2" /> Content Preferences
      </h2>
      
      <Accordion collapseAll={false}>
        <Accordion.Panel>
          <Accordion.Title>Genre Preferences</Accordion.Title>
          <Accordion.Content>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <FaFilm className="mr-2" />
                <h3 className="text-lg font-medium">Favorite Genres</h3>
              </div>
              <GenreFilter 
                selectedGenres={preferences.genres} 
                onGenreChange={handleGenreChange} 
              />
            </div>
          </Accordion.Content>
        </Accordion.Panel>
        
        <Accordion.Panel>
          <Accordion.Title>Language Settings</Accordion.Title>
          <Accordion.Content>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <FaGlobe className="mr-2" />
                <h3 className="text-lg font-medium">Preferred Languages</h3>
              </div>
              <LanguageSelector 
                selectedLanguages={preferences.languages}
                onLanguageChange={handleLanguageChange}
              />
              
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <FaClosedCaptioning className="mr-2" />
                  <h3 className="text-lg font-medium">Subtitle Preferences</h3>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="subtitles-toggle">Enable Subtitles</Label>
                  <ToggleSwitch
                    id="subtitles-toggle"
                    checked={preferences.subtitlesEnabled}
                    onChange={() => handleToggleChange('subtitlesEnabled')}
                  />
                </div>
                
                {preferences.subtitlesEnabled && (
                  <div className="mb-4">
                    <Label htmlFor="subtitle-language" value="Default Subtitle Language" />
                    <Select
                      id="subtitle-language"
                      value={preferences.defaultSubtitleLanguage}
                      onChange={(e) => handleSelectChange('defaultSubtitleLanguage', e.target.value)}
                      className="mt-1"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Korean">Korean</option>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
        
        <Accordion.Panel>
          <Accordion.Title>Viewing Experience</Accordion.Title>
          <Accordion.Content>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <FaTv className="mr-2" />
                <h3 className="text-lg font-medium">Playback Settings</h3>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="autoplay-toggle">Autoplay Next Episode</Label>
                <ToggleSwitch
                  id="autoplay-toggle"
                  checked={preferences.autoplayEnabled}
                  onChange={() => handleToggleChange('autoplayEnabled')}
                />
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <Label htmlFor="recommendations-toggle">Show Personalized Recommendations</Label>
                <ToggleSwitch
                  id="recommendations-toggle"
                  checked={preferences.showRecommendations}
                  onChange={() => handleToggleChange('showRecommendations')}
                />
              </div>
              
              <div className="mb-4">
                <Label htmlFor="maturity-level" value="Content Maturity Level" />
                <Select
                  id="maturity-level"
                  value={preferences.maturityLevel}
                  onChange={(e) => handleSelectChange('maturityLevel', e.target.value)}
                  className="mt-1"
                >
                  <option value="children">Children (G, TV-Y)</option>
                  <option value="family">Family (PG, TV-PG)</option>
                  <option value="teen">Teen (PG-13, TV-14)</option>
                  <option value="standard">Standard (All content)</option>
                  <option value="mature">Mature (R, TV-MA)</option>
                </Select>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="notifications-toggle">Enable Content Update Notifications</Label>
                <ToggleSwitch
                  id="notifications-toggle"
                  checked={preferences.notificationsEnabled}
                  onChange={() => handleToggleChange('notificationsEnabled')}
                />
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
      
      <div className="flex justify-end space-x-3 mt-6">
        <Button color="gray" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSavePreferences}>Save Preferences</Button>
      </div>
    </Card>
  );
};

export default ContentPreferencesPanel;