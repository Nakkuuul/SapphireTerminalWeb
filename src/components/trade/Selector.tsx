"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

function Selector() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
    initialized: false,
  });
  const tabsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { name: "Stocks", path: "/trades/stocks" },
    { name: "Futures", path: "/trades/futures" },
    { name: "Options", path: "/trades/options" },
    { name: "Commodity", path: "/trades/commodity" },
  ];

  // Find the active tab
  const activeTab = tabs.find((tab) => tab.path === pathname) || tabs[0];

  // Update indicator position
  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = tabs.findIndex((tab) => tab.path === pathname);
      if (
        activeIndex !== -1 &&
        tabsRef.current[activeIndex] &&
        containerRef.current
      ) {
        const activeTab = tabsRef.current[activeIndex];
        const containerRect = containerRef.current.getBoundingClientRect();
        const tabRect = activeTab.getBoundingClientRect();

        // Calculate position relative to the container
        const left = tabRect.left - containerRect.left;
        const width = tabRect.width;

        setIndicatorStyle({
          width,
          left,
          initialized: true,
        });
      }
    };

    // Use requestAnimationFrame to ensure measurements are accurate
    requestAnimationFrame(updateIndicator);

    // Add event listener for resize
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [pathname]);

  // Toggle dropdown menu for mobile
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full border-b-2 mb-6 border-gray-200 relative">
      {/* Desktop Version - Horizontal Tabs */}
      <div
        ref={containerRef}
        className="hidden md:flex w-full gap-x-24 justify-center relative"
      >
        {tabs.map((tab, index) => (
          <Link
            key={tab.name}
            href={tab.path}
            className="py-2 text-2xl font-medium text-center flex justify-center"
          >
            <span
              ref={(el) => {
                if (el) tabsRef.current[index] = el;
              }}
              className={`relative ${
                pathname === tab.path
                  ? "text-[#1DB954] font-semibold"
                  : "text-gray-600"
              }`}
            >
              {tab.name}
            </span>
          </Link>
        ))}

        {/* Sliding indicator */}
        <span
          className={`absolute h-0.5 bg-[#1DB954] ${
            indicatorStyle.initialized
              ? "transition-all duration-300 ease-in-out"
              : ""
          }`}
          style={{
            width: `${indicatorStyle.width}px`,
            left: `${indicatorStyle.left}px`,
            bottom: 0,
          }}
        />
      </div>

      {/* Mobile Version - Dropdown */}
      <div className="md:hidden w-full px-4 py-2">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="w-full py-2 font-medium text-sm flex items-center justify-between"
          >
            <span
              className={
                pathname.includes(activeTab.path)
                  ? "text-[#1DB954]"
                  : "text-gray-800"
              }
            >
              {activeTab.name}
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
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
                    pathname === tab.path ? "text-[#1DB954]" : "text-gray-600"
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
