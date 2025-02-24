"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingBag, ClipboardList, Store, Menu } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 bg-[#1B4965] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white p-2"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo & Search Bar */}
          <div className="flex items-center flex-1 lg:flex-initial">
            <Image
                onClick={() => router.push('/merchant/dashboard')}
                src="/cocologo.png"
                alt="Coco Commercial Logo"
                width={50}
                height={50}
                className="sm:mr-8"
            />
            <div className="ml-4 sm:ml-8 w-full max-w-xs sm:max-w-md lg:max-w-xl">
              <input
                type="search"
                placeholder="Search..."
                className="w-full pl-4 pr-8 py-2 text-sm rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              className="text-white hover:text-orange-400 transition-colors duration-300 flex flex-col items-center"
              type="button"
              title="Orders"
              onClick={() => router.push("/merchant/orderListing")}
            >
              <ShoppingBag className="h-6 w-6" />
              <span>Orders</span>
            </button>
            <button
              className="text-white hover:text-orange-400 transition-colors duration-300 flex flex-col items-center"
              type="button"
              title="Products"
              onClick={() => router.push("/merchant/productListing")}
            >
              <ClipboardList className="h-6 w-6" />
              <span>Products</span>
            </button>
            <button
              className="text-white hover:text-orange-400 transition-colors duration-300 flex flex-col items-center"
              type="button"
              title="My Store"
              onClick={() => router.push("/merchant/store")}
            >
              <Store className="h-6 w-6" />
              <span>My Store</span>
            </button>

            {/* Profile Section */}
            <div className="flex items-center space-x-3 ml-4">
              <Image
                src="/api/placeholder/32/32"
                alt="Profile"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full border-2 border-white/20"
              />
              <button
                className="text-white font-serif"
                type="button"
                onClick={() => router.push("/merchant/profile")}
              >
                My Profile
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              <button
                className="text-white hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2"
                type="button"
                onClick={() => router.push("/merchant/orderListing")}
              >
                <ShoppingBag className="h-6 w-6" />
                <span>Orders</span>
              </button>
              <button
                className="text-white hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2"
                type="button"
                onClick={() => router.push("/merchant/productListing")}
              >
                <ClipboardList className="h-6 w-6" />
                <span>Products</span>
              </button>
              <button
                className="text-white hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2"
                type="button"
                onClick={() => router.push("/merchant/store")}
              >
                <Store className="h-6 w-6" />
                <span>My Store</span>
              </button>
              <div className="flex items-center space-x-3">
                <Image
                  src="/api/placeholder/32/32"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full border-2 border-white/20"
                />
                <button
                  className="text-white font-serif"
                  type="button"
                  onClick={() => router.push("/merchant/profile")}
                >
                  My Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
