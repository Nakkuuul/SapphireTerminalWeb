"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

function HoldingSelector() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tabs = [
    { name: "Equity", path: "/holdings/equity" },
    { name: "Positions", path: "/holdings/positions" },
    { name: "Mutual Funds", path: "/holdings/mutual-funds" },
    // { name: "Cancelled", path: "/holdings/cancelled" },
  ];

  // Find the active tab
  const activeTab = tabs.find(tab => tab.path === pathname) || tabs[0];

  // Toggle dropdown menu for mobile
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full border-b-2 border-gray-200 relative">
      {/* Desktop Version - Horizontal Tabs */}
      <div className="flex w-full gap-x-16 justify-center">
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

      {/* Mobile Version - Dropdown (Hidden in the image) */}
      <div className="hidden">
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
                  className={`block py-3 text-sm hover:bg-gray-50 ${
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

export default HoldingSelector;