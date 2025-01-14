import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarDays, MapPin, Phone, User, Calendar } from "lucide-react";

interface OrderItem {
  image: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface Order {
  id: number;
  status: string;
  customerName: string;
  phoneNumber: string;
  location: string;
  orderDate: string;
  fulfillmentDate: string;
  deliveryNotes: string;
  paymentMethod: string;
  address: string;
  items: OrderItem[];
}

interface OrderDetailsPopupProps {
  order: Order;
  children: ReactNode;
}

const OrderDetailsPopup: React.FC<OrderDetailsPopupProps> = ({ order, children }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="w-[95vw] max-w-[425px] p-4 sm:p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-serif mb-4">Order Details #{order.id}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-base sm:text-lg">Customer Information</h3>
            <div className="grid gap-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <User className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm sm:text-base break-words">{order.customerName}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm sm:text-base">{order.phoneNumber}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm sm:text-base break-words">{order.location}</span>
              </div>
            </div>
          </div>

          {/* Order Dates */}
          <div className="space-y-4">
            <h3 className="font-medium text-base sm:text-lg">Order Timeline</h3>
            <div className="grid gap-4">
              <div className="flex items-start space-x-3 text-gray-600">
                <CalendarDays className="h-5 w-5 flex-shrink-0 mt-1" />
                <div>
                  <span className="block font-medium text-sm sm:text-base">Order Date</span>
                  <span className="text-sm sm:text-base">{formatDate(order.orderDate)}</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-600">
                <Calendar className="h-5 w-5 flex-shrink-0 mt-1" />
                <div>
                  <span className="block font-medium text-sm sm:text-base">Requested Fulfillment</span>
                  <span className="text-sm sm:text-base">{formatDate(order.fulfillmentDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="space-y-4">
            <h3 className="font-medium text-base sm:text-lg">Delivery Details</h3>
            <div className="grid gap-2 text-gray-600 text-sm sm:text-base">
              <p><span className="font-medium">Full Address:</span> 
                <span className="break-words ml-2">{order.address}</span>
              </p>
              <p><span className="font-medium">Delivery Notes:</span> 
                <span className="break-words ml-2">{order.deliveryNotes}</span>
              </p>
              <p><span className="font-medium">Payment Method:</span> 
                <span className="ml-2">{order.paymentMethod}</span>
              </p>
              <p className="flex items-center">
                <span className="font-medium mr-2">Status:</span> 
                <span className={`px-2 py-1 rounded-full text-xs sm:text-sm ${
                  order.status === "Cancelled" ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
                }`}>
                  {order.status}
                </span>
              </p>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-4">
            <h3 className="font-medium text-base sm:text-lg">Order Items</h3>
            <div className="max-h-48 overflow-y-auto pr-2 space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b">
                  <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                    <img src={item.image} alt="" className="h-10 w-10 rounded-lg flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm sm:text-base">{item.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium text-sm sm:text-base">Nu.{item.total.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm sm:text-base">Total Amount</span>
              <span className="font-medium text-base sm:text-lg">
                Nu.{order.items.reduce((sum, item) => sum + item.total, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsPopup;