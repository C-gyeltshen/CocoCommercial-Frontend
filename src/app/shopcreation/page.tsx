'use client';

import React, { useState } from 'react';
import Select from 'react-select';
import ProgressBar from '../components/progressbar';

const countryOptions = [
  { value: 'usa', label: 'USA', cities: [{ value: 'nyc', label: 'New York' }, { value: 'la', label: 'Los Angeles' }] },
  { value: 'canada', label: 'Canada', cities: [{ value: 'toronto', label: 'Toronto' }, { value: 'vancouver', label: 'Vancouver' }] }
];

const HomePage = () => {
  const [storeName, setStoreName] = useState('');
  const [storeDescription, setStoreDescription] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [storeImage, setStoreImage] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(0);
  const totalSteps = 4;

  const handleCountryChange = (option) => {
    setSelectedCountry(option);
    setCityOptions(option.cities);
    setSelectedCity(null);
  };

  const handleCityChange = (option) => {
    setSelectedCity(option);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setCompletedSteps(Math.max(completedSteps, currentStep));
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="fixed top-0 w-full z-10">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      <div className="relative mt-14 bg-white p-5 rounded-lg shadow-lg w-full max-w-lg text-center">
        {currentStep > 1 && (
          <button
            onClick={handlePreviousStep}
            className="absolute -left-16 top-1/2 transform -translate-y-1/2 bg-purple-500 text-white p-3 rounded-full shadow-lg cursor-pointer"
            aria-label="Go back"
          >
            ↑
          </button>
        )}
        <h1 className="text-xl font-bold text-black mb-5">{currentStep === 1 ? "What is the name of your business?" :
          currentStep === 2 ? "Describe Your Business" :
          currentStep === 3 ? "Where is Your Business Located?" :
          "Add a Logo or Image for Your Business"}</h1>
        <p className="mb-5 text-gray-800">{currentStep === 1 ? "Enter your store name below." :
          currentStep === 2 ? "Provide a brief description of your business." :
          currentStep === 3 ? "Select your country and city." :
          "Upload a logo or any image that represents your business."}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {currentStep === 1 && (
            <input type="text" value={storeName} onChange={e => setStoreName(e.target.value)} placeholder="Store Name" className="w-full p-3 border border-gray-300 rounded" />
          )}
          {currentStep === 2 && (
            <input type="text" value={storeDescription} onChange={e => setStoreDescription(e.target.value)} placeholder="Business Description" className="w-full p-3 border border-gray-300 rounded" />
          )}
          {currentStep === 3 && (
            <>
              <Select
                value={selectedCountry}
                onChange={handleCountryChange}
                options={countryOptions}
                placeholder="Country"
                className="w-full mb-5"
              />
              <Select
                value={selectedCity}
                onChange={handleCityChange}
                options={cityOptions}
                placeholder="City"
                className="w-full"
                isDisabled={!selectedCountry}
              />
            </>
          )}
          {currentStep === 4 && (
            <input type="file" onChange={e => setStoreImage(e.target.files ? e.target.files[0] : null)} className="w-full p-3 border border-gray-300 rounded" />
          )}
          <button type="submit" className="w-full p-3 bg-purple-600 text-white rounded hover:bg-purple-700">
            {currentStep === totalSteps ? 'Finish' : 'Next'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
