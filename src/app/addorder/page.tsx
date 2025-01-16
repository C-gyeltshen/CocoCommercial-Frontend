"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddOrderFormData {
  customerName: string;
  phoneNumber: string;
  productId: string;
  quantity: string;
  totalAmount: string;
  dzongkhag: string;
  gewog: string;
  village: string;
  fulfillmentDate: Date | undefined;
  paymentImage: string | null;
}

const AddOrderManually = () => {
  const [formData, setFormData] = useState<AddOrderFormData>({
    customerName: "",
    phoneNumber: "",
    productId: "",
    quantity: "",
    totalAmount: "",
    dzongkhag: "",
    gewog: "",
    village: "",
    fulfillmentDate: undefined,
    paymentImage: null
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setFormData({ ...formData, quantity: value });
    }
  };

  // Sample data for dropdowns
  const dzongkhags = ["Thimphu", "Paro", "Punakha", "Wangdue"];
  const gewogs = ["Kawang", "Chang", "Mewang", "Dagala"];
  const villages = ["Motithang", "Changzamtog", "Dechencholing", "Taba"];

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          paymentImage: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add API call here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <h1 className="text-2xl font-serif text-center mb-6">Add orders from your customers manually</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Details */}
              <div className="space-y-4">
                <Input
                  placeholder="Enter customer name"
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  className="rounded-lg"
                />
                <Input
                  placeholder="Phone number"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  className="rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Product ID"
                    value={formData.productId}
                    onChange={(e) => setFormData({...formData, productId: e.target.value})}
                    className="rounded-lg"
                  />
                  <Input
                    type="text"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleQuantityChange}
                    className="rounded-lg"
                  />
                </div>
                <Input
                  placeholder="Total Amount"
                  value={formData.totalAmount}
                  onChange={(e) => setFormData({...formData, totalAmount: e.target.value})}
                  className="rounded-lg"
                />
              </div>

              {/* Delivery Address */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Delivery Address</h2>
                <Select
                  value={formData.dzongkhag}
                  onValueChange={(value) => setFormData({...formData, dzongkhag: value})}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Please Select Dzongkhag" />
                  </SelectTrigger>
                  <SelectContent>
                    {dzongkhags.map((dzongkhag) => (
                      <SelectItem key={dzongkhag} value={dzongkhag}>
                        {dzongkhag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={formData.gewog}
                  onValueChange={(value) => setFormData({...formData, gewog: value})}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Please Select Gewog" />
                  </SelectTrigger>
                  <SelectContent>
                    {gewogs.map((gewog) => (
                      <SelectItem key={gewog} value={gewog}>
                        {gewog}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={formData.village}
                  onValueChange={(value) => setFormData({...formData, village: value})}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Choose Village" />
                  </SelectTrigger>
                  <SelectContent>
                    {villages.map((village) => (
                      <SelectItem key={village} value={village}>
                        {village}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Fulfillment Date */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Choose Fulfillment date</h2>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal rounded-lg",
                        !formData.fulfillmentDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.fulfillmentDate ? format(formData.fulfillmentDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.fulfillmentDate}
                      onSelect={(date) => setFormData({...formData, fulfillmentDate: date})}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Payment Image Upload */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Payment Image</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {formData.paymentImage ? (
                    <div className="relative">
                      <img
                        src={formData.paymentImage}
                        alt="Payment"
                        className="max-h-48 mx-auto rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, paymentImage: null})}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <Upload className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-semibold text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-600 focus-within:ring-offset-2 hover:text-orange-500"
                        >
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleImageUpload}
                            className="rounded-full"
                          >
                            Browse File
                          </Button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 5MB</p>
                    </>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full rounded-full bg-orange-400 hover:bg-orange-500 text-white"
              >
                Confirm order
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AddOrderManually;