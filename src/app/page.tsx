"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const CocoCommercial = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCircle, setActiveCircle] = useState(0);
  const [showLogoOnScroll, setShowLogoOnScroll] = useState(false);

  const circleContents = [
    {
      title: "Bhutanese Entrepreneurs 23",
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
      setShowLogoOnScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full mx-auto font-sans text-[#2C3E50]">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#1B4965] shadow-md transition-all duration-300">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo and brand */}
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
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="#"
                  className="text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-orange-400"
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-orange-400"
                >
                  About Us
                </a>
                <a
                  href="#contact"
                  className="text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-orange-400"
                >
                  Contact Us
                </a>
              </div>
            </div>

            {/* Desktop buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="/login"
                className="text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-orange-400"
              >
                Login
              </a>
              <a
                href="/signup"
                className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
              >
                Sign up
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-4">
                <a
                  href="#"
                  className="text-white px-6 py-2 transition-all duration-300 hover:bg-orange-400"
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="text-white px-6 py-2 transition-all duration-300 hover:bg-orange-400"
                >
                  About Us
                </a>
                <a
                  href="#contact"
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
                <a
                  href="/signup"
                  className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 text-center"
                >
                  Sign up
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="py-8 sm:py-12 lg:py-16 text-center">
          <Image
            src="/logo.png"
            alt="Coco Commercial Logo"
            width={100}
            height={100}
            className="mx-auto mb-6"
          />
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-primary mb-4">
            Coco Commercial
          </h1>
          <p className="italic text-base sm:text-lg leading-relaxed max-w-xl mx-auto px-4">
            "Where happiness meets business"
          </p>
          <Button
            variant="outline"
            className="mt-6 rounded-full px-6 hover:bg-orange-400 hover:text-white transition-colors"
          >
            Get Started
          </Button>
        </div>

        {/* About Us Section */}
        <section id="about" className="py-12">
          <h2 className="text-center text-2xl mb-6">About Us</h2>
          <p className="text-center max-w-2xl mx-auto">
            Coco Commercial is dedicated to connecting Bhutanese businesses with broader markets.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            {objectives.map((objective, idx) => (
              <Card key={idx} className="text-center">
                <CardContent>
                  <Image
                    src={objective.image}
                    alt={objective.alt}
                    width={100}
                    height={100}
                    className="mx-auto mb-4"
                  />
                  <h4>{objective.title}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Who We Serve Section */}
        <section className="py-12">
          <h2 className="text-center text-2xl mb-6">Who We Serve</h2>
          <div className="flex flex-col items-center">
            <div className="relative w-80 h-80 rounded-full overflow-hidden">
              <Image
                src={circleContents[activeCircle].image}
                alt={circleContents[activeCircle].title}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <h3 className="mt-4">{circleContents[activeCircle].title}</h3>
            <p className="text-gray-600">{circleContents[activeCircle].description}</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CocoCommercial;
