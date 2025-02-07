'use client';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ProgressBar from '@/components/ui/progressbar';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { useRouter } from 'next/navigation';

// Type definitions for dropdown options
type OptionType = {
  value: string;
  label: string;
};

const HomePage = () => {
  const router = useRouter();

  // State variables
  const [storeData, setStoreData] = useState({
    storeName: '',
    storeDescription: '',
    storeDzongkhag: '',
    storeGewog: '',
  });

  const [dzongkhags, setDzongkhags] = useState<OptionType[]>([]);
  const [gewogs, setGewogs] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Fetch Dzongkhags from API on mount
  useEffect(() => {
    const fetchDzongkhags = async () => {
      try {
        const response = await fetch('http://localhost:8080/masterData/get/dzongkhags');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        if (Array.isArray(data.dzongkhags)) {
          setDzongkhags(
            data.dzongkhags.map((dz: { id: { toString: () => any; }; name: any; }) => ({
              value: dz.id.toString(), // Ensure string type
              label: dz.name,
            }))
          );
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load Dzongkhags.');
      } finally {
        setLoading(false);
      }
    };
    fetchDzongkhags();
  }, []);

  useEffect(() => {
    if (storeData.storeDzongkhag) {
      const fetchGewogs = async () => {
        try {
          const response = await fetch(`http://localhost:8080/masterData/get/gewogs/${storeData.storeDzongkhag}`);
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
          const data = await response.json();
          console.log("Gewog data:", data);
  
          if (Array.isArray(data.gewogs)) {
            setGewogs(
              data.gewogs.map((g: { name: any; }, index: { toString: () => any; }) => ({
                value: index.toString(), // Using index as a temporary ID
                label: g.name,
              }))
            );
          } else {
            throw new Error('Invalid response format');
          }
        } catch (err: unknown) {
          setError(err instanceof Error ? err.message : 'Failed to load Gewogs.');
        }
      };
      fetchGewogs();
    } else {
      setGewogs([]);
    }
  }, [storeData.storeDzongkhag]);
  
  useEffect(() => {
    const storedData = localStorage.getItem('storeData');
    if (storedData) {
      setStoreData(JSON.parse(storedData));
    }
  }, []);

  // Handle Dzongkhag selection
  const handleDzongkhagChange = (option: OptionType | null) => {
    setStoreData((prev) => ({
      ...prev,
      storeDzongkhag: option?.value || '',
      storeGewog: '', // Reset gewog when dzongkhag changes
    }));
  };

  // Handle Gewog selection
  const handleGewogChange = (option: OptionType | null) => {
    console.log('Gewog selected:', option?.label);
    setStoreData((prev) => ({
      ...prev,
      storeGewog: option?.value || '',
    }));
  };

  // Handle form submission at the final step
  const handleNextStep = (event: React.FormEvent) => {
    event.preventDefault();

    // Validation check before going to the next step
    if (currentStep === 3 && (!storeData.storeDzongkhag || !storeData.storeGewog)) {
      alert('Please select both Dzongkhag and Gewog before proceeding.');
      return;
    }

    if (currentStep === totalSteps) {
      sessionStorage.setItem('storeData', JSON.stringify(storeData));
      router.push('/SignUpPage');
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#2C3E50] font-sans">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="sticky top-0 z-10 bg-white py-2">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </div>

          <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
            <h1 className="text-2xl font-serif text-[#1B4965] mb-5">
              {currentStep === 1
                ? 'What is the name of your business?'
                : currentStep === 2
                ? 'Describe Your Business'
                : 'Where is Your Business Located?'}
            </h1>

            <form onSubmit={handleNextStep} className="space-y-4">
              {currentStep === 1 && (
                <input
                  type="text"
                  value={storeData.storeName}
                  onChange={(e) => setStoreData({ ...storeData, storeName: e.target.value })}
                  placeholder="Store Name"
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#1B4965] focus:outline-none"
                  required
                />
              )}
              {currentStep === 2 && (
                <input
                  type="text"
                  value={storeData.storeDescription}
                  onChange={(e) => setStoreData({ ...storeData, storeDescription: e.target.value })}
                  placeholder="Business Description"
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#1B4965] focus:outline-none"
                  required
                />
              )}
              {currentStep === 3 && (
                <>
                  <Select
                    value={dzongkhags.find((d) => d.value === storeData.storeDzongkhag) || null}
                    onChange={handleDzongkhagChange}
                    options={dzongkhags}
                    placeholder="Select Dzongkhag"
                    className="w-full mb-5"
                    isLoading={loading}
                    isDisabled={loading}
                  />
                  <Select
                    value={gewogs.find((g) => g.value === storeData.storeGewog) || null}
                    onChange={handleGewogChange}
                    options={gewogs}
                    placeholder="Select Gewog"
                    className="w-full"
                    isDisabled={!storeData.storeDzongkhag}
                  />
                </>
              )}

              <div className="flex justify-between items-center mt-6">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded"
                  >
                    Back
                  </button>
                )}
                <button type="submit" className="px-6 py-3 bg-[#1B4965] text-white rounded">
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
