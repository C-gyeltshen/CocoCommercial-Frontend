"use client";

import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "default" | "outline" | "text";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "default",
  className = "",
  children,
  onClick,
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md focus:outline-none transition-all";
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-100",
    text: "text-blue-500 hover:underline",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
