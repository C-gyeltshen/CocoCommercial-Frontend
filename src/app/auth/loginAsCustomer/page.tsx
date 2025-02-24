"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Menu, X, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/layout/admin/navbar/navbar";
import Footer from "@/layout/admin/footer/footer";


const LoginPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLogoOnScroll, setShowLogoOnScroll] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        if (window.scrollY > 50) {
            setShowLogoOnScroll(true);
        } else {
            setShowLogoOnScroll(false);
        }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="w-full mx-auto font-sans text-[#2C3E50]">
        < Navbar />
        

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
            <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
                <Image
                src="/cocologo.png"
                alt="Coco Commercial Logo"
                width={80}
                height={80}
                className="mx-auto mb-6"
                />
                <h1 className="font-serif text-3xl font-normal text-primary mb-4">
                Welcome Back
                </h1>
                <p className="text-gray-600">
                Log in to your Coco Commercial account <br /> as Customer
                </p>
            </div>

            <Card className="shadow-lg">
                <CardContent className="p-8">
                <form className="space-y-6">
                    <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#1B4965] focus:outline-none"
                        required
                    />
                    <div className="relative">
                        <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#1B4965] focus:outline-none"
                        required
                        />
                        <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-500"
                        >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    </div>

                    <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                        type="checkbox"
                        id="remember"
                        className="rounded border-gray-300 text-[#1B4965] focus:ring-[#1B4965]"
                        />
                        <label
                        htmlFor="remember"
                        className="ml-2 text-sm text-gray-600"
                        >
                        Remember me
                        </label>
                    </div>
                    <a
                        href="signin\forgetpassword"
                        className="text-sm text-[#1B4965] hover:underline"
                    >
                        Forgot password?
                    </a>
                    </div>

                    <Button className="w-full bg-[#1B4965] text-white py-3 rounded-full hover:bg-orange-400 transition-all duration-300">
                    Log In
                    </Button>

                    {/* Social Login Options */}
                    <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                        Or continue with
                        </span>
                    </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        className="w-full border-2 py-2 rounded-md hover:bg-gray-50 transition-all duration-300"
                    >
                        <Image
                        src="/google.png"
                        alt="Google"
                        width={20}
                        height={20}
                        className="mr-2"
                        />
                        Google
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full border-2 py-2 rounded-md hover:bg-gray-50 transition-all duration-300"
                    >
                        <Image
                        src="/facebook.png"
                        alt="Facebook"
                        width={20}
                        height={20}
                        className="mr-2"
                        />
                        Facebook
                    </Button>
                    </div>
                </form>

                <div className="mt-6 text-center text-gray-600">
                    Don't have an account?{" "}
                    <a
                    href="/auth/customerSignup"
                    className="text-[#1B4965] hover:underline font-medium"
                    >
                    Sign up
                    </a>
                </div>
                </CardContent>
            </Card>
            </div>
        </main>
        <Footer />
        </div>
    );
};

export default LoginPage;