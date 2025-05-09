import React from 'react';
import { Spinner } from 'flowbite-react';

const LoadingSpinner = ({ size = 'md', color = 'info', message = 'Loading...', showMessage = true }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Spinner
        color={color}
        size={size}
        aria-label="Loading content"
      />
      {showMessage && (
        <p className="mt-3 text-gray-500 dark:text-gray-400">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
