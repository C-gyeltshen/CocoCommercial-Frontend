"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Search, Heart, TruckIcon, Star } from "lucide-react";

const ProductDetail = () => {
  const product = {
    id: "HR1325ROC-8",
    name: "Shoes Reebok Zig Kinetica 3",
    brand: "Reebok",
    price: 1990.00,
    rating: 4,
    reviews: 42,
    image: null,
    thumbnails: [null, null, null, null],
    description: "The Reebok Zig Kinetica 3 delivers responsive cushioning and street-ready style. The innovative Zig Energy System combines three distinct technologies for cushioning, stability, and energy return."
  };

  const colorOptions = [
    { name: "White", value: "white", image: null },
    { name: "Gray", value: "gray", image: null },
    { name: "Black", value: "black", image: null }
  ];

  const relatedProducts = [
    {
      id: 1,
      name: "Reebok Classic Leather",
      price: 1800.00,
      image: null
    },
    {
      id: 2,
      name: "Reebok Club C 85",
      price: 990.00,
      image: null
    },
    {
      id: 3,
      name: "Reebok Nano X3",
      price: 1400.00,
      image: null
    },
    {
      id: 4,
      name: "Reebok Floatride Energy 5",
      price: 1100.00,
      image: null
    }
  ];

  // States
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSize, setSelectedSize] = useState("41");
  const [cartOpen, setCartOpen] = useState(false);
  interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    color: string;
    size: string;
    quantity: number;
    image: string | null;
  }

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState(1);

  // Function to add item to cart
  const addToCart = () => {
    const newItem = {
      id: `${product.id}-${selectedColor}-${selectedSize}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      image: product.image
    };

    const existingItemIndex = cartItems.findIndex(
      item => item.id === newItem.id
    );

    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      // Add new item if it doesn't exist
      setCartItems([...cartItems, newItem]);
    }

    // Open cart after adding item
    setCartOpen(true);
  };

  // Function to remove item from cart
const removeFromCart = (itemId: string): void => {
    const updatedCart: CartItem[] = cartItems.filter((item: CartItem) => item.id !== itemId);
    setCartItems(updatedCart);
};

  // Function to update item quantity
const updateQuantity = (itemId: string, newQuantity: number): void => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map((item: CartItem) => 
        item.id === itemId ? {...item, quantity: newQuantity} : item
    );
    
    setCartItems(updatedCart);
};

  // Calculate cart totals
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  // Shopping Cart Component
  const ShoppingCartComponent = () => {
    if (!cartOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
        <div className="bg-white w-full max-w-md h-full flex flex-col">
          {/* Cart Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              <h2 className="text-lg font-bold">Your Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})</h2>
            </div>
            <button 
              onClick={() => setCartOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag className="h-16 w-16 mb-4" />
                <p className="text-lg">Your cart is empty</p>
                <button 
                  className="mt-4 text-sm text-black underline"
                  onClick={() => setCartOpen(false)}
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="border rounded-lg p-3 flex">
                    {/* Product Image */}
                    <div className="bg-gray-100 rounded-md w-16 h-16 flex items-center justify-center mr-3">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      ) : (
                        <div className="text-gray-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="text-xs text-gray-500 mb-2">
                        <span className="capitalize">{item.color}</span> | Size {item.size}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-500 hover:text-gray-700"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-500 hover:text-gray-700"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-bold">Nu.{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-4">
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span>Nu.{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Shipping</span>
                  <span>{cartTotal > 3000 ? 'Free' : 'Nu.150.00'}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>Nu.{(cartTotal > 3000 ? cartTotal : cartTotal + 150).toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-md"
              >
                Checkout
              </Button>
              
              <button 
                className="w-full text-center mt-2 text-sm text-gray-500 hover:underline"
                onClick={() => setCartOpen(false)}
              >
                Continue shopping
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Quantity selector for product detail
  const QuantitySelector = () => {
    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Quantity</span>
        </div>
        <div className="flex items-center border rounded-md w-32">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 text-gray-500 hover:text-gray-700"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="flex-1 text-center">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-2 text-gray-500 hover:text-gray-700"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full mx-auto font-sans text-gray-900 bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1 mx-auto max-w-md">
              <div className="relative flex items-center">
                <Search className="absolute left-3 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full rounded-full bg-gray-100 border-none py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div 
                className="flex flex-col items-center cursor-pointer relative"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="text-xs">Cart</span>
                {cartItems.length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </div>
                )}
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex space-x-8 pb-2">
            <a href="#" className="text-sm font-medium hover:text-gray-700">Women</a>
            <a href="#" className="text-sm font-medium hover:text-gray-700">Men</a>
            <a href="#" className="text-sm font-medium hover:text-gray-700">Kids</a>
            <a href="#" className="text-sm font-medium hover:text-gray-700">Sports</a>
            <a href="#" className="text-sm font-medium hover:text-gray-700">Brands</a>
            <a href="#" className="text-sm font-medium hover:text-gray-700">New</a>
            <a href="#" className="text-sm font-medium text-red-500 hover:text-red-700">Sale</a>
          </nav>
        </div>
      </header>

      {/* Shopping Cart Overlay */}
      <ShoppingCartComponent />

      {/* Rest of the page content remains the same as in your original code */}
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex text-xs text-gray-500 space-x-2">
          <a href="#" className="hover:underline">Clothes and shoes</a>
          <span>›</span>
          <a href="#" className="hover:underline">Shoes</a>
          <span>›</span>
          <a href="#" className="hover:underline">Reebok</a>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images Section */}
          <div>
            {/* Main Image */}
            <div className="bg-gray-50 mb-2 rounded-lg flex items-center justify-center">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-contain p-4"
                  style={{ minHeight: "500px" }}
                />
              ) : (
                <div 
                  className="w-full flex items-center justify-center"
                  style={{ minHeight: "500px" }}
                >
                  <div className="text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {[0, 1, 2, 3].map((index) => (
                <div 
                  key={index} 
                  className={`border rounded-md p-1 cursor-pointer ${index === 0 ? 'border-black' : 'border-gray-200'}`}
                  style={{ width: "48px", height: "48px" }}
                >
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              ))}
              <div 
                className="border rounded-md p-1 border-gray-200 flex items-center justify-center" 
                style={{ width: "48px", height: "48px" }}
              >
                <span className="text-xs text-gray-500">+4</span>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="bg-black text-white rounded-full p-1 mr-2 flex items-center justify-center" style={{width: "24px", height: "24px"}}>
                  <span className="text-xs">R</span>
                </div>
                <span className="font-medium">{product.brand}</span>
              </div>
              <span className="text-gray-500 text-sm">{product.id}</span>
            </div>

            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

            {/* Price */}
            <div className="text-3xl font-bold mb-6">Nu.{product.price.toFixed(2)}</div>
            
            {/* Color Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Color</span>
                <span className="text-sm text-gray-500">{colorOptions.find(c => c.value === selectedColor)?.name || 'White'}</span>
              </div>
              <div className="flex space-x-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    className={`w-10 h-10 rounded-md ${selectedColor === color.value ? 'border-2 border-black' : 'border border-gray-200'}`}
                    onClick={() => setSelectedColor(color.value)}
                    style={{ 
                      backgroundColor: color.value === 'white' ? '#FFFFFF' : 
                                      color.value === 'gray' ? '#CCCCCC' : 
                                      color.value === 'black' ? '#000000' : '#FFFFFF'
                    }}
                  >
                    {color.value === selectedColor && color.value === 'white' && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity Selector - NEW */}
            <QuantitySelector />
            
            {/* Add to Cart Button */}
            <div className="flex space-x-2 mb-4">
              <Button 
                className="flex-1 bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-md flex items-center justify-center"
                onClick={addToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to cart
              </Button>
            </div>
            
            {/* Free Delivery */}
            <div className="flex items-center text-sm text-gray-700 mb-6">
              <TruckIcon className="h-4 w-4 mr-2" />
              <span>Free delivery on orders over Nu.30.00</span>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16 mb-8">
          <h2 className="text-xl font-bold mb-6">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="bg-gray-50 rounded-md mb-3 overflow-hidden flex items-center justify-center" style={{ height: "180px" }}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-sm font-bold">Nu.{item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">© 2025 SSO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;