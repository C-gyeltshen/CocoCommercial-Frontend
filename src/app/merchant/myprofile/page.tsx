"use client"

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  User,
  Store,
  Mail,
  Phone,
  Lock,
  ShieldCheck,
  Building,
  MapPin,
} from "lucide-react";
import Image from "next/image";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Mock data - replace with actual data from your backend
  const merchantData = {
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
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }
    // Add your password change logic here
    toast({
      title: "Success",
      description: "Password updated successfully",
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const SecurityDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full md:w-auto hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-full"
        >
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={handlePasswordChange} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#1B4965] hover:bg-orange-400 text-white transition-all duration-300"
          >
            Update Password
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <Image
                src={merchantData.profileImage}
                alt="Profile"
                fill
                className="rounded-full border-4 border-[#1B4965] object-cover"
              />
            </div>
            <h2 className="text-2xl font-serif text-[#2C3E50] mb-2">
              {merchantData.name}
            </h2>
            <p className="text-gray-600 mb-4">{merchantData.store.name}</p>
            <SecurityDialog />
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Personal Information */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <h3 className="text-xl font-serif text-[#2C3E50] mb-6 flex items-center">
                <User className="mr-2" /> Personal Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-[#2C3E50]">{merchantData.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-[#2C3E50]">{merchantData.phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Store Information */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <h3 className="text-xl font-serif text-[#2C3E50] mb-6 flex items-center">
                <Store className="mr-2" /> Store Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Building className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Store Name</p>
                    <p className="text-[#2C3E50]">{merchantData.store.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Store Email</p>
                    <p className="text-[#2C3E50]">{merchantData.store.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Store Phone</p>
                    <p className="text-[#2C3E50]">{merchantData.store.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-[#2C3E50]">{merchantData.store.address}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <h3 className="text-xl font-serif text-[#2C3E50] mb-6 flex items-center">
                <ShieldCheck className="mr-2" /> Security Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Lock className="text-gray-400" />
                  <div className="flex-1">
                    <p className="text-[#2C3E50]">Password</p>
                    <p className="text-sm text-gray-500">
                      Last changed 3 months ago
                    </p>
                  </div>
                  <SecurityDialog />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;