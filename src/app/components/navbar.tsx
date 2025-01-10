'use client';

import React, { useState } from 'react';
// import { MenuIcon, XIcon } from '@heroicons/react/outline'; // Make sure to install heroicons package

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle the visibility of the sidebar
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`fixed w-64 h-full ${isOpen ? 'right-0' : '-right-full'} bg-gray-600 shadow-lg flex flex-col items-center pt-5 transition-all duration-300 ease-in-out lg:right-0`}>
            {/* <button className="absolute top-5 right-5 lg:hidden" onClick={toggleSidebar}>
                {isOpen ? <XIcon className="h-6 w-6 text-white" /> : <MenuIcon className="h-6 w-6 text-white" />}
            </button> */}
            <div className="text-center mb-8">
                <img src="/profile-pic.png" alt="Luigi Mangione" className="rounded-full w-20 h-20" />
                <h3 className="text-white">Luigi Mangione</h3>
            </div>
            <nav className={`w-full ${isOpen ? 'block' : 'hidden'} lg:block`}>
                <ul className="list-none p-0">
                    <li className="w-full mb-2.5">
                        <a href="/home" className="block w-full px-4 py-2 text-center text-gray-800 rounded transition-colors duration-300 hover:bg-gray-300 hover:border-purple-600">
                            Home
                        </a>
                    </li>
                    <li className="w-full mb-2.5">
                        <a href="/products" className="block w-full px-4 py-2 text-center text-gray-800 rounded transition-colors duration-300 hover:bg-gray-300 hover:border-purple-600">
                            Products
                        </a>
                    </li>
                    <li className="w-full mb-2.5">
                        <a href="/orders" className="block w-full px-4 py-2 text-center text-gray-800 rounded transition-colors duration-300 hover:bg-gray-300 hover:border-purple-600">
                            Orders
                        </a>
                    </li>
                    <li className="w-full mb-2.5">
                        <a href="/store" className="block w-full px-4 py-2 text-center text-gray-800 rounded transition-colors duration-300 hover:bg-gray-300 hover:border-purple-600">
                            My Store
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
