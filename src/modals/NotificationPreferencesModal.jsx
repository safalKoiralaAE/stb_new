import React, { useState } from 'react';
import { Modal, Label, Toggle, Button, Select } from 'flowbite-react';
import { IoNotifications } from 'react-icons/io5';

const NotificationPreferencesModal = ({ show, onClose, userPreferences, onSave }) => {
  const defaultPreferences = {
    pushNotifications: true,
    emailNotifications: true,
    newContentAlerts: true,
    recommendationAlerts: true,
    accountUpdates: true,
    marketingEmails: false,
    notificationFrequency: 'immediate'
  };

  const [preferences, setPreferences] = useState(userPreferences || defaultPreferences);

  const handleToggleChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleFrequencyChange = (e) => {
    setPreferences(prev => ({
      ...prev,
      notificationFrequency: e.target.value
    }));
  };

  const handleSave = () => {
    onSave(preferences);
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose} size="md">
      <Modal.Header>
        <div className="flex items-center gap-2">
          <IoNotifications className="text-blue-600 text-xl" />
          <span>Notification Preferences</span>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="push-toggle" className="font-medium">Push Notifications</Label>
              <p className="text-sm text-gray-500">Receive alerts on your device</p>
            </div>
            <Toggle 
              id="push-toggle" 
              checked={preferences.pushNotifications}
              onChange={() => handleToggleChange('pushNotifications')}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="email-toggle" className="font-medium">Email Notifications</Label>
              <p className="text-sm text-gray-500">Receive updates via email</p>
            </div>
            <Toggle 
              id="email-toggle" 
              checked={preferences.emailNotifications}
              onChange={() => handleToggleChange('emailNotifications')}
            />
          </div>
          
          <hr className="my-2" />
          
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="content-toggle" className="font-medium">New Content Alerts</Label>
              <p className="text-sm text-gray-500">Get notified when new shows or movies are added</p>
            </div>
            <Toggle 
              id="content-toggle" 
              checked={preferences.newContentAlerts}
              onChange={() => handleToggleChange('newContentAlerts')}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="recommendation-toggle" className="font-medium">Recommendations</Label>
              <p className="text-sm text-gray-500">Personalized content suggestions</p>
            </div>
            <Toggle 
              id="recommendation-toggle" 
              checked={preferences.recommendationAlerts}
              onChange={() => handleToggleChange('recommendationAlerts')}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="account-toggle" className="font-medium">Account Updates</Label>
              <p className="text-sm text-gray-500">Security and account notifications</p>
            </div>
            <Toggle 
              id="account-toggle" 
              checked={preferences.accountUpdates}
              onChange={() => handleToggleChange('accountUpdates')}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="marketing-toggle" className="font-medium">Marketing Emails</Label>
              <p className="text-sm text-gray-500">Promotional offers and news</p>
            </div>
            <Toggle 
              id="marketing-toggle" 
              checked={preferences.marketingEmails}
              onChange={() => handleToggleChange('marketingEmails')}
            />
          </div>
          
          <div className="mt-4">
            <Label htmlFor="frequency-select" className="mb-2 block font-medium">Notification Frequency</Label>
            <Select 
              id="frequency-select"
              value={preferences.notificationFrequency}
              onChange={handleFrequencyChange}
            >
              <option value="immediate">Immediate</option>
              <option value="daily">Daily Digest</option>
              <option value="weekly">Weekly Digest</option>
            </Select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end gap-2 w-full">
          <Button color="gray" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Preferences</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default NotificationPreferencesModal;