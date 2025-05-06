'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
            <line x1="3" y1="12" x2="12" y2="12" />
            <line x1="3" y1="6" x2="9" y2="6" />
            <line x1="3" y1="18" x2="9" y2="18" />
            <polyline points="14 9 17 6 20 9" />
            <polyline points="14 15 17 18 20 15" />
          </svg>
        </div>

        {/* Search Bar - Removed from navbar since it's in the product listing page */}
        <div className="flex-1"></div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex space-x-6">
            <Link href="/customer/stores" passHref>
              <span className={`font-medium cursor-pointer ${
                pathname === '/customer/stores' 
                  ? 'text-purple-600' 
                  : 'text-gray-800 hover:text-purple-600'
              }`}>
                Stores
              </span>
            </Link>
            <Link href="/customer/products" passHref>
              <span className={`font-medium cursor-pointer ${
                pathname === '/customer/products' 
                  ? 'text-purple-600' 
                  : 'text-gray-800 hover:text-purple-600'
              }`}>
                Products
              </span>
            </Link>
            <span className="text-gray-400 font-medium cursor-not-allowed">SignIn</span>
            <span className="text-gray-400 font-medium cursor-not-allowed">SignUp</span>
            <span className="text-gray-400 font-medium cursor-not-allowed">My Cart</span>
            <span className="text-gray-400 font-medium cursor-not-allowed">My Orders</span>
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

      {/* Mobile Dropdown Menu - Only renders on mobile when menu is open */}
      {isMobile && isMenuOpen && (
        <div 
          ref={menuRef}
          className="absolute right-0 left-0 z-10 mt-0 bg-gray-300 max-w-xs mx-auto border border-gray-400 md:hidden"
        >
          <div>
            {/* Stores - Clickable */}
            <Link href="/customer/stores" passHref>
              <div 
                className={`py-3 text-center ${pathname === '/customer/stores' 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'}`}
              >
                Stores
              </div>
            </Link>

            {/* Products - Clickable */}
            <Link href="/customer/products" passHref>
              <div 
                className={`py-3 text-center ${pathname === '/customer/products' 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'}`}
              >
                Products
              </div>
            </Link>

            {/* SignIn - Not Clickable for Unauthorized Users */}
            <div 
              className="py-3 text-center bg-gray-400 text-gray-100 cursor-not-allowed"
            >
              SignIn
            </div>

            {/* SignUp - Not Clickable for Unauthorized Users */}
            <div 
              className="py-3 text-center bg-gray-400 text-gray-100 cursor-not-allowed"
            >
              SignUp
            </div>

            {/* My Cart - Not Clickable for Unauthorized Users */}
            <div 
              className="py-3 text-center bg-gray-400 text-gray-100 cursor-not-allowed"
            >
              My Cart
            </div>

            {/* My Orders - Not Clickable for Unauthorized Users */}
            <div 
              className="py-3 text-center bg-gray-400 text-gray-100 cursor-not-allowed"
            >
              My Orders
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;