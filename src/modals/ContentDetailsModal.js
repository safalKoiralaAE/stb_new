import React from 'react';
import { Card, Carousel } from 'flowbite-react';
import { FaPlay } from 'react-icons/fa';

const ContentCarousel = ({ title, contentItems, onItemClick, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="min-w-[160px] h-[220px] bg-gray-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!contentItems || contentItems.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Carousel slideInterval={5000} indicators={false}>
        {Array.from({ length: Math.ceil(contentItems.length / 4) }).map((_, slideIndex) => (
          <div key={slideIndex} className="flex space-x-4">
            {contentItems
              .slice(slideIndex * 4, slideIndex * 4 + 4)
              .map((item, itemIndex) => (
                <div key={itemIndex} className="flex-shrink-0 w-[160px]">
                  <Card
                    className="overflow-hidden h-[220px] cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => onItemClick && onItemClick(item)}
                    imgSrc={item.thumbnail || 'https://via.placeholder.com/160x220'}
                    imgAlt={item.title}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50">
                      <div className="text-white text-center">
                        <FaPlay className="mx-auto mb-2" size={24} />
                        <p className="text-sm font-medium">{item.title}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ContentCarousel;