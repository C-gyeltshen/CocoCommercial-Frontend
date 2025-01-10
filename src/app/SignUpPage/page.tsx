"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import FileUpload from "@/components/ui/FileUpload";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    email: "",
    contactNumber: "",
    dzongkhag: "",
    gewog: "",
    village: "",
    userProfile: null as File | null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = (file: File) => {
    setFormData({
      ...formData,
      userProfile: file,
    });
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.contactNumber.trim())
      newErrors.contactNumber = "Contact number is required.";
    if (!formData.dzongkhag) newErrors.dzongkhag = "Dzongkhag is required.";
    if (!formData.gewog) newErrors.gewog = "Gewog is required.";
    if (!formData.village) newErrors.village = "Village is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Signup successful!");
    }
  };

  // Settings for react-slick carousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full mx-auto font-sans text-[#2C3E50]">
      <Navbar />
      <div className="bg-[#f2fafc] py-6">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left Side with Carousel */}
          <div>
            <h2 className="text-4xl font-bold text-[#0A1C2E] mb-4">
              Shop & Sell with Gakyid Market
            </h2>
            <p className="text-lg text-black mb-6">
              Every Bhutanese business deserves to grow online. Whether you're a
              local food vendor, artisan, or shop owner, our platform helps you
              manage sales and reach customers without breaking the bank. Start
              your digital journey today.
            </p>
            <Slider {...sliderSettings}>
              <div className="flex justify-center">
                <Image
                  src="/cart.jpg"
                  alt="Shopping Cart Illustration"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
              <div className="flex justify-center">
                <Image
                  src="/coco.jpg"
                  alt="Coco Commercial"
                  width={500}
                  height={300}
                  className="rounded-lg "
                />
              </div>
            </Slider>
          </div>

          {/* Right Side Form */}
          <div className="bg-white p-6 shadow-lg rounded-lg max-w-sm mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-2xl font-bold text-center text-[#0A1C2E]">
                Sign up to your Cococart account{" "}
                <span className="text-gray-500 italic text-sm">
                  (As Merchants)
                </span>
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <select
                  name="gender"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="contactNumber"
                  placeholder="Contact Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </div>
              {/* Location Fields */}
              <div>
                <h4 className="font-bold text-lg text-center text-black mb-2">
                  Location
                </h4>
                <select
                  name="dzongkhag"
                  className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={formData.dzongkhag}
                  onChange={handleChange}
                >
                  <option value="">Dzongkhag</option>
                </select>
                <select
                  name="gewog"
                  className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={formData.gewog}
                  onChange={handleChange}
                >
                  <option value="">Gewog</option>
                </select>
              </div>
              {/* File Upload */}
              <div>
                <h4 className="font-bold text-lg text-center text-black mb-2">
                  User Profile
                </h4>
                <FileUpload onFileUpload={handleFileUpload} />
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-orange-400 text-white py-2 rounded-lg font-medium hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default SignupPage;
