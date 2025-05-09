import React from 'react';
import { Carousel, Card, Button } from 'flowbite-react';

const ContentCarousel = ({ title, items, onItemClick }) => {
  // Ensure items is an array and has content
  const contentItems = items || [];
  
  return (
    <div className="content-carousel mb-6">
      <h2 className="text-xl font-bold mb-3 text-white">{title}</h2>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel slide={false} className="rounded-lg">
          {contentItems.length > 0 ? (
            // Group items into sets of 4 for each carousel slide
            [...Array(Math.ceil(contentItems.length / 4))].map((_, slideIndex) => (
              <div key={slideIndex} className="flex space-x-4 h-full p-4">
                {contentItems
                  .slice(slideIndex * 4, slideIndex * 4 + 4)
                  .map((item, index) => (
                    <Card
                      key={index}
                      className="max-w-sm cursor-pointer hover:scale-105 transition-transform"
                      imgSrc={item.image || 'https://via.placeholder.com/150'}
                      imgAlt={item.title}
                      onClick={() => onItemClick && onItemClick(item)}
                    >
                      <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white truncate">
                        {item.title}
                      </h5>
                      {item.subtitle && (
                        <p className="font-normal text-sm text-gray-700 dark:text-gray-400 truncate">
                          {item.subtitle}
                        </p>
                      )}
                    </Card>
                  ))}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-800 rounded-lg">
              <p className="text-white">No content available</p>
            </div>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default ContentCarousel;
