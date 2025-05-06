"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

function TradeSelector() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tabs = [
    { name: "Equity", path: "/holdings/equity" },
    // { name: "Positions", path: "/holdings/positions" },
    { name: "Mutual Funds", path: "/holdings/mutualfunds" },
  ];

  // Find the active tab
  const activeTab = tabs.find((tab) => tab.path === pathname) || tabs[0];

  // Toggle dropdown menu for mobile
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {/* Desktop Version - Horizontal Tabs */}
      <div className="hidden mb-10 border-b-2 border-gray-200 md:flex w-full justify-center items-center gap-x-4 lg:gap-x-12">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <div
              key={tab.name}
              className="relative group h-[60px] flex items-center"
            >
              <Link
                href={tab.path}
                className={`relative group text-sm xl:text-base font-medium py-2 transition-all duration-300 ${
                  isActive ? "text-[#28A745]" : "text-gray-600"
                } group-hover:text-[#28A745]`}
              >
                {tab.name}
                {/* Green underline animation */}
                <span
                  className={`absolute -bottom-3 -left-[12px] h-[3px] bg-[#28A745] transition-all duration-300 ${
                    isActive ? "w-[150%]" : "w-0"
                  } group-hover:w-[150%]`}
                ></span>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Mobile Version - Dropdown */}
      <div className="md:hidden w-full px-4">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className={`w-full px-4 py-2 font-medium text-sm flex items-center justify-between rounded-sm border transition-all duration-300 ${
              pathname === activeTab.path
                ? "text-[#28A745] border-[#28A745]"
                : "text-gray-600 border-gray-300"
            }`}
          >
            <span>{activeTab.name}</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute mt-1 w-full rounded-md shadow-lg bg-white border border-gray-200">
              {tabs.map((tab) => {
                const isActive = pathname === tab.path;
                return (
                  <Link
                    key={tab.name}
                    href={tab.path}
                    onClick={() => setIsDropdownOpen(false)}
                    className={`block px-4 py-3 text-sm transition-colors duration-200 ${
                      isActive
                        ? "text-[#28A745] bg-green-50"
                        : "text-gray-600 hover:text-[#28A745] hover:bg-gray-50"
                    }`}
                  >
                    {tab.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TradeSelector;
