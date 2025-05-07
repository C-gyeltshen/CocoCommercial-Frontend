'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface NavBarProps {
  isAuthorized?: boolean;
}

const Navbar: React.FC<NavBarProps> = ({ isAuthorized = false }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Check if the screen is mobile-sized
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white w-full border-b">
      <div className="flex items-center justify-between py-2 px-4 max-w-screen-xl mx-auto">
        {/* Sort Icon */}
        <div className="text-black">
        <Image
            src="/sso-logo.png"
            alt="SSO Logo"
            width={70}
            height={70}
            className="object-contain"
            priority
          />
        </div>

        {/* Search Bar - Removed from navbar since it's in the product listing page */}
        <div className="flex-1"></div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex space-x-10">
          <Link href="/customer/stores" passHref>
            <span className={`text-xl font-medium cursor-pointer ${
              pathname === '/customer/stores' 
                ? 'text-purple-600' 
                : 'text-gray-800 hover:text-purple-600'
            }`}>
              Stores
            </span>
          </Link>
          <Link href="/customer/products" passHref>
            <span className={`text-xl font-medium cursor-pointer ${
              pathname === '/customer/products' 
                ? 'text-purple-600' 
                : 'text-gray-800 hover:text-purple-600'
            }`}>
              Products
            </span>
          </Link>
          <Link href="/customer/signin" passHref>
            <span className={`text-xl font-medium cursor-pointer ${
              pathname === '/customer/signin' 
                ? 'text-purple-600' 
                : 'text-gray-800 hover:text-purple-600'
            }`}>
              SignIn
            </span>
          </Link>
          <Link href="/customer/signup" passHref>
            <span className={`text-xl font-medium cursor-pointer ${
              pathname === '/customer/signup' 
                ? 'text-purple-800' 
                : 'text-gray-800 hover:text-purple-600'
            }`}>
              SignUp
            </span>
          </Link>
          <Link href="/customer/mycart" passHref>
            <span className={`text-xl font-medium cursor-pointer ${
              pathname === '/customer/mycart' 
                ? 'text-purple-600' 
                : 'text-gray-800 hover:text-purple-600'
            }`}>
              My Cart
            </span>
          </Link>
          <Link href="/customer/myorders" passHref>
            <span className={`text-xl font-medium cursor-pointer ${
              pathname === '/customer/myorders' 
                ? 'text-purple-600' 
                : 'text-gray-800 hover:text-purple-600'
            }`}>
              My Orders
            </span>
          </Link>
        </div>
        )}

        {/* Mobile Menu Toggle - Only visible on mobile */}
        {isMobile && (
          <div onClick={toggleMenu} className="text-black cursor-pointer p-2 md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </div>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div 
          ref={menuRef}
          className="fixed inset-0 z-50 bg-black bg-opacity-25 md:hidden"
        >
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg">
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-black"
                aria-label="Close menu"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {/* Menu items */}
            <div className="py-2">
              <Link href="/customer/stores" passHref>
                <div 
                  className={`px-6 py-3 text-lg ${
                    pathname === '/customer/stores' 
                      ? 'text-purple-700 font-medium bg-purple-50' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Stores
                </div>
              </Link>
              
              <Link href="/customer/products" passHref>
                <div 
                  className={`px-6 py-3 text-lg ${
                    pathname === '/customer/products' 
                      ? 'text-purple-700 font-medium bg-purple-50' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </div>
              </Link>
              
              <Link href="/customer/signin" passHref>
                <div 
                  className="px-6 py-3 text-lg text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SignIn
                </div>
              </Link>
              
              <Link href="/customer/signup" passHref>
                <div 
                  className="px-6 py-3 text-lg text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SignUp
                </div>
              </Link>
              
              <Link href="/customer/mycart" passHref>
                <div 
                  className="px-6 py-3 text-lg text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Cart
                </div>
              </Link>
              
              <Link href="/customer/myorders" passHref>
                <div 
                  className="px-6 py-3 text-lg text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Orders
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;