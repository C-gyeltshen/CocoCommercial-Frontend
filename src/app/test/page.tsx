import React from 'react';
import Sidebar from '../components/navbar';

export default function Test() {
  return (
    <div className="w-screen h-screen bg-green-200 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow">
        <h1>ksjdnk</h1>
      </div>
    </div>
  );
}
