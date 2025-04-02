"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
      <nav className="fixed font-poppins w-full top-0 z-50 bg-white border-b-[3px] border-gray-200">
        <div className="w-full mx-auto flex items-center justify-between h-[70px]">
          {/* Main single-row layout */}
          <div className="w-full flex items-center justify-between">
            {/* Left section with stock information - exactly 25% width */}
            <div className="w-1/4 h-full border-r border-gray-200">
              {/* Stock Information - Improved layout with 36px padding */}
              <div className="px-9 h-full flex items-center">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="text-xs font-medium">Nifty 50</span>
                      <span className="ml-2 text-[10px] text-rose-500">Sunny Day</span>
                    </div>
                    <div className="flex items-center mt-0.5">
                      <span className="text-xs font-medium">21,754.29</span>
                      <span className="ml-1 text-[10px] text-green-500">+37.02 (+0.17%)</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-xs font-medium">Sensex</span>
                    <div className="flex items-center mt-0.5">
                      <span className="text-xs font-medium">71,715.96</span>
                      <span className="ml-1 text-[10px] text-red-500">-27.43 (-0.38%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links - Centered in the same row with Green Underline Animation */}
            <div className="hidden lg:flex flex-1 justify-center items-center">
              <div className="flex items-center space-x-8">
                {navLinks.map((link) => {
                  // Check if this is the active route or its child route
                  const isActive = isRouteActive(link.href);
                  
                  return (
                    <div key={link.href} className="relative group">
                      <Link
                        href={link.href}
                        className="relative group text-lg font-medium py-2 transition-all duration-300"
                        onClick={() => setActiveLink(link.href)}
                      >
                        {link.label}
                        
                        {/* Green underline animation (for both hover & active states) */}
                        <span
                          className={`absolute -bottom-5 left-0 h-[3px] bg-[#1DB954] transition-all duration-300 ${
                            isActive ? "w-[100%]" : "w-0"
                          } group-hover:w-full`}
                        ></span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop Right Side Elements */}
            <div className="hidden md:flex pr-9 items-center space-x-4">
              {/* Notifications Bell Icon */}
              <button className="text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </button>

              {/* User Profile Avatar with Dropdown Arrow */}
              <div className="flex items-center">
                <div 
                  className="h-8 w-8 cursor-pointer rounded-full overflow-hidden border border-gray-300"
                  onClick={() => router.push('/profile')}
                >
                  <Image 
                    src="/globe.svg" 
                    alt="Profile" 
                    width={32} 
                    height={32} 
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/32";
                    }}
                  />
                </div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-1 text-gray-500" 
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
              className="lg:hidden flex flex-col space-y-1.5 cursor-pointer z-50"
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
        <div className="flex flex-col h-full pt-20 pb-6 px-6">
          <div className="absolute backdrop-blur-md shadow-sm pb-3 top-5 right-6 flex items-center justify-between w-full">
            <div className="ml-10 items-center flex">
              <Image
                src="/globe.svg"
                alt="Sapphire Logo"
                width={100}
                height={100}
                className="w-10 h-10"
              />
              <p className="font-semibold text-2xl text-black">Sapphire</p>
            </div>
            <button
              onClick={toggleSidebar}
              className="rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Stock Information for mobile */}
          <div className="mt-4 border-b border-gray-200 pb-4">
            <div className="flex justify-between">
              {/* Nifty 50 */}
              <div className="flex flex-col">
                <span className="font-bold text-sm">Nifty 50</span>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-white bg-red-500 px-1 py-0.5 rounded-sm">Expiry Today</span>
                  <span className="ml-1 text-green-500 text-xs">+87.10 (0.10%)</span>
                </div>
              </div>

              {/* Sensex */}
              <div className="flex flex-col">
                <span className="font-bold text-sm">Sensex</span>
                <span className="text-red-500 text-xs mt-1">-87.10 (-0.10%)</span>
              </div>
            </div>
          </div>

          {/* Navigation Links - simplified without Sub-Routes */}
          <div className="flex flex-col space-y-6 mt-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-medium py-2 border-l-4 pl-4 transition-colors duration-200 ${
                  isRouteActive(link.href)
                    ? "border-[#064D51] text-[#064D51]"
                    : "border-transparent hover:border-gray-300 hover:text-gray-700"
                }`}
                onClick={() => {
                  setActiveLink(link.href);
                  setSidebarOpen(false);
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Profile Section */}
          <div className="mt-auto border-t border-gray-200 pt-6 flex items-center">
            <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-300">
              <Image 
                src="/globe.svg" 
                alt="Profile" 
                width={40} 
                height={40} 
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/40";
                }}
              />
            </div>
            <div className="ml-3">
              <p className="font-medium text-sm">John Doe</p>
              <p className="text-xs text-gray-500">ID: SA12345</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {FILTERED_SOCIAL_ICONS.map(({ Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#064D51] transition-colors duration-300"
                aria-label={`Visit our ${Icon.name.replace("Fa", "")}`}
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;