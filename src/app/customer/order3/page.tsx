"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const PhoneNumberPage = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove all non-digits
    
    // Ensure it starts with 77 or 17
    if (value.length === 0) {
      setPhoneNumber('');
    } else if (value.length === 1) {
      if (value === '7' || value === '1') {
        setPhoneNumber(value);
      }
    } else if (value.length === 2) {
      if (value === '77' || value === '17') {
        setPhoneNumber(value);
      } else if (value.startsWith('7')) {
        setPhoneNumber('77');
      } else if (value.startsWith('1')) {
        setPhoneNumber('17');
      }
    } else {
      // For lengths > 2, ensure it starts with 77 or 17 and limit to 8 digits
      if (value.startsWith('77') || value.startsWith('17')) {
        setPhoneNumber(value.slice(0, 8));
      }
    }
    
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const validatePhone = (): boolean => {
    if (phoneNumber.length !== 8) {
      setError("Please fill in a value.");
      return false;
    }
    if (!phoneNumber.startsWith('77') && !phoneNumber.startsWith('17')) {
      setError("Phone number must start with 77 or 17");
      return false;
    }
    setError(""); // Clear any existing errors
    return true;
  };

  const handleNext = () => {
    if (validatePhone()) {
      // Navigate to the order preference page
      router.push('/customer/order4');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between p-6">
      <div className="flex-1 max-w-md mx-auto w-full">
        <div className="mt-16 space-y-8">
          {/* Title */}
          <div>
            <h1 className="text-2xl font-medium text-gray-800 mb-2">
              What is ur phone number?
            </h1>
            <p className="text-gray-500">
              Your order confirmation will be sent here
            </p>
          </div>

          {/* Phone Input */}
          <div className="space-y-2">
            <div className="relative">
              <Input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="77XXXXXX or 17XXXXXX"
                className="text-lg border-0 border-b-2 border-gray-300 rounded-none bg-transparent px-0 py-4 focus:border-black focus:ring-0 focus-visible:ring-0"
                maxLength={8}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          {/* Checkbox */}
          <div className="flex items-center space-x-3">
            <Checkbox
              id="updates"
              checked={receiveUpdates}
              onCheckedChange={(checked) => setReceiveUpdates(checked as boolean)}
              className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
            />
            <label 
              htmlFor="updates" 
              className="text-gray-600 cursor-pointer"
            >
              I'd like to receive shop offers and updates through SMS
            </label>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          className="bg-black hover:bg-gray-800 text-white rounded-full px-8 py-3"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PhoneNumberPage;