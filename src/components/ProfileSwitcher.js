import React from 'react';
import { Card, Carousel } from 'flowbite-react';
import { FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa';

const ContentCarousel = ({ title, items, onItemClick, viewAllLink }) => {
  // Handle case where items is null or empty
  const hasItems = items && items.length > 0;

  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <div className="content-carousel my-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">{title || 'Content'}</h2>
        {viewAllLink && (
          <a href={viewAllLink} className="text-sm text-blue-600 hover:underline">
            View All
          </a>
        )}
      </div>

      {hasItems ? (
        <Carousel
          leftControl={
            <button className="carousel-control">
              <FaChevronLeft className="text-white" />
            </button>
          }
          rightControl={
            <button className="carousel-control">
              <FaChevronRight className="text-white" />
            </button>
          }
          indicators={false}
          slideInterval={5000}
        >
          {items.map((item, index) => (
            <div key={item.id || index} className="px-1" onClick={() => handleItemClick(item)}>
              <Card
                className="overflow-hidden h-48 cursor-pointer relative"
                imgSrc={item.thumbnail || 'https://via.placeholder.com/300x200'}
                imgAlt={item.title || `Content item ${index + 1}`}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="text-white text-center">
                    <FaPlay className="mx-auto text-xl mb-2" />
                    <p className="font-semibold text-sm">{item.title || `Item ${index + 1}`}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="flex justify-center items-center h-48 bg-gray-100 rounded-lg">
          <p className="text-gray-500">No content available</p>
        </div>
      )}
    </div>
  );
};

export default ContentCarousel;