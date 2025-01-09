import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="flex items-center w-full px-6 mb-4">
      <span className="text-gray-600">{currentStep} of {totalSteps}</span>
      <div className="flex-1 mx-4 h-2 bg-gray-300 rounded-full">
        <div
          className="h-2 bg-[#005a49] rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
