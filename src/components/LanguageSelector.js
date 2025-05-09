import React from 'react';
import { Card, Carousel } from 'flowbite-react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

const ContentBrowser = ({ category, items = [], onItemClick, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">{category || 'Loading...'}</h2>
        <div className="flex space-x-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="w-32 h-48 bg-gray-300 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">{category}</h2>
        <p className="text-gray-500">No content available</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-3">{category}</h2>
      <div className="relative">
        <Carousel
          leftControl={
            <button className="absolute top-1/2 -translate-y-1/2 left-1 bg-black/50 p-2 rounded-full">
              <HiOutlineChevronLeft className="h-6 w-6 text-white" />
            </button>
          }
          rightControl={
            <button className="absolute top-1/2 -translate-y-1/2 right-1 bg-black/50 p-2 rounded-full">
              <HiOutlineChevronRight className="h-6 w-6 text-white" />
            </button>
          }
          indicators={false}
          slideInterval={5000}
        >
          {Array.from({ length: Math.ceil(items.length / 5) }).map((_, index) => (
            <div key={index} className="flex space-x-4 py-2 px-1">
              {items.slice(index * 5, (index + 1) * 5).map((item) => (
                <div key={item.id} className="min-w-0" onClick={() => onItemClick && onItemClick(item)}>
                  <Card
                    className="w-32 h-48 overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                    imgSrc={item.poster || item.thumbnail}
                    imgAlt={item.title}
                  >
                    <h5 className="text-sm font-medium truncate">{item.title}</h5>
                    {item.releaseYear && <p className="text-xs text-gray-500">{item.releaseYear}</p>}
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

export default ContentBrowser;