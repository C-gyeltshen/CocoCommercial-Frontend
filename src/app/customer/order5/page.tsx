"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const GiftQuestionPage = () => {
  const router = useRouter();

  // States
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showRecipientForm, setShowRecipientForm] = useState<boolean>(false);
  const [recipientData, setRecipientData] = useState({
    name: '',
    address: ''
  });

  // Function to handle option selection
  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  // Function to handle next button click
  const handleNext = () => {
    if (selectedOption) {
      setIsAnimating(true);
      setTimeout(() => {
        if (selectedOption === 'yes') {
          setShowRecipientForm(true);
          setIsAnimating(false);
        } else {
          router.push('/customer/personal-purchase');
        }
      }, 300);
    } else {
      // Add a subtle shake animation for better UX
      const button = document.querySelector('.next-button');
      button?.classList.add('shake');
      setTimeout(() => button?.classList.remove('shake'), 500);
    }
  };

  // Function to handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecipientData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to handle recipient form submission
  const handleRecipientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnimating(true);
    setTimeout(() => {
      // Here you could save the recipient data to your state management or context
      router.push(`/customer/gift-recipient?name=${encodeURIComponent(recipientData.name)}&address=${encodeURIComponent(recipientData.address)}`);
    }, 300);
  };

  // Option Card Component
  const OptionCard = ({ 
    value, 
    label 
  }: { 
    value: string; 
    label: string;
  }) => {
    const isSelected = selectedOption === value;
    
    return (
      <div 
        className={`relative py-1.5 px-3 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
          isSelected 
            ? 'border-gray-800 bg-gray-50 shadow-lg' 
            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
        }`}
        onClick={() => handleOptionSelect(value)}
      >
        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute top-1.5 right-2 w-4 h-4 bg-black rounded-full flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        
        <input
          type="radio"
          name="gift"
          value={value}
          checked={isSelected}
          onChange={() => handleOptionSelect(value)}
          className="sr-only"
        />
        
        <div className="text-center">
          <h3 className={`text-base font-medium transition-colors duration-300 ${
            isSelected ? 'text-black' : 'text-gray-800'
          }`}>
            {label}
          </h3>
        </div>
      </div>
    );
  };

  // Input Field Component
  const InputField = ({
    label,
    name,
    value,
    onChange,
    required = false
  }: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
  }) => (
    <div className="mb-3">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
      />
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-white font-sans">
      <main className="flex items-center justify-center min-h-screen p-6">
        <div className={`bg-white rounded-lg shadow-md max-w-lg w-full p-5 transition-all duration-500 ${
          isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
        }`}>
          {!showRecipientForm ? (
            // Gift Question Section
            <>
              <div className="text-center mb-4">
                <h1 className="text-xl font-bold text-black mb-2 leading-tight">
                  Is this a gift for someone?
                </h1>
              </div>
              
              <div className="space-y-2 mb-4">
                <OptionCard 
                  value="yes" 
                  label="Yes" 
                />
                <OptionCard 
                  value="no" 
                  label="No" 
                />
              </div>
              
              <div className="flex justify-center">
                <button
                  className={`next-button bg-black text-white font-medium text-sm py-1 px-4 rounded transition-all duration-300 ${
                    !selectedOption ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={handleNext}
                  type="button"
                  disabled={!selectedOption}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            // Recipient Information Form (Simplified)
            <>
              <div className="mb-4">
                <h1 className="text-xl font-bold text-black mb-1 leading-tight">
                  Gift Recipient Details
                </h1>
                <p className="text-sm text-gray-600">
                  Please enter the recipient's information
                </p>
              </div>
              
              <form onSubmit={handleRecipientSubmit}>
                <InputField 
                  label="Recipient's Name"
                  name="name"
                  value={recipientData.name}
                  onChange={handleInputChange}
                  required
                />
                
                <InputField 
                  label="Address"
                  name="address"
                  value={recipientData.address}
                  onChange={handleInputChange}
                  required
                />
                
                <div className="flex justify-between mt-5">
                  <button
                    type="button"
                    className="text-sm py-1 px-4 border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
                    onClick={() => setShowRecipientForm(false)}
                  >
                    Back
                  </button>
                  
                  <button
                    type="submit"
                    onClick={() => router.push('/customer/orderFinal')}
                    className="bg-black text-white font-medium text-sm py-1 px-4 rounded"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </main>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .shake {
          animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
      `}</style>
    </div>
  );
};

export default GiftQuestionPage;