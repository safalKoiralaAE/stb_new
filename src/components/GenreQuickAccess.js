import React from 'react';
import { Card, Carousel } from 'flowbite-react';

const ContentCarousel = ({ title, items, onItemClick }) => {
  // Default empty array if items is null/undefined
  const contentItems = items || [];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2 text-white">{title}</h2>
      <div className="h-56 sm:h-64">
        <Carousel slideInterval={5000} indicators={false}>
          {contentItems.map((item, index) => (
            <div key={index} className="flex gap-4 px-2">
              {/* Display 3-4 items per slide depending on screen size */}
              {contentItems.slice(index * 4, index * 4 + 4).map((content) => (
                <Card
                  key={content.id}
                  imgSrc={content.posterUrl || 'https://via.placeholder.com/150x225'}
                  className="max-w-[150px] cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => onItemClick && onItemClick(content)}
                >
                  <h5 className="text-sm font-medium tracking-tight text-white truncate">
                    {content.title}
                  </h5>
                  {content.releaseYear && (
                    <p className="text-xs text-gray-400">{content.releaseYear}</p>
                  )}
                </Card>
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ContentCarousel;
