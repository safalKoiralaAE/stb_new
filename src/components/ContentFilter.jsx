import React, { useState } from 'react';
import { Button, Dropdown, Badge } from 'flowbite-react';
import { FaFilter, FaCheck } from 'react-icons/fa';

const ContentFilter = ({ onFilterChange, selectedCategories = [], availableCategories = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedCategories);

  // Default categories if none provided
  const categories = availableCategories.length > 0 ? availableCategories : [
    'Movies', 'TV Shows', 'Documentaries', 'Kids', 'Action', 'Comedy', 
    'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Animation'
  ];

  const handleToggleCategory = (category) => {
    let newSelected;
    if (selected.includes(category)) {
      newSelected = selected.filter(item => item !== category);
    } else {
      newSelected = [...selected, category];
    }
    setSelected(newSelected);
    onFilterChange && onFilterChange(newSelected);
  };

  const clearFilters = () => {
    setSelected([]);
    onFilterChange && onFilterChange([]);
  };

  return (
    <div className="content-filter">
      <div className="filter-header flex items-center justify-between mb-2">
        <Dropdown
          label={
            <div className="flex items-center">
              <FaFilter className="mr-2" />
              <span>Filter</span>
              {selected.length > 0 && (
                <Badge color="purple" className="ml-2" pill>
                  {selected.length}
                </Badge>
              )}
            </div>
          }
          color="gray"
          size="sm"
        >
          <div className="p-3">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {categories.map((category) => (
                <div 
                  key={category}
                  onClick={() => handleToggleCategory(category)}
                  className={`cursor-pointer px-3 py-2 rounded-lg flex items-center justify-between ${selected.includes(category) ? 'bg-purple-100 text-purple-900' : 'hover:bg-gray-100'}`}
                >
                  <span>{category}</span>
                  {selected.includes(category) && <FaCheck className="text-purple-600" />}
                </div>
              ))}
            </div>
            {selected.length > 0 && (
              <Button 
                color="light" 
                size="xs" 
                onClick={clearFilters} 
                className="w-full"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        </Dropdown>
        
        {selected.length > 0 && (
          <div className="selected-filters flex gap-1 overflow-x-auto py-1">
            {selected.map(category => (
              <Badge 
                key={category} 
                color="purple" 
                className="whitespace-nowrap"
                onClick={() => handleToggleCategory(category)}
                icon={FaCheck}
              >
                {category}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentFilter;