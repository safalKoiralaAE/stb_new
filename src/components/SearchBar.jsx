import React, { useState } from 'react';
import { TextInput, Button } from 'flowbite-react';
import { HiSearch, HiX } from 'react-icons/hi';

const SearchBar = ({ onSearch, placeholder = 'Search for movies, shows, genres...' }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <HiSearch className="w-5 h-5 text-gray-500" />
        </div>
        <TextInput
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10"
          placeholder={placeholder}
        />
        {searchQuery && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              type="button"
              onClick={clearSearch}
              className="text-gray-500 hover:text-gray-700"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      <Button type="submit" color="dark" className="ml-2 px-4">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
