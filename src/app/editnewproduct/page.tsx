"use client";

import React, { useState } from "react";

interface EditNewProductProps {
  product: {
    id: number;
    name: string;
    price: string;
    description: string;
    quantity: number;
  };
  onClose: () => void; // Function to close the modal
}

const EditNewProduct: React.FC<EditNewProductProps> = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    productName: product.name,
    price: product.price,
    quantity: product.quantity.toString(),
    description: product.description,
  });

  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    console.log("Updated Image:", image);

    // Example: Add API call to update the product
    alert("Product updated successfully!");
    onClose(); // Close the modal
  };

  return (
    <div className="bg-[#eaf7f4] p-6 rounded-md relative">
      {/* Close Button */}
      <button
        onClick={() => onClose()} // Call the onClose function when the button is clicked
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
      >
        &#10005;
      </button>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          {/* Image Section */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-48 h-48 bg-gray-300 rounded-md flex items-center justify-center mb-4">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <span className="bg-[#006d5b] text-white px-4 py-2 rounded-md">
                    Change Image
                  </span>
                </label>
              )}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="flex-1 p-4">
            <div className="mb-4">
              <label className="block text-gray-700">Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-gray-400 text-gray-800 placeholder-gray-500 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-gray-400 text-gray-800 placeholder-gray-500 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Quantity Available</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-gray-400 text-gray-800 placeholder-gray-500 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-gray-400 text-gray-800 placeholder-gray-500 focus:outline-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#005a49] text-white py-2 px-4 rounded-md mt-4"
            >
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditNewProduct;
