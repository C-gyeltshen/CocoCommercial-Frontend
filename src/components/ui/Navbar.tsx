// Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  showSignUp?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showSignUp = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showLogoOnScroll, setShowLogoOnScroll] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
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
    <nav className="sticky top-0 z-50 bg-[#1B4965] shadow-md transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
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
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-orange-400"
              >
                Home
              </Link>
              <Link
                href="/#about"
                className="text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-orange-400"
              >
                About Us
              </Link>
              <Link
                href="/#contact"
                className="text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-orange-400"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/signin"
              className="text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-orange-400"
            >
              Login
            </Link>
            {showSignUp && (
              <Link
                href="/signup"
                className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
              >
                Sign up
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
              aria-label="Toggle menu"
              type="button"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-white px-6 py-2 transition-all duration-300 hover:bg-orange-400"
              >
                Home
              </Link>
              <Link
                href="/#about"
                className="text-white px-6 py-2 transition-all duration-300 hover:bg-orange-400"
              >
                About Us
              </Link>
              <Link
                href="/#contact"
                className="text-white px-6 py-2 transition-all duration-300 hover:bg-orange-400"
              >
                Contact Us
              </Link>
              <Link
                href="/login"
                className="text-white px-6 py-2 transition-all duration-300 hover:bg-orange-400"
              >
                Login
              </Link>
              {showSignUp && (
                <Link
                  href="/signup"
                  className="bg-orange-400 text-white px-6 py-2 rounded-full text-center hover:bg-orange-500 transition-all duration-300"
                >
                  Sign up
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;