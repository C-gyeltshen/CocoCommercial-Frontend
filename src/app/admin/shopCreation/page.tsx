"use client";

import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ui/progressbar";
import Navbar from "@/layout/admin/navbar/navbar";
import Footer from "@/layout/admin/footer/footer";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://vhlhoymotkhuaccwysuo.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZobGhveW1vdGtodWFjY3d5c3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMjkyNjgsImV4cCI6MjA0ODcwNTI2OH0.QqExBarpYZVYUvtSBS9Qj9aQRHiAhc7T9TzRaMsmu5I"
);

// Type definitions for dropdown options
type OptionType = {
  value: string;
  label: string;
};

// Type definition for form data
type StoreDataType = {
  storeName: string;
  storeDescription: string;
  storeDzongkhag: string;
  storeGewog: string;
  storeLogo: File | null;
  storeLogoUrl?: string;
};

const HomePage = () => {
  const router = useRouter();
  const totalSteps = 4;

  // State variables
  const [storeData, setStoreData] = useState<StoreDataType>({
    storeName: "",
    storeDescription: "",
    storeDzongkhag: "",
    storeGewog: "",
    storeLogo: null,
  });
  const [dzongkhags, setDzongkhags] = useState<OptionType[]>([]);
  const [gewogs, setGewogs] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch Dzongkhags from API on mount
  useEffect(() => {
    const fetchDzongkhags = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/masterData/get/dzongkhags"
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        if (Array.isArray(data.dzongkhags)) {
          setDzongkhags(
            data.dzongkhags.map(
              (dz: { id: { toString: () => any }; name: any }) => ({
                value: dz.id.toString(), // Ensure string type
                label: dz.name,
              })
            )
          );
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load Dzongkhags.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchDzongkhags();
  }, []);

  // Fetch Gewogs when Dzongkhag changes
  useEffect(() => {
    if (storeData.storeDzongkhag) {
      const fetchGewogs = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `http://localhost:8080/masterData/get/gewogs/${storeData.storeDzongkhag}`
          );
          if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);

          const data = await response.json();

          if (Array.isArray(data.gewogs)) {
            setGewogs(
              data.gewogs.map(
                (g: { id?: string; name: string }, index: number) => ({
                  value: g.id?.toString() || index.toString(), // Use actual ID if available, fall back to index
                  label: g.name,
                })
              )
            );
          } else {
            throw new Error("Invalid gewogs response format");
          }
        } catch (err: unknown) {
          const errorMessage =
            err instanceof Error ? err.message : "Failed to load Gewogs.";
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      };

      fetchGewogs();
    } else {
      setGewogs([]);
    }
  }, [storeData.storeDzongkhag]);

  // Load saved data from localStorage on initial render
  useEffect(() => {
    const storedData = localStorage.getItem("storeData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setStoreData(parsedData);
      } catch (err) {
        console.error("Error parsing stored data:", err);
        localStorage.removeItem("storeData"); // Remove invalid data
      }
    }
  }, []);

  // Handle input changes
  const handleInputChange = (
    field: keyof StoreDataType,
    value: string | File | null
  ) => {
    setStoreData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error when user types
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // Handle logo file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      // File size validation (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setValidationErrors((prev) => ({
          ...prev,
          storeLogo: "File size exceeds 2MB limit",
        }));
        return;
      }

      // File type validation
      if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        setValidationErrors((prev) => ({
          ...prev,
          storeLogo: "Only JPG, JPEG, and PNG files are allowed",
        }));
        return;
      }

      handleInputChange("storeLogo", file);
      setValidationErrors((prev) => ({ ...prev, storeLogo: "" }));
    }
  };

  // Upload file to Supabase storage
  const uploadLogoToSupabase = async (file: File): Promise<string | null> => {
    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Create unique filename with store name and timestamp
      const fileExt = file.name.split(".").pop();
      const sanitizedStoreName = storeData.storeName
        .replace(/[^a-z0-9]/gi, "-")
        .toLowerCase();
      const fileName = `stores/${sanitizedStoreName}-${Date.now()}.${fileExt}`;

      // Upload file to Supabase
      const { data, error } = await supabase.storage
        .from("logo")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      console.log("CHECK FILE UPLOADED", data);
      if (error) {
        throw new Error(`Upload error: ${error.message}`);
      }

      // Generate public URL for the uploaded file
      // const { data: urlData } = supabase
      //   .storage
      //   .from('avatars')
      //   .getPublicUrl(fileName);

      setUploadProgress(100);
      // return urlData.publicUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  // Handle Dzongkhag selection
  const handleDzongkhagChange = (option: OptionType | null) => {
    handleInputChange("storeDzongkhag", option?.value || "");
    // Reset gewog when dzongkhag changes
    handleInputChange("storeGewog", "");
  };

  // Handle Gewog selection
  const handleGewogChange = (option: OptionType | null) => {
    handleInputChange("storeGewog", option?.value || "");
  };

  // Validate current step
  const validateCurrentStep = (): boolean => {
    const errors: Record<string, string> = {};

    if (currentStep === 1 && !storeData.storeName.trim()) {
      errors.storeName = "Store name is required";
    }

    if (currentStep === 2 && !storeData.storeDescription.trim()) {
      errors.storeDescription = "Store description is required";
    }

    if (currentStep === 3) {
      if (!storeData.storeDzongkhag) {
        errors.storeDzongkhag = "Please select a Dzongkhag";
      }
      if (!storeData.storeGewog) {
        errors.storeGewog = "Please select a Gewog";
      }
    }

    if (currentStep === 4 && !storeData.storeLogo) {
      errors.storeLogo = "Please upload a store logo";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle going to next step or submission
  const handleNextStep = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateCurrentStep()) {
      return;
    }

    try {
      // If on the last step and we have a logo, upload it
      if (currentStep === totalSteps && storeData.storeLogo) {
        setLoading(true);
        // Upload logo to Supabase
        const logoUrl = await uploadLogoToSupabase(storeData.storeLogo);

        // Update store data with the logo URL
        if (logoUrl) {
          setStoreData((prev) => ({
            ...prev,
            storeLogoUrl: logoUrl,
          }));
        }

        // Save updated data (without File object)
        const storeDataToSave = {
          ...storeData,
          storeLogoUrl: logoUrl,
          storeLogo: null, // Remove File object for storage
        };

        // Save to sessionStorage for next page
        sessionStorage.setItem("storeData", JSON.stringify(storeDataToSave));

        // Navigate to signup page
        router.push("/auth/merchantSignup");
      } else {
        // Save progress to localStorage (excluding File object which can't be JSON serialized)
        const storeDataToSave = { ...storeData };
        delete (storeDataToSave as any).storeLogo;
        localStorage.setItem("storeData", JSON.stringify(storeDataToSave));

        // Move to next step
        setCurrentStep((prev) => prev + 1);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred during submission";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle going back to previous step
  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#2C3E50] font-sans">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="sticky top-0 z-10 bg-white py-2">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
            <h1 className="text-2xl font-serif text-[#1B4965] mb-5">
              {currentStep === 1
                ? "What is the name of your business?"
                : currentStep === 2
                ? "Describe Your Business"
                : currentStep === 3
                ? "Where is Your Business Located?"
                : "Upload Your Store Logo"}
            </h1>

            <form onSubmit={handleNextStep} className="space-y-4">
              {currentStep === 1 && (
                <div>
                  <input
                    type="text"
                    value={storeData.storeName}
                    onChange={(e) =>
                      handleInputChange("storeName", e.target.value)
                    }
                    placeholder="Store Name"
                    className={`w-full p-3 border ${
                      validationErrors.storeName
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:ring-2 focus:ring-[#1B4965] focus:outline-none`}
                  />
                  {validationErrors.storeName && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.storeName}
                    </p>
                  )}
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <textarea
                    value={storeData.storeDescription}
                    onChange={(e) =>
                      handleInputChange("storeDescription", e.target.value)
                    }
                    placeholder="Business Description"
                    rows={4}
                    className={`w-full p-3 border ${
                      validationErrors.storeDescription
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:ring-2 focus:ring-[#1B4965] focus:outline-none`}
                  />
                  {validationErrors.storeDescription && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.storeDescription}
                    </p>
                  )}
                </div>
              )}

              {currentStep === 3 && (
                <>
                  <div>
                    <Select
                      value={
                        dzongkhags.find(
                          (d) => d.value === storeData.storeDzongkhag
                        ) || null
                      }
                      onChange={handleDzongkhagChange}
                      options={dzongkhags}
                      placeholder="Select Dzongkhag"
                      className={`w-full ${
                        validationErrors.storeDzongkhag ? "border-red-500" : ""
                      }`}
                      isLoading={loading}
                      isDisabled={loading}
                    />
                    {validationErrors.storeDzongkhag && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.storeDzongkhag}
                      </p>
                    )}
                  </div>

                  <div className="mt-4">
                    <Select
                      value={
                        gewogs.find((g) => g.value === storeData.storeGewog) ||
                        null
                      }
                      onChange={handleGewogChange}
                      options={gewogs}
                      placeholder="Select Gewog"
                      className={`w-full ${
                        validationErrors.storeGewog ? "border-red-500" : ""
                      }`}
                      isLoading={storeData.storeDzongkhag && loading}
                      isDisabled={!storeData.storeDzongkhag || loading}
                    />
                    {validationErrors.storeGewog && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.storeGewog}
                      </p>
                    )}
                    {storeData.storeDzongkhag &&
                      gewogs.length === 0 &&
                      !loading && (
                        <p className="text-amber-600 text-sm mt-1">
                          No gewogs found for this dzongkhag
                        </p>
                      )}
                  </div>
                </>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-medium text-gray-700">
                        Upload Store Logo
                      </h3>
                      <p className="text-sm text-gray-500">
                        PNG, JPG or JPEG (Max 2MB)
                      </p>
                    </div>

                    {storeData.storeLogo ? (
                      <div className="flex flex-col items-center">
                        <div className="w-32 h-32 mb-4 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          <img
                            src={URL.createObjectURL(storeData.storeLogo)}
                            alt="Logo Preview"
                            className="max-w-full max-h-full object-cover"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <span className="text-sm text-gray-700">
                            {storeData.storeLogo.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleInputChange("storeLogo", null)}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-sm border border-gray-300 cursor-pointer hover:bg-gray-50">
                          <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <span className="mt-2 text-sm font-medium text-gray-700">
                            Click to upload
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handleFileUpload}
                          />
                        </label>
                      </>
                    )}

                    {isUploading && (
                      <div className="w-full mt-4">
                        <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-center mt-1">
                          {uploadProgress}% uploaded
                        </p>
                      </div>
                    )}
                  </div>

                  {validationErrors.storeLogo && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.storeLogo}
                    </p>
                  )}
                </div>
              )}

              <div className="flex justify-between items-center mt-6">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                    disabled={loading || isUploading}
                  >
                    Back
                  </button>
                )}

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#1B4965] text-white rounded hover:bg-[#0e3854] transition-colors ml-auto"
                  disabled={loading || isUploading}
                >
                  {loading || isUploading
                    ? "Processing..."
                    : currentStep === totalSteps
                    ? "Finish"
                    : "Next"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
