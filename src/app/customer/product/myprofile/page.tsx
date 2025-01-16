"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CustomerNavbar from "@/components/ui/Navbar2";
import Footer from "@/components/ui/Footer";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "+975-123-45678",
    dzongkhag: "Thimphu",
    gewog: "Chang",
    village: "Langjophakha",
    profilePic: "/default-profile-pic.png",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdateDetails = (e) => {
    e.preventDefault();
    // Perform API call to update user details
    alert("User details updated successfully!");
    setIsEditing(false);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      alert("New password and confirmation password do not match.");
      return;
    }
    // Perform API call to update the password
    alert("Password changed successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col w-full mx-auto font-sans text-[#2C3E50] bg-gray-50">
      <CustomerNavbar />
      <main className="flex-grow container mx-auto px-6 py-8">
        <h1 className="font-serif text-3xl font-medium text-center text-primary mb-6">
          My Profile
        </h1>

        {/* Profile Picture and User Details */}
        <Card className="mb-8 max-w-2xl mx-auto shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center mb-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary mr-4">
                <Image
                  src={userDetails.profilePic}
                  alt="Profile Picture"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <Button
                variant="outline"
                className="hover:bg-primary hover:text-white transition-colors duration-300"
                onClick={() => alert("Change profile picture functionality")}
              >
                Change Picture
              </Button>
            </div>
            <h2 className="text-xl font-medium text-primary mb-4">Profile Details</h2>
            <form onSubmit={handleUpdateDetails} className="space-y-4">
              {Object.entries(userDetails).map(([key, value]) => (
                key !== "profilePic" && (
                  <div key={key} className="flex flex-col">
                    <label htmlFor={key} className="text-sm font-medium text-gray-600 mb-1 capitalize">
                      {key}
                    </label>
                    <input
                      type="text"
                      id={key}
                      value={value}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setUserDetails({ ...userDetails, [key]: e.target.value })
                      }
                      className={`px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                        !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                      }`}
                    />
                  </div>
                )
              ))}
              {isEditing ? (
                <Button type="submit" className="bg-primary w-full py-3 hover:bg-primary/90">
                  Save Changes
                </Button>
              ) : (
                <Button
                  type="button"
                  className="bg-primary w-full py-3 hover:bg-primary/90"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Details
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Change Password Form */}
        <Card className="max-w-2xl mx-auto shadow-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-medium text-primary mb-4">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="currentPassword" className="text-sm font-medium text-gray-600 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={password.currentPassword}
                  onChange={(e) =>
                    setPassword({ ...password, currentPassword: e.target.value })
                  }
                  className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="newPassword" className="text-sm font-medium text-gray-600 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={password.newPassword}
                  onChange={(e) =>
                    setPassword({ ...password, newPassword: e.target.value })
                  }
                  className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-600 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={password.confirmPassword}
                  onChange={(e) =>
                    setPassword({ ...password, confirmPassword: e.target.value })
                  }
                  className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <Button type="submit" className="bg-primary w-full py-3 hover:bg-primary/90">
                Change Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
