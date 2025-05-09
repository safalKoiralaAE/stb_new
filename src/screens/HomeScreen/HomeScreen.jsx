import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Navbar } from 'flowbite-react';
import HeroBannerCarousel from '../components/HeroBannerCarousel';
import ContentRow from '../components/ContentRow';
import GenreQuickAccess from '../components/GenreQuickAccess';
import NavigationBar from '../components/NavigationBar';
import ProfileSwitcher from '../components/ProfileSwitcher';
import SearchBar from '../components/SearchBar';
import ContentFilter from '../components/ContentFilter';
import ContentDetailsModal from '../modals/ContentDetailsModal';
import ProfileSelectionModal from '../modals/ProfileSelectionModal';
import ContentPreferencesModal from '../modals/ContentPreferencesModal';
import NewReleasesNotification from '../modals/NewReleasesNotification';

const MainScreen = () => {
  const navigate = useNavigate();
  
  // State for modals
  const [showContentDetails, setShowContentDetails] = useState(false);
  const [showProfileSelection, setShowProfileSelection] = useState(false);
  const [showContentPreferences, setShowContentPreferences] = useState(false);
  const [showNewReleases, setShowNewReleases] = useState(true); // Show on first load
  
  // Mock data for the content sections
  const continueWatchingItems = [
    { id: 1, title: 'Stranger Things', progress: 65, thumbnail: 'https://via.placeholder.com/150x225?text=Stranger+Things' },
    { id: 2, title: 'The Crown', progress: 30, thumbnail: 'https://via.placeholder.com/150x225?text=The+Crown' },
    { id: 3, title: 'Dark', progress: 80, thumbnail: 'https://via.placeholder.com/150x225?text=Dark' },
    { id: 4, title: 'Ozark', progress: 45, thumbnail: 'https://via.placeholder.com/150x225?text=Ozark' },
    { id: 5, title: 'The Witcher', progress: 20, thumbnail: 'https://via.placeholder.com/150x225?text=The+Witcher' }
  ];
  
  const recommendedItems = [
    { id: 6, title: 'Queen\'s Gambit', thumbnail: 'https://via.placeholder.com/150x225?text=Queens+Gambit' },
    { id: 7, title: 'Breaking Bad', thumbnail: 'https://via.placeholder.com/150x225?text=Breaking+Bad' },
    { id: 8, title: 'Better Call Saul', thumbnail: 'https://via.placeholder.com/150x225?text=Better+Call+Saul' },
    { id: 9, title: 'Narcos', thumbnail: 'https://via.placeholder.com/150x225?text=Narcos' },
    { id: 10, title: 'The Last Dance', thumbnail: 'https://via.placeholder.com/150x225?text=Last+Dance' }
  ];
  
  const trendingItems = [
    { id: 11, title: 'Squid Game', popularity: 98, thumbnail: 'https://via.placeholder.com/150x225?text=Squid+Game' },
    { id: 12, title: 'Money Heist', popularity: 92, thumbnail: 'https://via.placeholder.com/150x225?text=Money+Heist' },
    { id: 13, title: 'Bridgerton', popularity: 88, thumbnail: 'https://via.placeholder.com/150x225?text=Bridgerton' },
    { id: 14, title: 'The Mandalorian', popularity: 95, thumbnail: 'https://via.placeholder.com/150x225?text=Mandalorian' },
    { id: 15, title: 'Loki', popularity: 90, thumbnail: 'https://via.placeholder.com/150x225?text=Loki' }
  ];
  
  const recentlyAddedItems = [
    { id: 16, title: 'Wednesday', isNew: true, thumbnail: 'https://via.placeholder.com/150x225?text=Wednesday' },
    { id: 17, title: 'The Sandman', isNew: true, thumbnail: 'https://via.placeholder.com/150x225?text=The+Sandman' },
    { id: 18, title: '1899', isNew: true, thumbnail: 'https://via.placeholder.com/150x225?text=1899' },
    { id: 19, title: 'House of the Dragon', isNew: true, thumbnail: 'https://via.placeholder.com/150x225?text=House+Of+Dragon' },
    { id: 20, title: 'Andor', isNew: true, thumbnail: 'https://via.placeholder.com/150x225?text=Andor' }
  ];
  
  // Mock function to handle content selection
  const handleContentSelect = (contentId) => {
    console.log(`Content selected: ${contentId}`);
    setShowContentDetails(true);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white overflow-hidden">
      {/* Top Bar with Profile Switcher and Search */}
      <div className="flex justify-between items-center p-3 bg-gray-800">
        <div className="flex items-center">
          <h1 className="text-xl font-bold mr-3">StreamFlix</h1>
          <ContentFilter />
        </div>
        <div className="flex items-center">
          <SearchBar placeholder="Search movies, shows, genres..." />
          <ProfileSwitcher onProfileClick={() => setShowProfileSelection(true)} />
        </div>
      </div>
      
      {/* Main Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto pb-16"> {/* pb-16 to ensure content isn't hidden behind the navigation bar */}
        {/* Hero Banner */}
        <HeroBannerCarousel />
        
        {/* Genre Quick Access */}
        <div className="px-4 mt-4">
          <GenreQuickAccess />
        </div>
        
        {/* Continue Watching Section */}
        <div className="mt-6">
          <ContentRow 
            title="Continue Watching" 
            items={continueWatchingItems} 
            showProgress={true}
            onItemClick={handleContentSelect}
          />
        </div>
        
        {/* Personalized Recommendations */}
        <div className="mt-6">
          <div className="flex justify-between items-center px-4 mb-2">
            <h2 className="text-xl font-bold">Recommended for You</h2>
            <Button 
              size="xs" 
              color="dark"
              onClick={() => setShowContentPreferences(true)}
            >
              Customize
            </Button>
          </div>
          <ContentRow 
            items={recommendedItems} 
            onItemClick={handleContentSelect}
          />
        </div>
        
        {/* Trending Now Section */}
        <div className="mt-6">
          <ContentRow 
            title="Trending Now" 
            items={trendingItems} 
            showPopularity={true}
            onItemClick={handleContentSelect}
          />
        </div>
        
        {/* Recently Added Section */}
        <div className="mt-6">
          <ContentRow 
            title="Recently Added" 
            items={recentlyAddedItems} 
            showNewBadge={true}
            onItemClick={handleContentSelect}
          />
        </div>
      </div>
      
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 w-full">
        <NavigationBar />
      </div>
      
      {/* Modals */}
      <ContentDetailsModal 
        show={showContentDetails} 
        onClose={() => setShowContentDetails(false)} 
      />
      
      <ProfileSelectionModal 
        show={showProfileSelection} 
        onClose={() => setShowProfileSelection(false)} 
      />
      
      <ContentPreferencesModal 
        show={showContentPreferences} 
        onClose={() => setShowContentPreferences(false)} 
      />
      
      <NewReleasesNotification 
        show={showNewReleases} 
        onClose={() => setShowNewReleases(false)} 
      />
    </div>
  );
};

export default MainScreen;
