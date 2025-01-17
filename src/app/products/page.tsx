"use client";

import React, { useState } from "react";
import Pagination from "@/app/reusable_component/Pagination"; 

const ProductsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 98;

  const products = [
    { id: 1, name: "Product Name", description: "Product Description", price: "$100" },
    { id: 2, name: "Product Name", description: "Product Description", price: "$200" },
    { id: 3, name: "Product Name", description: "Product Description", price: "$300" },
    { id: 4, name: "Product Name", description: "Product Description", price: "$400" },
    { id: 5, name: "Product Name", description: "Product Description", price: "$500" },
    { id: 6, name: "Product Name", description: "Product Description", price: "$600" },
    { id: 7, name: "Product Name", description: "Product Description", price: "$700" },
    { id: 8, name: "Product Name", description: "Product Description", price: "$800" },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-[#eaf7f4] min-h-screen">
      <div className="max-w-6xl mx-auto p-4 text-sm text-gray-600">
        <span>Home / Store / Store Name</span>
      </div>

      {/* Store Banner */}
      <div className="relative w-full h-64 bg-gray-300">
        <img
          src="/store.jpg"
          alt="Store Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Store Details */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg -mt-12 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src="/store.jpg"
              alt="Store Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-bold">Store Name</h2>
            <p className="text-sm text-gray-600">Location: Store Location</p>
            <p className="text-sm text-gray-600">Store Description</p>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="w-full h-24 bg-gray-200 rounded-lg mb-4"></div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <p className="text-gray-800 font-semibold">{product.price}</p>
          </div>
        ))}
      </div>

      {/* Related Search */}
      <div className="max-w-6xl mx-auto mt-6">
        <h3 className="text-lg font-semibold mb-4">Related Search</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button className="bg-white p-2 rounded-lg shadow text-gray-600 hover:bg-gray-100">
            Search 1
          </button>
          <button className="bg-white p-2 rounded-lg shadow text-gray-600 hover:bg-gray-100">
            Search 2
          </button>
          <button className="bg-white p-2 rounded-lg shadow text-gray-600 hover:bg-gray-100">
            Search 3
          </button>
          <button className="bg-white p-2 rounded-lg shadow text-gray-600 hover:bg-gray-100">
            Search 4
          </button>
        </div>
      </div>

      {/* Pagination */}
      <div className="max-w-6xl mx-auto mt-6 p-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
