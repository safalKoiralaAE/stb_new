import React from 'react';
import { Carousel, Card, Button } from 'flowbite-react';

const ContentCarousel = ({ title, items, onItemClick, category }) => {
  // Default items if none provided
  const contentItems = items || [
    {
      id: 1,
      title: 'The Matrix',
      imageUrl: 'https://via.placeholder.com/150x225',
      rating: '8.7',
      year: '1999',
    },
    {
      id: 2,
      title: 'Inception',
      imageUrl: 'https://via.placeholder.com/150x225',
      rating: '8.8',
      year: '2010',
    },
    {
      id: 3,
      title: 'Interstellar',
      imageUrl: 'https://via.placeholder.com/150x225',
      rating: '8.6',
      year: '2014',
    },
    {
      id: 4,
      title: 'The Dark Knight',
      imageUrl: 'https://via.placeholder.com/150x225',
      rating: '9.0',
      year: '2008',
    },
    {
      id: 5,
      title: 'Pulp Fiction',
      imageUrl: 'https://via.placeholder.com/150x225',
      rating: '8.9',
      year: '1994',
    }
  ];

  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <div className="my-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">{title || `${category || 'Recommended'} Content`}</h2>
        <Button size="xs" color="light">See All</Button>
      </div>
      
      <div className="h-full">
        <Carousel slide={false} indicators={false}>
          <div className="flex space-x-3 p-1">
            {contentItems.slice(0, 3).map((item) => (
              <div key={item.id} className="min-w-[120px]" onClick={() => handleItemClick(item)}>
                <Card imgSrc={item.imageUrl} className="h-full cursor-pointer">
                  <h5 className="text-sm font-medium truncate">{item.title}</h5>
                  <div className="flex justify-between text-xs">
                    <span>⭐ {item.rating}</span>
                    <span>{item.year}</span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          <div className="flex space-x-3 p-1">
            {contentItems.slice(3).map((item) => (
              <div key={item.id} className="min-w-[120px]" onClick={() => handleItemClick(item)}>
                <Card imgSrc={item.imageUrl} className="h-full cursor-pointer">
                  <h5 className="text-sm font-medium truncate">{item.title}</h5>
                  <div className="flex justify-between text-xs">
                    <span>⭐ {item.rating}</span>
                    <span>{item.year}</span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default ContentCarousel;