"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {ChevronRight,ShoppingBag,ClipboardList,Store,Menu,Search} from "lucide-react";
import Image from "next/image";

const MerchantDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo - Updated for better mobile display */}
          <div className="flex items-center flex-shrink-0">
            <div className="relative w-8 h-8 md:w-12 md:h-12">
              <Image
                src="/cocologo.png"
                alt="Coco Commercial Logo"
                fill
                sizes="(max-width: 768px) 32px, 48px"
                className="object-contain"
                priority
                style={{ minWidth: "32px", minHeight: "32px" }}
              />
            </div>
          </div>

          {/* Search Bar - Hidden on mobile, shown on larger screens */}
          <div className="hidden lg:flex flex-1 mx-8">
            <div className="relative w-full max-w-xl">
              <input
                type="search"
                placeholder="Search in CoCo Commercial"
                className="w-full pl-4 pr-10 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-white/70" />
            </div>
          </div>

          {/* Navigation Icons - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-8">
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
            <div className="flex items-center space-x-3">
              <div className="relative h-8 w-8">
                <Image
                  src="/api/placeholder/32/32"
                  alt="Profile"
                  fill
                  className="rounded-full border-2 border-white/20 object-cover"
                />
              </div>
              <span className="text-white font-serif">My Profile</span>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-4">
            <div className="relative px-4">
              <input
                type="search"
                placeholder="Search in CoCo Commercial"
                className="w-full pl-4 pr-10 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
              <Search className="absolute right-7 top-2.5 h-5 w-5 text-white/70" />
            </div>
            <div className="flex justify-around border-t border-white/10 pt-4">
              <button className="text-white hover:text-orange-400 transition-colors duration-300 flex flex-col items-center">
                <ShoppingBag className="h-6 w-6" />
                <span className="text-sm mt-1">Products</span>
              </button>
              <button className="text-white hover:text-orange-400 transition-colors duration-300 flex flex-col items-center">
                <ClipboardList className="h-6 w-6" />
                <span className="text-sm mt-1">Orders</span>
              </button>
              <button className="text-white hover:text-orange-400 transition-colors duration-300 flex flex-col items-center">
                <Store className="h-6 w-6" />
                <span className="text-sm mt-1">My Store</span>
              </button>
            </div>

            {/* Profile Section in Mobile Menu */}
            <div className="flex items-center justify-center space-x-3 border-t border-white/10 pt-4">
              <div className="relative h-8 w-8">
                <Image
                  src="/api/placeholder/32/32"
                  alt="Profile"
                  fill
                  className="rounded-full border-2 border-white/20 object-cover"
                />
              </div>
              <span className="text-white font-serif">My Profile</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  const ProductTable = () => (
    <Card className="mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-4 md:p-8">
        <h2 className="font-serif text-xl md:text-2xl text-[#2C3E50] mb-6">
          Products List
        </h2>
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
                  <td className="hidden md:table-cell px-6 py-4">
                    {product.description}
                  </td>
                  <td className="px-2 md:px-6 py-4 text-sm md:text-base">
                    {product.quantity}
                  </td>
                  <td className="px-2 md:px-6 py-4">
                    <Button
                      variant="outline"
                      className="text-sm md:text-base hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-full"
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
      <CardContent className="p-4 md:p-8">
        <h2 className="font-serif text-xl md:text-2xl text-[#2C3E50] mb-6">
          Orders List
        </h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 md:p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-wrap items-center justify-between mb-4">
                <span className="font-serif text-base md:text-lg text-[#2C3E50]">
                  Order #{order.id}
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    className="text-sm md:text-base hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-full"
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
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <img
                      src={item.image}
                      alt=""
                      className="h-8 w-8 md:h-12 md:w-12 rounded-lg"
                    />
                    <div>
                      <div className="text-sm md:text-base font-medium">
                        {item.name}
                      </div>
                      <div className="text-xs md:text-sm text-gray-500">
                        Nu.{item.price} x {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="font-serif font-medium text-sm md:text-base text-[#2C3E50]">
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
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
        <ProductTable />
        <OrdersList />
      </main>
    </div>
  );
};

export default MerchantDashboard;