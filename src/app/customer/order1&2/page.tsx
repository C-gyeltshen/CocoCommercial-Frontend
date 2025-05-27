"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const CheckoutForm = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [receiveOffers, setReceiveOffers] = useState(false);

  useEffect(() => {
    // Client-side initialization if needed
  }, []);

  const handleNext = () => {
    if (step === 1 && !name) return;
    if (step === 2 && !email) return;
    if (step < 2) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-2xl transform transition-all duration-300 hover:shadow-3xl">
        {step === 1 && (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">What’s Your Name?</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b-2 border-gray-300 p-3 text-gray-800 focus:outline-none focus:border-black placeholder-gray-400"
              placeholder="Enter your name"
            />
            <Button
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
              onClick={handleNext}
              disabled={!name}
            >
              Next
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">What’s Your Email?</h2>
            <p className="text-sm text-gray-600">Your order confirmation will be sent here</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b-2 border-gray-300 p-3 text-gray-800 focus:outline-none focus:border-black placeholder-gray-400"
              placeholder="Enter your email"
            />
            <div className="flex items-center justify-center">
              <input
                type="checkbox"
                checked={receiveOffers}
                onChange={(e) => setReceiveOffers(e.target.checked)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Receive shop offers and updates</span>
            </div>
            <div className="flex space-x-4">
              <Button
                className="w-1/2 bg-gray-200 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                className="w-1/2 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                onClick={() => alert(`Order placed for ${name} at ${email}`)}
                disabled={!email}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;