"use client";

import React, { useState } from "react";

const ProductListing: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: "Nu.4000",
      description: "Sample product description 1",
      quantity: 431,
    },
    {
      id: 2,
      name: "Product 2",
      price: "Nu.4000",
      description: "Sample product description 2",
      quantity: 213,
    },
    {
      id: 3,
      name: "Product 3",
      price: "Nu.4000",
      description: "Sample product description 3",
      quantity: 12,
    },
    {
      id: 4,
      name: "Product 4",
      price: "Nu.4000",
      description: "Sample product description 4",
      quantity: 43,
    },
    {
      id: 5,
      name: "Product 5",
      price: "Nu.4000",
      description: "Sample product description 4",
      quantity: 43,
    },
  ];

  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setDropdownVisible(dropdownVisible === id ? null : id);
  };

  return (
    <div className="bg-[#eaf7f4] min-h-screen p-6">
      {/* Header Section */}
      <div className="bg-[#629584] p-6 rounded-md text-white mb-6 flex items-center">
        <img
          src="/product.jpg"
          alt="Add Product Icon"
          className="h-full mr-4 object-contain"
        />
        <div>
          <h2 className="text-xl font-bold mb-2">Add your products</h2>
          <button className="bg-[#006d5b] text-white py-2 px-4 rounded-lg shadow-lg hover:bg-[#005a49] flex items-center space-x-2">
            <span>+ Add product</span>
          </button>
          <p className="text-sm mt-2">Add products for your customers</p>
        </div>
      </div>

      {/* Product Table */}
      <table className="w-full border-collapse bg-white rounded-md shadow-md overflow-hidden">
        <thead className="bg-[#d9f2ee] text-left text-[#2a7566]">
          <tr>
            <th className="px-4 py-2 text-center">ID</th>
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2 text-center">Quantity</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="px-4 py-2 text-center">{product.id}</td>
              <td className="px-4 py-2 flex items-center">
                {/* Placeholder for product image */}
                <div className="w-12 h-12 bg-gray-300 rounded-md mr-4"></div>
                <span>{product.name}</span>
              </td>
              <td className="px-4 py-2">{product.price}</td>
              <td className="px-4 py-2">{product.description}</td>
              <td className="px-4 py-2 text-center">{product.quantity}</td>
              <td className="px-4 py-2 text-center relative">
                <button
                  onClick={() => toggleDropdown(product.id)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  &#8942;
                </button>
                {dropdownVisible === product.id && (
                  <div className="absolute top-full right-0 bg-white border shadow-md rounded-md z-10">
                    <button className="block px-4 py-2 text-left hover:bg-gray-100 w-full">
                      Update
                    </button>
                    <button className="block px-4 py-2 text-left hover:bg-gray-100 w-full">
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListing;
