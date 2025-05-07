'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, ShoppingBag, Calendar, Settings, ChevronRight, ChevronLeft, Laptop, Code, Layout } from 'lucide-react';

// Homepage component for Coco Commercial - E-commerce website builder
export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // E-commerce website templates
  const templates = [
    {
      id: 1,
      name: 'Fashion Store',
      category: 'Apparel & Clothing',
      price: 'Free',
      image: '/images/templates/bhutan-shop-selling-traditionally-woven-clothing-bags-and-textiles-in-the-bumthang-region-of-central-bhutan-R3K6HA.jpg'
    },
    {
      id: 2,
      name: 'Tech Gadgets',
      category: 'Electronics',
      price: 'Premium',
      image: '/images/templates/images.jpg',
    },
    {
      id: 3,
      name: 'Home Decor',
      category: 'Furniture',
      price: 'Free',
      image: '/images/templates/images (1).jpg',
    },
    {
      id: 4,
      name: 'Organic Foods',
      category: 'Grocery',
      price: 'Premium',
      image: '/images/templates/download.jpg',
    },
    {
      id: 5,
      name: 'Sports Gear',
      category: 'Athletic',
      price: 'Free',
      image: '/images/templates/download (1).jpg',
    },
    {
      id: 6,
      name: 'Jewelry Shop',
      category: 'Accessories',
      price: 'Premium',
      image: '/images/templates/jewelry-shop.jpg',
    },
    {
      id: 7,
      name: 'Beauty Products',
      category: 'Cosmetics',
      price: 'Free',
      image: '/images/templates/beauty-products.jpg',
    },
    {
      id: 8,
      name: 'Pet Supplies',
      category: 'Animals',
      price: 'Free',
      image: '/images/templates/pet-supplies.jpg',
    },
    {
      id: 9,
      name: 'Art Gallery',
      category: 'Creative',
      price: 'Premium',
      image: '/images/templates/art-gallery.jpg',
    },
  ];

  // Navigation tabs for the builder section
  const navTabs = [
    { id: 'template', icon: <Layout className="w-5 h-5" />, label: 'Templates' },
    { id: 'store', icon: <ShoppingBag className="w-5 h-5" />, label: 'Store Types' },
    { id: 'custom', icon: <Code className="w-5 h-5" />, label: 'Customize' },
    { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  // Change slide handler
  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-blue-50 pt-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left content */}
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Build Your Online Store In Minutes!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Coco Commercial helps you create beautiful e-commerce websites in less than two minutes with no coding required.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium">
                Start Building
              </button>
            </div>

            {/* Right content - Website builder illustration */}
            <div className="w-full md:w-1/2 relative h-80 md:h-[500px]">
              <Image 
                src="/images/made_in_bhutan.jpg" 
                alt="Website builder interface"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Templates */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Popular Stores</h2>
            <div className="flex space-x-2">
              <button 
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                onClick={() => {
                  const newIndex = currentSlide === 0 ? templates.length - 1 : currentSlide - 1;
                  handleSlideChange(newIndex);
                }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                onClick={() => {
                  const newIndex = (currentSlide + 1) % templates.length;
                  handleSlideChange(newIndex);
                }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 3x3 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div key={template.id} className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="relative h-48">
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg">{template.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{template.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-600">{template.price}</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Ready-to-use</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
