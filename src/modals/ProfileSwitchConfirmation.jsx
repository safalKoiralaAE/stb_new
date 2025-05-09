import React, { useState } from 'react';
import { Modal, Button, TextInput, Avatar, Alert } from 'flowbite-react';
import { HiExclamation, HiLockClosed } from 'react-icons/hi';

const ProfileSwitchConfirmation = ({ isOpen, onClose, onConfirm, targetProfile, isRestricted, requiresPin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  
  const handlePinSubmit = () => {
    // In a real implementation, this would validate the PIN against stored value
    if (pin.length === 4) {
      setError('');
      onConfirm(targetProfile);
      setPin('');
    } else {
      setError('Please enter a valid 4-digit PIN');
    }
  };

  const handleConfirm = () => {
    if (requiresPin) {
      handlePinSubmit();
    } else {
      onConfirm(targetProfile);
    }
  };

  const handleClose = () => {
    setPin('');
    setError('');
    onClose();
  };

  return (
    <Modal show={isOpen} onClose={handleClose} size="md">
      <Modal.Header>
        Switch Profile
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col items-center gap-4">
          {targetProfile && (
            <div className="flex flex-col items-center">
              <Avatar
                img={targetProfile.avatarUrl}
                size="xl"
                rounded
                bordered
                alt={`${targetProfile.name}'s profile`}
              />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                {targetProfile.name}
              </h3>
              {isRestricted && (
                <div className="flex items-center mt-2 text-amber-600">
                  <HiLockClosed className="mr-1" />
                  <span>Restricted Profile</span>
                </div>
              )}
            </div>
          )}
          
          <p className="text-base text-gray-500 dark:text-gray-400 text-center">
            {isRestricted
              ? "This is a restricted profile. Authentication is required to switch to this profile."
              : "Are you sure you want to switch to this profile? Any unsaved progress in the current profile will be lost."}
          </p>
          
          {requiresPin && (
            <div className="w-full">
              <div className="mb-2 block">
                <label htmlFor="pin" className="text-sm font-medium text-gray-900 dark:text-white">
                  Enter PIN to continue
                </label>
              </div>
              <TextInput
                id="pin"
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter 4-digit PIN"
                required
              />
              {error && (
                <Alert color="failure" icon={HiExclamation} className="mt-2">
                  {error}
                </Alert>
              )}
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} disabled={requiresPin && pin.length !== 4}>
          {requiresPin ? "Confirm PIN" : "Switch Profile"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileSwitchConfirmation;
