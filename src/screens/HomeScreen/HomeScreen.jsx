import React, { useState } from 'react';
import { Button, Card } from 'flowbite-react';
import FeaturedContentBanner from '../components/FeaturedContentBanner';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';
import CategoryRow from '../components/CategoryRow';
import QuickAccessToolbar from '../components/QuickAccessToolbar';
import ProfileSelector from '../components/ProfileSelector';
import SearchBar from '../components/SearchBar';
import ContentFilter from '../components/ContentFilter';
import GenreFilter from '../components/GenreFilter';
import LanguageSelector from '../components/LanguageSelector';
import ContentPreviewModal from '../modals/ContentPreviewModal';
import ProfileSelectionModal from '../modals/ProfileSelectionModal';
import WatchlistConfirmationModal from '../modals/WatchlistConfirmationModal';
import NotificationPreferencesModal from '../modals/NotificationPreferencesModal';

const MainScreen = () => {
  // State for modal visibility
  const [showContentPreview, setShowContentPreview] = useState(false);
  const [showProfileSelection, setShowProfileSelection] = useState(false);
  const [showWatchlistConfirmation, setShowWatchlistConfirmation] = useState(false);
  const [showNotificationPreferences, setShowNotificationPreferences] = useState(false);
  
  // State for selected content (for preview modal)
  const [selectedContent, setSelectedContent] = useState(null);
  
  // Handler for content selection
  const handleContentSelect = (content) => {
    setSelectedContent(content);
    setShowContentPreview(true);
  };
  
  // Handler for adding to watchlist
  const handleAddToWatchlist = (content) => {
    // Logic to add to watchlist would go here
    setShowWatchlistConfirmation(true);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <Button onClick={() => setShowProfileSelection(true)} className="p-0 bg-transparent">
            <img
              src="https://placeholder.pics/svg/30/DEDEDE/555555/profile"
              alt="Profile"
              className="rounded-full w-8 h-8"
            />
          </Button>
          <LanguageSelector />
        </div>
        <SearchBar />
      </div>
      
      <div className="flex-1 overflow-y-auto pb-16">
        <FeaturedContentBanner onContentSelect={handleContentSelect} />
        
        <div className="px-4 py-2">
          <div className="flex justify-between items-center mb-4">
            <ContentFilter />
            <GenreFilter />
          </div>
          
          <PersonalizedRecommendations 
            onContentSelect={handleContentSelect} 
            onAddToWatchlist={handleAddToWatchlist}
          />
          
          <CategoryRow 
            title="Trending Now" 
            onContentSelect={handleContentSelect}
            onAddToWatchlist={handleAddToWatchlist}
          />
          
          <CategoryRow 
            title="New Releases" 
            onContentSelect={handleContentSelect}
            onAddToWatchlist={handleAddToWatchlist}
          />
          
          <CategoryRow 
            title="Continue Watching" 
            onContentSelect={handleContentSelect}
            onAddToWatchlist={handleAddToWatchlist}
          />
          
          <CategoryRow 
            title="Because You Watched" 
            onContentSelect={handleContentSelect}
            onAddToWatchlist={handleAddToWatchlist}
          />
        </div>
      </div>
      
      <QuickAccessToolbar 
        onProfileClick={() => setShowProfileSelection(true)}
        onNotificationsClick={() => setShowNotificationPreferences(true)}
      />
      
      {/* Modals */}
      {showContentPreview && (
        <ContentPreviewModal 
          content={selectedContent} 
          onClose={() => setShowContentPreview(false)} 
          onAddToWatchlist={handleAddToWatchlist}
        />
      )}
      
      {showProfileSelection && (
        <ProfileSelectionModal 
          onClose={() => setShowProfileSelection(false)} 
        />
      )}
      
      {showWatchlistConfirmation && (
        <WatchlistConfirmationModal 
          onClose={() => setShowWatchlistConfirmation(false)} 
        />
      )}
      
      {showNotificationPreferences && (
        <NotificationPreferencesModal 
          onClose={() => setShowNotificationPreferences(false)} 
        />
      )}
    </div>
  );
};

export default MainScreen;