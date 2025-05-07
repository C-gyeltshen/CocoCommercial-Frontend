
"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Navbar from "@/layout/admin/navbar/navbar";
import Footer from "@/layout/admin/footer/footer";

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  dzongkhag: string;
  gewog: string;
}

interface Dzongkhag {
  id: string;
  name: string;
}

interface Gewog {
  id: string;
  name: string;
}

interface StoreData {
  storeName?: string;
  storeDescription?: string;
  storeDzongkhag?: string;
  storeGewog?: string;
}

const SignupPage: React.FC = () => {
  const [dzongkhags, setDzongkhags] = useState<Dzongkhag[]>([]);
  const [gewogs, setGewogs] = useState<Gewog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    dzongkhag: "",
    gewog: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Fetch Dzongkhags on component mount
  useEffect(() => {
    const fetchDzongkhags = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/masterData/get/dzongkhags");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        if (data.dzongkhags && Array.isArray(data.dzongkhags)) {
          setDzongkhags(data.dzongkhags);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load Dzongkhags.");
      } finally {
        setLoading(false);
      }
    };
    fetchDzongkhags();
  }, []);

  // Fetch Gewogs when Dzongkhag changes
  useEffect(() => {
    if (formData.dzongkhag) {
      const fetchGewogs = async () => {
        try {
          setLoading(true);
          // Find the dzongkhag id that matches the selected name
          const selectedDzongkhag = dzongkhags.find(d => d.name === formData.dzongkhag);
          if (!selectedDzongkhag) {
            throw new Error("Selected dzongkhag not found");
          }
          
          const response = await fetch(`http://localhost:8080/masterData/get/gewogs/${selectedDzongkhag.id}`);
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          
          const data = await response.json();
          if (data.gewogs && Array.isArray(data.gewogs)) {
            setGewogs(data.gewogs);
          } else {
            throw new Error("Invalid gewogs response format");
          }
        } catch (err: any) {
          setError(err.message || "Failed to load Gewogs.");
        } finally {
          setLoading(false);
        }
      };
      fetchGewogs();
    } else {
      setGewogs([]);
    }
  }, [formData.dzongkhag, dzongkhags]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    
    // Phone number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Contact number is required.";
    } else if (!/^\d{8,10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = "Please enter a valid phone number (8-10 digits).";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must include uppercase, lowercase, and numbers.";
    }
    
    // Confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    
    // Dzongkhag validation
    if (!formData.dzongkhag) {
      newErrors.dzongkhag = "Dzongkhag is required.";
    }
    
    // Gewog validation
    if (!formData.gewog) {
      newErrors.gewog = "Gewog is required.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    
    // Create the FormData object
    const formDataToSend = new FormData();
    
    // Append form data from the state
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("dzongkhag", formData.dzongkhag);
    formDataToSend.append("gewog", formData.gewog);

    // Convert FormData to a plain object
    const formDataObject: { [key: string]: string } = {};  
    formDataToSend.forEach((value, key) => {
        formDataObject[key] = value as string;  // Type casting to string (if necessary)
    });
    const jsonData = JSON.stringify(formDataObject);
    console.log("Converted JSON: ", jsonData);
    
    // Get store data from sessionStorage if available
    try {
      const storeDataString = sessionStorage.getItem("storeData");
      if (storeDataString) {
        const storeData: StoreData = JSON.parse(storeDataString);
        
        if (storeData.storeName) formDataToSend.append("storeName", storeData.storeName);
        if (storeData.storeDescription) formDataToSend.append("storeDescription", storeData.storeDescription);
        if (storeData.storeDzongkhag) formDataToSend.append("storeDzongkhag", storeData.storeDzongkhag);
        if (storeData.storeGewog) formDataToSend.append("storeGewog", storeData.storeGewog);
      }
      for (const [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value}`);
        }
        console.log("data type of formDataToSend is ",typeof(formDataToSend))

        const requestData = JSON.stringify(formDataToSend);
        console.log("request data : ", requestData)
      
      const response = await fetch("http://localhost:8080/auth/merchant/signup", {
        method: "POST",
        body: jsonData,
        headers: {
            "Content-Type": "application/json",
        },
      });
      
      const result = await response.json();
      console.log(response)
      
      if (!response.ok) {
        throw new Error(result.message || "Signup failed. Please try again.");
      }
      
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        dzongkhag: "",
        gewog: "",
      });
      
      // Show success message or redirect
      alert("Signup successful!");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    accessibility: true,
  };

  return (
    <div className="w-full mx-auto font-sans text-[#2C3E50]">
      <Navbar />
      <div className="bg-[#f2fafc] py-6">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-start px-4">
          <div>
            <h2 className="text-4xl font-bold text-[#0A1C2E] mb-4">Shop & Sell with Gakyid Market</h2>
            <p className="text-lg text-black mb-6">Your digital journey starts here.</p>
            <Slider {...sliderSettings}>
              <div className="flex justify-center">
                <Image 
                  src="/cart.jpg" 
                  alt="Shopping cart" 
                  width={500} 
                  height={300} 
                  className="rounded-lg"
                />
              </div>
              <div className="flex justify-center">
                <Image 
                  src="/coco.jpg" 
                  alt="Local products" 
                  width={500} 
                  height={300} 
                  className="rounded-lg"
                />
              </div>
            </Slider>
            {/* Add features or benefits */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Why join Gakyid Market?</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  <span>Reach customers across all Dzongkhags</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  <span>Easy-to-use seller dashboard</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  <span>Secure payments and reliable delivery</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 shadow-lg rounded-lg max-w-md mx-auto w-full">
            {submitSuccess ? (
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold text-green-600 mb-4">Registration Successful!</h3>
                <p className="mb-6">Thank you for registering with Gakyid Market.</p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  Register Another Account
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-2xl font-bold text-center mb-6">Sign up (Merchants)</h3>
                
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
                    Contact Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    // type="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    // type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
                
                <div>
                  <label htmlFor="dzongkhag" className="block text-sm font-medium mb-1">
                    Dzongkhag
                  </label>
                  <select
                    id="dzongkhag"
                    name="dzongkhag"
                    value={formData.dzongkhag}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Dzongkhag</option>
                    {dzongkhags.map((dzongkhag: Dzongkhag) => (
                      <option key={dzongkhag.id} value={dzongkhag.name}>
                        {dzongkhag.name}
                      </option>
                    ))}
                  </select>
                  {errors.dzongkhag && <p className="text-red-500 text-sm mt-1">{errors.dzongkhag}</p>}
                </div>
                
                <div>
                  <label htmlFor="gewog" className="block text-sm font-medium mb-1">
                    Gewog
                  </label>
                  <select
                    id="gewog"
                    name="gewog"
                    value={formData.gewog}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={!formData.dzongkhag}
                  >
                    <option value="">Select Gewog</option>
                    {gewogs.map((gewog: Gewog) => (
                      <option key={gewog.id} value={gewog.name}>
                        {gewog.name}
                      </option>
                    ))}
                  </select>
                  {errors.gewog && <p className="text-red-500 text-sm mt-1">{errors.gewog}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-3 bg-orange-500 text-white rounded hover:bg-orange-600 font-medium transition-colors ${
                    submitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {submitting ? "Processing..." : "Sign Up"}
                </button>
                
                <p className="text-center text-sm mt-4">
                  Already have an account?{" "}
                  <a href="/login" className="text-orange-500 hover:underline">
                    Log in
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;