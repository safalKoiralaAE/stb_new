import React from 'react';
import { Modal, Button, Progress } from 'flowbite-react';
import { FaPlay, FaPlus, FaThumbsUp, FaThumbsDown, FaShare } from 'react-icons/fa';

const ContentPreviewModal = ({ isOpen, onClose, content, onPlay }) => {
  // Default content in case content prop is null or undefined
  const defaultContent = {
    title: 'Content Title',
    description: 'Content description not available',
    releaseYear: new Date().getFullYear(),
    duration: '1h 30m',
    matchPercentage: 85,
    genres: ['Drama', 'Action'],
    thumbnail: 'https://via.placeholder.com/800x450',
    cast: ['Actor 1', 'Actor 2', 'Actor 3'],
  };

  // Use provided content or default if not available
  const {
    title,
    description,
    releaseYear,
    duration,
    matchPercentage,
    genres,
    thumbnail,
    cast
  } = content || defaultContent;

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      size="md"
      className="mobile-preview-modal"
    >
      <Modal.Header className="border-b-0 bg-gray-900 text-white">
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-700 hover:text-white rounded-lg p-1.5"
          onClick={onClose}
        >
          <span className="sr-only">Close</span>
          ✕
        </button>
      </Modal.Header>
      <Modal.Body className="p-0 bg-gray-900 text-white">
        <div className="relative">
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full object-cover h-48 md:h-64"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent flex items-end p-4">
            <h3 className="text-2xl font-bold">{title}</h3>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-green-500 font-bold">{matchPercentage}% Match</span>
            <span className="text-gray-400">{releaseYear}</span>
            <span className="text-gray-400">{duration}</span>
          </div>
          
          <p className="text-sm text-gray-300 mb-4">{description}</p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {genres && genres.map((genre, index) => (
              <span key={index} className="text-xs bg-gray-800 px-2 py-1 rounded">{genre}</span>
            ))}
          </div>

          <div className="flex justify-between mb-6">
            <Button color="failure" size="lg" onClick={onPlay} className="flex-1 mr-2">
              <FaPlay className="mr-2" /> Play
            </Button>
            <Button color="gray" size="sm" className="rounded-full p-2">
              <FaPlus />
            </Button>
            <Button color="gray" size="sm" className="rounded-full p-2">
              <FaThumbsUp />
            </Button>
            <Button color="gray" size="sm" className="rounded-full p-2">
              <FaThumbsDown />
            </Button>
            <Button color="gray" size="sm" className="rounded-full p-2">
              <FaShare />
            </Button>
          </div>
          
          {cast && cast.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm text-gray-400 mb-1">Cast:</h4>
              <p className="text-sm">{cast.join(', ')}</p>
            </div>
          )}
          
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">Watch progress</span>
              <span className="text-sm">12 min left</span>
            </div>
            <Progress progress={75} size="sm" color="red" />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ContentPreviewModal;