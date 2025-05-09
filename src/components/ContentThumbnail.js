import React from 'react';
import { Card, Carousel } from 'flowbite-react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

const ContentCarousel = ({ title, items, onItemClick }) => {
  // Ensure items is always an array even if it's null/undefined
  const contentItems = items || [];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-3 text-white">{title}</h2>
      
      {contentItems.length > 0 ? (
        <div className="h-56 sm:h-64">
          <Carousel slideInterval={5000}>
            {contentItems.map((item, index) => (
              <div key={index} className="h-full flex justify-center">
                <Card
                  className="max-w-sm h-full bg-gray-800 text-white border-none"
                  imgAlt={item.title}
                  imgSrc={item.image}
                  onClick={() => onItemClick(item)}
                >
                  <h5 className="text-lg font-bold tracking-tight">
                    {item.title}
                  </h5>
                  <div className="flex space-x-2 mt-2">
                    <button 
                      className="px-3 py-1 bg-red-600 rounded-md flex items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        onItemClick(item, 'play');
                      }}
                    >
                      <FaPlay className="mr-1" />
                      Play
                    </button>
                    <button 
                      className="px-3 py-1 bg-gray-600 rounded-md flex items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        onItemClick(item, 'info');
                      }}
                    >
                      <FaInfoCircle className="mr-1" />
                      Info
                    </button>
                  </div>
                </Card>
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <div className="h-56 flex items-center justify-center bg-gray-800 rounded-lg text-gray-400">
          No content available
        </div>
      )}
    </div>
  );
};

export default ContentCarousel;