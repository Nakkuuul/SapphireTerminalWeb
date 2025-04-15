"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

function Selector() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tabs = [
    { name: "Stocks", path: "/trades/stocks" },
    { name: "Futures", path: "/trades/futures" },
    { name: "Options", path: "/trades/options" },
    { name: "Commodity", path: "/trades/commodity" },
  ];

  // Find the active tab
  const activeTab = tabs.find(tab => tab.path === pathname) || tabs[0];

  // Toggle dropdown menu for mobile
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full border-b-2 mb-6 border-gray-200 relative">
      {/* Desktop Version - Horizontal Tabs */}
      <div className="hidden md:flex w-full gap-x-24 justify-center">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.path}
            className="py-2 text-xl font-medium text-center flex justify-center"
          >
            <span 
              className={`relative ${
                pathname === tab.path
                  ? "text-[#1DB954] font-semibold"
                  : "text-gray-600"
              }`}
            >
              {tab.name}
              {pathname === tab.path && (
                <span className="absolute top-9 left-0 w-full h-0.5 bg-[#1DB954]" 
                      style={{ bottom: '-8px' }}></span>
              )}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile Version - Dropdown */}
      <div className="md:hidden w-full px-4 py-2">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="w-full py-2 font-medium text-sm flex items-center justify-between"
          >
            <span className={pathname.includes(activeTab.path) ? 'text-[#1DB954]' : 'text-gray-800'}>
              {activeTab.name}
            </span>
            <ChevronDown 
              size={16} 
              className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute mt-1 w-full rounded-md shadow-lg bg-white z-10 border border-gray-200">
              {tabs.map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.path}
                  onClick={() => setIsDropdownOpen(false)}
                  className={`block px-4 py-3 text-sm hover:bg-gray-50 ${
                    pathname === tab.path
                      ? "text-[#1DB954]"
                      : "text-gray-600"
                  }`}
                >
                  {tab.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Selector;