import React from 'react';
import { Card, Carousel } from 'flowbite-react';
import { FaPlay, FaPlus } from 'react-icons/fa';

const ContentCarousel = ({ title, items, onItemClick }) => {
  // Handle case where items is null or undefined
  const contentItems = items || [];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-3 text-white">{title}</h2>
      <div className="h-full">
        <Carousel slideInterval={5000}>
          {contentItems.length > 0 ? (
            // Group items into rows of 3 for mobile view
            Array.from({ length: Math.ceil(contentItems.length / 3) }, (_, rowIndex) => (
              <div key={`row-${rowIndex}`} className="flex space-x-2">
                {contentItems.slice(rowIndex * 3, rowIndex * 3 + 3).map((item, index) => (
                  <Card
                    key={`item-${index}`}
                    className="max-w-sm bg-gray-800 border-none"
                    imgSrc={item.thumbnail || 'https://via.placeholder.com/300x170'}
                    imgAlt={item.title || 'Content thumbnail'}
                    onClick={() => onItemClick && onItemClick(item)}
                  >
                    <h5 className="text-md font-medium tracking-tight text-white truncate">
                      {item.title || 'Untitled Content'}
                    </h5>
                    <div className="flex space-x-2">
                      <button className="p-2 bg-red-600 rounded-full">
                        <FaPlay className="text-white" />
                      </button>
                      <button className="p-2 bg-gray-700 rounded-full">
                        <FaPlus className="text-white" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-48 bg-gray-800 rounded">
              <p className="text-gray-400">No content available</p>
            </div>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default ContentCarousel;