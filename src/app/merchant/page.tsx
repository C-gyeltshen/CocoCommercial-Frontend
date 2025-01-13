"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ShoppingBag, ClipboardList, Store } from "lucide-react";
import Image from "next/image";

const MerchantDashboard = () => {
  const [showLogoOnScroll, setShowLogoOnScroll] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const initialProducts = [
    {
      id: 1,
      image: "/api/placeholder/50/50",
      name: "Product 1",
      price: 4000,
      description: "Product description here",
      quantity: 431,
    },
    {
      id: 2,
      image: "/api/placeholder/50/50",
      name: "Product 2",
      price: 4000,
      description: "Another description",
      quantity: 213,
    },
    {
      id: 3,
      image: "/api/placeholder/50/50",
      name: "Product 3",
      price: 4000,
      description: "Third product description",
      quantity: 12,
    },
  ];

  const initialOrders = [
    {
      id: 1,
      items: [
        {
          image: "/api/placeholder/50/50",
          name: "Product 1",
          price: 4000,
          quantity: 3,
          total: 12000,
        },
        {
          image: "/api/placeholder/50/50",
          name: "Product 2",
          price: 4000,
          quantity: 3,
          total: 12000,
        },
      ],
    },
    {
      id: 2,
      items: [
        {
          image: "/api/placeholder/50/50",
          name: "Product 3",
          price: 4000,
          quantity: 1,
          total: 4000,
        },
      ],
    },
    {
      id: 3,
      items: [
        {
          image: "/api/placeholder/50/50",
          name: "Product 4",
          price: 500,
          quantity: 10,
          total: 5000,
        },
      ],
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);

  const Header = () => (
    <nav className="sticky top-0 z-50 bg-[#1B4965] shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Search */}
          <div className="flex items-center flex-1">
            <div className="opacity-100 translate-y-0">
              <Image
                src="/cocologo.png"
                alt="Coco Commercial Logo"
                width={50}
                height={50}
                className="sm:mr-8"
              />
            </div>
            <div className="ml-8 w-full max-w-xl">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search in CoCo Commercial"
                  className="w-full pl-4 pr-10 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-8">
            <button
              className="text-white hover:text-orange-400 transition-colors duration-300"
              title="Products"
            >
              <ShoppingBag className="h-6 w-6" />
            </button>
            <button
              className="text-white hover:text-orange-400 transition-colors duration-300"
              title="Orders"
            >
              <ClipboardList className="h-6 w-6" />
            </button>
            <button
              className="text-white hover:text-orange-400 transition-colors duration-300"
              title="My Store"
            >
              <Store className="h-6 w-6" />
            </button>

            {/* Profile */}
            <div className="flex items-center space-x-3 ml-4">
              <Image
                src="/api/placeholder/32/32"
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full border-2 border-white/20"
              />
              <span className="text-white font-serif">My Profile</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
  const ProductTable = () => (
    <Card className="mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-8">
        <h2 className="font-serif text-2xl text-[#2C3E50] mb-6">
          Products List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left font-serif text-[#2C3E50]">
                  ID
                </th>
                <th className="px-6 py-4 text-left font-serif text-[#2C3E50]">
                  Product
                </th>
                <th className="px-6 py-4 text-left font-serif text-[#2C3E50]">
                  Price
                </th>
                <th className="px-6 py-4 text-left font-serif text-[#2C3E50]">
                  Description
                </th>
                <th className="px-6 py-4 text-left font-serif text-[#2C3E50]">
                  Quantity
                </th>
                <th className="px-6 py-4 text-left font-serif text-[#2C3E50]">
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
                  <td className="px-6 py-4">{product.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image}
                        alt=""
                        className="h-12 w-12 rounded-lg"
                      />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">Nu.{product.price}</td>
                  <td className="px-6 py-4">{product.description}</td>
                  <td className="px-6 py-4">{product.quantity}</td>
                  <td className="px-6 py-4">
                    <Button
                      variant="outline"
                      className="hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-full"
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            variant="outline"
            className="hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-full"
          >
            See more
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const OrdersList = () => (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-8">
        <h2 className="font-serif text-2xl text-[#2C3E50] mb-6">Orders List</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-wrap items-center justify-between mb-4">
                <span className="font-serif text-lg text-[#2C3E50]">
                  Order #{order.id}
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    className="hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-full"
                  >
                    Update
                  </Button>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-wrap items-center justify-between py-4 border-t"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt=""
                      className="h-12 w-12 rounded-lg"
                    />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">
                        Nu.{item.price} x {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="font-serif font-medium text-[#2C3E50]">
                    Nu.{item.total}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            variant="outline"
            className="hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-full"
          >
            See more
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full mx-auto font-sans text-[#2C3E50]">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <ProductTable />
        <OrdersList />
      </main>
    </div>
  );
};

export default MerchantDashboard;
