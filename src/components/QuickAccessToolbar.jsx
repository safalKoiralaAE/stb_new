import React from 'react';
import { Button, Navbar } from 'flowbite-react';
import { HiHome, HiSearch, HiBookmark, HiUser } from 'react-icons/hi';

const QuickAccessToolbar = ({ onSearchClick, onWatchlistClick, onProfileClick, onHomeClick }) => {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        <Button
          onClick={onHomeClick}
          color="gray"
          className="inline-flex flex-col items-center justify-center px-5 rounded-none hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <HiHome className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Home</span>
        </Button>
        <Button
          onClick={onSearchClick}
          color="gray"
          className="inline-flex flex-col items-center justify-center px-5 rounded-none hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <HiSearch className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Search</span>
        </Button>
        <Button
          onClick={onWatchlistClick}
          color="gray"
          className="inline-flex flex-col items-center justify-center px-5 rounded-none hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <HiBookmark className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Watchlist</span>
        </Button>
        <Button
          onClick={onProfileClick}
          color="gray"
          className="inline-flex flex-col items-center justify-center px-5 rounded-none hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <HiUser className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Profile</span>
        </Button>
      </div>
    </div>
  );
};

export default QuickAccessToolbar;