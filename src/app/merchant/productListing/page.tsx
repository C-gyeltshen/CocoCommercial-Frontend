"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AddNewProduct from "@/layout/merchant/addNewProduct/page";
import EditNewProduct from "@/layout/merchant/editNewProduct/page";
import Header from "@/layout/merchant/header/header";
// import CustomerNavbar from "@/layout/merchant/navbar/navbar";


const ProductListing: React.FC = () => {
  const router = useRouter();

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const toggleDropdown = (id: number) => {
    setDropdownVisible(dropdownVisible === id ? null : id);
  };

  const handleAddProduct = () => {
    setIsAddModalOpen(true); // Show Add New Product modal
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product); // Set the product to be edited
    setIsEditModalOpen(true); // Show Edit Product modal
  };

  const handleCloseAddModal = () => setIsAddModalOpen(false);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  return (
    <div className="bg-[#eaf7f4] p-6 min-h-screen ">
      <Header />
      <div className="bg-[#629584] mt-6 p-6 rounded-md text-white mb-6 flex items-center">
        <img
          src="/product.jpg"
          alt="Add Product Icon"
          className="h-full mr-4 object-contain"
        />
        <div>
          <h2 className="text-xl font-bold mb-2">Add your products</h2>
          <button
            onClick={handleAddProduct}
            className="bg-[#006d5b] text-white py-2 px-4 rounded-lg shadow-lg hover:bg-[#005a49] flex items-center space-x-2"
          >
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
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
                    >
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

      {/* Add New Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <AddNewProduct onClose={handleCloseAddModal} />
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <EditNewProduct
              product={selectedProduct}
              onClose={handleCloseEditModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
