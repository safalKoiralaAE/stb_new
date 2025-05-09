import React, { useState } from 'react';
import { Avatar, Button, Navbar, DarkThemeToggle, Dropdown, Modal, Card, Carousel } from 'flowbite-react';
import { FiHome, FiSearch, FiBookmark, FiUser, FiBell } from 'react-icons/fi';

const MainScreen = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  // Mock data for content categories
  const contentCategories = [
    {
      id: 1,
      title: 'Continue Watching',
      items: [
        { id: 101, title: 'Stranger Things', image: 'https://via.placeholder.com/150x225?text=Stranger+Things', progress: 75 },
        { id: 102, title: 'The Crown', image: 'https://via.placeholder.com/150x225?text=The+Crown', progress: 30 },
        { id: 103, title: 'Ozark', image: 'https://via.placeholder.com/150x225?text=Ozark', progress: 50 },
        { id: 104, title: 'The Witcher', image: 'https://via.placeholder.com/150x225?text=The+Witcher', progress: 60 },
      ],
    },
    {
      id: 2,
      title: 'Trending Now',
      items: [
        { id: 201, title: 'Squid Game', image: 'https://via.placeholder.com/150x225?text=Squid+Game' },
        { id: 202, title: 'Money Heist', image: 'https://via.placeholder.com/150x225?text=Money+Heist' },
        { id: 203, title: 'Bridgerton', image: 'https://via.placeholder.com/150x225?text=Bridgerton' },
        { id: 204, title: 'The Queen\'s Gambit', image: 'https://via.placeholder.com/150x225?text=Queens+Gambit' },
      ],
    },
    {
      id: 3,
      title: 'New Releases',
      items: [
        { id: 301, title: 'Don\'t Look Up', image: 'https://via.placeholder.com/150x225?text=Dont+Look+Up' },
        { id: 302, title: 'The Adam Project', image: 'https://via.placeholder.com/150x225?text=Adam+Project' },
        { id: 303, title: 'Red Notice', image: 'https://via.placeholder.com/150x225?text=Red+Notice' },
        { id: 304, title: 'The Gray Man', image: 'https://via.placeholder.com/150x225?text=Gray+Man' },
      ],
    },
  ];

  // Featured content for hero carousel
  const featuredContent = [
    { id: 1, title: 'Stranger Things 4', description: 'New season now streaming', image: 'https://via.placeholder.com/800x400?text=Stranger+Things+4' },
    { id: 2, title: 'The Witcher', description: 'Return to the Continent', image: 'https://via.placeholder.com/800x400?text=The+Witcher' },
    { id: 3, title: 'Squid Game', description: 'The hit Korean thriller', image: 'https://via.placeholder.com/800x400?text=Squid+Game' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Top navigation */}
      <Navbar fluid className="bg-gray-900 border-b border-gray-800">
        <Navbar.Brand href="/">
          <img src="https://via.placeholder.com/40?text=Logo" className="mr-3 h-6 sm:h-8" alt="Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white">StreamFlix</span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button onClick={() => setSearchOpen(true)} color="gray" className="mr-2">
            <FiSearch className="h-5 w-5" />
          </Button>
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img="https://via.placeholder.com/40?text=User" rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">John Doe</span>
              <span className="block truncate text-sm font-medium">john.doe@example.com</span>
            </Dropdown.Header>
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Watchlist</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      </Navbar>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto pb-16">
        {/* Hero carousel */}
        <div className="w-full">
          <Carousel>
            {featuredContent.map((item) => (
              <div key={item.id} className="relative h-56 md:h-96">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                  <h2 className="text-2xl font-bold">{item.title}</h2>
                  <p>{item.description}</p>
                  <div className="mt-2 flex gap-2">
                    <Button color="red">Play</Button>
                    <Button color="gray">More Info</Button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Content categories */}
        <div className="px-4 py-6 space-y-8">
          {contentCategories.map((category) => (
            <div key={category.id}>
              <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
              <div className="flex overflow-x-auto space-x-4 pb-4">
                {category.items.map((item) => (
                  <div key={item.id} className="flex-none w-[150px]">
                    <div className="relative rounded overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-[225px] object-cover" />
                      {item.progress && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                          <div 
                            className="h-full bg-red-600" 
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-sm truncate">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom navigation for mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
        <div className="flex justify-around items-center py-2">
          <Button color="gray" pill className="flex flex-col items-center">
            <FiHome className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Button>
          <Button color="gray" pill className="flex flex-col items-center">
            <FiSearch className="h-5 w-5" />
            <span className="text-xs mt-1">Search</span>
          </Button>
          <Button color="gray" pill className="flex flex-col items-center">
            <FiBookmark className="h-5 w-5" />
            <span className="text-xs mt-1">Watchlist</span>
          </Button>
          <Button color="gray" pill className="flex flex-col items-center">
            <FiUser className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Button>
        </div>
      </div>

      {/* Search modal */}
      <Modal show={searchOpen} onClose={() => setSearchOpen(false)} size="md">
        <Modal.Header className="border-b border-gray-700 bg-gray-800 text-white">
          Search
        </Modal.Header>
        <Modal.Body className="bg-gray-800 text-white">
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                className="block w-full p-4 pl-10 text-sm text-white border border-gray-600 rounded-lg bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for movies, TV shows..."
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Popular Searches</h3>
            <div className="space-y-2">
              <Button color="gray" className="w-full justify-start">
                Stranger Things
              </Button>
              <Button color="gray" className="w-full justify-start">
                The Witcher
              </Button>
              <Button color="gray" className="w-full justify-start">
                Squid Game
              </Button>
              <Button color="gray" className="w-full justify-start">
                Money Heist
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MainScreen;
