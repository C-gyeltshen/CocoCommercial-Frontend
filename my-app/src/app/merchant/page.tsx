"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const MerchantDashboard = () => {
  const initialProducts = [
    { id: 1, image: "/api/placeholder/50/50", name: "Product 1", price: 4000, description: "Product description here", quantity: 431 },
    { id: 2, image: "/api/placeholder/50/50", name: "Product 2", price: 4000, description: "Another description", quantity: 213 },
    { id: 3, image: "/api/placeholder/50/50", name: "Product 3", price: 4000, description: "Third product description", quantity: 12 },
  ];

  const initialOrders = [
    {
      id: 1,
      items: [
        { image: "/api/placeholder/50/50", name: "Product 1", price: 4000, quantity: 3, total: 12000 },
        { image: "/api/placeholder/50/50", name: "Product 2", price: 4000, quantity: 3, total: 12000 },
      ],
    },
    {
      id: 2,
      items: [
        { image: "/api/placeholder/50/50", name: "Product 3", price: 4000, quantity: 1, total: 4000 },
      ],
    },
    {
      id: 3,
      items: [
        { image: "/api/placeholder/50/50", name: "Product 4", price: 500, quantity: 10, total: 5000 },
      ],
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);

  const Header = () => (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <img src="/api/placeholder/40/40" alt="Logo" className="h-10 w-10 rounded-full" />
          <div className="relative w-full sm:w-64">
            <input
              type="search"
              placeholder="Search in CoCo"
              className="w-full pl-4 pr-10 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button className="absolute right-3 top-2.5 text-teal-600">🔍</button>
          </div>
        </div>
        <div className="flex flex-wrap items-center space-x-6">
          <button className="p-2">📊</button>
          <button className="p-2">🛒</button>
          <button className="p-2">💬</button>
          <div className="flex items-center space-x-2">
            <img src="/api/placeholder/32/32" alt="Profile" className="h-8 w-8 rounded-full" />
            <span>My Profile</span>
          </div>
        </div>
      </div>
    </header>
  );

  const ProductTable = () => (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Products list</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Quantity</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="px-4 py-3">{product.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <img src={product.image} alt="" className="h-12 w-12 rounded" />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">Nu.{product.price}</td>
                  <td className="px-4 py-3">{product.description}</td>
                  <td className="px-4 py-3">{product.quantity}</td>
                  <td className="px-4 py-3">
                    <Button variant="outline" className="text-teal-600 hover:text-teal-700">
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" className="text-teal-600 hover:text-teal-700">
            See more
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const OrdersList = () => (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Orders list</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex flex-wrap items-center justify-between mb-2">
                <span className="font-medium">Order #{order.id}</span>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" className="text-teal-600 hover:text-teal-700">
                    Update
                  </Button>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {order.items.map((item, index) => (
                <div key={index} className="flex flex-wrap items-center justify-between py-2 border-t">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt="" className="h-12 w-12 rounded" />
                    <div>
                      <div>{item.name}</div>
                      <div className="text-sm text-gray-500">
                        Nu.{item.price} x {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="font-medium">Nu.{item.total}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" className="text-teal-600 hover:text-teal-700">
            See more
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-[#e6f0eb]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductTable />
        <OrdersList />
      </main>
    </div>
  );
};

export default MerchantDashboard;
