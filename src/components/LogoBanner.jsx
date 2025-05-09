import React from 'react';
import { Card } from 'flowbite-react';

const LogoBanner = ({ logoSrc, title, subtitle }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 mb-6">
      <div className="w-24 h-24 mb-3">
        {logoSrc ? (
          <img 
            src={logoSrc} 
            alt="Company Logo" 
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-500 text-xl font-bold">LOGO</span>
          </div>
        )}
      </div>
      <h1 className="text-2xl font-bold text-center text-gray-800">
        {title || 'Welcome Back'}
      </h1>
      {subtitle && (
        <p className="text-sm text-gray-600 text-center mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default LogoBanner;