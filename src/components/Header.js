// src/components/Header.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import { HiMenu, HiHome, HiUser, HiFilm, HiSearch, HiLogout } from 'react-icons/hi';
import LogoBanner from './LogoBanner';
import SearchBar from './SearchBar';

const Header = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Navbar fluid className="bg-gray-900 text-white py-3 px-4 shadow-lg">
      <div className="flex items-center">
        <Navbar.Brand onClick={() => handleNavigation('/main')} className="cursor-pointer">
          <LogoBanner />
        </Navbar.Brand>
      </div>

      <div className="flex md:order-2 items-center space-x-3">
        {isSearchOpen ? (
          <div className="md:w-64">
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        ) : (
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full hover:bg-gray-700"
          >
            <HiSearch className="text-xl" />
          </button>
        )}

        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User profile" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">User Profile</span>
            <span className="block truncate text-sm font-medium">user@example.com</span>
          </Dropdown.Header>
          <Dropdown.Item icon={HiUser}>Profile</Dropdown.Item>
          <Dropdown.Item icon={HiFilm}>Watchlist</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item icon={HiLogout} onClick={() => handleNavigation('/')}>Sign out</Dropdown.Item>
        </Dropdown>
        
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link
          onClick={() => handleNavigation('/main')}
          className="flex items-center text-white hover:text-blue-400 cursor-pointer"
        >
          <HiHome className="mr-2" />
          Home
        </Navbar.Link>
        <Navbar.Link 
          className="flex items-center text-white hover:text-blue-400 cursor-pointer"
        >
          <HiFilm className="mr-2" />
          Movies
        </Navbar.Link>
        <Navbar.Link 
          className="flex items-center text-white hover:text-blue-400 cursor-pointer"
        >
          <HiFilm className="mr-2" />
          Series
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;