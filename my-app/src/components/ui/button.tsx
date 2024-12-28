import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className,
  ...props
}) => {
  const styles = clsx(
    "px-4 py-2 text-sm font-medium rounded",
    variant === "default" && "bg-blue-500 text-white",
    variant === "outline" && "border border-blue-500 text-blue-500",
    className
  );

  return <button className={styles} {...props} />;
};
