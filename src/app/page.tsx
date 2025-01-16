"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const CocoCommercial = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCircle, setActiveCircle] = useState(0);
  const [showLogoOnScroll, setShowLogoOnScroll] = useState(false);

  const circleContents = [
    {
      title: "Bhutanese Entrepreneurs",
      subtitle: "Hospitality and Tourism",
      description:
        "Small business owners selling handicrafts, textiles products.",
      image: "/1.png",
    },
    {
      title: "Agriculture and Livestock Providers",
      subtitle: "Primary Sector",
      description:
        "Organic farmers, Dairy producers, Poultry and meat processing",
      image: "/2.png",
    },
    {
      title: "Wholesale Trade",
      subtitle: "Retail Sector",
      description:
        "Grocery stores, general shops Electronics, appliance stores, Stationery and bookshops",
      image: "/3.png",
    },
    {
      title: "Hospitality and Tourism",
      subtitle: "Service Sector",
      description:
        "Cafes, restaurants, local eateries, Food and beverage production",
      image: "/4.png",
    },
  ];

  const objectives = [
    {
      title: "Empower Local Businesses",
      image: "/ob1.png",
      alt: "Empowering local businesses illustration",
    },
    {
      title: "Bridging the Gap in Digital Adoption",
      image: "/ob2.png",
      alt: "Digital adoption bridge illustration",
    },
    {
      title: "Affordable E-commerce",
      image: "/ob3.png",
      alt: "Affordable e-commerce illustration",
    },
  ];

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
      <Navbar />
      <main className="container mx-auto px-6">
        {/* Hero Section with Updated Logo */}
        <div className="py-8 sm:py-12 lg:py-16 text-center">
          <div className="mb-8 sm:mb-12">
            {/* Updated Logo Section to match previous styling */}
            <div className="flex justify-center mb-8 transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/cocologo.png"
                alt="Coco Commercial Logo"
                width={120}
                height={120}
                className="drop-shadow-md"
              />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-primary mb-4 sm:mb-6">
              Coco Commercial
            </h1>
            <p className="italic text-base sm:text-lg leading-relaxed max-w-xl mx-auto px-4">
              "Where happiness meets business" - it's memorable, wonderful, and
              perfectly captures both the platform's Bhutanese identity through
              its CSR initiatives and its commercial purpose.
            </p>
            <Button
              variant="outline"
              className="mt-6 sm:mt-8 rounded-full px-6 sm:px-8 hover:bg-orange-400 hover:text-white transition-colors duration-300"
            >
              Get Started
            </Button>
          </div>

          <section id="about" className="mb-16 sm:mb-20 lg:mb-24">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal mb-4 text-primary">
              About Us
            </h2>
            <div className="w-24 h-0.5 bg-gray-300 mx-auto mb-6 sm:mb-8"></div>
            <h3 className="text-lg sm:text-xl mb-4 font-serif">Objectives</h3>
            <p className="mb-4 sm:mb-6">
              "Connecting Bhutanese Businesses to Broader Markets"
            </p>
            <p className="mb-8 sm:mb-12">
              Coco Commercial is dedicated to transforming the digital landscape
              for Bhutanese businesses by:
            </p>

            {/* Updated Cards Section with Better Image Fitting */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 px-4">
              {objectives.map((objective, idx) => (
                <Card
                  key={idx}
                  className="text-center overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-8">
                    <div className="relative w-48 h-48 mx-auto mb-6">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={objective.image}
                          alt={objective.alt}
                          width={160}
                          height={160}
                          className="max-w-full max-h-full object-contain"
                          style={{ background: "none" }}
                        />
                      </div>
                    </div>
                    <h4 className="font-serif text-lg sm:text-xl text-primary mt-4">
                      {objective.title}
                    </h4>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Who We Serve Section */}
          <section className="mb-16 sm:mb-20 lg:mb-24">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal mb-4 text-primary">
              Who We Serve
            </h2>
            <div className="w-24 h-0.5 bg-gray-300 mx-auto mb-6 sm:mb-8"></div>

            <div className="flex flex-col items-center justify-center gap-8">
              {/* Big Circle with Content */}
              <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-gray-300 bg-white shadow-lg">
                <div className="absolute inset-0">
                  <Image
                    src={circleContents[activeCircle].image}
                    alt={circleContents[activeCircle].title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                    priority
                  />
                </div>
              </div>

              {/* Description Section */}
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="font-serif text-xl text-[#1B4965] mb-2">
                  {circleContents[activeCircle].title}
                </h3>
                <h4 className="text-lg text-gray-700 mb-2">
                  {circleContents[activeCircle].subtitle}
                </h4>
                <p className="text-gray-600 mb-6">
                  {circleContents[activeCircle].description}
                </p>
              </div>

              {/* Small Circles with Numbers */}
              <div className="flex space-x-6">
                {circleContents.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveCircle(index)}
                    className={`w-12 h-12 rounded-full cursor-pointer border-2 transition-all flex items-center justify-center ${
                      activeCircle === index
                        ? "border-[#1B4965] bg-gray-100 scale-110"
                        : "border-gray-300 bg-gray-200"
                    }`}
                  >
                    <span
                      className={`text-lg font-medium ${
                        activeCircle === index
                          ? "text-[#1B4965]"
                          : "text-gray-600"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section id="contact" className="mb-16 sm:mb-20 lg:mb-24">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal mb-4 text-primary">
              Contact Us
            </h2>
            <div className="w-24 h-0.5 bg-gray-300 mx-auto mb-6 sm:mb-8"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Stay in Touch Section */}
              <div className="text-center lg:text-left bg-gradient-to-r from-blue-100 to-blue-300 p-8 rounded-lg shadow-lg">
                <h3 className="font-serif text-xl sm:text-2xl mb-4 text-primary">
                  Stay in Touch!
                </h3>
                <p className="text-gray-600 mb-6">
                  Follow us on our socials so you never miss out on the latest
                  news and updates.
                </p>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    <i className="fab fa-facebook-f text-2xl"></i>
                  </a>
                  <a href="#" className="text-blue-400 hover:text-blue-600">
                    <i className="fab fa-twitter text-2xl"></i>
                  </a>
                  <a href="#" className="text-pink-500 hover:text-pink-700">
                    <i className="fab fa-instagram text-2xl"></i>
                  </a>
                  <a href="#" className="text-blue-700 hover:text-blue-900">
                    <i className="fab fa-linkedin-in text-2xl"></i>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-8 bg-white rounded-lg shadow-lg">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name*"
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Last Name*"
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email*"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  <select className="w-full p-3 border rounded-md text-gray-600 focus:ring-2 focus:ring-primary focus:outline-none">
                    <option value="">What is your inquiry related to?*</option>
                    <option value="service">Services</option>
                    <option value="support">Support</option>
                    <option value="general">General Inquiry</option>
                  </select>
                  <textarea
                    placeholder="Message*"
                    rows={4}
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  <Button
                    variant="default"
                    className="w-full bg-primary py-3 hover:bg-primary-dark hover:shadow-lg transition-all"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CocoCommercial;
