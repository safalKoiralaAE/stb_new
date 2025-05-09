import React, { useState } from 'react';
import { Dropdown } from 'flowbite-react';
import { HiGlobeAlt } from 'react-icons/hi';

const LanguageSelector = ({ currentLanguage = 'English', onLanguageChange }) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'ar', name: 'العربية' },
    { code: 'hi', name: 'हिन्दी' },
  ];

  const handleLanguageSelect = (langCode) => {
    const selectedLanguage = languages.find(lang => lang.code === langCode);
    if (selectedLanguage && onLanguageChange) {
      onLanguageChange(selectedLanguage);
    }
  };

  return (
    <div className="language-selector">
      <Dropdown
        label={<span className="flex items-center"><HiGlobeAlt className="mr-1" /> {currentLanguage}</span>}
        size="sm"
        color="gray"
        arrowIcon={true}
        className="mobile-language-selector"
      >
        {languages.map((language) => (
          <Dropdown.Item
            key={language.code}
            onClick={() => handleLanguageSelect(language.code)}
            className={language.name === currentLanguage ? 'bg-gray-100 dark:bg-gray-600' : ''}
          >
            {language.name}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
};

export default LanguageSelector;
