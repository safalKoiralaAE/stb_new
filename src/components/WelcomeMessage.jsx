import React from 'react';
import { Card, Text } from 'flowbite-react';

const WelcomeMessage = ({ title, message }) => {
  return (
    <Card className="max-w-sm mx-auto mb-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {title || 'Welcome to our App!'}
        </h2>
        <Text className="text-gray-500 dark:text-gray-400">
          {message || 'Please sign in to continue or create a new account to get started.'}
        </Text>
      </div>
    </Card>
  );
};

export default WelcomeMessage;