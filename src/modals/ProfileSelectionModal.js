import React from 'react';
import { Carousel, Card } from 'flowbite-react';
import { FaPlay, FaPlus } from 'react-icons/fa';

const ContentCarousel = ({ title, items, onItemClick }) => {
  // Handle null or empty items array
  const contentItems = items || [];
  
  return (
    <div className="content-carousel my-4">
      {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
      
      {contentItems.length > 0 ? (
        <div className="relative">
          <Carousel slide={false} indicators={false}>
            {contentItems.map((item, index) => (
              <div key={item.id || index} className="px-1">
                <Card
                  className="max-w-sm cursor-pointer hover:opacity-90 transition-opacity"
                  imgAlt={item.title}
                  imgSrc={item.posterUrl || 'https://via.placeholder.com/150x225'}
                  onClick={() => onItemClick && onItemClick(item)}
                >
                  <h5 className="text-base font-semibold tracking-tight text-gray-900 dark:text-white truncate">
                    {item.title}
                  </h5>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">
                      <FaPlay size={12} />
                    </button>
                    <button className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700">
                      <FaPlus size={12} />
                    </button>
                    {item.rating && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                        {item.rating}
                      </span>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
          <p className="text-gray-500">No content available</p>
        </div>
      )}
    </div>
  );
};

export default ContentCarousel;