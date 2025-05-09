import React from 'react';
import { Badge } from 'flowbite-react';
import { HiFilter } from 'react-icons/hi';

const GenreFilter = ({ genres, selectedGenres, onGenreSelect }) => {
  // Default genres if none provided
  const defaultGenres = [
    'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 
    'Fantasy', 'Romance', 'Thriller', 'Documentary', 'Anime'
  ];

  const genreList = genres || defaultGenres;
  const selected = selectedGenres || [];

  return (
    <div className="genre-filter px-2 py-3">
      <div className="flex items-center mb-2">
        <HiFilter className="mr-2 text-gray-500" />
        <h3 className="text-sm font-medium text-gray-700">Filter by Genre</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {genreList.map((genre) => (
          <Badge
            key={genre}
            color={selected.includes(genre) ? "info" : "gray"}
            className={`cursor-pointer ${selected.includes(genre) ? 'border-blue-500' : ''}`}
            onClick={() => onGenreSelect && onGenreSelect(genre)}
          >
            {genre}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
