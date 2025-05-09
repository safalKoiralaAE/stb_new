// src/components/Header.js
import React, { useState } from 'react';
import { Navbar, Button, Avatar, Dropdown } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { HiHome, HiPlay, HiLogin, HiUserCircle } from 'react-icons/hi';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <Navbar fluid rounded className="shadow-md">
      <Navbar.Brand as={Link} to="/">
        <img
          src="https://via.placeholder.com/40"
          className="mr-3 h-6 sm:h-9"
          alt="StreamApp Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          StreamApp
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <SearchBar className="mr-3 hidden md:block" />
        {isLoggedIn ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User profile" rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">User Name</span>
              <span className="block truncate text-sm font-medium">user@example.com</span>
            </Dropdown.Header>
            <Dropdown.Item icon={HiUserCircle}>Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => setIsLoggedIn(false)}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Button onClick={() => navigate('/auth')}>
            <HiLogin className="mr-2 h-5 w-5" />
            Login
          </Button>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active={window.location.pathname === '/'}>
          <HiHome className="mr-2 h-5 w-5 inline" />
          Home
        </Navbar.Link>
        <Navbar.Link href="/main" active={window.location.pathname === '/main'}>
          Browse
        </Navbar.Link>
        <Navbar.Link href="/player" active={window.location.pathname === '/player'}>
          <HiPlay className="mr-2 h-5 w-5 inline" />
          Watch
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;