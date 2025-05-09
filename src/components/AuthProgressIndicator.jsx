import React from 'react';
import { Progress } from 'flowbite-react';

const AuthProgressIndicator = ({ currentStep, totalSteps }) => {
  // Calculate progress percentage
  const progressPercent = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full px-4 mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-blue-700 dark:text-white">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-blue-700 dark:text-white">
          {progressPercent.toFixed(0)}%
        </span>
      </div>
      <Progress
        progress={progressPercent}
        size="sm"
        color="blue"
        labelProgress
        labelText
      />
    </div>
  );
};

export default AuthProgressIndicator;
