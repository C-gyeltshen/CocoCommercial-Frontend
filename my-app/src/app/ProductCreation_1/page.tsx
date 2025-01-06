"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "../reusable_component/ProgressBar";

const ProductCreation1: React.FC = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push("/ProductCreation_2");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#eaf7f4] p-6">
      <ProgressBar currentStep={1} totalSteps={5} />
      <div className="flex flex-col justify-center items-center flex-1">
        <div className="w-full max-w-lg">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
            What is the name of your Product?
          </h1>
          <p className="text-center text-sm text-gray-500 mb-4">
            You can edit all the details later
          </p>
          <input
            type="text"
            placeholder="Your product name"
            className="w-full bg-transparent border-b-2 border-gray-400 text-center text-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#005a49]"
          />
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={handleNext}
              className="bg-[#005a49] text-white py-2 px-4 rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreation1;
