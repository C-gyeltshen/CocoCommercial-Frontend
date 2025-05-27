"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, QrCode, Copy, Check, Upload, X, Image } from "lucide-react";
import { useRouter } from "next/navigation";

const CheckoutForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    receiveOffers: false,
    receiveUpdates: false,
    orderPreference: "",
    isGift: "",
    recipientName: "",
    recipientAddress: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    orderPreference: "",
    isGift: "",
    recipientName: "",
    recipientAddress: "",
  });
  const [copied, setCopied] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const accountNumber = "1234567890123456";
  const merchantName = "Sample Merchant Store";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      let cleanedValue = value.replace(/\D/g, "");
      if (cleanedValue.length === 1 && !["7", "1"].includes(cleanedValue)) {
        cleanedValue = "";
      } else if (cleanedValue.length === 2) {
        if (!["77", "17"].includes(cleanedValue)) {
          cleanedValue = cleanedValue.startsWith("7") ? "77" : cleanedValue.startsWith("1") ? "17" : "";
        }
      } else if (cleanedValue.length > 2 && !cleanedValue.startsWith("77") && !cleanedValue.startsWith("17")) {
        cleanedValue = "";
      }
      cleanedValue = cleanedValue.slice(0, 8);
      setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCheckboxChange = (name) => (checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleOptionSelect = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (step === 1) {
      if (!formData.name) {
        newErrors.name = "Please enter your name";
        isValid = false;
      }
      if (!formData.email) {
        newErrors.email = "Please enter your email";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
        isValid = false;
      }
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = "Please enter your phone number";
        isValid = false;
      } else if (formData.phoneNumber.length !== 8 || (!formData.phoneNumber.startsWith("77") && !formData.phoneNumber.startsWith("17"))) {
        newErrors.phoneNumber = "Phone number must be 8 digits and start with 77 or 17";
        isValid = false;
      }
    } else if (step === 2) {
      if (!formData.orderPreference) {
        newErrors.orderPreference = "Please select an order preference";
        isValid = false;
      }
    } else if (step === 3) {
      if (!formData.isGift) {
        newErrors.isGift = "Please select if this is a gift";
        isValid = false;
      } else if (formData.isGift === "yes") {
        if (!formData.recipientName) {
          newErrors.recipientName = "Please enter recipient's name";
          isValid = false;
        }
        if (!formData.recipientAddress) {
          newErrors.recipientAddress = "Please enter recipient's address";
          isValid = false;
        }
      }
    } else if (step === 4) {
      if (!uploadedImage) {
        setErrors((prev) => ({ ...prev, payment: "Please upload a payment screenshot" }));
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 4) {
        setStep(step + 1);
      } else {
        router.push("/customer/complete");
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCopyAccount = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleFiles = (files) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImage({
            file: file,
            preview: e.target?.result,
            name: file.name,
          });
          setErrors((prev) => ({ ...prev, payment: "" }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e) => {
    handleFiles(e.target.files);
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const ProgressBar = () => {
    const steps = [
      { label: "Personal Info", step: 1 },
      { label: "Order Preference", step: 2 },
      { label: "Gift Details", step: 3 },
      { label: "Payment", step: 4 },
    ];

    const progressWidth = ((step - 1) / (steps.length - 1)) * 100;

    return (
      <div className="mb-8 w-full max-w-md mx-auto">
        <div className="relative flex items-center justify-between">
          {/* Background Line */}
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200"></div>
          {/* Progress Line */}
          <div
            className="absolute top-4 left-0 h-1 bg-black transition-all duration-300"
            style={{ width: `${progressWidth}%` }}
          ></div>
          {/* Steps */}
          {steps.map((s) => (
            <div key={s.step} className="relative flex-1 text-center z-10">
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                  step >= s.step ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {s.step}
              </div>
              <p className="text-sm mt-2 text-gray-600">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const OptionCard = ({ value, label, name }) => {
    const isSelected = formData[name] === value;
    return (
      <div
        className={`relative py-3 px-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
          isSelected ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
        }`}
        onClick={() => handleOptionSelect(name, value)}
      >
        {isSelected && (
          <div className="absolute top-2 right-2 w-4 h-4 bg-black rounded-full flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        <input
          type="radio"
          name={name}
          value={value}
          checked={isSelected}
          onChange={() => handleOptionSelect(name, value)}
          className="sr-only"
        />
        <div className="text-center">
          <h3 className={`text-base font-medium ${isSelected ? "text-black" : "text-gray-800"}`}>{label}</h3>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <ProgressBar />
      <Card className="border-gray-200 rounded-xl shadow-lg w-full max-w-md">
        <CardContent className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold text-gray-800 text-center">Your Information</h1>
              <div>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="border-0 border-b-2 border-gray-300 rounded-none bg-transparent px-0 py-4 focus:border-black focus:ring-0"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="border-0 border-b-2 border-gray-300 rounded-none bg-transparent px-0 py-4 focus:border-black focus:ring-0"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                <p className="text-sm text-gray-500 mt-1">Your order confirmation will be sent here</p>
              </div>
              <div>
                <Input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="77XXXXXX or 17XXXXXX"
                  className="border-0 border-b-2 border-gray-300 rounded-none bg-transparent px-0 py-4 focus:border-black focus:ring-0"
                  maxLength={8}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="receiveOffers"
                  checked={formData.receiveOffers}
                  onCheckedChange={handleCheckboxChange("receiveOffers")}
                  className="data-[state=checked]:bg-black data-[state=checked]:border-black"
                />
                <label htmlFor="receiveOffers" className="text-sm text-gray-600 cursor-pointer">
                  Receive shop offers and updates via email
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="receiveUpdates"
                  checked={formData.receiveUpdates}
                  onCheckedChange={handleCheckboxChange("receiveUpdates")}
                  className="data-[state=checked]:bg-black data-[state=checked]:border-black"
                />
                <label htmlFor="receiveUpdates" className="text-sm text-gray-600 cursor-pointer">
                  Receive shop offers and updates via SMS
                </label>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold text-gray-800 text-center">Order Preference</h1>
              <div className="space-y-4">
                <OptionCard name="orderPreference" value="delivery" label="Delivery" />
                <OptionCard name="orderPreference" value="pickup" label="Pick Up" />
                {errors.orderPreference && <p className="text-red-500 text-sm text-center">{errors.orderPreference}</p>}
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold text-gray-800 text-center">Is this a gift?</h1>
              <div className="space-y-4">
                <OptionCard name="isGift" value="yes" label="Yes" />
                <OptionCard name="isGift" value="no" label="No" />
                {errors.isGift && <p className="text-red-500 text-sm text-center">{errors.isGift}</p>}
              </div>
              {formData.isGift === "yes" && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-gray-800">Gift Recipient Details</h2>
                  <div>
                    <Input
                      type="text"
                      name="recipientName"
                      value={formData.recipientName}
                      onChange={handleInputChange}
                      placeholder="Recipient's Name"
                      className="border-0 border-b-2 border-gray-300 rounded-none bg-transparent px-0 py-4 focus:border-black focus:ring-0"
                    />
                    {errors.recipientName && <p className="text-red-500 text-sm mt-1">{errors.recipientName}</p>}
                  </div>
                  <div>
                    <Input
                      type="text"
                      name="recipientAddress"
                      value={formData.recipientAddress}
                      onChange={handleInputChange}
                      placeholder="Recipient's Address"
                      className="border-0 border-b-2 border-gray-300 rounded-none bg-transparent px-0 py-4 focus:border-black focus:ring-0"
                    />
                    {errors.recipientAddress && <p className="text-red-500 text-sm mt-1">{errors.recipientAddress}</p>}
                  </div>
                </div>
              )}
            </div>
          )}
          {step === 4 && (
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold text-gray-800 text-center">Payment Details</h1>
              <div className="border border-gray-300 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Account Number</h2>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="font-mono text-lg tracking-wider text-center">{accountNumber}</div>
                </div>
                <Button
                  onClick={handleCopyAccount}
                  className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white py-2 rounded-lg transition-colors"
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy Account Number
                    </>
                  )}
                </Button>
              </div>
              <div className="border border-gray-300 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">QR Merchant Code</h2>
                <div className="text-center">
                  <div className="bg-gray-50 rounded-lg p-8 mb-4 inline-block">
                    <QrCode size={120} className="mx-auto" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Scan to pay</p>
                  <p className="font-medium">{merchantName}</p>
                </div>
              </div>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? "border-black bg-gray-50" : "border-gray-300"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {!uploadedImage ? (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Upload size={24} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-lg font-medium mb-2">Drop your payment screenshot here</p>
                      <p className="text-gray-500 text-sm mb-4">or click to browse files</p>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg"
                      >
                        Choose File
                      </Button>
                    </div>
                    <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative inline-block">
                      <img
                        src={uploadedImage.preview}
                        alt="Uploaded screenshot"
                        className="max-w-full max-h-64 rounded-lg shadow-md"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 hover:bg-gray-800 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">{uploadedImage.name}</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              {errors.payment && <p className="text-red-500 text-sm mt-2 text-center">{errors.payment}</p>}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Image size={20} className="text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Screenshot Guidelines:</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Include transaction reference number</li>
                      <li>• Ensure payment amount is visible</li>
                      <li>• Image should be clear and readable</li>
                      <li>• No personal banking details needed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <Button
                onClick={handleBack}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300 py-2 rounded-lg"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="bg-black hover:bg-gray-800 text-white py-2 rounded-lg ml-auto"
            >
              {step === 4 ? "Submit Order" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutForm;