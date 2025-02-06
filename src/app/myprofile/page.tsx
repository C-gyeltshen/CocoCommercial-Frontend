"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { 
  User, 
  ShoppingBag, 
  ClipboardList, 
  Store, 
  Menu, 
  Image as ImageIcon,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  X,
  Search
} from "lucide-react";
import Image from "next/image";

// Types
interface ProfileData {
  merchantName: string;
  email: string;
  phone: string;
  profileImage: string;
}

interface SecurityData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  phone: string;
  merchantName: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ShowPasswords {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

interface Notification {
  id: number;
  type: 'success' | 'error';
  title: string;
  message: string;
}

const MerchantProfile = () => {
  // State
  const [activeTab, setActiveTab] = useState("General");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notificationTimeout = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileData, setProfileData] = useState<ProfileData>({
    merchantName: "cococart",
    email: "merchant@gmail.com",
    phone: "17123456",
    profileImage: "/api/placeholder/150/150"
  });

  const [tempProfileData, setTempProfileData] = useState<ProfileData>(profileData);

  const [securityData, setSecurityData] = useState<SecurityData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showPasswords, setShowPasswords] = useState<ShowPasswords>({
    current: false,
    new: false,
    confirm: false
  });

  const [errors, setErrors] = useState<FormErrors>({
    phone: "",
    merchantName: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Notification Functions
  const addNotification = (type: 'success' | 'error', title: string, message: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, title, message }]);

    // Remove notification after 5 seconds
    notificationTimeout.current = setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  useEffect(() => {
    return () => {
      if (notificationTimeout.current) {
        clearTimeout(notificationTimeout.current);
      }
    };
  }, []);

  // Validation Functions
  const validatePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 8) {
      return "Phone number must have at least 8 digits";
    }
    return "";
  };

  const validateMerchantName = (name: string) => {
    if (name.trim().length < 3) {
      return "Merchant name must be at least 3 characters";
    }
    return "";
  };

  const validatePasswords = () => {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    };

    if (!securityData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (securityData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(securityData.newPassword)) {
      newErrors.newPassword = "Password must contain uppercase, lowercase, and numbers";
    }

    if (securityData.newPassword !== securityData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    return newErrors;
  };

  // Handler Functions
  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addNotification(
          'error',
          'Image Upload Failed',
          'File size should be less than 5MB'
        );
        return;
      }

      if (!file.type.startsWith('image/')) {
        addNotification(
          'error',
          'Image Upload Failed',
          'Please upload an image file'
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setTempProfileData(prev => ({
          ...prev,
          profileImage: e.target?.result as string
        }));
        addNotification(
          'success',
          'Image Upload Successful',
          'Your profile image has been updated'
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const phoneError = validatePhone(tempProfileData.phone);
    const nameError = validateMerchantName(tempProfileData.merchantName);

    if (phoneError || nameError) {
      addNotification(
        'error',
        'Validation Error',
        'Please correct the errors in the form'
      );
      setErrors(prev => ({
        ...prev,
        phone: phoneError,
        merchantName: nameError
      }));
      return;
    }

    setProfileData(tempProfileData);
    setIsEditing(false);
    addNotification(
      'success',
      'Profile Updated',
      'Your profile has been successfully updated'
    );
  };

  const handlePasswordSave = () => {
    const passwordErrors = validatePasswords();
    
    if (Object.values(passwordErrors).some(error => error)) {
      addNotification(
        'error',
        'Password Update Failed',
        'Please correct the password validation errors'
      );
      setErrors(prev => ({
        ...prev,
        ...passwordErrors
      }));
      return;
    }

    setSecurityData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    addNotification(
      'success',
      'Password Updated',
      'Your password has been successfully updated'
    );
  };

  const handleCancel = () => {
    setTempProfileData(profileData);
    setIsEditing(false);
    setErrors({
      phone: "",
      merchantName: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const Header = () => (
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

            <div className="flex items-center space-x-3">
              <img
                src={profileData.profileImage}
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );

      
   // Component: Notifications
   const NotificationsContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2 min-w-[320px]">
      {notifications.map(notification => (
        <Alert 
          key={notification.id} 
          variant={notification.type === 'success' ? "default" : "destructive"}
          className={`relative border ${
            notification.type === 'success' 
              ? 'border-green-500/50 bg-green-50' 
              : 'border-red-500/50 bg-red-50'
          }`}
        >
          <button
            onClick={() => removeNotification(notification.id)}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
          </button>
          {notification.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertTitle className={
            notification.type === 'success' ? 'text-green-800' : 'text-red-800'
          }>
            {notification.title}
          </AlertTitle>
          <AlertDescription className={
            notification.type === 'success' ? 'text-green-700' : 'text-red-700'
          }>
            {notification.message}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );

  return (
    <div className="w-full mx-auto font-sans text-[#2C3E50]">
      <Header />
      <NotificationsContainer />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            {/* Tab Navigation */}
            <div className="flex space-x-4 mb-6">
              <Button
                variant={activeTab === "General" ? "default" : "outline"}
                className={`rounded-full ${
                  activeTab === "General" 
                    ? "bg-orange-400 text-white" 
                    : "hover:bg-orange-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("General")}
              >
                General
              </Button>
              <Button
                variant={activeTab === "Security" ? "default" : "outline"}
                className={`rounded-full ${
                  activeTab === "Security" 
                    ? "bg-orange-400 text-white" 
                    : "hover:bg-orange-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("Security")}
              >
                Security
              </Button>
            </div>

            {activeTab === "General" ? (
              <div className="space-y-6">
                {/* Profile Image */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <img
                      src={tempProfileData.profileImage}
                      alt="Profile"
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
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <h2 className="text-2xl font-serif">{tempProfileData.merchantName}</h2>
                </div>

                {/* Profile Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Merchant Name</label>
                    <Input
                      value={tempProfileData.merchantName}
                      onChange={(e) => {
                        setTempProfileData({...tempProfileData, merchantName: e.target.value});
                        setErrors(prev => ({...prev, merchantName: ""}));
                      }}
                      disabled={!isEditing}
                      className="rounded-lg"
                    />
                    {errors.merchantName && (
                      <p className="text-red-500 text-sm mt-1">{errors.merchantName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input
                      value={tempProfileData.email}
                      disabled
                      className="rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <Input
                      value={tempProfileData.phone}
                      onChange={(e) => {
                        setTempProfileData({...tempProfileData, phone: e.target.value});
                        setErrors(prev => ({...prev, phone: ""}));
                      }}
                      disabled={!isEditing}
                      className="rounded-lg"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-4">
                  {isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        className="rounded-full hover:bg-red-400 hover:text-white"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="rounded-full bg-orange-400 hover:bg-orange-500 text-white"
                        onClick={handleSave}
                      >
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="rounded-full bg-orange-400 hover:bg-orange-500 text-white"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Password Form */}
                <div className="space-y-4">
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <div className="relative">
                      <Input
                        type={showPasswords.current ? "text" : "password"}
                        value={securityData.currentPassword}
                        onChange={(e) => {
                          setSecurityData({...securityData, currentPassword: e.target.value});
                          setErrors(prev => ({...prev, currentPassword: ""}));
                        }}
                        className="rounded-lg pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({...prev, current: !prev.current}))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
                    )}
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <div className="relative">
                      <Input
                        type={showPasswords.new ? "text" : "password"}
                        value={securityData.newPassword}
                        onChange={(e) => {
                          setSecurityData({...securityData, newPassword: e.target.value});
                          setErrors(prev => ({...prev, newPassword: ""}));
                        }}
                        className="rounded-lg pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({...prev, new: !prev.new}))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <div className="relative">
                      <Input
                        type={showPasswords.confirm ? "text" : "password"}
                        value={securityData.confirmPassword}
                        onChange={(e) => {
                          setSecurityData({...securityData, confirmPassword: e.target.value});
                          setErrors(prev => ({...prev, confirmPassword: ""}));
                        }}
                        className="rounded-lg pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({...prev, confirm: !prev.confirm}))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end pt-4">
                  <Button
                    className="rounded-full bg-orange-400 hover:bg-orange-500 text-white"
                    onClick={handlePasswordSave}
                  >
                    Update Password
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MerchantProfile;