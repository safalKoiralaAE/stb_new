import React from 'react';
import { Modal, Button, Avatar } from 'flowbite-react';
import { HiPlus, HiUserCircle } from 'react-icons/hi';

const ProfileSelectionModal = ({ isOpen, onClose, profiles, onProfileSelect, onAddProfile }) => {
  // Default profiles if none provided
  const userProfiles = profiles || [
    { id: 1, name: 'User 1', avatarUrl: null },
    { id: 2, name: 'User 2', avatarUrl: null },
    { id: 3, name: 'Kids', avatarUrl: null }
  ];

  return (
    <Modal show={isOpen} onClose={onClose} size="md" popup>
      <Modal.Header className="px-6 pt-5 pb-0">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center w-full">
          Who's watching?
        </h3>
      </Modal.Header>
      <Modal.Body className="px-6 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
          {userProfiles.map((profile) => (
            <div 
              key={profile.id} 
              className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onProfileSelect(profile)}
            >
              {profile.avatarUrl ? (
                <Avatar 
                  img={profile.avatarUrl} 
                  size="xl" 
                  rounded 
                  className="w-20 h-20"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <HiUserCircle className="w-16 h-16" />
                </div>
              )}
              <span className="mt-2 text-sm font-medium">{profile.name}</span>
            </div>
          ))}
          
          <div 
            className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onAddProfile}
          >
            <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <HiPlus className="w-10 h-10 text-gray-500 dark:text-gray-400" />
            </div>
            <span className="mt-2 text-sm font-medium">Add Profile</span>
          </div>
        </div>
        
        <div className="flex justify-center mt-4">
          <Button color="light" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileSelectionModal;