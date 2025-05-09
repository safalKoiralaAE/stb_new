import React from 'react';
import { Card, Carousel } from 'flowbite-react';
import { HiArrowRight } from 'react-icons/hi';

const ContentCarousel = ({ title, items, onItemClick, seeAllLink }) => {
  // Ensure items is an array even if it's null or undefined
  const contentItems = items || [];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {seeAllLink && (
          <a
            href={seeAllLink}
            className="text-blue-500 hover:text-blue-600 flex items-center text-sm"
          >
            See all <HiArrowRight className="ml-1" />
          </a>
        )}
      </div>
      
      {contentItems.length > 0 ? (
        <div className="relative">
          <Carousel
            slideInterval={5000}
            indicators={false}
            className="-mx-4"
            leftControl={<div className="absolute left-0 z-10 text-white bg-black/50 rounded-full p-2">❮</div>}
            rightControl={<div className="absolute right-0 z-10 text-white bg-black/50 rounded-full p-2">❯</div>}
          >
            {/* Create slides with 3 items per slide for mobile view */}
            {Array.from(
              { length: Math.ceil(contentItems.length / 3) },
              (_, index) => (
                <div key={index} className="flex space-x-4 px-4">
                  {contentItems
                    .slice(index * 3, index * 3 + 3)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex-shrink-0 w-1/3"
                        onClick={() => onItemClick && onItemClick(item)}
                      >
                        <Card
                          className="overflow-hidden h-48 cursor-pointer transition-transform hover:scale-105"
                          imgSrc={item.posterUrl || 'https://via.placeholder.com/150x225'}
                          imgAlt={item.title}
                        >
                          <h5 className="text-sm font-medium truncate">{item.title}</h5>
                          {item.rating && (
                            <div className="text-xs text-yellow-400">
                              {'★'.repeat(Math.floor(item.rating / 2))} ({item.rating})
                            </div>
                          )}
                        </Card>
                      </div>
                    ))}
                </div>
              )
            )}
          </Carousel>
        </div>
      ) : (
        <div className="flex justify-center items-center h-48 bg-gray-800 rounded-lg">
          <p className="text-gray-400">No content available</p>
        </div>
      )}
    </div>
  );
};

export default ContentCarousel;
