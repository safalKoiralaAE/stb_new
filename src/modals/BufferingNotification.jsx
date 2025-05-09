import React from 'react';
import { Spinner } from 'flowbite-react';

const BufferingNotification = ({ isBuffering = false, message = "Loading your video..." }) => {
  if (!isBuffering) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <Spinner size="xl" color="info" aria-label="Video buffering" />
        <p className="mt-4 text-gray-200">{message}</p>
      </div>
    </div>
  );
};

export default BufferingNotification;
