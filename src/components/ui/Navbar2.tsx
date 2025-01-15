"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Store, Box, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CustomerNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showLogoOnScroll, setShowLogoOnScroll] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setShowLogoOnScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  const navItems = [
    { href: "/products", label: "Products", icon: Box },
    { href: "/stores", label: "Stores", icon: Store },
    { href: "/cart", label: "My Cart", icon: ShoppingCart },
    { href: "/profile", label: "My Profile", icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#1B4965] shadow-md transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <div
                className={`transform transition-all duration-500 ease-in-out ${
                  showLogoOnScroll
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4"
                }`}
              >
                <Image
                  src="/cocologo.png"
                  alt="Coco Commercial Logo"
                  width={50}
                  height={50}
                  className="sm:mr-8"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-orange-400 flex items-center space-x-2 ${
                    isActive(item.href) ? "bg-orange-400" : ""
                  }`}
                  aria-label={`Go to ${item.label}`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              type="button"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-orange-400 flex items-center space-x-2 ${
                    isActive(item.href) ? "bg-orange-400" : ""
                  }`}
                  aria-label={`Go to ${item.label}`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default CustomerNavbar;