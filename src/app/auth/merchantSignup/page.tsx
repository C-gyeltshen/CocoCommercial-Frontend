"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Navbar from "@/layout/admin/navbar/navbar";
import Footer from "@/layout/admin/footer/footer";


const SignupPage: React.FC = () => {
    const [dzongkhags, setDzongkhags] = useState([]);
    const [gewogs, setGewogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        contactNumber: "",
        password: "", 
        dzongkhag: "",
        gewog: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchDzongkhags = async () => {
            try {
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

    useEffect(() => {
        if (formData.dzongkhag) {
            const fetchGewogs = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/masterData/get/gewogs/${formData.dzongkhag}`);
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    const data = await response.json();
                    setGewogs(data.gewogs);
                } catch (err: any) {
                    setError(err.message || "Failed to load Gewogs.");
                }
            };
            fetchGewogs();
        }
    }, [formData.dzongkhag]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
        if (!formData.email.trim()) newErrors.email = "Email is required.";
        if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required.";
        if (!formData.password.trim()) newErrors.password = "Password is required."; // PASSWORD VALIDATION
        if (!formData.dzongkhag) newErrors.dzongkhag = "Dzongkhag is required.";
        if (!formData.gewog) newErrors.gewog = "Gewog is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!validateForm()) return;
    
        // Create the FormData object
        const formDataToSend = new FormData();
    
        // Append form data from the state
        formDataToSend.append("fullName", formData.fullName);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("contactNumber", formData.contactNumber);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("dzongkhag", formData.dzongkhag);
        formDataToSend.append("gewog", formData.gewog);
    
        // Retrieve store data from sessionStorage
        const storeName = sessionStorage.getItem("storeName");
        console.log("store name :", storeName)

        const storeDescription = sessionStorage.getItem("storeDescription");
        const storeDzongkhag = sessionStorage.getItem("storeDzongkhag");
        const storeGewog = sessionStorage.getItem("storeGewog");

        console.log(storeName, storeDescription, storeDzongkhag, storeGewog);
    
        // Append the store data to the FormData object if available
        if (storeName) formDataToSend.append("storeName", storeName);
        if (storeDescription) formDataToSend.append("storeDescription", storeDescription);
        if (storeDzongkhag) formDataToSend.append("storeDzongkhag", storeDzongkhag);
        if (storeGewog) formDataToSend.append("storeGewog", storeGewog);
    
        try {
    
            const response = await fetch("http://localhost:8080/auth/merchant/signup", {
                method: "POST",
                body: formDataToSend,
            });
            console.log("FormData contents:");
            for (const [key, value] of formDataToSend.entries()) {
                console.log(`${key}: ${value}`);
            }

    
            if (!response.ok) {
                throw new Error("Signup failed. Please try again.");
            }
    
            const result = await response.json();
            alert("Signup successful!");
            console.log("Response:", result);
    
            setFormData({
                fullName: "",
                email: "",
                contactNumber: "",
                password: "",
                dzongkhag: "",
                gewog: "",
            });
        } catch (error: any) {
            setError(error.message || "Something went wrong");
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
    };

    return (
        <div className="w-full mx-auto font-sans text-[#2C3E50]">
            <Navbar />
            <div className="bg-[#f2fafc] py-6">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    <div>
                        <h2 className="text-4xl font-bold text-[#0A1C2E] mb-4">Shop & Sell with Gakyid Market</h2>
                        <p className="text-lg text-black mb-6">Your digital journey starts here.</p>
                        <Slider {...sliderSettings}>
                            <div className="flex justify-center">
                                <Image src="/cart.jpg" alt="Cart" width={500} height={300} className="rounded-lg" />
                            </div>
                            <div className="flex justify-center">
                                <Image src="/coco.jpg" alt="Coco" width={500} height={300} className="rounded-lg" />
                            </div>
                        </Slider>
                    </div>

                    <div className="bg-white p-6 shadow-lg rounded-lg max-w-sm mx-auto">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h3 className="text-2xl font-bold text-center">Sign up (Merchants)</h3>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                            />
                            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            <input
                                type="text"
                                name="contactNumber"
                                placeholder="Contact Number"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                            />
                            {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            <select
                                name="dzongkhag"
                                value={formData.dzongkhag}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                            >
                                <option value="">Dzongkhag</option>
                                {dzongkhags.map((dzongkhag: any) => (
                                    <option key={dzongkhag.id} value={dzongkhag.id}>
                                        {dzongkhag.name}
                                    </option>
                                ))}
                            </select>
                            {errors.dzongkhag && <p className="text-red-500 text-sm">{errors.dzongkhag}</p>}
                            <select
                                name="gewog"
                                value={formData.gewog}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                            >
                                <option value="">Gewog</option>
                                {gewogs.map((gewog: any) => (
                                    <option key={gewog.id} value={gewog.name}>
                                        {gewog.name}
                                    </option>
                                ))}
                            </select>
                            {errors.gewog && <p className="text-red-500 text-sm">{errors.gewog}</p>}
                            <button
                                type="submit"
                                className="w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SignupPage;
