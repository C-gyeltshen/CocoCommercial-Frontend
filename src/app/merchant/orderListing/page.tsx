"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ShoppingBag, ClipboardList, Store, Trash2, Menu } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import OrderDetailsPopup from "../../../layout/merchant/orderDetails/page";
import Header from "@/layout/merchant/header/header";



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

  const router = useRouter();

  const [activeStatus, setActiveStatus] = useState("All");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  

  const initialOrders = [
    {
      id: 1,
      status: "Await payment",
      customerName: "Kinley Wangyel",
      phoneNumber: "+975 17123456",
      location: "Thimphu, Bhutan",
      orderDate: "2025-01-13",
      fulfillmentDate: "2025-01-30",
      deliveryNotes: "Please deliver to the reception area",
      paymentMethod: "Mbob",
      address: "Building 4, Norzin Lam, Thimphu, 11001",
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
          price: 2500,
          quantity: 2,
          total: 5000,
        },
        {
          image: "/api/placeholder/50/50",
          name: "Product 3",
          price: 3000,
          quantity: 1,
          total: 3000,
        }
      ],
    },
    {
      id: 2,
      status: "Await payment",
      customerName: "Tshering Dorji",
      phoneNumber: "+975 17789012",
      location: "Paro, Bhutan",
      orderDate: "2025-01-14",
      fulfillmentDate: "2025-01-28",
      deliveryNotes: "Call before delivery",
      paymentMethod: "Mbob",
      address: "Near Paro Airport, Paro, 12001",
      items: [
        {
          image: "/api/placeholder/50/50",
          name: "Product 4",
          price: 5000,
          quantity: 2,
          total: 10000,
        },
        {
          image: "/api/placeholder/50/50",
          name: "Product 5",
          price: 1500,
          quantity: 3,
          total: 4500,
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
                onClick={() => router.push('/merchant/addOrder')} 
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

          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <OrderDetailsPopup key={order.id} order={order}>
                <div className="relative border rounded-lg hover:shadow-md transition-all duration-200 p-4 cursor-pointer">
                  {/* Order Header */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-4">
                      <h3 className="font-medium text-lg">Order #{order.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        order.status === "Cancelled" ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
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

                  {/* Items Card */}
                  <Card className="mb-4">
                    <CardContent className="p-4">
                      <div className="max-h-48 overflow-y-auto pr-2 space-y-3">
                        {order.items.map((item, index) => (
                          <div 
                            key={index} 
                            className="flex items-center justify-between py-2 border-b last:border-b-0"
                            onClick={(e) => e.stopPropagation()} // Prevent popup trigger on item interaction
                          >
                            <div className="flex items-center space-x-4 flex-1">
                              <img src={item.image} alt="" className="h-12 w-12 rounded-lg" />
                              <span className="font-medium flex-1">{item.name}</span>
                              <span className="text-gray-600">Nu.{item.price.toLocaleString()}</span>
                              <span className="text-gray-600">x {item.quantity}</span>
                              <span className="font-medium">Nu.{item.total.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Order Total */}
                  <div className="flex justify-end">
                    <span className="font-medium text-lg">
                      Total: Nu.{order.items.reduce((sum, item) => sum + item.total, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </OrderDetailsPopup>
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