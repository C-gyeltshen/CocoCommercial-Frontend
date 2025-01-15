"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Navbar from '@/components/ui/Navbar';
import Footer from "@/components/ui/Footer";
import { ShoppingCart, Store, Star, Heart, Share2, Minus, Plus } from "lucide-react";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedImage, setSelectedImage] = useState(0);

  // Sample product data - replace with your actual data
  const product = {
    id: 1,
    name: "Traditional Bhutanese Scarf",
    price: 1500,
    description: "Handwoven silk scarf with traditional Bhutanese patterns, crafted by skilled artisans using traditional techniques passed down through generations.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Blue", "Green"],
    store: {
      name: "Bhutanese Crafts",
      location: "Thimphu Main Street",
      rating: 4.8,
      reviews: 156,
    },
    stock: 15,
    images: ["/product1.png", "/product1-2.png", "/product1-3.png", "/product1-4.png"],
    features: [
      "100% handwoven silk",
      "Traditional Bhutanese patterns",
      "Natural dyes",
      "Eco-friendly packaging",
    ],
  };

  const handleQuantityChange = (type) => {
    if (type === "increase" && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="w-full mx-auto font-sans text-[#2C3E50]">
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="text-sm mb-6">
          <span className="text-gray-500">Home / Products / </span>
          <span className="text-primary">Traditional Wear</span>
        </div>

        {/* Product Detail Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative w-full h-96 rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative w-full h-24 rounded-lg overflow-hidden cursor-pointer border-2 ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-3xl font-normal text-primary mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Star className="text-yellow-400 fill-current" size={20} />
                  <span className="ml-1">{product.store.rating}</span>
                  <span className="text-gray-500 ml-1">
                    ({product.store.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart size={20} className="cursor-pointer" />
                  <Share2 size={20} className="cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="text-2xl font-bold">
              Nu. {product.price.toLocaleString()}
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">{product.description}</p>
              
              <div className="space-y-2">
                <h3 className="font-medium">Features:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">{feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Store Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Store size={24} />
                  <div>
                    <h3 className="font-medium">{product.store.name}</h3>
                    <p className="text-sm text-gray-600">{product.store.location}</p>
                  </div>
                  <Button variant="outline" className="ml-auto">
                    View Store
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Size Selection */}
            <div>
              <h3 className="font-medium mb-2">Select Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className="w-12 h-12 rounded-full"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div>
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange("decrease")}
                    className="rounded-full"
                  >
                    <Minus size={20} />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange("increase")}
                    className="rounded-full"
                  >
                    <Plus size={20} />
                  </Button>
                </div>
                <span className="text-gray-500">
                  {product.stock} items available
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <Button className="flex-1 h-12">
                <ShoppingCart className="mr-2" size={20} />
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1 h-12">
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="mt-16">
          <h2 className="font-serif text-2xl font-normal text-primary mb-6">
            Similar Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Add similar products here */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;