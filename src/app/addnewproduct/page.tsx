"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; 

const AddNewProduct: React.FC = () => {
  const router = useRouter(); 

  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    details: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleAddProduct = () => {
    router.push("/"); 
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
          <button
            onClick={handleAddProduct}
            className="bg-[#006d5b] text-white py-2 px-4 rounded-lg shadow-lg hover:bg-[#005a49] flex items-center space-x-2"
          >
            <span>+ Add product</span>
          </button>
          <p className="text-sm mt-2">Add products for your customers</p>
        </div>
      </div>

      {/* Add Product Form */}
      <div className="bg-white p-6 rounded-md shadow-md flex">
        {/* Image Upload Section */}
        <div className="w-1/2 flex flex-col items-center border-r border-gray-300 pr-4">
          <div className="w-64 h-64 bg-gray-100 border border-dashed border-gray-400 flex items-center justify-center rounded">
            <button className="text-blue-500 hover:underline">Add Image</button>
          </div>
          <div className="flex mt-4 space-x-2">
            <button className="text-gray-500">&laquo;</button>
            <button className="text-gray-500">&raquo;</button>
          </div>
        </div>

        {/* Product Details Form */}
        <div className="w-1/2 pl-4">
          <table className="w-full text-left">
            <tbody>
              <tr>
                <td className="py-2 font-semibold text-gray-700">Product name</td>
                <td className="py-2">
                  <input
                    type="text"
                    name="name"
                    value={productDetails.name}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md w-full"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-gray-700">Price</td>
                <td className="py-2">
                  <input
                    type="text"
                    name="price"
                    value={productDetails.price}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md w-full"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-gray-700">Quantity available</td>
                <td className="py-2">
                  <input
                    type="text"
                    name="quantity"
                    value={productDetails.quantity}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md w-full"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-gray-700">Description</td>
                <td className="py-2">
                  <textarea
                    name="description"
                    value={productDetails.description}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md w-full"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-gray-700">Product details</td>
                <td className="py-2">
                  <textarea
                    name="details"
                    value={productDetails.details}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md w-full"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-6 flex justify-end">
            <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
