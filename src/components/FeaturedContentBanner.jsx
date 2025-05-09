import React from 'react';
import { Card, Button } from 'flowbite-react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

const FeaturedContentBanner = ({ title, description, imageUrl, onPlayClick, onInfoClick }) => {
  return (
    <div className="mb-4 w-full">
      <Card className="overflow-hidden relative">
        <div 
          className="h-48 md:h-64 w-full bg-cover bg-center" 
          style={{ 
            backgroundImage: `url(${imageUrl || 'https://via.placeholder.com/800x400?text=Featured+Content'})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent">
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h2 className="text-xl font-bold mb-1">{title || 'Featured Content'}</h2>
              <p className="text-sm mb-3 line-clamp-2">
                {description || 'Watch this trending content now available on our platform.'}
              </p>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  color="red" 
                  onClick={onPlayClick}
                  className="flex items-center"
                >
                  <FaPlay className="mr-2" /> Play
                </Button>
                <Button 
                  size="sm" 
                  color="gray" 
                  onClick={onInfoClick}
                  className="flex items-center"
                >
                  <FaInfoCircle className="mr-2" /> More Info
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FeaturedContentBanner;