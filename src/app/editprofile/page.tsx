"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const EditCustomerProfile: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "Dorji Dechen",
    dateOfBirth: "16/03/1997",
    idNumber: "12345678901",
    gender: "Female",
    location: "Thimphu",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Updated Profile Data:", formData);
    alert("Profile updated successfully!");
  };

  const handleBack = () => {
    router.push("/customerprofile"); 
  };

  return (
    <div className="bg-[#eaf7f4] min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        {/* Back Button */}
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        </div>

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
            {/* Placeholder for Profile Image */}
          </div>
          <button className="text-sm text-[#005a49] hover:underline">
            Upload Image
          </button>
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-center mb-6">
          <button className="flex items-center bg-black text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-800">
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
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg border border-gray-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Date of Birth</label>
            <input
              type="text"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg border border-gray-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">ID Number</label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg border border-gray-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Gender</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg border border-gray-300 focus:outline-none"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm text-gray-500 mb-1">Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg border border-gray-300 focus:outline-none"
            >
              <option value="Thimphu">Thimphu</option>
              <option value="Paro">Paro</option>
              <option value="Punakha">Punakha</option>
              <option value="Haa">Haa</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="bg-[#0f172a] text-white px-6 py-2 rounded-lg shadow-md hover:bg-black"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCustomerProfile;
