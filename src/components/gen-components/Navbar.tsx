// components/Navbar.tsx
"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-4 z-10">
      <div className="flex items-center space-x-6">
        <div className="flex items-center">
          <span className="font-bold text-md">Nifty 50</span>
          <span className="ml-2 text-green-500 text-xs">Easy Filter</span>
        </div>
        
        <div className="flex items-center">
          <span className="font-bold text-md">Sensex</span>
        </div>
      </div>
      
      <div className="flex items-center text-xs text-gray-600 ml-4">
        <span>21,710.50</span>
        <span className="text-green-500 ml-2">+97.71 (+0.45%)</span>
      </div>
      
      <div className="flex-grow"></div>
      
      <div className="flex items-center space-x-6">
        <Link href="/home" className="hover:text-blue-600">Home</Link>
        <Link href="/trade" className="text-blue-600">Trade</Link>
        <Link href="/watchlist" className="hover:text-blue-600">Watchlist</Link>
        <Link href="/order" className="hover:text-blue-600">Order</Link>
        <Link href="/portfolio" className="hover:text-blue-600">Portfolio</Link>
        <Link href="/funds" className="hover:text-blue-600">Funds</Link>
      </div>
      
      <div className="flex items-center ml-6 space-x-4">
        <button className="text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </button>
        
        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-sm">👤</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;