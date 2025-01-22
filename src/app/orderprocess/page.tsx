"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ArrowRight, ArrowLeft, Upload, MapPin, Loader, AlertCircle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Types and Interfaces
interface Location {
  displayName: string;
  lat: number;
  lon: number;
}

interface LocationSearchProps {
  value: Location | null;
  onSelect: (location: Location) => void;
  disabled: boolean;
}

interface NominatimResponse {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

interface OrderFormData {
  phoneNumber: string;
  quantity: number;
  location: Location | null;
  fulfillmentDate?: Date;
  paymentProof: string | null;
}

interface ProductDetails {
  name: string;
  price: number;
  image: string;
  description: string;
}

interface MerchantAccount {
  name: string;
  accountNumber: string;
  bank: string;
}

interface FormErrors {
  phoneNumber?: string;
  location?: string;
  fulfillmentDate?: string;
  paymentProof?: string;
}

// Location search component
const LocationSearch: React.FC<LocationSearchProps> = ({ value, onSelect, disabled }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<NominatimResponse[]>([]);
  
  const searchLocation = async (query: string) => {
    if (query.length < 3) {
      setLocations([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data: NominatimResponse[] = await response.json();
      setLocations(data);
    } catch (error) {
      console.error('Error searching locations:', error);
      setLocations([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          placeholder="Search for your location..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            searchLocation(e.target.value);
          }}
          disabled={disabled}
          className="rounded-lg pr-10"
        />
        <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {value?.displayName && (
        <div className="mt-2 p-2 bg-gray-50 rounded-lg text-sm">
          <span className="font-medium">Selected: </span>
          {value.displayName}
        </div>
      )}

      {searchTerm.length >= 3 && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          {locations.map((location) => (
            <div
              key={location.place_id}
              className={cn(
                "px-4 py-2 cursor-pointer flex items-center space-x-2",
                "hover:bg-gray-100",
                value?.displayName === location.display_name && "bg-gray-50"
              )}
              onClick={() => {
                onSelect({
                  displayName: location.display_name,
                  lat: parseFloat(location.lat),
                  lon: parseFloat(location.lon)
                });
                setSearchTerm("");
              }}
            >
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{location.display_name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CustomerOrderPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OrderFormData>({
    phoneNumber: "",
    quantity: 1,
    location: null,
    fulfillmentDate: undefined,
    paymentProof: null
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const productDetails: ProductDetails = {
    name: "Havic HV G-92 Gamepad",
    price: 192.00,
    image: "/gamepad-image.jpg",
    description: "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free installation & mess free removal. Pressure sensitive."
  };

  const merchantAccount: MerchantAccount = {
    name: "Merchant Name",
    accountNumber: "211435435",
    bank: "BoB"
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Phone number validation
    const phoneDigits = formData.phoneNumber.replace(/\D/g, '');
    if (phoneDigits.length !== 8) {
        newErrors.phoneNumber = "Phone number must be exactly 8 digits";
    } else if (!phoneDigits.startsWith('77') && !phoneDigits.startsWith('17')) {
        newErrors.phoneNumber = "Phone number must start with 77 or 17";
    }

    if (!formData.location) {
        newErrors.location = "Please select a delivery location";
    }

    if (currentStep === 2) {
        if (!formData.fulfillmentDate) {
            newErrors.fulfillmentDate = "Please select a fulfillment date";
        }
        if (!formData.paymentProof) {
            newErrors.paymentProof = "Please upload payment proof";
        }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

  const handleQuantityChange = (operation: 'increment' | 'decrement') => {
    setFormData(prev => ({
      ...prev,
      quantity: operation === 'increment' ? prev.quantity + 1 : Math.max(1, prev.quantity - 1)
    }));
  };

  const handleNextStep = () => {
    const isValid = validateForm();
    if (isValid) {
        setCurrentStep(2);
    } else {
        // Optionally scroll to the first error
        const firstError = document.querySelector('.text-red-500');
        firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};
const [isSubmitting, setIsSubmitting] = useState(false);

const handleConfirmOrder = async () => {
    if (validateForm()) {
        try {
            setIsSubmitting(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                // Reset form or redirect
                setFormData({
                    phoneNumber: "",
                    quantity: 1,
                    location: null,
                    fulfillmentDate: undefined,
                    paymentProof: null
                });
                setCurrentStep(1);
            }, 3000);
        } catch (error) {
            console.error('Error submitting order:', error);
        } finally {
            setIsSubmitting(false);
        }
    }
};

  <Input
    placeholder="Enter phone number"
    value={formData.phoneNumber}
    onChange={(e) => {
      setFormData({...formData, phoneNumber: e.target.value});
      if (errors.phoneNumber) {
        setErrors(prev => ({ ...prev, phoneNumber: "" }));
      }
    }}
    className={cn(
      "rounded-lg",
      errors.phoneNumber && "border-red-500 focus-visible:ring-red-500"
    )}
  />
  {errors.phoneNumber && (
    <p className="text-sm text-red-500 mt-1">{errors.phoneNumber}</p>
  )}


  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardContent className="p-6">
            {currentStep === 1 ? (
              // Step 1: Product Details and Customer Info
              <div className="space-y-6">
                {/* Product Details Section */}
                    <div className="space-y-6">
                    {/* Product Header with Price */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-serif">{productDetails.name}</h2>
                        <span className="text-lg">Nu. {productDetails.price.toFixed(2)}</span>
                    </div>

                    {/* Product Image */}
                    <div className="aspect-square w-full max-w-md mx-auto relative">
                        <Image
                        src={productDetails.image}
                        alt={productDetails.name}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-lg"
                        />
                    </div>

                    {/* Product Description */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-600 text-sm leading-relaxed">
                        {productDetails.description}
                        </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-4">
                        <Button
                        variant="outline"
                        onClick={() => handleQuantityChange('decrement')}
                        className="rounded-full w-10 h-10 p-0 border-gray-200"
                        >
                        -
                        </Button>
                        <span className="w-12 text-center text-lg">{formData.quantity}</span>
                        <Button
                        variant="outline"
                        onClick={() => handleQuantityChange('increment')}
                        className="rounded-full w-10 h-10 p-0 border-gray-200"
                        >
                        +
                        </Button>
                    </div>

                    {/* Customer Info Section */}
                    <div className="space-y-4 mt-6">
                        {/* Read-only Product Name Display */}
                        <Input
                        value={productDetails.name}
                        disabled
                        className="rounded-lg bg-gray-50"
                        />
                        
                        {/* Read-only Quantity Display */}
                        <Input
                        value={`Quantity: ${formData.quantity}`}
                        disabled
                        className="rounded-lg bg-gray-50"
                        />

                        <Input
                        placeholder="Enter phone number"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                        className="rounded-lg"
                        />

                        <LocationSearch
                        value={formData.location}
                        onSelect={(location) => setFormData({...formData, location})}
                        disabled={false}
                        />
                    </div>
                    </div>

                {/* Navigation */}
               
                <div className="flex flex-col space-y-4">
                    {errors.phoneNumber && (
                        <p className="text-sm text-red-500">{errors.phoneNumber}</p>
                    )}
                    {errors.location && (
                        <p className="text-sm text-red-500">{errors.location}</p>
                    )}
                    <div className="flex justify-end">
                        <Button
                            onClick={handleNextStep}
                            className="rounded-full bg-orange-400 hover:bg-orange-500 text-white px-6"
                        >
                            Next Step <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
              </div>
            ) : (
              // Step 2: Payment and Fulfillment
              <div className="space-y-6">
                {/* Date Selection Display */}
                <div className="space-y-4">
                  <h2 className="text-xl font-serif mb-4">Choose Fulfillment date</h2>
                  
                  <Calendar
                    mode="single"
                    selected={formData.fulfillmentDate}
                    onSelect={(date) => setFormData({...formData, fulfillmentDate: date})}
                    className="rounded-md border mx-auto"
                    disabled={(date) => date < new Date()}
                  />

                  {formData.fulfillmentDate && (
                    <Input
                      value={format(formData.fulfillmentDate, "MMMM dd, yyyy")}
                      disabled
                      className="rounded-lg bg-gray-50 mt-4"
                    />
                  )}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Payment Details</h3>
                  <div className="space-y-2">
                    <p>Bank: {merchantAccount.bank}</p>
                    <p>Account Number: {merchantAccount.accountNumber}</p>
                    <p>Account Holder: {merchantAccount.name}</p>
                  </div>
                  <div className="mt-4">
                    <Image
                      src="/qr-code.png"
                      alt="Payment QR Code"
                      width={200}
                      height={200}
                      className="mx-auto"
                    />
                    <Button
                      variant="outline"
                      className="mt-2 w-full rounded-full"
                      onClick={() => {/* Handle QR code download */}}
                    >
                      Download QR Code
                    </Button>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-2">Upload Payment Proof</h3>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {formData.paymentProof ? (
                      <div className="relative">
                        <img
                          src={formData.paymentProof}
                          alt="Payment proof"
                          className="max-h-48 mx-auto rounded-lg"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData({...formData, paymentProof: null});
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                        >
                          <Upload className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">Click to upload payment proof</p>
                      </>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          setFormData(prev => ({
                            ...prev,
                            paymentProof: e.target?.result as string
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
                {/* Error Display Section - Add this before the navigation buttons */}
                {(errors.fulfillmentDate || errors.paymentProof) && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
                    {errors.fulfillmentDate && (
                    <p className="text-sm text-red-500 flex items-center">
                        <AlertCircle className="mr-2 h-4 w-4" /> {errors.fulfillmentDate}
                    </p>
                    )}
                    {errors.paymentProof && (
                    <p className="text-sm text-red-500 flex items-center">
                        <AlertCircle className="mr-2 h-4 w-4" /> {errors.paymentProof}
                    </p>
                    )}
                </div>
                )}

                {/* Existing navigation buttons */}
                <div className="flex justify-between pt-4">
                <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="rounded-full"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button
                    onClick={handleConfirmOrder}
                    disabled={isSubmitting}
                    className="rounded-full bg-orange-400 hover:bg-orange-500 text-white"
                >
                    {isSubmitting ? (
                    <span className="flex items-center">
                        <Loader className="animate-spin mr-2 h-4 w-4" />
                        Processing...
                    </span>
                    ) : (
                    "Confirm order"
                    )}
                </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {/* Success Notification */}
      {showSuccess && (
            <div className="fixed top-4 right-4 z-50 transition-all duration-300">
                <Alert className="bg-green-50 border-green-200">
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>Your order has been placed successfully.</AlertDescription>
                </Alert>
            </div>
        )}
    </div>
  );
};

export default CustomerOrderPage;