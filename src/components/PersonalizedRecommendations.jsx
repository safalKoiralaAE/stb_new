import React from 'react';
import { Card, Carousel } from 'flowbite-react';
import { FaPlay, FaPlus } from 'react-icons/fa';

const PersonalizedRecommendations = ({ title, contentItems = [] }) => {
  // If no items provided, use placeholder items
  const items = contentItems.length > 0 ? contentItems : [
    { id: 1, title: 'Stranger Things', image: 'https://placehold.co/180x250/darkblue/white?text=Stranger+Things', genre: 'Sci-Fi' },
    { id: 2, title: 'The Crown', image: 'https://placehold.co/180x250/darkred/white?text=The+Crown', genre: 'Drama' },
    { id: 3, title: 'Money Heist', image: 'https://placehold.co/180x250/darkgreen/white?text=Money+Heist', genre: 'Thriller' },
    { id: 4, title: 'Squid Game', image: 'https://placehold.co/180x250/purple/white?text=Squid+Game', genre: 'Drama' },
    { id: 5, title: 'Dark', image: 'https://placehold.co/180x250/black/white?text=Dark', genre: 'Mystery' },
    { id: 6, title: 'The Witcher', image: 'https://placehold.co/180x250/brown/white?text=The+Witcher', genre: 'Fantasy' }
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-white mb-3">{title || 'Recommended For You'}</h2>
      <div className="relative">
        <Carousel
          slideInterval={5000}
          indicators={false}
          leftControl={<div className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-r-lg">❮</div>}
          rightControl={<div className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-l-lg">❯</div>}
          className="h-auto"
        >
          {[...Array(Math.ceil(items.length / 3))].map((_, index) => (
            <div key={index} className="flex space-x-3 px-1">
              {items.slice(index * 3, index * 3 + 3).map((item) => (
                <div key={item.id} className="w-1/3">
                  <Card
                    className="overflow-hidden h-full bg-gray-800 border-none"
                    imgSrc={item.image}
                    imgAlt={item.title}
                  >
                    <div className="text-white p-2">
                      <h5 className="text-sm font-medium truncate">{item.title}</h5>
                      <p className="text-xs text-gray-400">{item.genre}</p>
                      <div className="flex mt-2 space-x-2">
                        <button className="flex items-center justify-center bg-red-600 rounded-full p-1">
                          <FaPlay className="text-white text-xs" />
                        </button>
                        <button className="flex items-center justify-center bg-gray-600 rounded-full p-1">
                          <FaPlus className="text-white text-xs" />
                        </button>
                      </div>
                    </div>
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

export default PersonalizedRecommendations;