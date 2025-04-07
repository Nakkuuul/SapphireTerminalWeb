"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

function OrderSelector() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tabs = [
    { name: "Queued", path: "/order/queued" },
    { name: "Executed", path: "/order/executed" },
    { name: "GTT", path: "/order/gtt" },
    { name: "Basket", path: "/order/basket" },
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
      <div className="hidden md:flex w-full justify-center items-center pb-6 gap-x-4 lg:gap-x-12">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.path}
            className={`min-w-[100px] lg:min-w-[170px] px-3 lg:px-6 py-[10px] font-medium text-xs lg:text-xl text-center flex items-center justify-center rounded-[4px] border transition-all duration-300 ${
              pathname === tab.path
                ? "bg-[#D1FADF99] text-[#1DB954] border-[1px] border-[#22A06B]"
                : "bg-[#F6F6F6] text-gray-600 border-[#D1D5DB] hover:bg-gray-100"
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </div>

      {/* Mobile Version - Dropdown */}
      <div className="md:hidden w-full px-4">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className={`w-full px-4 py-2 font-semibold text-sm flex items-center justify-between rounded-sm border transition-all duration-300 ${"bg-green-100 text-[#1DB954] border-[1px] border-[#22A06B]"}`}
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
            <div className="absolute mt-1 w-full rounded-md shadow-lg bg-white z-10 border border-gray-200">
              {tabs.map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.path}
                  onClick={() => setIsDropdownOpen(false)}
                  className={`block px-4 py-3 text-sm hover:bg-gray-50 ${
                    pathname === tab.path
                      ? "bg-green-50 text-[#1DB954]"
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
    </>
  );
}

export default OrderSelector;
