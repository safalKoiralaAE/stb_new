// src/components/Header.js
import React, { useState } from 'react';
import { Navbar, Dropdown, Avatar, Button } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { HiHome, HiUserCircle, HiLogin, HiOutlineMenu } from 'react-icons/hi';
import SearchBar from './SearchBar';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would normally come from auth context

  return (
    <Navbar fluid className="border-b border-gray-200 bg-white shadow-sm">
      <Navbar.Brand as={Link} to="/">
        <img
          src="https://via.placeholder.com/150x50?text=StreamFlix"
          className="mr-3 h-6 sm:h-9"
          alt="StreamFlix Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          StreamFlix
        </span>
      </Navbar.Brand>
      
      <div className="flex md:order-2">
        <SearchBar className="mr-3 hidden md:block" />
        
        {isLoggedIn ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User profile" img="https://via.placeholder.com/150" rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Current Profile</span>
              <span className="block truncate text-sm font-medium">profile@example.com</span>
            </Dropdown.Header>
            <Dropdown.Item icon={HiUserCircle} onClick={() => navigate('/profiles')}>
              Manage Profiles
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => setIsLoggedIn(false)}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <div className="flex gap-2">
            <Button color="light" onClick={() => navigate('/auth')}>
              <HiLogin className="mr-2 h-5 w-5" />
              Sign In
            </Button>
          </div>
        )}
        
        <Navbar.Toggle />
      </div>
      
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" active={window.location.pathname === '/'}>
          <HiHome className="mr-2 h-5 w-5 inline" /> Home
        </Navbar.Link>
        <Navbar.Link as={Link} to="/main" active={window.location.pathname === '/main'}>
          Browse
        </Navbar.Link>
        {isLoggedIn && (
          <Navbar.Link as={Link} to="/profiles" active={window.location.pathname === '/profiles'}>
            <HiUserCircle className="mr-2 h-5 w-5 inline" /> Profiles
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;