"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/Footer";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/Navbar";

const SignupPage = () => {
  const [userType, setUserType] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    console.log("Selected file:", file);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-[#2C3E50]">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <img
              src="/cocologo.png"
              alt="Coco Commercial Logo"
              className="mx-auto mb-6 h-20 w-20"
            />
            <h2 className="font-serif text-3xl font-normal text-primary mb-4">
              Create Your Account
            </h2>
            <p className="text-gray-600 mb-8">
              Join Coco Commercial to connect with broader markets
            </p>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Shop & Sell with Coco commercial</h1>
            <p className="text-lg text-gray-600 mb-8">
              Every Bhutanese business deserves to grow online. Whether you're a local food vendor, artisan, or shop owner, our platform helps you manage sales and reach customers without breaking the bank. Start your digital journey today.
            </p>
            <img
              src="/coco1.png"
              alt="Coco Commercial Marketplace Illustration"
              className="w-full rounded-lg shadow-xl mb-16"
            />
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <h2 className="text-center text-2xl font-bold mb-4">Choose Your Role</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <button
                onClick={() => setUserType("merchant")}
                className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                  userType === "merchant"
                    ? "border-[#1B4965] bg-blue-50"
                    : "border-gray-200 hover:border-[#1B4965]"
                }`}
              >
                <h3 className="font-serif text-lg mb-2">Sign Up as a Merchant</h3>
                <p className="text-sm text-gray-600">
                  Sell your products and reach more customers
                </p>
              </button>
              <button
                onClick={() => setUserType("customer")}
                className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                  userType === "customer"
                    ? "border-[#1B4965] bg-blue-50"
                    : "border-gray-200 hover:border-[#1B4965]"
                }`}
              >
                <h3 className="font-serif text-lg mb-2">Sign Up as a Customer</h3>
                <p className="text-sm text-gray-600">
                  Discover and shop from local businesses
                </p>
              </button>
            </div>
          </div>

          {userType && (
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <form className="space-y-6">
                  {userType === "merchant" ? (
                    <>
                      <div className="space-y-4">
                        <h2 className="font-serif text-xl text-primary mb-4">
                          Merchant Details
                        </h2>
                        <Input
                          type="text"
                          placeholder="Full Name"
                          required
                        />
                        <select
                          className="w-full p-3 border rounded-md text-gray-600 focus:ring-2 focus:ring-[#1B4965] focus:outline-none"
                        >
                          <option value="">Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        <Input
                          type="email"
                          placeholder="Email"
                          required
                        />
                        <Input
                          type="tel"
                          placeholder="Contact Number"
                          required
                        />
                        <select
                          className="w-full p-3 border rounded-md text-gray-600 focus:ring-2 focus:ring-[#1B4965] focus:outline-none"
                        >
                          <option value="">Dzongkhag</option>
                          <option value="thimphu">Thimphu</option>
                          <option value="paro">Paro</option>
                        </select>
                        <select
                          className="w-full p-3 border rounded-md text-gray-600 focus:ring-2 focus:ring-[#1B4965] focus:outline-none"
                        >
                          <option value="">Gewog</option>
                          <option value="gewog1">Gewog 1</option>
                          <option value="gewog2">Gewog 2</option>
                        </select>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Documents
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileSelect(file);
                              }}
                              id="file-upload"
                            />
                            <label
                              htmlFor="file-upload"
                              className="cursor-pointer text-[#1B4965] hover:text-orange-400"
                            >
                              Click to upload or drag and drop
                            </label>
                          </div>
                          {selectedFile && (
                            <p className="mt-2 text-sm text-gray-600">
                              Selected: {selectedFile.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-4">
                        <h2 className="font-serif text-xl text-primary mb-4">
                          Customer Details
                        </h2>
                        <Input
                          type="text"
                          placeholder="Full Name"
                          required
                        />
                        <select
                          className="w-full p-3 border rounded-md text-gray-600 focus:ring-2 focus:ring-[#1B4965] focus:outline-none"
                        >
                          <option value="">Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        <Input
                          type="email"
                          placeholder="Email"
                          required
                        />
                        <Input
                          type="tel"
                          placeholder="Contact Number"
                          required
                        />
                      </div>
                    </>
                  )}
                  <Button className="w-full bg-[#1B4965] text-white py-3 rounded-full hover:bg-orange-400 transition-all duration-300">
                    Submit
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;