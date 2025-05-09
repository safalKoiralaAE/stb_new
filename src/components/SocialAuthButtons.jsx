import React from 'react';
import { Button } from 'flowbite-react';
import { FaGoogle, FaFacebook, FaApple, FaTwitter } from 'react-icons/fa';

const SocialAuthButtons = ({ onSocialAuth }) => {
  const handleSocialAuth = (provider) => {
    if (onSocialAuth) {
      onSocialAuth(provider);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center mb-4">
        <hr className="flex-grow border-gray-300" />
        <span className="px-3 text-gray-500 text-sm">or continue with</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Button
          color="light"
          onClick={() => handleSocialAuth('google')}
          className="flex items-center justify-center"
        >
          <FaGoogle className="mr-2 h-5 w-5" />
          Google
        </Button>
        
        <Button
          color="light"
          onClick={() => handleSocialAuth('facebook')}
          className="flex items-center justify-center"
        >
          <FaFacebook className="mr-2 h-5 w-5" />
          Facebook
        </Button>
        
        <Button
          color="light"
          onClick={() => handleSocialAuth('apple')}
          className="flex items-center justify-center"
        >
          <FaApple className="mr-2 h-5 w-5" />
          Apple
        </Button>
        
        <Button
          color="light"
          onClick={() => handleSocialAuth('twitter')}
          className="flex items-center justify-center"
        >
          <FaTwitter className="mr-2 h-5 w-5" />
          Twitter
        </Button>
      </div>
    </div>
  );
};

export default SocialAuthButtons;