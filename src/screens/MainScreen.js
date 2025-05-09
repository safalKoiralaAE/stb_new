import React from 'react';
import { Card, Carousel } from 'flowbite-react';
import { FaPlay, FaPlus } from 'react-icons/fa';

const ContentCarousel = ({ title, items, onItemClick }) => {
  // Handle fallback for empty or null items
  const contentItems = items || [];
  
  return (
    <div className="content-carousel mb-6">
      <h2 className="text-xl font-bold mb-3 text-white">{title || 'Recommended Content'}</h2>
      <Carousel
        slide={false}
        indicators={false}
        leftControl={<div className="absolute left-0 p-2 bg-black/30 rounded-full">‹</div>}
        rightControl={<div className="absolute right-0 p-2 bg-black/30 rounded-full">›</div>}
      >
        {contentItems.length > 0 ? (
          contentItems.map((item, index) => (
            <div key={index} className="flex space-x-4 px-2">
              {[...Array(Math.min(5, contentItems.length - index))].map((_, subIndex) => {
                const currentItem = contentItems[index + subIndex];
                return (
                  <div key={`${index}-${subIndex}`} className="min-w-[150px] relative">
                    <Card
                      className="overflow-hidden h-[200px] cursor-pointer hover:scale-105 transition-transform duration-200"
                      imgSrc={currentItem.poster || 'https://via.placeholder.com/150x200'}
                      onClick={() => onItemClick && onItemClick(currentItem)}
                    >
                      {/* Overlay with controls */}
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="p-2 bg-red-600 rounded-full mr-3" aria-label="Play">
                          <FaPlay />
                        </button>
                        <button className="p-2 bg-gray-700 rounded-full" aria-label="Add to list">
                          <FaPlus />
                        </button>
                      </div>
                    </Card>
                    <p className="text-sm text-white mt-1 truncate">{currentItem.title || 'Untitled'}</p>
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-[200px] bg-gray-800 rounded-lg">
            <p className="text-gray-400">No content available</p>
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default ContentCarousel;