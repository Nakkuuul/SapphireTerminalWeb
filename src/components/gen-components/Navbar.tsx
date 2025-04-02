"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BellDot, CircleUserRound } from 'lucide-react';
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Social media icons - filtered to only Twitter, LinkedIn, and Instagram
  const FILTERED_SOCIAL_ICONS = [
    { Icon: FaTwitter, href: "https://twitter.com/BrokingSapphire" },
    { Icon: FaLinkedin, href: "https://linkedin.com/company/BrokingSapphire" },
    { Icon: FaInstagram, href: "https://instagram.com/BrokingSapphire" },
  ];

  // Main navigation links without sub-routes for Trade section
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/trade", label: "Trade" },
    { href: "/news", label: "News" },
    { href: "/watchlist", label: "Watchlist" },
    { href: "/orders", label: "Orders" },
    { href: "/holdings", label: "Holdings" },
    { href: "/funds", label: "Funds" },
  ];

  useEffect(() => {
    // Set the active link based on the pathname
    // This will also handle setting active state for parent routes
    setActiveLink(pathname);
  }, [pathname]);

  // Close sidebar when pathname changes (user navigates)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Lock/unlock body scroll when sidebar is open/closed
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Function to check if a route is active, including child routes
  const isRouteActive = (href: String) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <nav className="fixed font-poppins w-full top-0 z-50 bg-white border-b border-gray-200">
        <div className="w-full mx-auto flex items-center justify-between h-16">
          {/* Main single-row layout */}
          <div className="w-full flex items-center justify-between">
            {/* Left section with Nifty and Sensex - exactly 25% width */}
            <div className="w-1/4 h-full flex items-center border-r border-gray-200">
              <div className="flex items-center justify-between w-full px-9">
                {/* Nifty 50 */}
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="text-xs font-medium">Nifty 50</span>
                    <span className="ml-2 text-[10px] text-rose-500">Sunny Day</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs font-medium">21,754.29</span>
                    <span className="ml-1 text-[10px] text-green-500">+37.02 (+0.17%)</span>
                  </div>
                </div>
                
                {/* Sensex */}
                <div className="flex flex-col">
                  <span className="text-xs font-medium">Sensex</span>
                  <div className="flex items-center">
                    <span className="text-xs font-medium">71,715.96</span>
                    <span className="ml-1 text-[10px] text-red-500">-27.43 (-0.38%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links - Centered */}
            <div className="hidden lg:flex flex-1 justify-center items-center">
              <div className="flex items-center space-x-8">
                {navLinks.map((link) => {
                  // Check if this is the active route or its child route
                  const isActive = isRouteActive(link.href);
                  
                  return (
                    <div key={link.href} className="relative group">
                      <Link
                        href={link.href}
                        className={`relative group text-sm font-medium py-5 transition-all duration-300 ${
                          isActive ? "text-green-500" : "text-gray-700"
                        }`}
                        onClick={() => setActiveLink(link.href)}
                      >
                        {link.label}
                        
                        {/* Green underline for active state */}
                        {isActive && (
                          <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500"></span>
                        )}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side Elements */}
            <div className="hidden md:flex items-center space-x-4 pr-4">
              {/* Notifications Bell Icon */}
              <BellDot className="h-5 w-5" />
              
              {/* User Profile Avatar with Dropdown Arrow */}
              <div className="flex cursor-pointer items-center"
               onClick={() => router.push('/profile')}>
                <div className="h-8 w-8 rounded-full overflow-hidden">
                  <CircleUserRound className="h-full w-full" />
                </div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden flex flex-col space-y-1.5 cursor-pointer z-50 mr-4"
              onClick={toggleSidebar}
              aria-label="Toggle mobile menu"
            >
              <span
                className={`block h-0.5 w-6 bg-black transition-transform duration-300 ease-in-out ${
                  isSidebarOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-black transition-opacity duration-300 ease-in-out ${
                  isSidebarOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-black transition-transform duration-300 ease-in-out ${
                  isSidebarOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Background Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full bg-gradient-to-br from-white to-gray-50 z-50 shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile sidebar content remains the same */}
        <div className="flex flex-col h-full pt-20 pb-6 px-6">
          {/* Rest of the mobile sidebar code... */}
        </div>
      </aside>
    </>
  );
};

export default Navbar;