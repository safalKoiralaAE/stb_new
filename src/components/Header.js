// src/components/Header.js
import React, { useState } from 'react';
import { Navbar, Button, Dropdown, Avatar } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa';
import LogoBanner from './LogoBanner';
import SearchBar from './SearchBar';

const Header = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-800 shadow-md">
      <Navbar fluid className="px-4 py-2.5 bg-gray-800 text-white">
        <Navbar.Brand onClick={() => handleNavigation('/')} className="cursor-pointer">
          <LogoBanner />
        </Navbar.Brand>
        
        <div className="flex items-center md:order-2 space-x-3">
          {!isSearchOpen && (
            <Button color="gray" pill onClick={() => setIsSearchOpen(true)}>
              <FaSearch />
            </Button>
          )}
          
          {isSearchOpen && (
            <div className="absolute left-0 right-0 px-4 bg-gray-800 md:relative md:w-96">
              <SearchBar onClose={() => setIsSearchOpen(false)} />
            </div>
          )}
          
          <Button color="gray" pill>
            <FaBell />
          </Button>
          
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User" rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Username</span>
              <span className="block truncate text-sm font-medium">user@email.com</span>
            </Dropdown.Header>
            <Dropdown.Item onClick={() => handleNavigation('/profile')}>Profile</Dropdown.Item>
            <Dropdown.Item onClick={() => handleNavigation('/settings')}>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => handleNavigation('/login')}>Sign out</Dropdown.Item>
          </Dropdown>
          
          <Navbar.Toggle />
        </div>
        
        <Navbar.Collapse>
          <Navbar.Link 
            className="text-white hover:text-gray-300" 
            onClick={() => handleNavigation('/')}
          >
            Home
          </Navbar.Link>
          <Navbar.Link 
            className="text-white hover:text-gray-300" 
            onClick={() => handleNavigation('/main')}
          >
            Browse
          </Navbar.Link>
          <Navbar.Link 
            className="text-white hover:text-gray-300" 
            onClick={() => handleNavigation('/movies')}
          >
            Movies
          </Navbar.Link>
          <Navbar.Link 
            className="text-white hover:text-gray-300" 
            onClick={() => handleNavigation('/series')}
          >
            Series
          </Navbar.Link>
          <Navbar.Link 
            className="text-white hover:text-gray-300" 
            onClick={() => handleNavigation('/watchlist')}
          >
            My List
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;