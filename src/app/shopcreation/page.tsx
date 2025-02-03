'use client';

import React, { useState } from 'react';
import Select from 'react-select';
import ProgressBar from '@/components/ui/progressbar';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

const dzongkhagOptions = [
  { 
    value: 'thimphu', 
    label: 'Thimphu', 
    gewogs: [{ value: 'chang', label: 'Chang' }, { value: 'kawang', label: 'Kawang' }] 
  },
  { 
    value: 'paro', 
    label: 'Paro', 
    gewogs: [{ value: 'dopshari', label: 'Dopshari' }, { value: 'wangchang', label: 'Wangchang' }] 
  },
];

const HomePage = () => {
  const [storeName, setStoreName] = useState('');
  const [storeDescription, setStoreDescription] = useState('');
  const [selectedDzongkhag, setSelectedDzongkhag] = useState(null);
  const [gewogOptions, setGewogOptions] = useState([]);
  const [selectedGewog, setSelectedGewog] = useState(null);
  const [storeImage, setStoreImage] = useState(null);
  const [imageError, setImageError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleDzongkhagChange = (option) => {
    setSelectedDzongkhag(option);
    setGewogOptions(option ? option.gewogs : []);
    setSelectedGewog(null);
  };

  const handleGewogChange = (option) => {
    setSelectedGewog(option);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // Limit to 5MB
        setImageError('File size exceeds 5MB. Please upload a smaller file.');
        setStoreImage(null);
      } else {
        setImageError('');
        setStoreImage(file);
      }
    }
  };

  const handleNextStep = (event) => {
    event.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#2C3E50] font-sans">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="sticky top-0 z-10 bg-white py-2">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </div>

          {/* Content Section */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
            <h1 className="text-2xl font-serif text-[#1B4965] mb-5">
              {currentStep === 1
                ? 'What is the name of your business?'
                : currentStep === 2
                ? 'Describe Your Business'
                : currentStep === 3
                ? 'Where is Your Business Located?'
                : 'Add a Logo or Image for Your Business'}
            </h1>
            <p className="mb-5 text-gray-600">
              {currentStep === 1
                ? 'Enter your store name below.'
                : currentStep === 2
                ? 'Provide a brief description of your business.'
                : currentStep === 3
                ? 'Select your Dzongkhag and Gewog.'
                : 'Upload a logo or any image that represents your business.'}
            </p>

            <form onSubmit={handleNextStep} className="space-y-4">
              {currentStep === 1 && (
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="Store Name"
                  className="w-full p-3 border border-gray-300 rounded text-gray-600 focus:ring-2 focus:ring-[#1B4965] focus:outline-none"
                />
              )}
              {currentStep === 2 && (
                <input
                  type="text"
                  value={storeDescription}
                  onChange={(e) => setStoreDescription(e.target.value)}
                  placeholder="Business Description"
                  className="w-full p-3 border border-gray-300 rounded text-gray-600 focus:ring-2 focus:ring-[#1B4965] focus:outline-none"
                />
              )}
              {currentStep === 3 && (
                <>
                  <Select
                    value={selectedDzongkhag}
                    onChange={handleDzongkhagChange}
                    options={dzongkhagOptions}
                    placeholder="Dzongkhag"
                    className="w-full mb-5"
                  />
                  <Select
                    value={selectedGewog}
                    onChange={handleGewogChange}
                    options={gewogOptions}
                    placeholder="Gewog"
                    className="w-full"
                    isDisabled={!selectedDzongkhag}
                  />
                </>
              )}
              {currentStep === 4 && (
                <>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="w-full p-3 border border-gray-300 rounded text-gray-600 focus:ring-2 focus:ring-[#1B4965] focus:outline-none"
                  />
                  {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
                  {storeImage && <p className="text-green-500 text-sm">File selected: {storeImage.name}</p>}
                </>
              )}

              <div className="flex justify-between items-center mt-6">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-all duration-300"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#1B4965] text-white rounded hover:bg-orange-400 transition-all duration-300"
                >
                  {currentStep === totalSteps ? 'Finish' : 'Next'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
