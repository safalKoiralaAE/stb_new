import React from 'react';
import { Carousel, Card } from 'flowbite-react';

const ContentCarousel = ({ title, contentItems, onItemClick }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-3 text-white">{title}</h2>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel slideInterval={5000}>
          {contentItems && contentItems.map((item, index) => (
            <div key={index} className="flex space-x-4 px-4">
              {item.items && item.items.slice(0, 5).map((content, idx) => (
                <div key={idx} className="flex-shrink-0 w-32 sm:w-40" onClick={() => onItemClick(content)}>
                  <Card
                    imgAlt={content.title}
                    imgSrc={content.posterUrl || 'https://via.placeholder.com/150x225'}
                    className="cursor-pointer transition-transform hover:scale-105"
                  >
                    <h5 className="text-sm font-medium text-white truncate">
                      {content.title}
                    </h5>
                    {content.rating && (
                      <div className="text-xs text-gray-400">
                        ⭐ {content.rating}/10
                      </div>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ContentCarousel;