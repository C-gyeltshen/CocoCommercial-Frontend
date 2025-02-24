"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import CustomerNavbar from "@/layout/merchant/navbar/navbar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  Calendar as CalendarIcon, 
  Upload, 
  Image as ImageIcon, 
  X, 
  CheckCircle2, 
  ChevronDown,
  Loader,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FormSection {
  customer: boolean;
  product: boolean;
  location: boolean;
  payment: boolean;
}

interface FormErrors {
    customerName?: string;
    phoneNumber?: string;
    productId?: string;
    quantity?: string;
    totalAmount?: string;
    location?: string;
    fulfillmentDate?: string;
    paymentImage?: string;
    submit?: string; 
  }

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
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sectionOpen, setSectionOpen] = useState<FormSection>({
    customer: true,
    product: true,
    location: true,
    payment: true
  });

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

  const [errors, setErrors] = useState<FormErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample data for dropdowns
  const dzongkhags = ["Thimphu", "Paro", "Punakha", "Wangdue"];
  const gewogs = ["Kawang", "Chang", "Mewang", "Dagala"];
  const villages = ["Motithang", "Changzamtog", "Dechencholing", "Taba"];

  const formSteps = [
    { 
      label: "Customer Info", 
      completed: !!formData.customerName && !!formData.phoneNumber && !errors.customerName && !errors.phoneNumber 
    },
    { 
      label: "Product Details", 
      completed: !!formData.productId && !!formData.quantity && !!formData.totalAmount && 
                !errors.productId && !errors.quantity && !errors.totalAmount 
    },
    { 
      label: "Location", 
      completed: !!formData.dzongkhag && !!formData.gewog && !!formData.village && !errors.location 
    },
    { 
      label: "Payment", 
      completed: !!formData.paymentImage && !!formData.fulfillmentDate && !errors.paymentImage 
    }
  ];

  const toggleSection = (section: keyof FormSection) => {
    setSectionOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length > 8) {
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 8)} ${cleaned.slice(8)}`;
    }
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phoneNumber: formatted }));
    if (errors.phoneNumber) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.phoneNumber;
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (formData.phoneNumber.replace(/\D/g, '').length < 8) {
      newErrors.phoneNumber = "Phone number must have at least 8 digits";
    }

    if (!formData.productId.trim()) {
      newErrors.productId = "Product ID is required";
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
    } else if (parseInt(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }

    if (!formData.totalAmount.trim()) {
      newErrors.totalAmount = "Total amount is required";
    } else if (isNaN(parseFloat(formData.totalAmount)) || parseFloat(formData.totalAmount) <= 0) {
      newErrors.totalAmount = "Invalid amount";
    }

    if (!formData.dzongkhag || !formData.gewog || !formData.village) {
      newErrors.location = "Complete address is required";
    }

    if (!formData.fulfillmentDate) {
      newErrors.fulfillmentDate = "Fulfillment date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Auto calculate total amount based on quantity
  useEffect(() => {
    if (formData.quantity && formData.productId) {
      // You can fetch the product price based on productId
      const unitPrice = 1000; // Example price
      const total = parseInt(formData.quantity) * unitPrice;
      setFormData(prev => ({
        ...prev,
        totalAmount: total.toString()
      }));
    }
  }, [formData.quantity, formData.productId]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setFormData({ ...formData, quantity: value });
      if (errors.quantity) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.quantity;
          return newErrors;
        });
      }
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          paymentImage: "File size should be less than 5MB"
        }));
        return;
      }

      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          paymentImage: "Please upload an image file"
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          paymentImage: e.target?.result as string
        }));
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.paymentImage;
          return newErrors;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      setTimeout(() => {
        router.push('/orders');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to submit order. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <CustomerNavbar />
      {/* Success Notification */}
      <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        showSuccess ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Order added successfully!</AlertDescription>
        </Alert>
      </div>

      <main className="container mx-auto px-4 sm:px-6 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-serif">Add Order Manually</h1>
              <Button 
                variant="ghost" 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => router.back()}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-between">
                {formSteps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-orange-400 text-white' : 'bg-gray-200'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-sm mt-1 text-center">{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Details Section */}
              <div className="border rounded-lg">
                <div 
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => toggleSection('customer')}
                >
                  <h2 className="text-lg font-medium">Customer Details</h2>
                  <ChevronDown className={`transform transition-transform ${
                    sectionOpen.customer ? 'rotate-180' : ''
                  }`} />
                </div>
                {sectionOpen.customer && (
                  <div className="p-4 border-t space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Customer Name</label>
                      <Input
                        placeholder="Enter customer name"
                        value={formData.customerName}
                        onChange={(e) => {
                          setFormData({...formData, customerName: e.target.value});
                          if (errors.customerName) {
                            setErrors(prev => {
                              const newErrors = { ...prev };
                              delete newErrors.customerName;
                              return newErrors;
                            });
                          }
                        }}
                        className={cn(
                          "rounded-lg",
                          errors.customerName && "border-red-500 focus-visible:ring-red-500"
                        )}
                      />
                      {errors.customerName && (
                        <p className="text-sm text-red-500">{errors.customerName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone Number</label>
                      <Input
                        placeholder="+975 XXXXXXXX"
                        value={formData.phoneNumber}
                        onChange={handlePhoneChange}
                        className={cn(
                          "rounded-lg",
                          errors.phoneNumber && "border-red-500 focus-visible:ring-red-500"
                        )}
                      />
                      {errors.phoneNumber && (
                        <p className="text-sm text-red-500">{errors.phoneNumber}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Product Details Section */}
              <div className="border rounded-lg">
                <div 
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => toggleSection('product')}
                >
                  <h2 className="text-lg font-medium">Product Details</h2>
                  <ChevronDown className={`transform transition-transform ${
                    sectionOpen.product ? 'rotate-180' : ''
                  }`} />
                </div>
                {sectionOpen.product && (
                  <div className="p-4 border-t space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Product ID</label>
                        <Input
                          placeholder="Enter Product ID"
                          value={formData.productId}
                          onChange={(e) => setFormData({...formData, productId: e.target.value})}
                          className={cn(
                            "rounded-lg",
                            errors.productId && "border-red-500 focus-visible:ring-red-500"
                          )}
                        />
                        {errors.productId && (
                          <p className="text-sm text-red-500">{errors.productId}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Quantity</label>
                        <Input
                          type="text"
                          placeholder="Enter quantity"
                          value={formData.quantity}
                          onChange={handleQuantityChange}
                          className={cn(
                            "rounded-lg",
                            errors.quantity && "border-red-500 focus-visible:ring-red-500"
                          )}
                        />
                        {errors.quantity && (
                          <p className="text-sm text-red-500">{errors.quantity}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Total Amount</label>
                      <Input
                        placeholder="Total Amount"
                        value={formData.totalAmount}
                        onChange={(e) => setFormData({...formData, totalAmount: e.target.value})}
                        className={cn(
                          "rounded-lg",
                          errors.totalAmount && "border-red-500 focus-visible:ring-red-500"
                        )}
                        disabled // Automatically calculated based on quantity
                      />
                      {errors.totalAmount && (
                        <p className="text-sm text-red-500">{errors.totalAmount}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery Address Section */}
              <div className="border rounded-lg">
                <div 
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => toggleSection('location')}
                >
                  <h2 className="text-lg font-medium">Delivery Address</h2>
                  <ChevronDown className={`transform transition-transform ${
                    sectionOpen.location ? 'rotate-180' : ''
                  }`} />
                </div>
                {sectionOpen.location && (
                  <div className="p-4 border-t space-y-4">
                    <Select
                      value={formData.dzongkhag}
                      onValueChange={(value) => setFormData({...formData, dzongkhag: value})}
                    >
                      <SelectTrigger className={cn(
                        "rounded-lg",
                        errors.location && "border-red-500 focus:ring-red-500"
                      )}>
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
                      <SelectTrigger className={cn(
                        "rounded-lg",
                        errors.location && "border-red-500 focus:ring-red-500"
                      )}>
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
                      <SelectTrigger className={cn(
                        "rounded-lg",
                        errors.location && "border-red-500 focus:ring-red-500"
                      )}>
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
                    {errors.location && (
                      <p className="text-sm text-red-500">{errors.location}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Fulfillment Date and Payment Section */}
              <div className="border rounded-lg">
                <div 
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => toggleSection('payment')}
                >
                  <h2 className="text-lg font-medium">Fulfillment & Payment</h2>
                  <ChevronDown className={`transform transition-transform ${
                    sectionOpen.payment ? 'rotate-180' : ''
                  }`} />
                </div>
                {sectionOpen.payment && (
                  <div className="p-4 border-t space-y-4">
                    {/* Fulfillment Date */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Fulfillment Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal rounded-lg",
                              !formData.fulfillmentDate && "text-muted-foreground",
                              errors.fulfillmentDate && "border-red-500 focus:ring-red-500"
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
                      {errors.fulfillmentDate && (
                        <p className="text-sm text-red-500">{errors.fulfillmentDate}</p>
                      )}
                    </div>

                    {/* Payment Image */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Payment Image</label>
                      <div className={cn(
                        "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center",
                        errors.paymentImage && "border-red-500"
                      )}>
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
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="mt-4 flex flex-col items-center text-sm leading-6 text-gray-600">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={handleImageUpload}
                                className="rounded-full mb-2"
                              >
                                Browse File
                              </Button>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                              <input
                                ref={fileInputRef}
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleFileChange}
                              />
                            </div>
                          </>
                        )}
                      </div>
                      {errors.paymentImage && (
                        <p className="text-sm text-red-500">{errors.paymentImage}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* General Form Error */}
              {errors.submit && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errors.submit}</AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full rounded-full bg-orange-400 hover:bg-orange-500 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Confirm order"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AddOrderManually;