"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  showSignUp?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showSignUp = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showLogoOnScroll, setShowLogoOnScroll] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    // Handle logo visibility on scroll
    const handleScroll = () => {
      setShowLogoOnScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 bg-[#1B4965] shadow-md transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
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
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { href: "/", label: "Home" },
                { href: "/#about", label: "About Us" },
                { href: "/#contact", label: "Contact Us" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-orange-400 ${
                    isActive(link.href) ? "bg-orange-400" : ""
                  }`}
                  aria-label={`Go to ${link.label}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/signin"
              className="text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-orange-400"
              aria-label="Go to Log in page"
            >
              Log in
            </Link>
            {showSignUp && (
              <Link
                href="/signup"
                className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                aria-label="Go to Sign up page"
              >
                Sign up
              </Link>
            )}
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
            <div className="flex flex-col space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/#about", label: "About Us" },
                { href: "/#contact", label: "Contact Us" },
                { href: "/signin", label: "Log in" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-white px-6 py-2 transition-all duration-300 hover:bg-orange-400 ${
                    isActive(link.href) ? "bg-orange-400" : ""
                  }`}
                  aria-label={`Go to ${link.label}`}
                >
                  {link.label}
                </Link>
              ))}
              {showSignUp && (
                <Link
                  href="/signup"
                  className="bg-orange-400 text-white px-6 py-2 rounded-full text-center hover:bg-orange-500 transition-all duration-300"
                  aria-label="Go to Sign up page"
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
