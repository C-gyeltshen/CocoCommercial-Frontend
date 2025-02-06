"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { 
  ShoppingBag, 
  ClipboardList, 
  Store, 
  Menu, 
  Search,
  Image as ImageIcon,
  X,
  Loader,
  MapPin,
  Check
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface StoreData {
  storeName: string;
  description: string;
  location: {
    displayName: string;
    lat: number;
    lon: number;
  };
  storeImage: string | null;
}

interface FormErrors {
  storeName?: string;
  description?: string;
  location?: string;
  storeImage?: string;
  submit?: string;
}

interface Location {
    place_id: string;
    display_name: string;
    lat: string;
    lon: string;
  }
  
  interface LocationSearchProps {
    value: {
      displayName: string;
      lat: number;
      lon: number;
    } | null;
    onSelect: (location: { displayName: string; lat: number; lon: number }) => void;
    disabled?: boolean;
  }
  
  const LocationSearch = ({ value, onSelect, disabled }: LocationSearchProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [locations, setLocations] = useState<Location[]>([]);
    
    const searchLocation = async (query: string) => {
      if (query.length < 3) {
        setLocations([]);
        return;
      }
  
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
        );
        const data: Location[] = await response.json();
        setLocations(data);
      } catch (error) {
        console.error('Error searching locations:', error);
        setLocations([]);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="relative">
        <div className="relative">
          <Input
            placeholder="Search for a location..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              searchLocation(e.target.value);
            }}
            disabled={disabled}
            className="pr-10"
          />
          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
  
        {/* Selected Location Display */}
        {value?.displayName && (
          <div className="mt-2 p-2 bg-gray-50 rounded-lg text-sm">
            <span className="font-medium">Selected: </span>
            {value.displayName}
          </div>
        )}
  
        {/* Search Results Dropdown */}
        {searchTerm.length >= 3 && !disabled && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader className="h-4 w-4 animate-spin" />
              </div>
            ) : locations.length > 0 ? (
              <div className="py-1">
                {locations.map((location) => (
                  <div
                    key={location.place_id}
                    className={cn(
                      "px-4 py-2 cursor-pointer flex items-center space-x-2",
                      "hover:bg-gray-100",
                      value?.displayName === location.display_name && "bg-gray-50"
                    )}
                    onClick={() => {
                      onSelect({
                        displayName: location.display_name,
                        lat: parseFloat(location.lat),
                        lon: parseFloat(location.lon)
                      });
                      setSearchTerm("");
                      setLocations([]);
                    }}
                  >
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{location.display_name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No locations found
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

const StoreManagement = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [storeData, setStoreData] = useState<StoreData>({
    storeName: "My Store",
    description: "",
    location: {
      displayName: "",
      lat: 0,
      lon: 0
    },
    storeImage: null
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!storeData.storeName.trim()) {
      newErrors.storeName = "Store name is required";
    }

    if (!storeData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!storeData.location.displayName) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
          storeImage: "File size should be less than 5MB"
        }));
        return;
      }

      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          storeImage: "Please upload an image file"
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setStoreData(prev => ({
          ...prev,
          storeImage: e.target?.result as string
        }));
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.storeImage;
          return newErrors;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      setIsEditing(false);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving store data:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to save store data. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const Header = () => {
  
    return (
      <nav className="sticky top-0 z-50 bg-[#1B4965] shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
  
            <div className="flex items-center flex-1 md:flex-initial space-x-4">
              <div className="flex-shrink-0">
                <Image
                  src="/cocologo.png"
                  alt="Coco Commercial Logo"
                  width={40}
                  height={40}
                  className="md:w-12 md:h-12"
                />
              </div>
              
              <div className="relative flex-1 max-w-xl hidden md:block">
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
              </div>
            </div>
  
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <button className="text-white hover:text-orange-400 transition-colors duration-300" title="Products">
                <ShoppingBag className="h-6 w-6" />
              </button>
              <button className="text-white hover:text-orange-400 transition-colors duration-300" title="Orders">
                <ClipboardList className="h-6 w-6" />
              </button>
              <button className="text-white hover:text-orange-400 transition-colors duration-300" title="My Store">
                <Store className="h-6 w-6" />
              </button>
  
              {/* Profile Section */}
              <div 
                onClick={() => router.push('/myprofile')} 
                className="flex items-center space-x-3 cursor-pointer hover:text-orange-400"
                >
                <img
                    src={"/api/placeholder/32/32"}
                    alt="Profile"
                    className="h-8 w-8 rounded-full border-2 border-white/20"
                />
                <span className="text-white font-serif hidden lg:inline">My Profile</span>
                </div>
            </div>
          </div>
  
          {/* Mobile menu */}
          {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              <button className="text-white hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2 px-2">
                <ShoppingBag className="h-6 w-6" />
                <span>Products</span>
              </button>
              <button className="text-white hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2 px-2">
                <ClipboardList className="h-6 w-6" />
                <span>Orders</span>
              </button>
              <button className="text-white hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2 px-2">
                <Store className="h-6 w-6" />
                <span>My Store</span>
              </button>
              <button 
                onClick={() => router.push('/myprofile')}
                className="text-white hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2 px-2"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={storeData.storeImage || "/api/placeholder/32/32"}
                    alt="Profile"
                    className="h-8 w-8 rounded-full border-2 border-white/20"
                  />
                  <span className="text-white font-serif">My Profile</span>
                </div>
              </button>
            </div>
          </div>
        )}
        </div>
      </nav>
    );
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Success Notification */}
      <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        showSuccess ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <Alert className="bg-green-50 border-green-200">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Store details saved successfully!</AlertDescription>
        </Alert>
      </div>

      <main className="container mx-auto px-4 sm:px-6 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-serif">Store Details</h1>
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="rounded-full bg-orange-400 hover:bg-orange-500 text-white"
                >
                  Edit
                </Button>
              )}
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Store Image */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <img
                    src={storeData.storeImage || "/api/placeholder/150/150"}
                    alt="Store"
                    className="h-32 w-32 rounded-full border-4 border-gray-200 object-cover"
                  />
                  {isEditing && (
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-orange-400 hover:text-white border border-gray-200"
                      onClick={handleImageUpload}
                    >
                      <ImageIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {errors.storeImage && (
                  <p className="text-sm text-red-500">{errors.storeImage}</p>
                )}
              </div>

              {/* Store Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                  <Input
                    value={storeData.storeName}
                    onChange={(e) => setStoreData({...storeData, storeName: e.target.value})}
                    disabled={!isEditing}
                    className={cn(
                      "rounded-lg",
                      errors.storeName && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.storeName && (
                    <p className="text-sm text-red-500 mt-1">{errors.storeName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <Textarea
                    value={storeData.description}
                    onChange={(e) => setStoreData({...storeData, description: e.target.value})}
                    disabled={!isEditing}
                    className={cn(
                      "rounded-lg min-h-[100px]",
                      errors.description && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <LocationSearch
                    value={storeData.location}
                    onSelect={(location: any) => {
                      setStoreData(prev => ({
                        ...prev,
                        location
                      }));
                      setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.location;
                        return newErrors;
                      });
                    }}
                    disabled={!isEditing}
                  />
                  {errors.location && (
                    <p className="text-sm text-red-500 mt-1">{errors.location}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full hover:bg-red-400 hover:text-white"
                    onClick={() => {
                      setIsEditing(false);
                      setErrors({});
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="rounded-full bg-orange-400 hover:bg-orange-500 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              )}

              {/* Error Alert */}
              {errors.submit && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errors.submit}</AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default StoreManagement;