import React from 'react';
import { Carousel } from 'flowbite-react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

const ContentCarousel = ({ title, items, onItemClick }) => {
  // Handle empty or null items
  const contentItems = items || [];
  
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-white mb-3">{title || 'Recommended'}</h2>
      <div className="relative">
        <Carousel
          leftControl={
            <div className="bg-gray-800/70 p-2 rounded-full">
              <HiOutlineChevronLeft className="h-5 w-5 text-white" />
            </div>
          }
          rightControl={
            <div className="bg-gray-800/70 p-2 rounded-full">
              <HiOutlineChevronRight className="h-5 w-5 text-white" />
            </div>
          }
          slideInterval={5000}
          indicators={false}
        >
          {contentItems.length > 0 ? (
            contentItems.map((item, index) => (
              <div 
                key={item.id || index} 
                className="px-1 cursor-pointer"
                onClick={() => onItemClick && onItemClick(item)}
              >
                <img
                  src={item.poster || 'https://via.placeholder.com/180x270/1f2937/FFFFFF?text=No+Image'}
                  alt={item.title || 'Content item'}
                  className="rounded-lg h-[270px] w-[180px] object-cover"
                />
                <p className="text-sm text-white mt-2 truncate">{item.title || 'Untitled'}</p>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-[270px] w-full bg-gray-800 rounded-lg">
              <p className="text-gray-400">No content available</p>
            </div>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default ContentCarousel;