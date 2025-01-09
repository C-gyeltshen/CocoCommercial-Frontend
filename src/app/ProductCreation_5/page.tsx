"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "../reusable_component/ProgressBar";
import FileUpload from "../components/ui/FileUpload";

const ProductCreation5: React.FC = () => {
  const router = useRouter();

  const handlePrevious = () => {
    router.push("/ProductCreation_4");
  };

  const handleSubmit = () => {
    alert("Product successfully submitted!");
    router.push("/"); 
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#eaf7f4] p-6">
      <ProgressBar currentStep={5} totalSteps={5} />
      <div className="flex flex-col justify-center items-center flex-1">
        <div className="w-full max-w-lg">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Provide your Product Image
          </h1>
          <p className="text-center text-sm text-gray-500 mb-4">
            You can edit all the details later
          </p>
          <FileUpload />
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevious}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
            >
              Previous
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#005a49] text-white py-2 px-4 rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreation5;
