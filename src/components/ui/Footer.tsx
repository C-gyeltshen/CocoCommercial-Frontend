import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1B4965] text-white">
      {/* Top Section */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-8 px-4">
        {/* About Section */}
        <div className="text-left">
          <img
            src="/cocologo.png"
            alt="Logo"
            className="w-20 mb-3"
          />
          <p className="text-gray-300 mb-4">
            Coco Commercial is dedicated to transforming the digital landscape 
            for Bhutanese businesses by providing accessible e-commerce solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-serif text-xl mb-5 text-white">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="font-serif text-xl mb-5 text-white">Contact Us</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <FaPhone className="text-gray-300" />
              <span>+975 17000000</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-gray-300" />
              <span>cococommercial@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-300" />
              <span>Thimphu, Bhutan</span>
            </li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <FaFacebook className="text-white hover:text-gray-300 cursor-pointer text-xl" />
            <FaTwitter className="text-white hover:text-gray-300 cursor-pointer text-xl" />
            <FaLinkedin className="text-white hover:text-gray-300 cursor-pointer text-xl" />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 mb-2 md:mb-0">
              © 2024 Coco Commercial. All rights reserved.
            </p>
            <div className="flex space-x-4 text-gray-300">
              <a
                href="/privacy-policy"
                className="hover:text-white hover:underline"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-and-conditions"
                className="hover:text-white hover:underline"
              >
                Terms & Conditions
              </a>
              <a
                href="/faq"
                className="hover:text-white hover:underline"
              >
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;