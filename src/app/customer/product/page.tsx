"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CustomerNavbar from '@/components/ui/Navbar2';
import Footer from "@/components/ui/Footer";
import { Search, ShoppingCart } from "lucide-react";

const CustomerDashboard = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Traditional Bhutanese Scarf",
      price: 1500,
      description: "Handwoven silk scarf with traditional Bhutanese patterns",
      category: "Textiles",
      image: "/product1.png",
    },
    {
      id: 2,
      name: "Organic Red Rice",
      price: 450,
      description: "Premium quality organic red rice from Bhutanese highlands",
      category: "Agriculture",
      image: "/product2.png",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);

  const categories = ["All", "Textiles", "Agriculture", "Handicrafts", "Food"];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="min-h-screen flex flex-col w-full mx-auto font-sans text-[#2C3E50] bg-gray-50">
      <CustomerNavbar />
      <main className="flex-grow container mx-auto px-6 py-8">
        {/* Logo and Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8 transform hover:scale-105 transition-transform duration-300">
            <Image
              src="/cocologo.png"
              alt="Coco Commercial Logo"
              width={120}
              height={120}
              className="drop-shadow-md"
            />
          </div>
          <h1 className="font-serif text-4xl font-normal text-primary mb-4">
            Discover Bhutanese Products
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore authentic Bhutanese products from local artisans and businesses
          </p>
        </div>

        {/* Search and Filter Section with improved styling */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
            </div>
            
            <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`rounded-full px-6 transition-all duration-300 ${
                    selectedCategory === category 
                      ? "bg-primary text-white shadow-md" 
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            <Button className="relative px-6 py-3 bg-primary hover:bg-primary/90 transition-colors duration-300">
              <ShoppingCart className="mr-2" size={20} />
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center animate-pulse">
                  {cart.length}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Products Grid with improved card styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white"
            >
              <CardContent className="p-4">
                <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg group">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif text-lg font-medium truncate">{product.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold text-primary">
                      Nu. {product.price.toLocaleString()}
                    </span>
                    <Button
                      onClick={() => addToCart(product)}
                      variant="outline"
                      className="hover:bg-primary hover:text-white transition-colors duration-300"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Improved Pagination */}
        <div className="flex justify-center mt-12 gap-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <Button
              key={page}
              variant={page === 1 ? "default" : "outline"}
              className={`w-10 h-10 rounded-full transition-all duration-300 ${
                page === 1 
                  ? "bg-primary text-white shadow-md" 
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </Button>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerDashboard;