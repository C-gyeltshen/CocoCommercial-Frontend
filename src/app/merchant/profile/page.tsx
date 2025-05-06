"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Store, Mail, Phone, Lock, ShieldCheck, Building, MapPin, Edit } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast, ToastContainer } from "react-toastify";
import Header from "@/layout/merchant/header/header";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [merchantData, setMerchantData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+975 17123456",
    profileImage: "/api/placeholder/150/150",
    store: {
      name: "John's Store",
      email: "store@example.com",
      phone: "+975 17789012",
      address: "Thimphu, Bhutan",
      description: "Quality products at affordable prices",
    },
  });

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasLetter = /[a-zA-Z]/;
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/;
    return (
      password.length >= minLength &&
      hasNumber.test(password) &&
      hasLetter.test(password) &&
      hasSpecial.test(password)
    );
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (!validatePassword(newPassword)) {
      toast.error("Password must be at least 8 characters long and include a number, letter, and special character");
      return;
    }
    // Mock backend call
    toast.success("Password updated successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const toggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
    toast.success(`2FA ${is2FAEnabled ? "disabled" : "enabled"} successfully`);
  };

  const EditProfileDialog = () => {
    const [formData, setFormData] = useState(merchantData);
    const [imagePreview, setImagePreview] = useState<string | null>(merchantData.profileImage);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      if (name.startsWith("store.")) {
        const key = name.split(".")[1];
        setFormData((prev) => ({
          ...prev,
          store: { ...prev.store, [key]: value },
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setFormData((prev) => ({ ...prev, profileImage: base64String }));
          setImagePreview(base64String);
        };
        reader.readAsDataURL(file);
      }
    };

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone: string) => /^\+?\d{8,15}$/.test(phone);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateEmail(formData.email) || !validateEmail(formData.store.email)) {
        toast.error("Invalid email format");
        return;
      }
      if (!validatePhone(formData.phone) || !validatePhone(formData.store.phone)) {
        toast.error("Invalid phone number format");
        return;
      }
      setMerchantData(formData);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    };

    return (
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-full text-sm md:text-base px-4 md:px-6 py-2"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto font-sans text-[#2C3E50]">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Edit Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            {/* Personal Information Section */}
            <fieldset className="space-y-4">
              <legend className="font-serif text-lg text-[#2C3E50] flex items-center">
                <User className="mr-2 h-5 w-5" /> Personal Information
              </legend>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded-lg text-sm md:text-base"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Phone</label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </fieldset>

            {/* Store Information Section */}
            <fieldset className="space-y-4">
              <legend className="font-serif text-lg text-[#2C3E50] flex items-center">
                <Store className="mr-2 h-5 w-5" /> Store Information
              </legend>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Store Name</label>
                <Input
                  type="text"
                  name="store.name"
                  value={formData.store.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Store Email</label>
                <Input
                  type="email"
                  name="store.email"
                  value={formData.store.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Store Phone</label>
                <Input
                  type="tel"
                  name="store.phone"
                  value={formData.store.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Store Address</label>
                <Input
                  type="text"
                  name="store.address"
                  value={formData.store.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Store Description</label>
                <textarea
                  name="store.description"
                  value={formData.store.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg text-sm md:text-base"
                  rows={4}
                />
              </div>
            </fieldset>

            {/* Form Actions */}
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="hover:bg-gray-200 transition-all duration-300 rounded-full text-sm md:text-base px-4 md:px-6 py-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#006d5b] text-white hover:bg-[#005a49] transition-all duration-300 rounded-full text-sm md:text-base px-4 md:px-6 py-2"
              >
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  const SecurityDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full md:w-auto hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-full text-sm md:text-base px-4 md:px-6 py-2"
        >
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto font-sans text-[#2C3E50]">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Change Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={handlePasswordChange} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm md:text-base font-medium mb-1">Current Password</label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm md:text-base font-medium mb-1">New Password</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm md:text-base font-medium mb-1">Confirm New Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#006d5b] text-white hover:bg-[#005a49] transition-all duration-300 rounded-full text-sm md:text-base px-4 md:px-6 py-2"
          >
            Update Password
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="w-full mx-auto font-sans text-[#2C3E50]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Summary Card */}
          <Card className="md:col-span-1 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={merchantData.profileImage}
                  alt="Profile"
                  fill
                  className="rounded-full border-4 border-[#006d5b] object-cover"
                />
              </div>
              <h2 className="text-xl md:text-2xl font-serif text-[#2C3E50] mb-2">
                {merchantData.name}
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-4">{merchantData.store.name}</p>
              <EditProfileDialog />
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Personal Information */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-serif text-[#2C3E50] mb-6 flex items-center">
                  <User className="mr-2 h-5 w-5" /> Personal Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="text-gray-400 h-5 w-5" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-sm md:text-base text-[#2C3E50]">{merchantData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="text-gray-400 h-5 w-5" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-sm md:text-base text-[#2C3E50]">{merchantData.phone}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Store Information */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-serif text-[#2C3E50] mb-6 flex items-center">
                  <Store className="mr-2 h-5 w-5" /> Store Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Building className="text-gray-400 h-5 w-5" />
                    <div>
                      <p className="text-sm text-gray-500">Store Name</p>
                      <p className="text-sm md:text-base text-[#2C3E50]">{merchantData.store.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="text-gray-400 h-5 w-5" />
                    <div>
                      <p className="text-sm text-gray-500">Store Email</p>
                      <p className="text-sm md:text-base text-[#2C3E50]">{merchantData.store.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="text-gray-400 h-5 w-5" />
                    <div>
                      <p className="text-sm text-gray-500">Store Phone</p>
                      <p className="text-sm md:text-base text-[#2C3E50]">{merchantData.store.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="text-gray-400 h-5 w-5" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-sm md:text-base text-[#2C3E50]">{merchantData.store.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm text-gray-500">Description</p>
                      <p className="text-sm md:text-base text-[#2C3E50]">{merchantData.store.description}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-serif text-[#2C3E50] mb-6 flex items-center">
                  <ShieldCheck className="mr-2 h-5 w-5" /> Security Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Lock className="text-gray-400 h-5 w-5" />
                    <div className="flex-1">
                      <p className="text-sm md:text-base text-[#2C3E50]">Password</p>
                      <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                    </div>
                    <SecurityDialog />
                  </div>
                  <div className="flex items-center space-x-4">
                    <ShieldCheck className="text-gray-400 h-5 w-5" />
                    <div className="flex-1">
                      <p className="text-sm md:text-base text-[#2C3E50]">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">{is2FAEnabled ? "Enabled" : "Disabled"}</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={toggle2FA}
                      className="hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-full text-sm md:text-base px-4 md:px-6 py-2"
                    >
                      {is2FAEnabled ? "Disable 2FA" : "Enable 2FA"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <ToastContainer />
      </main>
    </div>
  );
};

export default Profile;