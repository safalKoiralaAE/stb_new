import React, { useState } from 'react';
import { Card, Tabs, Label, TextInput, ToggleSwitch, Select, Button, Badge, RangeSlider, Avatar, Timeline } from 'flowbite-react';
import { FiClock, FiShield, FiEye, FiAlertTriangle, FiLock } from 'react-icons/fi';

const ParentalControlsDashboard = ({ profileId, onSaveSettings }) => {
  const [activeTab, setActiveTab] = useState('age-restrictions');
  const [settings, setSettings] = useState({
    pinCode: '1234',
    ageRestriction: 'PG-13',
    maxViewingHours: 3,
    contentFilters: {
      violence: true,
      language: true,
      sexualContent: true,
      substanceUse: true
    },
    viewingSchedule: {
      weekdayStart: '15:00',
      weekdayEnd: '19:00',
      weekendStart: '10:00',
      weekendEnd: '21:00'
    },
    blockedContent: [
      { id: 1, title: 'Violent Action Series', category: 'Violence', date: '2023-04-15' },
      { id: 2, title: 'Adult Comedy Show', category: 'Language', date: '2023-04-10' },
    ]
  });

  const handleSettingChange = (section, field, value) => {
    if (section) {
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSaveSettings = () => {
    if (onSaveSettings) {
      onSaveSettings(profileId, settings);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <Avatar size="lg" rounded img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" />
        <div>
          <h2 className="text-2xl font-bold">Parental Controls</h2>
          <p className="text-gray-500">Child Profile: Alex</p>
        </div>
      </div>

      <Tabs.Group
        style="underline"
        onActiveTabChange={(tab) => setActiveTab(tab)}
      >
        <Tabs.Item
          title="Age Restrictions"
          icon={FiShield}
          active={activeTab === 'age-restrictions'}
        >
          <div className="space-y-4 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="mb-4">
                  <Label htmlFor="ageRestriction" value="Content Rating Limit" />
                  <Select 
                    id="ageRestriction"
                    value={settings.ageRestriction}
                    onChange={(e) => handleSettingChange(null, 'ageRestriction', e.target.value)}
                  >
                    <option value="G">G (General Audiences)</option>
                    <option value="PG">PG (Parental Guidance Suggested)</option>
                    <option value="PG-13">PG-13 (Parents Strongly Cautioned)</option>
                    <option value="R">R (Restricted)</option>
                  </Select>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="pinCode" value="PIN Protection" />
                  <TextInput
                    id="pinCode"
                    type="password"
                    value={settings.pinCode}
                    onChange={(e) => handleSettingChange(null, 'pinCode', e.target.value)}
                    helperText="Required to change settings or override restrictions"
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Current Rating Explained:</h4>
                <p className="text-sm text-gray-700 mb-2">
                  <Badge color="warning" className="mr-2">PG-13</Badge>
                  Parents Strongly Cautioned – Some material may be inappropriate for children under 13.
                </p>
                <p className="text-sm text-gray-700">
                  May contain moderate violence, brief strong language, and suggestive themes.
                </p>
              </div>
            </div>
          </div>
        </Tabs.Item>
        
        <Tabs.Item
          title="Content Filters"
          icon={FiEye}
          active={activeTab === 'content-filters'}
        >
          <div className="space-y-4 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Filter Categories</h4>
                <div className="space-y-3">
                  <ToggleSwitch
                    checked={settings.contentFilters.violence}
                    label="Violence"
                    onChange={(checked) => handleSettingChange('contentFilters', 'violence', checked)}
                  />
                  <ToggleSwitch
                    checked={settings.contentFilters.language}
                    label="Strong Language"
                    onChange={(checked) => handleSettingChange('contentFilters', 'language', checked)}
                  />
                  <ToggleSwitch
                    checked={settings.contentFilters.sexualContent}
                    label="Sexual Content"
                    onChange={(checked) => handleSettingChange('contentFilters', 'sexualContent', checked)}
                  />
                  <ToggleSwitch
                    checked={settings.contentFilters.substanceUse}
                    label="Substance Use"
                    onChange={(checked) => handleSettingChange('contentFilters', 'substanceUse', checked)}
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Blocked Content</h4>
                <div className="max-h-64 overflow-y-auto">
                  <Timeline>
                    {settings.blockedContent.map((item) => (
                      <Timeline.Item key={item.id}>
                        <Timeline.Point icon={FiAlertTriangle} />
                        <Timeline.Content>
                          <Timeline.Time>{item.date}</Timeline.Time>
                          <Timeline.Title>{item.title}</Timeline.Title>
                          <Timeline.Body>
                            Blocked due to {item.category} content
                          </Timeline.Body>
                        </Timeline.Content>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </div>
              </div>
            </div>
          </div>
        </Tabs.Item>
        
        <Tabs.Item
          title="Viewing Time"
          icon={FiClock}
          active={activeTab === 'viewing-time'}
        >
          <div className="space-y-4 p-4">
            <div>
              <Label value={`Daily Viewing Limit: ${settings.maxViewingHours} hours`} />
              <RangeSlider
                id="viewingHours"
                min={1}
                max={8}
                value={settings.maxViewingHours}
                onChange={(e) => handleSettingChange(null, 'maxViewingHours', parseInt(e.target.value))}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <h4 className="font-medium mb-3">Weekday Schedule</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="weekdayStart" value="Start Time" />
                    <TextInput
                      id="weekdayStart"
                      type="time"
                      value={settings.viewingSchedule.weekdayStart}
                      onChange={(e) => handleSettingChange('viewingSchedule', 'weekdayStart', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="weekdayEnd" value="End Time" />
                    <TextInput
                      id="weekdayEnd"
                      type="time"
                      value={settings.viewingSchedule.weekdayEnd}
                      onChange={(e) => handleSettingChange('viewingSchedule', 'weekdayEnd', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Weekend Schedule</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="weekendStart" value="Start Time" />
                    <TextInput
                      id="weekendStart"
                      type="time"
                      value={settings.viewingSchedule.weekendStart}
                      onChange={(e) => handleSettingChange('viewingSchedule', 'weekendStart', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="weekendEnd" value="End Time" />
                    <TextInput
                      id="weekendEnd"
                      type="time"
                      value={settings.viewingSchedule.weekendEnd}
                      onChange={(e) => handleSettingChange('viewingSchedule', 'weekendEnd', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tabs.Item>
        
        <Tabs.Item
          title="Advanced Settings"
          icon={FiLock}
          active={activeTab === 'advanced'}
        >
          <div className="space-y-4 p-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-yellow-700">
                <span className="font-bold">Note:</span> These settings require PIN verification to modify.
              </p>
            </div>
            
            <ToggleSwitch
              checked={true}
              label="Require PIN for profile switching"
              onChange={() => {}}
            />
            
            <ToggleSwitch
              checked={true}
              label="Block in-app purchases"
              onChange={() => {}}
            />
            
            <ToggleSwitch
              checked={false}
              label="Allow override requests"
              onChange={() => {}}
              helperText="Child can request temporary access to blocked content"
            />
          </div>
        </Tabs.Item>
      </Tabs.Group>
      
      <div className="flex justify-end gap-2 mt-4">
        <Button color="light">Cancel</Button>
        <Button color="primary" onClick={handleSaveSettings}>Save Settings</Button>
      </div>
    </Card>
  );
};

export default ParentalControlsDashboard;
