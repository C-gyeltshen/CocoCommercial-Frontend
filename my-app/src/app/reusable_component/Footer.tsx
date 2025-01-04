import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 text-sm text-gray-700">
      {/* Top Section */}
      <div className="container mx-auto flex flex-wrap justify-between items-center py-6 px-4">
        {/* About Section */}
        <div className="flex-1 text-left mb-6 md:mb-0">
          <img
            src="/cocologo.png"
            alt="Logo"
            className="w-20 mb-4"
          />
          <h3 className="font-bold text-gray-800 mb-2">About us:</h3>
          <ul className="list-none space-y-1 text-gray-600">
            <li>Objectives</li>
            <li>Who We Serve</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="flex-1 text-right">
          <h3 className="font-bold text-gray-800 mb-2">Contact:</h3>
          <p className="mb-2">Email: unknown@mail.com</p>
          <div className="flex justify-end space-x-4 mt-4">
            <FaFacebook className="text-blue-600 hover:text-blue-800 cursor-pointer" />
            <FaTwitter className="text-blue-400 hover:text-blue-600 cursor-pointer" />
            <FaLinkedin className="text-blue-700 hover:text-blue-900 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center border-t border-gray-300 py-4">
        <p className="text-gray-600">© 2024 GakyidMarket. All rights reserved.</p>
        <div className="space-x-2">
          <a
            href="/privacy-policy"
            className="text-blue-500 hover:underline"
          >
            Privacy Policy
          </a>
          |
          <a
            href="/terms-and-conditions"
            className="text-blue-500 hover:underline"
          >
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
