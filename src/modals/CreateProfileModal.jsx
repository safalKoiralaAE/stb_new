import React, { useState } from 'react';
import { Modal, Button, Label, TextInput, FileInput, Select, Checkbox, Avatar, Badge } from 'flowbite-react';
import { HiUser, HiUpload, HiCheck } from 'react-icons/hi';

const CreateProfileModal = ({ isOpen, onClose, onSave }) => {
  const [profileData, setProfileData] = useState({
    name: '',
    age: '',
    isChild: false,
    contentPreferences: [],
    avatarPreview: null,
    avatarFile: null
  });

  const [errors, setErrors] = useState({});

  const contentGenres = [
    'Action', 'Comedy', 'Drama', 'Fantasy', 'Horror',
    'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Documentary', 'Animation'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData({
      ...profileData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleGenreSelect = (genre) => {
    setProfileData(prev => {
      const updatedPreferences = prev.contentPreferences.includes(genre)
        ? prev.contentPreferences.filter(g => g !== genre)
        : [...prev.contentPreferences, genre];
      
      return {
        ...prev,
        contentPreferences: updatedPreferences
      };
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          avatarPreview: reader.result,
          avatarFile: file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profileData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!profileData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(profileData.age) || parseInt(profileData.age) <= 0) {
      newErrors.age = 'Please enter a valid age';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(profileData);
      onClose();
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="xl">
      <Modal.Header>
        <span className="text-xl font-semibold">Create New Profile</span>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center mb-4">
            {profileData.avatarPreview ? (
              <div className="relative">
                <Avatar 
                  img={profileData.avatarPreview} 
                  size="xl" 
                  rounded 
                  className="w-24 h-24 object-cover"
                />
                {profileData.isChild && (
                  <Badge color="purple" className="absolute -top-2 -right-2">
                    Child
                  </Badge>
                )}
              </div>
            ) : (
              <div className="relative bg-gray-100 rounded-full p-8">
                <HiUser className="w-16 h-16 text-gray-400" />
                {profileData.isChild && (
                  <Badge color="purple" className="absolute -top-2 -right-2">
                    Child
                  </Badge>
                )}
              </div>
            )}
            <div className="mt-4">
              <FileInput
                id="avatar"
                name="avatar"
                helperText="Upload a profile picture (optional)"
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="mb-4">
                <Label htmlFor="name" value="Profile Name" />
                <TextInput
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  placeholder="Enter profile name"
                  required
                  color={errors.name ? 'failure' : undefined}
                  helperText={errors.name}
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="age" value="Age" />
                <TextInput
                  id="age"
                  name="age"
                  type="number"
                  value={profileData.age}
                  onChange={handleInputChange}
                  placeholder="Enter age"
                  required
                  color={errors.age ? 'failure' : undefined}
                  helperText={errors.age}
                />
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="isChild"
                    name="isChild"
                    checked={profileData.isChild}
                    onChange={handleInputChange}
                  />
                  <Label htmlFor="isChild" value="This is a child account (enables parental controls)" />
                </div>
              </div>
            </div>

            <div>
              <Label value="Content Preferences" />
              <div className="mt-2 flex flex-wrap gap-2">
                {contentGenres.map((genre) => (
                  <Button
                    key={genre}
                    color={profileData.contentPreferences.includes(genre) ? 'success' : 'light'}
                    size="xs"
                    onClick={() => handleGenreSelect(genre)}
                    className="mb-2"
                  >
                    {profileData.contentPreferences.includes(genre) && (
                      <HiCheck className="mr-1" />
                    )}
                    {genre}
                  </Button>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Select genres you're interested in (optional)
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end w-full gap-2">
          <Button color="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button color="success" onClick={handleSubmit}>
            Create Profile
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateProfileModal;