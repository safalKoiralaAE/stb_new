import React from 'react';
import { Button, Navbar, Avatar, Dropdown } from 'flowbite-react';
import { FaUserPlus, FaUserEdit, FaUserTimes, FaLock, FaExchangeAlt } from 'react-icons/fa';

const ProfileManagementToolbar = ({ onAddProfile, onEditProfile, onDeleteProfile, onSetRestrictions, onSwitchProfile, currentProfile }) => {
  return (
    <Navbar fluid className="bg-gray-800 px-4 py-2 rounded-lg shadow-md">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <Navbar.Brand href="#">
            <span className="self-center whitespace-nowrap text-xl font-semibold text-white">Profile Management</span>
          </Navbar.Brand>
        </div>
        
        <div className="flex items-center gap-4">
          <Button color="success" size="sm" onClick={onAddProfile}>
            <FaUserPlus className="mr-2" /> Add Profile
          </Button>
          
          {currentProfile && (
            <div className="flex items-center gap-2">
              <Button color="light" size="sm" onClick={onEditProfile}>
                <FaUserEdit className="mr-2" /> Edit
              </Button>
              
              <Button color="light" size="sm" onClick={onSetRestrictions}>
                <FaLock className="mr-2" /> Restrictions
              </Button>
              
              <Button color="light" size="sm" onClick={onDeleteProfile}>
                <FaUserTimes className="mr-2" /> Delete
              </Button>
              
              <Button color="purple" size="sm" onClick={onSwitchProfile}>
                <FaExchangeAlt className="mr-2" /> Switch Profile
              </Button>
            </div>
          )}
          
          {currentProfile && (
            <Dropdown
              label={<div className="flex items-center gap-2">
                <Avatar img={currentProfile.avatar} rounded size="sm" />
                <span className="text-white">{currentProfile.name}</span>
              </div>}
              arrowIcon={false}
              inline
            >
              <Dropdown.Header>
                <span className="block text-sm font-medium truncate">{currentProfile.name}</span>
                <span className="block text-sm font-light truncate">{currentProfile.isChild ? 'Child Account' : 'Adult Account'}</span>
              </Dropdown.Header>
              <Dropdown.Item onClick={onEditProfile}>Edit Profile</Dropdown.Item>
              <Dropdown.Item onClick={onSetRestrictions}>Manage Restrictions</Dropdown.Item>
              <Dropdown.Item onClick={onSwitchProfile}>Switch Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={onDeleteProfile}>Delete Profile</Dropdown.Item>
            </Dropdown>
          )}
        </div>
      </div>
    </Navbar>
  );
};

export default ProfileManagementToolbar;