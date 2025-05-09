import React, { useState } from 'react';
import { Avatar, Button, Dropdown } from 'flowbite-react';
import { HiOutlineUserCircle, HiPencil } from 'react-icons/hi';

const ProfileSelector = ({ profiles, activeProfile, onProfileSelect, onManageProfiles }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Default profiles if none provided
  const userProfiles = profiles || [
    { id: 1, name: 'Main Profile', avatar: null, isKids: false },
    { id: 2, name: 'Kids', avatar: null, isKids: true },
    { id: 3, name: 'Guest', avatar: null, isKids: false }
  ];

  // Current active profile or default to first profile
  const currentProfile = activeProfile || userProfiles[0];

  return (
    <div className="profile-selector">
      <Dropdown
        label=""
        dismissOnClick={true}
        renderTrigger={() => (
          <button className="flex items-center space-x-2 focus:outline-none">
            {currentProfile.avatar ? (
              <Avatar img={currentProfile.avatar} rounded size="sm" />
            ) : (
              <div className="bg-gray-700 rounded-full p-1">
                <HiOutlineUserCircle className="text-white h-6 w-6" />
              </div>
            )}
            <span className="text-white text-sm hidden sm:inline">{currentProfile.name}</span>
          </button>
        )}
      >
        <Dropdown.Header>
          <span className="block text-sm font-medium">Profiles</span>
        </Dropdown.Header>
        
        {userProfiles.map(profile => (
          <Dropdown.Item 
            key={profile.id}
            onClick={() => onProfileSelect && onProfileSelect(profile.id)}
            className={`flex items-center ${currentProfile.id === profile.id ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          >
            {profile.avatar ? (
              <Avatar img={profile.avatar} rounded size="xs" className="mr-2" />
            ) : (
              <HiOutlineUserCircle className="h-5 w-5 mr-2" />
            )}
            <span>
              {profile.name}
              {profile.isKids && <span className="ml-2 text-xs text-blue-500">(Kids)</span>}
            </span>
          </Dropdown.Item>
        ))}
        
        <Dropdown.Divider />
        
        <Dropdown.Item onClick={() => onManageProfiles && onManageProfiles()}>
          <div className="flex items-center">
            <HiPencil className="mr-2 h-5 w-5" />
            <span>Manage Profiles</span>
          </div>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default ProfileSelector;