// src/app/layout.tsx
import './globals.css'; 
import React from 'react';

export const metadata = {
  title: 'Gakyid Market',
  description: 'Shop & Sell with Gakyid Market',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-[#eaf3e3] font-sans antialiased text-gray-700">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;