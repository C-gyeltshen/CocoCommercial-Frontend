"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/layout/merchant/header/header";

const AddNewProduct: React.FC<{ onClose: () => void; onAdd: (product: any) => void }> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    image: "/api/placeholder/50/50", // Default placeholder image
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prev) => ({ ...prev, image: base64String }));
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: Math.floor(Math.random() * 10000), // Temporary ID generation
      name: formData.name,
      price: parseFloat(formData.price) || 0,
      description: formData.description,
      quantity: parseInt(formData.quantity) || 0,
      image: formData.image,
    });
    onClose();
  };

  return (
    <div className="font-sans text-[#2C3E50]">
      <h3 className="font-serif text-xl mb-4">Add New Product</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm md:text-base font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg text-sm md:text-base"
            required
          />
        </div>
        <div>
          <label className="block text-sm md:text-base font-medium mb-1">Price (Nu.)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg text-sm md:text-base"
            required
          />
        </div>
        <div>
          <label className="block text-sm md:text-base font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg text-sm md:text-base"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-sm md:text-base font-medium mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg text-sm md:text-base"
            required
          />
        </div>
        <div>
          <label className="block text-sm md:text-base font-medium mb-1">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-lg text-sm md:text-base"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-12 w-12 md:h-16 md:w-16 rounded-lg object-cover"
              />
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="hover:bg-gray-200 transition-all duration-300 rounded-full text-sm md:text-base px-4 md:px-6 py-2"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[#006d5b] text-white hover:bg-[#005a49] transition-all duration-300 rounded-full text-sm md:text-base px-4 md:px-6 py-2"
          >
            Add Product
          </Button>
        </div>
      </form>
    </div>
  );
};

const ProductListing: React.FC = () => {
  const router = useRouter();

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 4000,
      description: "Sample product description 1",
      quantity: 431,
      image: "/api/placeholder/50/50",
    },
    {
      id: 2,
      name: "Product 2",
      price: 4000,
      description: "Sample product description 2",
      quantity: 213,
      image: "/api/placeholder/50/50",
    },
    {
      id: 3,
      name: "Product 3",
      price: 4000,
      description: "Sample product description 3",
      quantity: 12,
      image: "/api/placeholder/50/50",
    },
    {
      id: 4,
      name: "Product 4",
      price: 4000,
      description: "Sample product description 4",
      quantity: 43,
      image: "/api/placeholder/50/50",
    },
    {
      id: 5,
      name: "Product 5",
      price: 4000,
      description: "Sample product description 4",
      quantity: 43,
      image: "/api/placeholder/50/50",
    },
  ]);

  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const toggleDropdown = (id: number) => {
    setDropdownVisible(dropdownVisible === id ? null : id);
  };

  const handleAddProduct = (newProduct: any) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
    setDropdownVisible(null);
  };

  const handleCloseAddModal = () => setIsAddModalOpen(false);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  return (
    <div className="w-full mx-auto font-sans text-[#2C3E50]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <Card className="mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-xl md:text-2xl text-[#2C3E50]">
                Products List
              </h2>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#006d5b] text-white hover:bg-[#005a49] transition-all duration-300 rounded-full text-sm md:text-base px-4 md:px-6 py-2"
              >
                + Add Product
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 md:px-6 py-4 text-left text-sm md:text-base font-serif text-[#2C3E50]">
                      ID
                    </th>
                    <th className="px-2 md:px-6 py-4 text-left text-sm md:text-base font-serif text-[#2C3E50]">
                      Product
                    </th>
                    <th className="px-2 md:px-6 py-4 text-left text-sm md:text-base font-serif text-[#2C3E50]">
                      Price
                    </th>
                    <th className="hidden md:table-cell px-6 py-4 text-left font-serif text-[#2C3E50]">
                      Description
                    </th>
                    <th className="px-2 md:px-6 py-4 text-left text-sm md:text-base font-serif text-[#2C3E50]">
                      Quantity
                    </th>
                    <th className="px-2 md:px-6 py-4 text-left text-sm md:text-base font-serif text-[#2C3E50]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-t hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-2 md:px-6 py-4 text-sm md:text-base">
                        {product.id}
                      </td>
                      <td className="px-2 md:px-6 py-4">
                        <div className="flex items-center space-x-2 md:space-x-3">
                          <img
                            src={product.image}
                            alt=""
                            className="h-8 w-8 md:h-12 md:w-12 rounded-lg"
                          />
                          <span className="text-sm md:text-base font-medium">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-2 md:px-6 py-4 text-sm md:text-base">
                        Nu.{product.price}
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 text-sm md:text-base">
                        {product.description}
                      </td>
                      <td className="px-2 md:px-6 py-4 text-sm md:text-base">
                        {product.quantity}
                      </td>
                      <td className="px-2 md:px-6 py-4 relative">
                        <Button
                          variant="outline"
                          onClick={() => toggleDropdown(product.id)}
                          className="text-sm md:text-base hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-full px-3 py-1"
                        >
                          ⋮
                        </Button>
                        {dropdownVisible === product.id && (
                          <div className="absolute top-full right-0 bg-white border shadow-md rounded-md z-10">
                            <Button
                              onClick={() => handleEditProduct(product)}
                              className="block px-4 py-2 text-left hover:bg-gray-100 w-full text-sm md:text-base"
                            >
                              Update
                            </Button>
                            <Button
                              className="block px-4 py-2 text-left hover:bg-gray-100 w-full text-sm md:text-base"
                              onClick={() => console.log("Delete", product.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                variant="outline"
                className="hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-full text-sm md:text-base px-4 md:px-6 py-2"
              >
                See more
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Add New Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <AddNewProduct onClose={handleCloseAddModal} onAdd={handleAddProduct} />
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <AddNewProduct
              onClose={handleCloseEditModal}
              onAdd={(updatedProduct) => {
                setProducts((prev) =>
                  prev.map((product) =>
                    product.id === selectedProduct.id ? updatedProduct : product
                  )
                );
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;