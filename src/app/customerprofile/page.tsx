"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CustomerNavbar from '@/components/ui/Navbar1';

const CustomerProfile: React.FC = () => {
  const router = useRouter();

  const handleEditProfile = () => {
    router.push("/editprofile");
  };

  const handleSignOut = () => {
    console.log("User signed out!");
    alert("Signed out successfully!");
  };

  return (
    <div>
      <CustomerNavbar />
      <div className="bg-[#eaf7f4] min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
              {/* Placeholder for Profile Image */}
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleEditProfile}
              className="flex items-center bg-gray-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700"
            >
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536M9 11l7-7 3.536 3.536-7 7H9v-3.536z"
                  />
                </svg>
              </span>
              Edit profile
            </button>
          </div>

          {/* Customer Details */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Full Name</label>
              <input
                type="text"
                value="Dorji Dechen"
                className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg border border-gray-300 focus:outline-none"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Date of Birth</label>
              <input
                type="text"
                value="16/03/1997"
                className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg border border-gray-300 focus:outline-none"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">ID Number</label>
              <input
                type="text"
                value="12345678901"
                className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg border border-gray-300 focus:outline-none"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Gender</label>
              <input
                type="text"
                value="Female"
                className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg border border-gray-300 focus:outline-none"
                disabled
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-500 mb-1">Location</label>
              <input
                type="text"
                value="Thimphu"
                className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg border border-gray-300 focus:outline-none"
                disabled
              />
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSignOut}
              className="bg-[#0f172a] text-white px-6 py-2 rounded-lg shadow-md hover:bg-black"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
