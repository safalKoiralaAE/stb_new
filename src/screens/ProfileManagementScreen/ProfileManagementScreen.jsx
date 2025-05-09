import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, TextInput } from 'flowbite-react';
import { FaPlus, FaSearch, FaCog } from 'react-icons/fa';

// Import components
import ProfileCardGrid from '../../components/ProfileCardGrid';
import ProfileManagementToolbar from '../../components/ProfileManagementToolbar';
import ContentPreferencesPanel from '../../components/ContentPreferencesPanel';
import ViewingHistoryTimeline from '../../components/ViewingHistoryTimeline';
import ParentalControlsDashboard from '../../components/ParentalControlsDashboard';

// Import modals
import CreateProfileModal from '../../modals/CreateProfileModal';
import EditProfileModal from '../../modals/EditProfileModal';
import DeleteProfileConfirmation from '../../modals/DeleteProfileConfirmation';
import ProfileSwitchConfirmation from '../../modals/ProfileSwitchConfirmation';
import PinEntryModal from '../../modals/PinEntryModal';

const ProfileManagementScreen = () => {
  const navigate = useNavigate();
  
  // Sample profiles data
  const [profiles, setProfiles] = useState([
    { id: 1, name: 'John Doe', avatar: '/avatars/avatar1.jpg', isChild: false, age: 35 },
    { id: 2, name: 'Jane Doe', avatar: '/avatars/avatar2.jpg', isChild: false, age: 30 },
    { id: 3, name: 'Kid User', avatar: '/avatars/avatar3.jpg', isChild: true, age: 8 }
  ]);

  // States for modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  
  // State for currently selected profile
  const [selectedProfile, setSelectedProfile] = useState(null);
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // State for active tab
  const [activeTab, setActiveTab] = useState('profiles'); // profiles, preferences, history, parental

  // Handler for profile selection
  const handleProfileSelect = (profile) => {
    if (profile.isChild) {
      // If attempting to access a child profile, show PIN modal
      setSelectedProfile(profile);
      setIsPinModalOpen(true);
    } else {
      // For adult profiles, show switch confirmation
      setSelectedProfile(profile);
      setIsSwitchModalOpen(true);
    }
  };

  // Handler for creating a new profile
  const handleCreateProfile = () => {
    setIsCreateModalOpen(true);
  };

  // Handler for editing a profile
  const handleEditProfile = (profile) => {
    setSelectedProfile(profile);
    setIsEditModalOpen(true);
  };

  // Handler for deleting a profile
  const handleDeleteProfile = (profile) => {
    setSelectedProfile(profile);
    setIsDeleteModalOpen(true);
  };

  // Function to save a new profile
  const saveNewProfile = (profileData) => {
    const newProfile = {
      id: profiles.length + 1,
      ...profileData
    };
    setProfiles([...profiles, newProfile]);
    setIsCreateModalOpen(false);
  };

  // Function to update an existing profile
  const updateProfile = (profileData) => {
    setProfiles(profiles.map(profile => 
      profile.id === selectedProfile.id ? { ...profile, ...profileData } : profile
    ));
    setIsEditModalOpen(false);
  };

  // Function to delete a profile
  const confirmDeleteProfile = () => {
    setProfiles(profiles.filter(profile => profile.id !== selectedProfile.id));
    setIsDeleteModalOpen(false);
  };

  // Function to confirm profile switch
  const confirmProfileSwitch = () => {
    // In a real app, this would update the active profile in global state/context
    console.log(`Switched to profile: ${selectedProfile.name}`);
    setIsSwitchModalOpen(false);
    // Navigate to home screen with the selected profile
    navigate('/');
  };

  // Function to authenticate with PIN
  const authenticateWithPin = (pin) => {
    // In a real app, this would validate against stored PIN
    console.log(`Authenticated with PIN: ${pin}`);
    setIsPinModalOpen(false);
    // Show switch confirmation after successful PIN entry
    setIsSwitchModalOpen(true);
  };

  // Filter profiles based on search query
  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Profile Management</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <TextInput
              id="profileSearch"
              type="search"
              placeholder="Search profiles"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button 
            onClick={handleCreateProfile} 
            color="blue"
          >
            <FaPlus className="mr-2" /> Add Profile
          </Button>
        </div>
      </div>

      {/* Tabs for different sections */}
      <div className="mb-6">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <button
                onClick={() => setActiveTab('profiles')}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'profiles' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
              >
                Profiles
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => setActiveTab('preferences')}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'preferences' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
              >
                Content Preferences
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => setActiveTab('history')}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'history' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
              >
                Viewing History
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('parental')}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'parental' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
              >
                Parental Controls
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main content area based on active tab */}
      <div className="mt-6">
        {activeTab === 'profiles' && (
          <>
            <ProfileManagementToolbar 
              onCreateProfile={handleCreateProfile} 
            />
            <ProfileCardGrid 
              profiles={filteredProfiles} 
              onSelect={handleProfileSelect} 
              onEdit={handleEditProfile}
              onDelete={handleDeleteProfile}
            />
          </>
        )}
        
        {activeTab === 'preferences' && (
          <ContentPreferencesPanel 
            profiles={profiles} 
            selectedProfile={selectedProfile} 
          />
        )}
        
        {activeTab === 'history' && (
          <ViewingHistoryTimeline 
            profiles={profiles} 
            selectedProfile={selectedProfile || (profiles.length > 0 ? profiles[0] : null)} 
          />
        )}
        
        {activeTab === 'parental' && (
          <ParentalControlsDashboard 
            profiles={profiles.filter(p => p.isChild)} 
          />
        )}
      </div>

      {/* Modals */}
      <CreateProfileModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSave={saveNewProfile} 
      />
      
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        onSave={updateProfile} 
        profile={selectedProfile} 
      />
      
      <DeleteProfileConfirmation 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={confirmDeleteProfile} 
        profile={selectedProfile} 
      />
      
      <ProfileSwitchConfirmation 
        isOpen={isSwitchModalOpen} 
        onClose={() => setIsSwitchModalOpen(false)} 
        onConfirm={confirmProfileSwitch} 
        profile={selectedProfile} 
      />
      
      <PinEntryModal 
        isOpen={isPinModalOpen} 
        onClose={() => setIsPinModalOpen(false)} 
        onSubmit={authenticateWithPin} 
        profile={selectedProfile} 
      />
    </div>
  );
};

export default ProfileManagementScreen;