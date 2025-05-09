import React from 'react';
import { Card, Carousel } from 'flowbite-react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CategoryRow = ({ title, items, onItemClick }) => {
  // Default items if none provided
  const contentItems = items || [
    { id: 1, title: 'Movie Title 1', imageUrl: 'https://via.placeholder.com/150x225', rating: '4.5' },
    { id: 2, title: 'Movie Title 2', imageUrl: 'https://via.placeholder.com/150x225', rating: '3.8' },
    { id: 3, title: 'Movie Title 3', imageUrl: 'https://via.placeholder.com/150x225', rating: '4.2' },
    { id: 4, title: 'Movie Title 4', imageUrl: 'https://via.placeholder.com/150x225', rating: '5.0' },
    { id: 5, title: 'Movie Title 5', imageUrl: 'https://via.placeholder.com/150x225', rating: '3.5' },
    { id: 6, title: 'Movie Title 6', imageUrl: 'https://via.placeholder.com/150x225', rating: '4.1' },
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-3 text-white pl-2">{title || 'Category Title'}</h2>
      
      <Carousel
        leftControl={
          <button className="group">
            <FaChevronLeft className="h-6 w-6 text-white opacity-50 group-hover:opacity-100" />
          </button>
        }
        rightControl={
          <button className="group">
            <FaChevronRight className="h-6 w-6 text-white opacity-50 group-hover:opacity-100" />
          </button>
        }
        indicators={false}
        className="h-56"
      >
        {contentItems.map((item) => (
          <div 
            key={item.id} 
            className="px-2 flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
            onClick={() => onItemClick && onItemClick(item)}
          >
            <Card
              className="max-w-[150px] overflow-hidden bg-gray-800 border-gray-700"
              imgSrc={item.imageUrl}
              imgAlt={item.title}
            >
              <h5 className="text-sm font-medium tracking-tight text-white truncate">
                {item.title}
              </h5>
              {item.rating && (
                <div className="flex items-center">
                  <span className="text-yellow-400 text-xs">★</span>
                  <span className="text-xs ml-1 text-white">{item.rating}</span>
                </div>
              )}
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CategoryRow;