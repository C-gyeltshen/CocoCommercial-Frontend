"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsCodeSent(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (verificationCode) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Handle password reset logic
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h1 className="font-serif text-3xl font-semibold text-gray-900 mb-3">
              Forgot Password?
            </h1>
            <p className="text-gray-600">
              No worries, we'll help you recover your account.
            </p>
          </div>

          {/* Added illustration */}
          <div className="mb-8 flex justify-center">
            <div className="w-48 h-48 relative">
              <img
                src="/forgetpass.png"
                alt="Reset Password Illustration"
                className="rounded-full bg-blue-50 p-4"
              />
            </div>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-6">
              <form className="space-y-6" onSubmit={handleSendCode}>
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                      required
                      disabled={isLoading || isCodeSent}
                    />
                  </div>
                  {!isCodeSent && (
                    <Button
                      type="submit"
                      disabled={isLoading || !email}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      ) : (
                        <>
                          Send Code
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {isCodeSent && (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="Enter verification code"
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading || !verificationCode}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      ) : (
                        <>
                          Reset Password
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </form>

              <div className="mt-6 text-center text-gray-600">
                Remembered your password?{" "}
                <a
                  href="/signin"
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
                >
                  Log in
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

export default ForgetPasswordPage;