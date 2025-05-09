import React, { useState } from 'react';
import { Button, Card, Avatar, Modal, Tabs } from 'flowbite-react';
import { FaPlus, FaEdit, FaTrash, FaLock } from 'react-icons/fa';
import ProfileSelector from '../components/ProfileSelector';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProfileManagementScreen = ({ onProfileSelect, onCreateProfile, onEditProfile, onDeleteProfile, onSetRestrictions }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRestrictionsModalOpen, setIsRestrictionsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  // Sample profiles data
  const [profiles, setProfiles] = useState([
    { id: 1, name: 'Adult Profile', avatar: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg', isChild: false },
    { id: 2, name: 'Child Profile', avatar: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg', isChild: true },
    { id: 3, name: 'Teen Profile', avatar: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg', isChild: false }
  ]);

  const handleProfileSelect = (profile) => {
    if (onProfileSelect) {
      onProfileSelect(profile);
    }
  };

  const handleCreateProfile = (newProfile) => {
    setProfiles([...profiles, { ...newProfile, id: profiles.length + 1 }]);
    setIsCreateModalOpen(false);
    if (onCreateProfile) {
      onCreateProfile(newProfile);
    }
  };

  const handleEditProfile = (updatedProfile) => {
    setProfiles(profiles.map(p => p.id === updatedProfile.id ? updatedProfile : p));
    setIsEditModalOpen(false);
    if (onEditProfile) {
      onEditProfile(updatedProfile);
    }
  };

  const handleDeleteProfile = (profileId) => {
    setProfiles(profiles.filter(p => p.id !== profileId));
    if (onDeleteProfile) {
      onDeleteProfile(profileId);
    }
  };

  const handleSetRestrictions = (profileId, restrictions) => {
    setIsRestrictionsModalOpen(false);
    if (onSetRestrictions) {
      onSetRestrictions(profileId, restrictions);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Profile Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {profiles.map(profile => (
            <Card key={profile.id} className="bg-gray-800 border-gray-700 relative">
              <div className="flex flex-col items-center">
                <Avatar size="xl" img={profile.avatar} rounded />
                <h5 className="text-xl font-medium mt-2">{profile.name}</h5>
                {profile.isChild && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full mt-2">Child Account</span>
                )}
              </div>
              <div className="flex justify-center gap-2 mt-4">
                <Button color="blue" onClick={() => handleProfileSelect(profile)}>
                  Select
                </Button>
                <Button color="gray" onClick={() => {
                  setSelectedProfile(profile);
                  setIsEditModalOpen(true);
                }}>
                  <FaEdit />
                </Button>
                <Button color="red" onClick={() => handleDeleteProfile(profile.id)}>
                  <FaTrash />
                </Button>
                {profile.isChild && (
                  <Button color="purple" onClick={() => {
                    setSelectedProfile(profile);
                    setIsRestrictionsModalOpen(true);
                  }}>
                    <FaLock />
                  </Button>
                )}
              </div>
            </Card>
          ))}
          
          <Card className="bg-gray-800 border-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors" onClick={() => setIsCreateModalOpen(true)}>
            <div className="flex flex-col items-center p-8">
              <div className="bg-gray-700 p-4 rounded-full mb-4">
                <FaPlus className="text-3xl" />
              </div>
              <h5 className="text-xl font-medium">Create New Profile</h5>
            </div>
          </Card>
        </div>

        {/* Create Profile Modal */}
        <Modal show={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
          <Modal.Header>Create New Profile</Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <div>
                <label htmlFor="profileName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Name</label>
                <input type="text" id="profileName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter profile name" />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar</label>
                <div className="flex gap-2 flex-wrap">
                  {[1, 2, 3, 4, 5].map(num => (
                    <Avatar key={num} img={`https://flowbite.com/docs/images/people/profile-picture-${num}.jpg`} rounded size="lg" className="cursor-pointer border-2 border-transparent hover:border-blue-500" />
                  ))}
                </div>
                <div className="mt-2">
                  <Button size="sm">Upload Custom Avatar</Button>
                </div>
              </div>
              
              <div>
                <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                <input type="number" id="age" min="1" max="100" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter age" />
              </div>
              
              <div className="flex items-center">
                <input id="childAccount" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="childAccount" className="ml-2 text-sm font-medium text-gray-900 dark:text-white">Child Account (enables parental controls)</label>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => handleCreateProfile({ name: 'New Profile', avatar: 'https://flowbite.com/docs/images/people/profile-picture-1.jpg', isChild: false })}>Create Profile</Button>
            <Button color="gray" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Profile Modal */}
        <Modal show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <Modal.Header>Edit Profile</Modal.Header>
          <Modal.Body>
            {selectedProfile && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="editProfileName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Name</label>
                  <input type="text" id="editProfileName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={selectedProfile.name} />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar</label>
                  <div className="flex gap-2 flex-wrap">
                    {[1, 2, 3, 4, 5].map(num => (
                      <Avatar key={num} img={`https://flowbite.com/docs/images/people/profile-picture-${num}.jpg`} rounded size="lg" className={`cursor-pointer border-2 ${selectedProfile.avatar.includes(`profile-picture-${num}`) ? 'border-blue-500' : 'border-transparent hover:border-blue-500'}`} />
                    ))}
                  </div>
                  <div className="mt-2">
                    <Button size="sm">Upload Custom Avatar</Button>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input id="editChildAccount" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" defaultChecked={selectedProfile.isChild} />
                  <label htmlFor="editChildAccount" className="ml-2 text-sm font-medium text-gray-900 dark:text-white">Child Account (enables parental controls)</label>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => handleEditProfile({ ...selectedProfile, name: selectedProfile.name + ' (Updated)' })}>Save Changes</Button>
            <Button color="gray" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
          </Modal.Footer>
        </Modal>

        {/* Restrictions Modal */}
        <Modal show={isRestrictionsModalOpen} onClose={() => setIsRestrictionsModalOpen(false)} size="xl">
          <Modal.Header>Manage Restrictions for {selectedProfile?.name}</Modal.Header>
          <Modal.Body>
            <Tabs.Group style="underline" onActiveTabChange={(tab) => setActiveTab(tab)}>
              <Tabs.Item title="Age Restrictions">
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content Rating Limits</label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option>G - General Audiences</option>
                      <option>PG - Parental Guidance Suggested</option>
                      <option>PG-13 - Parents Strongly Cautioned</option>
                      <option>R - Restricted</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PIN Protection</label>
                    <input type="password" maxLength="4" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter 4-digit PIN" />
                  </div>
                </div>
              </Tabs.Item>
              
              <Tabs.Item title="Time Limits">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input id="enableTimeLimit" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="enableTimeLimit" className="ml-2 text-sm font-medium text-gray-900 dark:text-white">Enable Daily Time Limit</label>
                  </div>
                  
                  <div>
                    <label htmlFor="dailyLimit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Daily Viewing Limit (hours)</label>
                    <input type="number" id="dailyLimit" min="1" max="24" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2" />
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Viewing Hours</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="startTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Time</label>
                        <input type="time" id="startTime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      </div>
                      <div>
                        <label htmlFor="endTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Time</label>
                        <input type="time" id="endTime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs.Item>
              
              <Tabs.Item title="Content Filters">
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Violence Level</label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option>None</option>
                      <option>Mild</option>
                      <option>Moderate</option>
                      <option>Intense</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Language</label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option>None</option>
                      <option>Mild</option>
                      <option>Moderate</option>
                      <option>Strong</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sexual Content</label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option>None</option>
                      <option>Mild</option>
                      <option>Moderate</option>
                      <option>Explicit</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Substance Use</label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option>None</option>
                      <option>Mild</option>
                      <option>Moderate</option>
                      <option>Intense</option>
                    </select>
                  </div>
                </div>
              </Tabs.Item>
            </Tabs.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => handleSetRestrictions(selectedProfile?.id, { contentRating: 'PG', timeLimit: 2 })}>Save Restrictions</Button>
            <Button color="gray" onClick={() => setIsRestrictionsModalOpen(false)}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileManagementScreen;