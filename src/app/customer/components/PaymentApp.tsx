'use client';

import React, { useState, useRef } from 'react';
import { QrCode, Copy, Check, Upload, Image, X, ArrowRight, ArrowLeft } from 'lucide-react';

const PaymentApp = () => {
  const [currentPage, setCurrentPage] = useState('account'); // 'account' or 'screenshot'
  const [copied, setCopied] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const accountNumber = "1234567890123456";
  const merchantName = "Sample Merchant Store";

  // Account page functions
  const handleCopyAccount = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Screenshot page functions
  const handleFiles = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImage({
            file: file,
            preview: e.target?.result,
            name: file.name
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if (uploadedImage) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  // Account Number and QR Page
  const AccountPage = () => (
    <div className="max-w-md mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Payment Details</h1>
        <p className="text-gray-600">Account & QR Information</p>
      </div>

      {/* Account Number Section */}
      <div className="border border-gray-300 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Account Number</h2>
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="font-mono text-lg tracking-wider text-center">
            {accountNumber}
          </div>
        </div>
        <button
          onClick={handleCopyAccount}
          className="w-full flex items-center justify-center gap-2 bg-red-800 text-white py-2 px-4 rounded-lg hover:bg-red-900 transition-colors"
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
        </button>
      </div>

      {/* QR Code Section */}
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

      {/* Instructions */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Payment Instructions:</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Use account number for bank transfers</li>
          <li>• Scan QR code for mobile payments</li>
          <li>• Keep transaction receipt for records</li>
        </ul>
      </div>

      {/* Navigate to Screenshot Page */}
      <button
        onClick={() => setCurrentPage('screenshot')}
        className="w-full flex items-center justify-center gap-2 bg-red-800 text-white py-3 px-4 rounded-lg hover:bg-red-900 transition-colors font-medium"
      >
        Upload Payment Screenshot
        <ArrowRight size={16} />
      </button>
    </div>
  );

  // Screenshot Upload Page
  const ScreenshotPage = () => (
    <div className="max-w-lg mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Upload Screenshot</h1>
        <p className="text-gray-600">Share your payment confirmation</p>
      </div>

      {/* Back Button */}
      <button
        onClick={() => setCurrentPage('account')}
        className="flex items-center gap-2 text-red-800 hover:text-red-900 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Payment Details
      </button>

      {/* Upload Area */}
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? 'border-red-800 bg-gray-50' : 'border-gray-300'
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
              <p className="text-lg font-medium mb-2">Drop your screenshot here</p>
              <p className="text-gray-500 text-sm mb-4">or click to browse files</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-red-800 text-white px-6 py-2 rounded-lg hover:bg-red-900 transition-colors"
              >
                Choose File
              </button>
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
                className="absolute -top-2 -right-2 bg-red-800 text-white rounded-full p-1 hover:bg-red-900 transition-colors"
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

      {/* Submit Button */}
      {uploadedImage && (
        <button
          onClick={handleSubmit}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            submitted 
              ? 'bg-green-500 text-white' 
              : 'bg-red-800 text-white hover:bg-red-900'
          }`}
          disabled={submitted}
        >
          {submitted ? (
            <div className="flex items-center justify-center gap-2">
              <Check size={16} />
              Screenshot Submitted!
            </div>
          ) : (
            'Submit Screenshot'
          )}
        </button>
      )}

      {/* Info Section */}
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
  );

  return (
    <div className="min-h-screen bg-white text-black p-6">
      {currentPage === 'account' ? <AccountPage /> : <ScreenshotPage />}
    </div>
  );
};

export default PaymentApp;