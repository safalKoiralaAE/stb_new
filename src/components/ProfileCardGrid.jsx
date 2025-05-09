import React from 'react';
import { Card, Avatar, Button, Badge } from 'flowbite-react';
import { FaEdit, FaPlus, FaLock } from 'react-icons/fa';

const ProfileCardGrid = ({ profiles, onSelect, onEdit, onAddNew }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {profiles && profiles.map((profile) => (
        <Card key={profile.id} className="max-w-sm hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col items-center pb-4">
            <div className="relative">
              <Avatar 
                img={profile.avatarUrl} 
                size="xl" 
                rounded 
                className="mb-3 cursor-pointer" 
                onClick={() => onSelect(profile.id)}
              />
              {profile.isChild && (
                <Badge color="purple" className="absolute -top-2 -right-2">
                  <FaLock className="mr-1" /> Child
                </Badge>
              )}
            </div>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {profile.name}
            </h5>
            <div className="flex mt-4 md:mt-6">
              <Button 
                color="light" 
                onClick={() => onSelect(profile.id)}
                className="mr-2"
              >
                Select
              </Button>
              <Button 
                color="gray" 
                onClick={() => onEdit(profile.id)}
              >
                <FaEdit className="mr-2" /> Edit
              </Button>
            </div>
          </div>
        </Card>
      ))}
      
      {/* Add New Profile Card */}
      <Card className="max-w-sm border-dashed border-2 hover:shadow-lg transition-shadow duration-300">
        <div 
          className="flex flex-col items-center justify-center py-12 cursor-pointer"
          onClick={onAddNew}
        >
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-5 mb-4">
            <FaPlus className="h-8 w-8 text-gray-500 dark:text-gray-400" />
          </div>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Add New Profile
          </h5>
        </div>
      </Card>
    </div>
  );
};

export default ProfileCardGrid;