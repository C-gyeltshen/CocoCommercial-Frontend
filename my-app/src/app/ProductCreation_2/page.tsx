"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "../reusable_component/ProgressBar";

const ProductCreation2: React.FC = () => {
  const router = useRouter();

  const handlePrevious = () => {
    router.push("/ProductCreation_1");
  };

  const handleNext = () => {
    router.push("/ProductCreation_3");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#eaf7f4] p-6">
      <ProgressBar currentStep={2} totalSteps={5} />
      <div className="flex flex-col justify-center items-center flex-1">
        <div className="w-full max-w-lg">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Provide the Product Description
          </h1>
          <p className="text-center text-sm text-gray-500 mb-4">
            You can edit all the details later
          </p>
          <textarea
            placeholder="Your Product Description"
            className="w-full bg-transparent border-b-2 border-gray-400 text-center text-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#005a49] mb-4"
          ></textarea>
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
            >
              Previous
            </button>
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

export default ProductCreation2;
