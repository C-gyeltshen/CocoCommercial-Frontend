"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const OrderPreferencePage = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>("");

  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between p-6">
      <div className="flex-1 max-w-md mx-auto w-full">
        <div className="mt-16 space-y-8">
          {/* Title */}
          <div>
            <h1 className="text-2xl font-medium text-gray-800 text-center">
              How would you like to receive your order?
            </h1>
          </div>

          {/* Options */}
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Delivery Option */}
                <div 
                  className={`cursor-pointer transition-all duration-200 p-4 rounded-lg border ${
                    selectedOption === 'delivery' 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedOption('delivery')}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-800">
                      Delivery
                    </span>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      selectedOption === 'delivery'
                        ? 'border-orange-500 bg-orange-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedOption === 'delivery' && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pick Up Option */}
                <div 
                  className={`cursor-pointer transition-all duration-200 p-4 rounded-lg border ${
                    selectedOption === 'pickup' 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedOption('pickup')}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-800">
                      Pick Up
                    </span>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      selectedOption === 'pickup'
                        ? 'border-orange-500 bg-orange-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedOption === 'pickup' && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => router.push('/customer/order5')}
          disabled={!selectedOption}
          className="bg-black hover:bg-gray-800 text-white rounded-full px-8 py-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OrderPreferencePage;