"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Store, Box, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CustomerNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoOnScroll, setShowLogoOnScroll] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setShowLogoOnScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  const centerNavItems = [
    { href: "/products", label: "Products", icon: Box },
    { href: "/stores", label: "Stores", icon: Store },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#1B4965] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <Link href="/dashboard" className="flex-shrink-0">
            <div className="flex items-center">
              <Image
                src="/cocologo.png"
                alt="Coco Commercial Logo"
                width={50}
                height={50}
                className={`transform transition-all duration-500 ease-in-out ${
                  showLogoOnScroll ? "opacity-100 translate-y-0" : "opacity-100"
                }`}
              />
            </div>
          </Link>

          {/* Center - Main Navigation Items (Desktop) */}
          <div className="hidden md:flex items-center justify-center space-x-6">
            {centerNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-6 py-2 rounded-md transition-all duration-300 hover:bg-orange-400 ${
                  isActive(item.href) ? "bg-orange-400" : ""
                }`}
              >
                <item.icon size={20} className="text-white" />
                <span className="text-white font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right side - Profile */}
          <div className="hidden md:block">
            <Link
              href="/profile"
              className={`flex items-center space-x-2 px-6 py-2 rounded-md transition-all duration-300 hover:bg-orange-400 ${
                isActive("/profile") ? "bg-orange-400" : ""
              }`}
            >
              <User size={20} className="text-white" />
              <span className="text-white font-medium">Profile</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 rounded-md hover:bg-orange-400 transition-colors duration-300"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              type="button"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {[
              ...centerNavItems,
              { href: "/profile", label: "Profile", icon: User },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-3 rounded-md transition-all duration-300 hover:bg-orange-400 ${
                  isActive(item.href) ? "bg-orange-400" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon size={20} className="text-white" />
                <span className="text-white">{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default CustomerNavbar;
