'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar';

// Define types for your product data
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  storeId: string;
  storeName: string;
  available: boolean;
}

// Mock data for demonstration (remove this in production)
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Coconut Oil',
    price: 300,
    description: 'Pure organic coconut oil, perfect for cooking and skincare',
    imageUrl: '/products/coconut-oil.jpg',
    category: 'oils',
    storeId: 'store1',
    storeName: 'Coco Naturals',
    available: true,
  },
  {
    id: '2',
    name: 'Coconut Water',
    price: 120,
    description: 'Refreshing coconut water from fresh coconuts',
    imageUrl: '/products/coconut-water.jpg',
    category: 'drinks',
    storeId: 'store2',
    storeName: 'Tropical Delights',
    available: true,
  },
  {
    id: '3',
    name: 'Coconut Milk',
    price: 180,
    description: 'Creamy coconut milk for cooking delicious meals',
    imageUrl: '/products/coconut-milk.jpg',
    category: 'dairy alternatives',
    storeId: 'store1',
    storeName: 'Coco Naturals',
    available: false,
  },
  {
    id: '4',
    name: 'Coconut Flour',
    price: 250,
    description: 'Gluten-free coconut flour for baking',
    imageUrl: '/products/coconut-flour.jpg',
    category: 'baking',
    storeId: 'store3',
    storeName: 'Baker\'s Paradise',
    available: true,
  },
  {
    id: '5',
    name: 'Coconut Sugar',
    price: 160,
    description: 'Natural sweetener with a low glycemic index',
    imageUrl: '/products/coconut-sugar.jpg',
    category: 'sweeteners',
    storeId: 'store3',
    storeName: 'Baker\'s Paradise',
    available: true,
  },
  {
    id: '6',
    name: 'Coconut Butter',
    price: 280,
    description: 'Rich and creamy coconut butter for spreads and baking',
    imageUrl: '/products/coconut-butter.jpg',
    category: 'spreads',
    storeId: 'store1',
    storeName: 'Coco Naturals',
    available: true,
  },
  {
    id: '7',
    name: 'Coconut Chips',
    price: 90,
    description: 'Crunchy toasted coconut chips for snacking',
    imageUrl: '/products/coconut-chips.jpg',
    category: 'snacks',
    storeId: 'store2',
    storeName: 'Tropical Delights',
    available: true,
  },
  {
    id: '8',
    name: 'Coconut Soap',
    price: 75,
    description: 'Moisturizing coconut soap for soft skin',
    imageUrl: '/products/coconut-soap.jpg',
    category: 'personal care',
    storeId: 'store1',
    storeName: 'Coco Naturals',
    available: true,
  },
  {
    id: '9',
    name: 'Coconut Soap',
    price: 75,
    description: 'Moisturizing coconut soap for soft skin',
    imageUrl: '/products/coconut-soap.jpg',
    category: 'personal care',
    storeId: 'store1',
    storeName: 'Coco Naturals',
    available: true,
  },
];

export default function ProductListing() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  
  // Function to fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // const response = await fetch('/api/customer/products');
      // const data = await response.json();
      // setProducts(data);
      
      // For now, we'll just use mock data and simulate loading
      setTimeout(() => {
        setProducts(mockProducts);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setLoading(false);
    }
  };

  // Initial load of products
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search term only
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.storeName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });
  
  // Update search results when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }
    
    const results = products
      .filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.storeName.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(product => product.name)
      .slice(0, 5); // Limit to 5 results
    
    setSearchResults(results);
    setShowSearchResults(results.length > 0);
  }, [searchQuery, products]);
  
  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle search selection
  const handleSearchSelection = (selectedProduct: string) => {
    setSearchQuery(selectedProduct);
    setShowSearchResults(false);
  };

  // Function to handle adding product to cart
  const handleAddToCart = async (productId: string) => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // await fetch('/api/cart/add', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ productId }),
      // });
      
      // For demo purposes, just show success after a delay
      setTimeout(() => {
        alert('Product added to cart successfully!');
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to add product to cart:', error);
      alert('Failed to add product to cart. Please try again later.');
      setLoading(false);
    }
  };

  // Function to handle buy now
  const handleBuyNow = (productId: string) => {
    // In a real app, this would navigate to checkout with the product
    router.push(`/customer/checkout?productId=${productId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar component */}
      <Navbar isAuthorized={false} />
      
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Available Products</h1>
        
        {/* Search input with dropdown */}
        <div className="relative w-full max-w-md mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-2 pl-10 border border-gray-300 rounded"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchResults(searchResults.length > 0)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
          
          {/* Search results dropdown */}
          {showSearchResults && (
            <div 
              ref={searchResultsRef}
              className="absolute z-10 w-full bg-white border border-gray-300 rounded-b shadow-lg mt-1"
            >
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSearchQuery(result);
                    setShowSearchResults(false);
                  }}
                >
                  {result}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="spinner-border animate-spin h-8 w-8 border-4 border-gray-500 rounded-full border-t-transparent"></div>
          </div>
        )}
        
        {/* Product grid - 4 products per row on desktop, 2 on mobile */}
        {!loading && filteredProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg text-gray-500">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <div className="relative h-48 bg-gray-200">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                  )}
                  
                  {!product.available && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Out of Stock
                    </div>
                  )}
                </div>
                
                <div className="p-3">
                  <h3 className="font-medium text-base">{product.name}</h3>
                  <p className="text-sm font-semibold">Nu. {product.price.toFixed(2)}</p>
                  
                  <p className="text-xs text-gray-500 mt-1 mb-3">
                    Store: {product.storeName}
                  </p>
                  
                  <div className="flex space-x-2">
                    <button
                      className={`flex-1 py-1.5 rounded text-sm font-medium ${
                        product.available
                          ? 'bg-black text-white hover:bg-gray-800'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      onClick={() => {
                        if (product.available) {
                          handleBuyNow(product.id);
                        }
                      }}
                      disabled={!product.available || loading}
                    >
                      Buy Now
                    </button>
                    
                    <button
                      className={`flex-1 py-1.5 rounded text-sm font-medium ${
                        product.available
                          ? 'bg-gray-200 text-black hover:bg-gray-300'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={() => {
                        if (product.available) {
                          handleAddToCart(product.id);
                        }
                      }}
                      disabled={!product.available || loading}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}