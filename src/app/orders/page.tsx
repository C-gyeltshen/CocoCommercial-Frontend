"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ShoppingBag, ClipboardList, Store, Trash2, Menu } from "lucide-react";
import Image from "next/image";
import OrderDetailsPopup from "../orderdetails/page";


const OrdersManagement = () => {
  const orderStatuses = [
    "All",
    "Await payment",
    "Confirmed",
    "Processing",
    "In transit",
    "Delivered",
    "Cancelled"
  ];

  const [activeStatus, setActiveStatus] = useState("All");
  const [showLogoOnScroll, setShowLogoOnScroll] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const initialOrders = [
    {
      id: 1,
      status: "Await payment",
      items: [
        {
          image: "/api/placeholder/50/50",
          name: "Product 1",
          price: 4000,
          quantity: 3,
          total: 12000,
        }
      ],
    },
    {
      id: 2,
      status: "Await payment",
      items: [
        {
          image: "/api/placeholder/50/50",
          name: "Product 2",
          price: 4000,
          quantity: 1,
          total: 4000,
        }
      ],
    },
    {
      id: 3,
      status: "Await payment",
      items: [
        {
          image: "/api/placeholder/50/50",
          name: "Product 3",
          price: 2500,
          quantity: 3,
          total: 7500,
        }
      ],
    }
  ];

  const [orders, setOrders] = useState(initialOrders);

  const updateOrderStatus = (orderId: number) => {
    setOrders(prevOrders => {
      return prevOrders.map(order => {
        if (order.id === orderId) {
          const currentStatusIndex = orderStatuses.indexOf(order.status);
          const nextStatusIndex = currentStatusIndex >= orderStatuses.length - 2 ? 
            currentStatusIndex : currentStatusIndex + 1;
          return {
            ...order,
            status: orderStatuses[nextStatusIndex]
          };
        }
        return order;
      });
    });
  };

  const cancelOrder = (orderId: number) => {
    setOrders(prevOrders => {
      return prevOrders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            status: "Cancelled"
          };
        }
        return order;
      });
    });
  };

  const Header = () => (
    <nav className="sticky top-0 z-50 bg-[#1B4965] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center flex-1 lg:flex-initial">
          <div className="opacity-100 translate-y-0">
              <Image
                src="/cocologo.png"
                alt="Coco Commercial Logo"
                width={50}
                height={50}
                className="sm:mr-8"
              />
            </div>
            <div className="ml-4 sm:ml-8 w-full max-w-xs sm:max-w-md lg:max-w-xl">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-4 pr-8 py-1.5 sm:py-2 text-sm rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button className="text-white hover:text-orange-400 transition-colors duration-300" title="Products">
              <ShoppingBag className="h-6 w-6" />
            </button>
            <button className="text-white hover:text-orange-400 transition-colors duration-300" title="Orders">
              <ClipboardList className="h-6 w-6" />
            </button>
            <button className="text-white hover:text-orange-400 transition-colors duration-300" title="My Store">
              <Store className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-3 ml-4">
              <img
                src="/api/placeholder/32/32"
                alt="Profile"
                className="h-8 w-8 rounded-full border-2 border-white/20"
              />
              <span className="text-white font-serif">My Profile</span>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              <button className="text-white hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2">
                <ShoppingBag className="h-6 w-6" />
                <span>Products</span>
              </button>
              <button className="text-white hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2">
                <ClipboardList className="h-6 w-6" />
                <span>Orders</span>
              </button>
              <button className="text-white hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2">
                <Store className="h-6 w-6" />
                <span>My Store</span>
              </button>
              <div className="flex items-center space-x-3">
                <img
                  src="/api/placeholder/32/32"
                  alt="Profile"
                  className="h-8 w-8 rounded-full border-2 border-white/20"
                />
                <span className="text-white font-serif">My Profile</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  const OrdersList = () => {
    const filteredOrders = activeStatus === "All" 
      ? orders 
      : orders.filter(order => order.status === activeStatus);
  
    return (
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <h2 className="font-serif text-xl sm:text-2xl text-[#2C3E50]">Your Orders</h2>
            <Button 
              variant="outline"
              className="w-full sm:w-auto hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-full"
            >
              Add Order Manually
            </Button>
          </div>

          <div className="flex space-x-4 mb-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex space-x-2 sm:space-x-4 min-w-min">
              {orderStatuses.map((status) => (
                <Button
                  key={status}
                  variant={activeStatus === status ? "default" : "outline"}
                  className={`rounded-full whitespace-nowrap text-sm sm:text-base ${
                    activeStatus === status 
                      ? "bg-orange-400 text-white" 
                      : "hover:bg-orange-400 hover:text-white"
                  }`}
                  onClick={() => setActiveStatus(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg hover:shadow-md transition-all duration-200"
            >
              <OrderDetailsPopup order={order} />
              <div className="flex justify-end px-4 pb-4">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <Button
                    variant="outline"
                    className="hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateOrderStatus(order.id);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outline"
                    className="hover:bg-red-400 hover:text-white transition-all duration-300 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelOrder(order.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    );
  };

  return (
    <div className="w-full mx-auto font-sans text-[#2C3E50]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <OrdersList />
      </main>
    </div>
  );
};

export default OrdersManagement;