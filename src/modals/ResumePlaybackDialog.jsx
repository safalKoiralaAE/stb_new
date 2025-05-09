import React from 'react';
import { Modal, Button } from 'flowbite-react';
import { FaPlay, FaRedo } from 'react-icons/fa';

const ResumePlaybackDialog = ({ isOpen, onClose, onResume, onStartFromBeginning, contentInfo }) => {
  // Default values for when contentInfo is null or incomplete
  const {
    title = 'Content',
    thumbnailUrl = '',
    timestamp = '0:00',
    formattedTimestamp = '0 minutes watched'
  } = contentInfo || {};

  return (
    <Modal show={isOpen} onClose={onClose} size="md">
      <Modal.Header className="border-b border-gray-700 bg-gray-800 text-white">
        <h3 className="text-xl">Resume Playback</h3>
      </Modal.Header>
      <Modal.Body className="bg-gray-800 text-white">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {thumbnailUrl && (
            <div className="w-full md:w-1/3 relative rounded overflow-hidden">
              <img 
                src={thumbnailUrl} 
                alt={`${title} thumbnail`} 
                className="w-full object-cover rounded" 
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-sm">
                {timestamp}
              </div>
            </div>
          )}
          <div className="w-full md:w-2/3">
            <h4 className="text-lg font-medium mb-2">{title}</h4>
            <p className="text-gray-300 mb-4">
              You were watching this content and stopped at {formattedTimestamp}. 
              Would you like to resume where you left off or start from the beginning?
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-t border-gray-700 bg-gray-800">
        <div className="flex w-full justify-between gap-4">
          <Button 
            color="gray" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button 
              color="light" 
              onClick={onStartFromBeginning}
            >
              <FaRedo className="mr-2 h-4 w-4" />
              Start from Beginning
            </Button>
            <Button 
              color="blue" 
              onClick={onResume}
            >
              <FaPlay className="mr-2 h-4 w-4" />
              Resume
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ResumePlaybackDialog;