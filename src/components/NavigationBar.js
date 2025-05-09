import React from 'react';
import { Carousel, Card } from 'flowbite-react';
import { FaPlay, FaPlus } from 'react-icons/fa';

const ContentCarousel = ({ title, items, onItemClick }) => {
  // Handle case where items is null or empty
  const contentItems = items || [];
  
  return (
    <div className="content-carousel-container my-4">
      <h2 className="text-xl font-bold mb-2 text-white">{title || 'Recommended Content'}</h2>
      
      {contentItems.length > 0 ? (
        <div className="relative">
          <Carousel slideInterval={5000} indicators={false} className="h-56">
            {contentItems.map((item, index) => (
              <div key={index} className="flex h-full items-center justify-center px-1">
                <Card
                  imgSrc={item.thumbnail || 'https://via.placeholder.com/300x150'}
                  className="w-full h-full cursor-pointer relative overflow-hidden"
                  onClick={() => onItemClick && onItemClick(item)}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-gray-900 to-transparent">
                    <h5 className="text-md font-bold text-white truncate">{item.title}</h5>
                    <p className="text-xs text-gray-300">{item.genre}</p>
                    
                    <div className="flex mt-2 space-x-2">
                      <button className="flex items-center justify-center bg-white text-black text-xs font-medium py-1 px-3 rounded-full">
                        <FaPlay className="mr-1" /> Play
                      </button>
                      <button className="flex items-center justify-center bg-gray-800 text-white text-xs font-medium py-1 px-3 rounded-full">
                        <FaPlus className="mr-1" /> My List
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-gray-400">No content available</p>
        </div>
      )}
    </div>
  );
};

export default ContentCarousel;