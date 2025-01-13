import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarDays, MapPin, Phone, User, Calendar } from "lucide-react";

const OrderDetailsPopup = ({ order }) => {
  // Extended order details with fulfillment date
  const orderDetails = {
    customerName: "Kinley Wangyel",
    phoneNumber: "+975 17123456",
    location: "Thimphu, Bhutan",
    orderDate: "2025-01-13",
    fulfillmentDate: "2025-01-30", 
    fulfillmentStatus: order.status,
    deliveryNotes: "Please deliver to the reception area",
    paymentMethod: "Mbob",
    address: "Building 4, Norzin Lam, Thimphu, 11001"
  };

  // Function to format dates nicely
  const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer hover:bg-gray-50 w-full p-4 transition-colors duration-200">
          {order.items.map((item: { image: string | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; price: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; quantity: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; total: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: React.Key | null | undefined) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <span className="text-gray-600">#{order.id}</span>
                <img src={item.image} alt="" className="h-12 w-12 rounded-lg" />
                <span className="font-medium flex-1">{item.name}</span>
                <span className="text-gray-600">Nu.{item.price}</span>
                <span className="text-gray-600">x {item.quantity}</span>
                <span className="font-medium">Nu.{item.total}</span>
              </div>
              <div className="flex items-center space-x-4 ml-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  order.status === "Cancelled" ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif mb-4">Order Details #{order.id}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Customer Information</h3>
            <div className="grid gap-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <User className="h-5 w-5" />
                <span>{orderDetails.customerName}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="h-5 w-5" />
                <span>{orderDetails.phoneNumber}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>{orderDetails.location}</span>
              </div>
            </div>
          </div>

          {/* Order Dates */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Order Timeline</h3>
            <div className="grid gap-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <CalendarDays className="h-5 w-5" />
                <div>
                  <span className="block font-medium">Order Date</span>
                  <span>{formatDate(orderDetails.orderDate)}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Calendar className="h-5 w-5" />
                <div>
                  <span className="block font-medium">Requested Fulfillment Date</span>
                  <span>{formatDate(orderDetails.fulfillmentDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Delivery Details</h3>
            <div className="grid gap-2 text-gray-600">
              <p><span className="font-medium">Full Address:</span> {orderDetails.address}</p>
              <p><span className="font-medium">Delivery Notes:</span> {orderDetails.deliveryNotes}</p>
              <p><span className="font-medium">Payment Method:</span> {orderDetails.paymentMethod}</p>
              <p><span className="font-medium">Status:</span> <span className={`px-2 py-1 rounded-full text-sm ${
                orderDetails.fulfillmentStatus === "Cancelled" ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
              }`}>{orderDetails.fulfillmentStatus}</span></p>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item: { image: string | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; quantity: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; total: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: React.Key | null | undefined) => (
                <div key={index} className="flex justify-between items-center py-2 border-b">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt="" className="h-10 w-10 rounded-lg" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">Nu.{item.total}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Amount</span>
              <span className="font-medium text-lg">
                Nu.{order.items.reduce((sum: any, item: { total: any; }) => sum + item.total, 0)}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsPopup;