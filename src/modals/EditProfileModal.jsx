import React, { useState } from 'react';
import { Modal, Button, Label, TextInput, FileInput, Select, Toggle, Avatar } from 'flowbite-react';
import { HiPencil, HiX } from 'react-icons/hi';

const EditProfileModal = ({ isOpen, onClose, profile, onSave }) => {
  const [formData, setFormData] = useState(profile || {
    name: '',
    age: '',
    isChildAccount: false,
    avatar: null,
    contentPreferences: {
      genre: 'all',
      language: 'english',
      subtitles: false
    }
  });

  const [previewAvatar, setPreviewAvatar] = useState(profile?.avatar || null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result);
        setFormData({
          ...formData,
          avatar: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="md">
      <Modal.Header>
        {profile ? 'Edit Profile' : 'Create New Profile'}
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Avatar 
                img={previewAvatar} 
                size="xl" 
                rounded 
                alt={formData.name || 'Profile avatar'}
                placeholderInitials={formData.name ? formData.name.charAt(0).toUpperCase() : 'P'}
              />
              <div className="absolute bottom-0 right-0 bg-blue-700 rounded-full p-1 cursor-pointer">
                <Label htmlFor="avatar" className="cursor-pointer">
                  <HiPencil className="text-white" />
                </Label>
                <FileInput 
                  id="avatar" 
                  onChange={handleAvatarChange} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="name">Profile Name</Label>
            <TextInput
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="age">Age</Label>
            <TextInput
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Toggle
              id="isChildAccount"
              name="isChildAccount"
              checked={formData.isChildAccount}
              onChange={handleChange}
              color="blue"
            />
            <Label htmlFor="isChildAccount">Child Account (Enables Parental Controls)</Label>
          </div>
          
          <div>
            <Label htmlFor="contentPreferences.genre">Preferred Genre</Label>
            <Select
              id="contentPreferences.genre"
              name="contentPreferences.genre"
              value={formData.contentPreferences.genre}
              onChange={handleChange}
            >
              <option value="all">All Genres</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
              <option value="scifi">Sci-Fi</option>
              <option value="horror">Horror</option>
              <option value="documentary">Documentary</option>
              <option value="animation">Animation</option>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="contentPreferences.language">Preferred Language</Label>
            <Select
              id="contentPreferences.language"
              name="contentPreferences.language"
              value={formData.contentPreferences.language}
              onChange={handleChange}
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="japanese">Japanese</option>
              <option value="korean">Korean</option>
              <option value="chinese">Chinese</option>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Toggle
              id="contentPreferences.subtitles"
              name="contentPreferences.subtitles"
              checked={formData.contentPreferences.subtitles}
              onChange={handleChange}
              color="blue"
            />
            <Label htmlFor="contentPreferences.subtitles">Enable Subtitles by Default</Label>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={onClose}>Cancel</Button>
        <Button color="blue" onClick={handleSubmit}>{profile ? 'Save Changes' : 'Create Profile'}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
