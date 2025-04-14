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
  const [windowWidth, setWindowWidth] = useState(0);

  // Social media icons - filtered to only Twitter, LinkedIn, and Instagram
  const FILTERED_SOCIAL_ICONS = [
    { Icon: FaTwitter, href: "https://twitter.com/BrokingSapphire" },
    { Icon: FaLinkedin, href: "https://linkedin.com/company/BrokingSapphire" },
    { Icon: FaInstagram, href: "https://instagram.com/BrokingSapphire" },
  ];

  // Main navigation links without sub-routes for Trade section
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/trades/stocks", label: "Trades" },
    { href: "/news", label: "News" },
    { href: "/watchlist", label: "Watchlist" },
    { href: "/order/queued", label: "Orders" },
    { href: "/holdings/equity", label: "Holdings" },
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

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Auto close mobile menu on larger screens
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    // Set initial width
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Function to check if a route is active, including child routes
  const isRouteActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "/trades/stocks") {
      return pathname.startsWith("/trades/");
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <nav className="fixed font-poppins w-full top-0 z-50 bg-white border-b border-gray-200">
        <div className="w-full mx-auto flex items-center justify-between h-[60px]">
          {/* Main single-row layout */}
          <div className="w-full flex items-center justify-between">
            {/* Left Section with Logo, Greeting, and Profile */}
            <div className="h-full flex items-center pl-4">
              {/* Logo and Greeting Section */}
              <div className="flex items-center space-x-6">
                {/* Notifications Bell Icon */}
                <button className="text-gray-700">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.9997 30.6663C15.2925 30.6663 14.6142 30.3854 14.1141 29.8853C13.614 29.3852 13.333 28.7069 13.333 27.9997H18.6664C18.6664 28.7069 18.3854 29.3852 17.8853 29.8853C17.3852 30.3854 16.707 30.6663 15.9997 30.6663ZM26.6664 7.99967C26.6664 7.47226 26.51 6.95668 26.217 6.51815C25.924 6.07962 25.5075 5.73783 25.0202 5.536C24.5329 5.33416 23.9968 5.28135 23.4795 5.38425C22.9622 5.48714 22.487 5.74112 22.1141 6.11406C21.7412 6.487 21.4872 6.96215 21.3843 7.47943C21.2814 7.99672 21.3342 8.53289 21.536 9.02016C21.7379 9.50743 22.0797 9.92391 22.5182 10.2169C22.9567 10.5099 23.4723 10.6663 23.9997 10.6663C24.707 10.6663 25.3852 10.3854 25.8853 9.88529C26.3854 9.38519 26.6664 8.70692 26.6664 7.99967ZM27.609 23.057L25.333 20.781V13.333H22.6664V21.333C22.6665 21.6866 22.807 22.0257 23.057 22.2757L23.4477 22.6663H8.55172L8.94238 22.2757C9.19245 22.0257 9.33297 21.6866 9.33305 21.333V13.333C9.32912 12.3535 9.54195 11.3852 9.9563 10.4976C10.3706 9.61003 10.9762 8.82511 11.7297 8.19913C12.4831 7.57315 13.3657 7.12161 14.3141 6.8769C15.2626 6.63218 16.2535 6.60035 17.2157 6.78367L19.333 4.66634C19.2634 4.61401 19.1883 4.56931 19.109 4.53301C18.5322 4.33487 17.9374 4.19375 17.333 4.11167V2.66634C17.333 2.31272 17.1926 1.97358 16.9425 1.72353C16.6925 1.47348 16.3533 1.33301 15.9997 1.33301C15.6461 1.33301 15.307 1.47358 15.0569 1.72353C14.8069 1.97358 14.6664 2.31272 14.6664 2.66634V4.10634C12.4469 4.42669 10.417 5.53543 8.94796 7.22971C7.47893 8.92399 6.66901 11.0905 6.66638 13.333V20.781L4.39038 23.057C4.20397 23.2435 4.07703 23.481 4.0256 23.7396C3.97418 23.9982 4.00059 24.2663 4.10148 24.5099C4.20237 24.7535 4.37322 24.9617 4.59244 25.1082C4.81165 25.2547 5.06938 25.3329 5.33305 25.333H26.6664C26.93 25.3329 27.1878 25.2547 27.407 25.1082C27.6262 24.9617 27.7971 24.7535 27.898 24.5099C27.9988 24.2663 28.0252 23.9982 27.9738 23.7396C27.9224 23.481 27.7955 23.2435 27.609 23.057Z"
                      fill="#212529"
                    />
                  </svg>
                </button>

                {/* User Profile Avatar with Dropdown Arrow */}
                <div className="flex items-center">
                  <div
                    className="h-7 w-7 cursor-pointer rounded-full overflow-hidden border border-gray-300"
                    onClick={() => router.push("/profile")}
                  >
                    <Image
                      src="/globe.svg"
                      alt="Profile"
                      width={28}
                      height={28}
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/28";
                      }}
                    />
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 ml-1 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {/* Desktop Elements */}
                <div className="hidden md:flex items-center space-x-4">
                  {/* Greeting Message */}
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Good morning,</span>
                    <span className="text-sm font-medium text-gray-800">John Doe</span>
                  </div>


                </div>
              </div>
            </div>

            {/* Central Navigation Links - Hidden on small/medium screens */}
            <div className="hidden lg:flex flex-1 justify-center items-center">
              <div className="flex items-center space-x-4 xl:space-x-8">
                {navLinks.map((link) => {
                  const isActive = isRouteActive(link.href);

                  return (
                    <div key={link.href} className="relative group h-[60px] flex items-center">
                      <Link
                        href={link.href}
                        className={`relative group text-sm xl:text-base font-medium py-2 transition-all duration-300 ${isActive ? "text-[#28A745]" : "text-gray-600 hover:text-[#28A745]"
                          }`}
                        onClick={() => setActiveLink(link.href)}
                      >
                        {link.label}

                        {/* Green underline animation (for both hover & active states) */}
                        <span
                          className={`absolute -bottom-3 -left-[12px] h-[3px] bg-[#28A745] transition-all duration-300 ${isActive ? "w-[150%]" : "w-0"
                            } group-hover:w-[150%]`}
                        ></span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Section with Mobile Menu Toggle */}
            <div className="flex items-center pr-4">
              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden flex flex-col space-y-1 cursor-pointer z-50"
                onClick={toggleSidebar}
                aria-label="Toggle mobile menu"
              >
                <span
                  className={`block h-0.5 w-5 bg-black transition-transform duration-300 ease-in-out ${isSidebarOpen ? "rotate-45 translate-y-1.5" : ""
                    }`}
                ></span>
                <span
                  className={`block h-0.5 w-5 bg-black transition-opacity duration-300 ease-in-out ${isSidebarOpen ? "opacity-0" : "opacity-100"
                    }`}
                ></span>
                <span
                  className={`block h-0.5 w-5 bg-black transition-transform duration-300 ease-in-out ${isSidebarOpen ? "-rotate-45 -translate-y-1.5" : ""
                    }`}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Background Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={toggleSidebar}
      ></div>

      {/* Mobile Sidebar - adjusted for better small screen experience */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-gradient-to-br from-white to-gray-50 z-50 shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full pt-16 pb-6 px-6">
          <div className="absolute backdrop-blur-md shadow-sm pb-3 top-4 right-6 flex items-center justify-between w-full">
            <div className="ml-10 items-center flex">
              <Image
                src="/globe.svg"
                alt="Sapphire Logo"
                width={80}
                height={80}
                className="w-8 h-8"
              />
              <p className="font-semibold text-xl text-black">Sapphire</p>
            </div>
            <button
              onClick={toggleSidebar}
              className="rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-700"
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

          {/* Navigation Links - simplified without Sub-Routes */}
          <div className="flex flex-col space-y-3 mt-6">
            {navLinks.map((link) => {
              const isActive = isRouteActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium py-2 border-l-4 pl-4 transition-colors duration-200 ${isActive
                    ? "border-[#28A745] text-[#28A745]"
                    : "border-transparent hover:border-gray-300 hover:text-gray-700"
                    }`}
                  onClick={() => {
                    setActiveLink(link.href);
                    setSidebarOpen(false);
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Profile Section */}
          <div className="mt-auto border-t border-gray-200 pt-6 flex items-center">
            <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-300">
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
            <div className="ml-3">
              <p className="font-medium text-sm">John Doe</p>
              <p className="text-xs text-gray-500">ID: SA12345</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {FILTERED_SOCIAL_ICONS.map(({ Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#28A745] transition-colors duration-300"
                aria-label={`Visit our ${Icon.name.replace("Fa", "")}`}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
