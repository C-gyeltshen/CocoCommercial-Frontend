"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Menu, X, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

const SignupPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoOnScroll, setShowLogoOnScroll] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowLogoOnScroll(true);
      } else {
        setShowLogoOnScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full mx-auto font-sans text-[#2C3E50]">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#1B4965] shadow-md transition-all duration-300">
        {/* Navigation content remains the same */}
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div
                className={`transform transition-all duration-500 ease-in-out ${
                  showLogoOnScroll
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4"
                }`}
              >
                <Image
                  src="/cocologo.png"
                  alt="Coco Commercial Logo"
                  width={50}
                  height={50}
                  className="sm:mr-8"
                />
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="/"
                  className="text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-orange-400"
                >
                  Home
                </a>
                <a
                  href="/#about"
                  className="text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-orange-400"
                >
                  About Us
                </a>
                <a
                  href="/#contact"
                  className="text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-orange-400"
                >
                  Contact Us
                </a>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <a
                href="/login"
                className="text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-orange-400"
              >
                Login
              </a>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-4">
                <a
                  href="/"
                  className="text-white px-6 py-2 transition-all duration-300 hover:bg-orange-400"
                >
                  Home
                </a>
                <a
                  href="/#about"
                  className="text-white px-6 py-2 transition-all duration-300 hover:bg-orange-400"
                >
                  About Us
                </a>
                <a
                  href="/#contact"
                  className="text-white px-6 py-2 transition-all duration-300 hover:bg-orange-400"
                >
                  Contact Us
                </a>
                <a
                  href="/login"
                  className="text-white px-6 py-2 transition-all duration-300 hover:bg-orange-400"
                >
                  Login
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Image
              src="/logo.png"
              alt="Coco Commercial Logo"
              width={80}
              height={80}
              className="mx-auto mb-6"
            />
            <h1 className="font-serif text-3xl font-normal text-primary mb-4">
              Create Your Account
            </h1>
            <p className="text-gray-600 mb-8">
              Join Coco Commercial to connect with broader markets
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <button
                onClick={() => setUserType('merchant')}
                className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                  userType === 'merchant'
                    ? 'border-[#1B4965] bg-blue-50'
                    : 'border-gray-200 hover:border-[#1B4965]'
                }`}
              >
                <h3 className="font-serif text-lg mb-2">Join as a Merchant</h3>
                <p className="text-sm text-gray-600">
                  Sell your products and reach more customers
                </p>
              </button>
              <button
                onClick={() => setUserType('customer')}
                className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                  userType === 'customer'
                    ? 'border-[#1B4965] bg-blue-50'
                    : 'border-gray-200 hover:border-[#1B4965]'
                }`}
              >
                <h3 className="font-serif text-lg mb-2">Join as a Customer</h3>
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
                  {/* Common Information */}
                  <div className="space-y-4">
                    <h2 className="font-serif text-xl text-primary mb-4">
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name*"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#1B4965] focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Last Name*"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#1B4965] focus:outline-none"
                        required
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address*"
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#1B4965] focus:outline-none"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number*"
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#1B4965] focus:outline-none"
                      required
                    />
                  </div>

                  {/* Merchant-specific fields */}
                  {userType === 'merchant' && (
                    <div className="space-y-4">
                      <h2 className="font-serif text-xl text-primary mb-4">
                        Business Information
                      </h2>
                      <input
                        type="text"
                        placeholder="Business Name*"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#1B4965] focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Business License Number*"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#1B4965] focus:outline-none"
                        required
                      />
                      <select className="w-full p-3 border rounded-md text-gray-600 focus:ring-2 focus:ring-[#1B4965] focus:outline-none">
                        <option value="">Business Category*</option>
                        <option value="retail">Retail</option>
                        <option value="hospitality">Hospitality</option>
                        <option value="agriculture">Agriculture</option>
                        <option value="handicrafts">Handicrafts</option>
                      </select>
                      <textarea
                        placeholder="Business Description*"
                        rows={3}
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#1B4965] focus:outline-none"
                        required
                      />
                    </div>
                  )}

                  {/* Account Security */}
                  <div className="space-y-4">
                    <h2 className="font-serif text-xl text-primary mb-4">
                      Account Security
                    </h2>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password*"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#1B4965] focus:outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-500"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password*"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#1B4965] focus:outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-500"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      className="rounded border-gray-300 text-[#1B4965] focus:ring-[#1B4965]"
                      required
                    />
                    <label htmlFor="terms" className="ml-2 text-gray-600 text-sm">
                      I agree to the{" "}
                      <a href="#" className="text-[#1B4965] hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-[#1B4965] hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <Button className="w-full bg-[#1B4965] text-white py-3 rounded-full hover:bg-orange-400 transition-all duration-300">
                    Create Account
                  </Button>
                </form>

                <div className="mt-6 text-center text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-[#1B4965] hover:underline font-medium"
                  >
                    Log in
                  </a>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default SignupPage;