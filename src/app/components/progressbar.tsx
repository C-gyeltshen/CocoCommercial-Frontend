import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  // Calculate the width percentage
  const widthPercent = (currentStep / totalSteps) * 100;

  return (
    <div className="relative pt-1 w-full">
      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
        <div
          style={{ width: `${widthPercent}%` }}
          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
            currentStep === totalSteps ? 'bg-purple-600' : 'bg-purple-500'
          } transition-all duration-300 ease-in-out`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
