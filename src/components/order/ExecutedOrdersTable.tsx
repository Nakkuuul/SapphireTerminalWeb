import { Search } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

const ExecutedOrdersTable = () => {
  // Sample data matching the image
  const orders = [
    {
      time: "12:30:45",
      action: "Intraday",
      exch: "NSE",
      security: "MRF",
      type: "BUY",
      qty: "820",
      avgPrice: "2,042.63",
      ltp: "467.80",
    },
    {
      time: "12:30:45",
      action: "Delivery",
      exch: "BSE",
      security: "TATASTEEL",
      type: "SELL",
      qty: "200",
      avgPrice: "8223.60",
      ltp: "467.80",
    },
    {
      time: "12:30:45",
      action: "Intraday",
      exch: "BSE",
      security: "ITC",
      type: "BUY",
      qty: "105",
      avgPrice: "92,467.00",
      ltp: "467.80",
    },
    {
      time: "12:30:45",
      action: "Intraday",
      exch: "MCX",
      security: "MOTILALOSWL",
      type: "SELL",
      qty: "400",
      avgPrice: "88.50",
      ltp: "467.80",
    },
    {
      time: "12:30:45",
      action: "Intraday",
      exch: "NCDEX",
      security: "WIPRO",
      type: "BUY",
      qty: "210",
      avgPrice: "924.5",
      ltp: "467.80",
    },
  ];

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef(null);

  // Dummy company data for search dropdown
  const companies = [
    { name: "Reliance Industries Ltd.", symbol: "RELIANCE", exchange: "NSE" },
    { name: "Tata Consultancy Services Ltd.", symbol: "TCS", exchange: "NSE" },
    { name: "HDFC Bank Ltd.", symbol: "HDFCBANK", exchange: "NSE" },
    { name: "Infosys Ltd.", symbol: "INFY", exchange: "NSE" },
    { name: "ICICI Bank Ltd.", symbol: "ICICIBANK", exchange: "NSE" },
  ];

  // Filter companies based on search term
  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !(searchRef.current as HTMLElement).contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 0) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  // Handle company selection
  const handleSelectCompany = (company: { name: string; symbol: string }) => {
    setSearchTerm(company.name);
    setIsDropdownOpen(false);
    // Here you would typically filter orders or fetch data based on selected company
    console.log(`Selected company: ${company.name} (${company.symbol})`);
  };

  return (
    <div className="bg-white w-full mx-auto">
      <div className="flex justify-between items-center py-4">
        <h2 className="text-base font-medium text-gray-800">5 Executed Orders</h2>
        <div className="relative" ref={searchRef}>
          <input
            type="text"
            placeholder="Search everything..."
            className="pl-4 pr-11 py-2 border border-[#D1D5DB] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearchChange}
            onClick={() => setIsDropdownOpen(true)}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Search size={16} className="text-gray-500" />
          </button>

          {/* Search Dropdown */}
          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                    onClick={() => handleSelectCompany(company)}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-medium">{company.symbol.substring(0, 2)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{company.name}</p>
                        <p className="text-xs text-gray-500">{company.symbol}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{company.exchange}</span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">No companies found</div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-[#D1D5DB]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#F4F4F9] text-xs font-medium text-gray-600 border-b border-[#D1D5DB]">
              <th className="px-4 py-4 whitespace-nowrap border-r border-[#D1D5DB] group">
                <div className="flex justify-between items-center">
                  <span className="mr-2">Time</span>
                  <Image
                    src="/sort-icon.svg"
                    alt="Sort Icon"
                    width={16}
                    height={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </div>
              </th>
              <th className="px-4 py-4 whitespace-nowrap border-r border-[#D1D5DB] group">
                <div className="flex justify-between items-center">
                  <span className="mr-2">Action</span>
                  <Image
                    src="/sort-icon.svg"
                    alt="Sort Icon"
                    width={16}
                    height={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </div>
              </th>
              <th className="px-4 py-4 whitespace-nowrap border-r border-[#D1D5DB] group">
                <div className="flex justify-between items-center">
                  <span className="mr-2">Excg.</span>
                  <Image
                    src="/sort-icon.svg"
                    alt="Sort Icon"
                    width={16}
                    height={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </div>
              </th>
              <th className="px-4 py-4 whitespace-nowrap border-r border-[#D1D5DB] group">
                <div className="flex justify-between items-center">
                  <span className="mr-2">Security</span>
                  <Image
                    src="/sort-icon.svg"
                    alt="Sort Icon"
                    width={16}
                    height={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </div>
              </th>
              <th className="px-4 py-4 whitespace-nowrap border-r border-[#D1D5DB] group">
                <div className="flex justify-between items-center">
                  <span className="mr-2">Qty.</span>
                  <Image
                    src="/sort-icon.svg"
                    alt="Sort Icon"
                    width={16}
                    height={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </div>
              </th>
              <th className="px-4 py-4 whitespace-nowrap border-r border-[#D1D5DB] group">
                <div className="flex justify-between items-center">
                  <span className="mr-2">Avg. Price</span>
                  <Image
                    src="/sort-icon.svg"
                    alt="Sort Icon"
                    width={16}
                    height={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </div>
              </th>
              <th className="px-4 py-4 whitespace-nowrap group">
                <div className="flex justify-between items-center">
                  <span className="mr-2">LTP</span>
                  <Image
                    src="/sort-icon.svg"
                    alt="Sort Icon"
                    width={16}
                    height={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-t border-[#D1D5DB] hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-xs text-gray-900 border-r border-[#D1D5DB] text-center">
                  {order.time}
                </td>
                <td className="px-4 py-3 text-xs text-gray-900 border-r border-[#D1D5DB] text-center">
                  {order.action}
                </td>
                <td className="px-4 py-3 text-xs text-gray-900 border-r border-[#D1D5DB] text-center">
                  <div className="bg-[#F4F4F9] rounded w-fit px-2 py-1 mx-auto">
                    {order.exch}
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-900 border-r border-[#D1D5DB]">
                  <div className="flex items-center justify-between">
                    <span>{order.security}</span>
                    <div className="flex items-center">
                      <div
                        className={`px-2 py-1 text-xs font-light rounded ${order.type === "BUY" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                      >
                        {order.type}
                      </div>
                      <button className="ml-2 text-gray-400 hover:text-gray-600">
                        <Image
                          src="/three-dots.svg"
                          width={18}
                          height={18}
                          alt="Three Dots"
                        />
                      </button>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-900 border-r border-[#D1D5DB] text-center">
                  {order.qty}
                </td>
                <td className="px-4 py-3 text-xs text-gray-900 border-r border-[#D1D5DB] text-center">
                  {order.avgPrice}
                </td>
                <td className="px-4 py-3 text-xs text-gray-900 text-center">
                  {order.ltp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExecutedOrdersTable;