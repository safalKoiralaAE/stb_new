import React from 'react';
import { Card, Carousel } from 'flowbite-react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

const ContentRecommendations = ({ title, items, onItemClick }) => {
  // Default items if none provided
  const contentItems = items || [
    {
      id: 1,
      title: 'Stranger Things',
      imageUrl: 'https://via.placeholder.com/150x225',
      rating: '95% Match'
    },
    {
      id: 2,
      title: 'The Crown',
      imageUrl: 'https://via.placeholder.com/150x225',
      rating: '98% Match'
    },
    {
      id: 3,
      title: 'Dark',
      imageUrl: 'https://via.placeholder.com/150x225',
      rating: '90% Match'
    },
    {
      id: 4,
      title: 'Ozark',
      imageUrl: 'https://via.placeholder.com/150x225',
      rating: '92% Match'
    },
    {
      id: 5,
      title: 'The Queen's Gambit',
      imageUrl: 'https://via.placeholder.com/150x225',
      rating: '96% Match'
    }
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-3 text-white">{title || 'Recommended For You'}</h2>
      <Carousel
        slideInterval={5000}
        leftControl={
          <div className="absolute left-0 top-0 h-full flex items-center justify-center z-10 bg-black bg-opacity-30 px-2">
            <HiOutlineChevronLeft className="h-8 w-8 text-white" />
          </div>
        }
        rightControl={
          <div className="absolute right-0 top-0 h-full flex items-center justify-center z-10 bg-black bg-opacity-30 px-2">
            <HiOutlineChevronRight className="h-8 w-8 text-white" />
          </div>
        }
        indicators={false}
      >
        {contentItems.map((item) => (
          <div key={item.id} className="px-1" onClick={() => onItemClick && onItemClick(item)}>
            <Card
              className="max-w-[150px] overflow-hidden hover:scale-105 transition-transform cursor-pointer bg-gray-800 border-0"
              imgAlt={item.title}
              imgSrc={item.imageUrl}
            >
              <h5 className="text-sm font-medium text-white truncate">{item.title}</h5>
              <p className="text-xs text-green-500">{item.rating}</p>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ContentRecommendations;