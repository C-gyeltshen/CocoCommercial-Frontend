"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/Footer";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/Navbar";


const SignupPage = () => {
  const router = useRouter();
  const [userType, setUserType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    dzongkhag: "",
    gewog: "",
    village: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const commonFieldStyles =
    "w-full p-3 text-base border rounded-md text-gray-600 focus:ring-2 focus:ring-[#1B4965] focus:outline-none focus:border-[#1B4965]";

  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };

  // Handle confirm password change
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };

  // Handle form data changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;

    try {
      // Here you would typically make an API call to create the user account
      // const response = await createUser({ ...formData, password, userType });
      
      // If signup is successful and user is a merchant, redirect to shop creation
      if (userType === "merchant") {
        router.push("/shopcreation");
      } else {
        // For customers, redirect to home or dashboard
        router.push("/");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      // Handle error (show error message to user)
    }
  };

  // Function to validate the form
  const validateForm = () => {
    const { fullName, email, contactNumber, dzongkhag, gewog, village } =
      formData;
    const isValid =
      fullName &&
      email &&
      contactNumber &&
      dzongkhag &&
      gewog &&
      (userType === "merchant" || (userType === "customer" && village)) &&
      password &&
      confirmPassword &&
      password === confirmPassword;
    setIsFormValid(isValid);
  };

  // Highlight input borders when filled
  const getInputClass = (field: string) =>
    formData[field] || password || confirmPassword
      ? `${commonFieldStyles} border-[#1B4965]`
      : `${commonFieldStyles} border-gray-200`;

  // Reset form when user type changes
  const handleRoleChange = (role: string) => {
    setUserType(role);
    setFormData({
      fullName: "",
      email: "",
      contactNumber: "",
      dzongkhag: "",
      gewog: "",
      village: "",
    });
    setPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  // useEffect hook to validate form whenever any input or password changes
  useEffect(() => {
    validateForm();
  }, [formData, password, confirmPassword, userType]);

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-[#2C3E50]">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <img
              src="/cocologo.png"
              alt="Coco Commercial Logo"
              className="mx-auto mb-6 h-20 w-20"
            />
            <h2 className="font-serif text-3xl font-normal text-primary mb-4">
              Create Your Account
            </h2>
            <p className="text-gray-600 mb-8">
              Join Coco Commercial to connect with broader markets
            </p>
          </div>

          {/* Shop & Sell Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Shop & Sell with Coco Commercial
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Every Bhutanese business deserves to grow online. Whether you're a
              local food vendor, artisan, or shop owner, our platform helps you
              manage sales and reach customers without breaking the bank. Start
              your digital journey today.
            </p>
            <img
              src="/coco1.png"
              alt="Coco Commercial Marketplace Illustration"
              className="w-full rounded-lg shadow-xl mb-16"
            />
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <h2 className="text-center text-2xl font-bold mb-4">
              Choose Your Role
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <button
                onClick={() => handleRoleChange("merchant")}
                className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                  userType === "merchant"
                    ? "border-[#1B4965] bg-blue-50"
                    : "border-gray-200 hover:border-[#1B4965]"
                }`}
              >
                <h3 className="font-serif text-lg mb-2">
                  Sign Up as a Merchant
                </h3>
                <p className="text-sm text-gray-600">
                  Sell your products and reach more customers
                </p>
              </button>
              <button
                onClick={() => handleRoleChange("customer")}
                className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                  userType === "customer"
                    ? "border-[#1B4965] bg-blue-50"
                    : "border-gray-200 hover:border-[#1B4965]"
                }`}
              >
                <h3 className="font-serif text-lg mb-2">
                  Sign Up as a Customer
                </h3>
                <p className="text-sm text-gray-600">
                  Discover and shop from local businesses
                </p>
              </button>
            </div>
          </div>

          {/* Forms */}
          {userType && (
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <h2 className="font-serif text-xl text-primary mb-4">
                      {userType === "merchant"
                        ? "Merchant Details"
                        : "Customer Details"}
                    </h2>
                    <Input
                      type="text"
                      placeholder="Full Name"
                      required
                      className={getInputClass("fullName")}
                      value={formData.fullName}
                      onChange={(e) => handleInputChange(e, "fullName")}
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      required
                      className={getInputClass("email")}
                      value={formData.email}
                      onChange={(e) => handleInputChange(e, "email")}
                    />
                    <Input
                      type="tel"
                      placeholder="Contact Number"
                      required
                      className={getInputClass("contactNumber")}
                      value={formData.contactNumber}
                      onChange={(e) => handleInputChange(e, "contactNumber")}
                    />
                    <select
                      className={getInputClass("dzongkhag")}
                      value={formData.dzongkhag}
                      onChange={(e) => handleInputChange(e, "dzongkhag")}
                    >
                      <option value="">Dzongkhag</option>
                      <option value="thimphu">Thimphu</option>
                      <option value="paro">Paro</option>
                      <option value="punakha">Punakha</option>
                      <option value="wangdue">Wangdue</option>
                    </select>
                    <Input
                      type="text"
                      placeholder="Gewog"
                      required
                      className={getInputClass("gewog")}
                      value={formData.gewog}
                      onChange={(e) => handleInputChange(e, "gewog")}
                    />
                    {userType === "customer" && (
                      <Input
                        type="text"
                        placeholder="Village"
                        required
                        className={getInputClass("village")}
                        value={formData.village}
                        onChange={(e) => handleInputChange(e, "village")}
                      />
                    )}
                    <Input
                      type="password"
                      placeholder="Set Password"
                      required
                      className={getInputClass("password")}
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      required
                      className={getInputClass("confirmPassword")}
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                    {passwordError && (
                      <p className="text-red-500 text-sm">{passwordError}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full bg-[#1B4965] text-white py-3 rounded-full hover:bg-orange-400 transition-all duration-300"
                  >
                    Submit
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;