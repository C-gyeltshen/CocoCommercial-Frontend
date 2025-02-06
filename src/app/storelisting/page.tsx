"use client";

import React, { useState } from "react";
import Pagination from "@/app/reusable_component/Pagination"; 
const StoreListing: React.FC = () => {
  const stores = [
    { name: "Store Name", description: "Store Description", location: "Store Location" },
    { name: "Store Name", description: "Store Description", location: "Store Location" },
    { name: "Store Name", description: "Store Description", location: "Store Location" },
    { name: "Store Name", description: "Store Description", location: "Store Location" },
    { name: "Store Name", description: "Store Description", location: "Store Location" },
    { name: "Store Name", description: "Store Description", location: "Store Location" },
    { name: "Store Name", description: "Store Description", location: "Store Location" },
    { name: "Store Name", description: "Store Description", location: "Store Location" },
    { name: "Store Name", description: "Store Description", location: "Store Location" },

  ];

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; 

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-[#eaf7f4] min-h-screen">
      <div className="max-w-6xl mx-auto p-4 text-sm text-gray-600">
        <span>Home / Store</span>
      </div>

      {/* Store List */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {stores.map((store, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-md shadow-md flex flex-col items-start"
          >
            <div className="w-full h-24 bg-gray-200 rounded-md mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">{store.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{store.description}</p>
            <p className="text-gray-500 text-xs">{store.location}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="max-w-6xl mx-auto mt-6 p-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default StoreListing;
