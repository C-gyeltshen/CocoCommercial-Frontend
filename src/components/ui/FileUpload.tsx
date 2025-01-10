"use client";

import React, { useState } from "react";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileUpload(file);
    }
  };

  return (
    <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition">
      <label
        htmlFor="file-upload"
        className="block text-sm font-medium text-gray-600 cursor-pointer hover:text-blue-500"
      >
        {fileName ? (
          <span className="text-gray-700 font-semibold">
            Selected file: {fileName}
          </span>
        ) : (
          <span>Choose a file or drag & drop it here</span>
        )}
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
      <p className="mt-2 text-xs text-gray-400">
        JPEG, PNG, PDF, and MP4 formats up to 5MB
      </p>
    </div>
  );
};

export default FileUpload;
