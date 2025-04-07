"use client"

import { Filter } from 'lucide-react';
import React from 'react';

interface Stock {
  name: string;
  symbol: string;
  category: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon?: string;
}

const Sidebar: React.FC = () => {
  const marketIndices = [
    {
      name: 'Nifty 50',
      value: '21,754.29',
      change: '+37.02 (+0.17%)',
      isPositive: true
    },
    {
      name: 'Sensex',
      value: '71,715.96',
      change: '-27.43 (-0.38%)',
      isPositive: false
    }
  ];

  const stocks: Stock[] = [
    {
      name: 'Reliance Industries Ltd.',
      symbol: 'RELIANCE',
      category: 'NSE',
      value: '2,042.63',
      change: '+0.10 (+0.47%)',
      isPositive: true,
      icon: '🏭'
    },
    {
      name: 'Tata Consultancy Ltd.',
      symbol: 'TCS',
      category: 'NSE',
      value: '2,042.63',
      change: '-12.70 (-0.24%)',
      isPositive: false,
      icon: '💻'
    },
    {
      name: 'HDFC Bank Ltd.',
      symbol: 'HDFCBANK',
      category: 'NSE',
      value: '2,042.63',
      change: '+6.85 (+0.42%)',
      isPositive: true,
      icon: '🏦'
    },
    {
      name: 'Bharti Airtel Ltd.',
      symbol: 'BHARTIARTL',
      category: 'NSE',
      value: '2,042.63',
      change: '+0.10 (+0.47%)',
      isPositive: true,
      icon: '📱'
    },
    {
      name: 'Bharti Airtel Ltd.',
      symbol: 'BHARTIARTL',
      category: 'NSE',
      value: '2,042.63',
      change: '+0.10 (+0.47%)',
      isPositive: true,
      icon: '📱'
    },
    {
      name: 'Bharti Airtel Ltd.',
      symbol: 'BHARTIARTL',
      category: 'NSE',
      value: '2,042.63',
      change: '+0.10 (+0.47%)',
      isPositive: true,
      icon: '📱'
    },
    {
      name: 'Bharti Airtel Ltd.',
      symbol: 'BHARTIARTL',
      category: 'NSE',
      value: '2,042.63',
      change: '+0.10 (+0.47%)',
      isPositive: true,
      icon: '📱'
    }
  ];

  return (
    <div className="hidden md:block fixed top-16 left-0 bottom-0 w-1/4 bg-white border-r border-gray-200 overflow-auto">
      {/* Search and filter */}
      <div className="p-9">
        <div className="flex pb-5 border-b justify-between items-center">
          <div className="relative flex-1 mr-2">
            <input
              type="text"
              placeholder="Search everything..."
              className="w-full py-3 pl-8 pr-3 border border-gray-300 rounded-md text-sm"
            />
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <button className="flex items-center justify-center px-3 py-3 bg-[#F4F4F9]  rounded-md">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.92355 12.236C4.92355 12.4474 5.00749 12.65 5.15691 12.7994C5.30632 12.9488 5.50898 13.0328 5.72028 13.0328C5.93159 13.0328 6.13424 12.9488 6.28366 12.7994C6.43308 12.65 6.51702 12.4474 6.51702 12.236C6.51702 12.0247 6.43308 11.8221 6.28366 11.6727C6.13424 11.5233 5.93159 11.4393 5.72028 11.4393C5.50898 11.4393 5.30632 11.5233 5.15691 11.6727C5.00749 11.8221 4.92355 12.0247 4.92355 12.236ZM4.92355 14.4908C4.45703 14.3262 4.05306 14.0209 3.76732 13.6171C3.48157 13.2133 3.32812 12.7308 3.32813 12.236C3.32813 11.7413 3.48157 11.2588 3.76732 10.855C4.05306 10.4512 4.45703 10.1459 4.92355 9.98129L4.92355 4.26869C4.92355 4.05739 5.00749 3.85473 5.15691 3.70532C5.30632 3.5559 5.50898 3.47196 5.72028 3.47196C5.93159 3.47196 6.13424 3.5559 6.28366 3.70532C6.43308 3.85473 6.51702 4.05739 6.51702 4.26869L6.51702 9.98129C6.98353 10.1459 7.38751 10.4512 7.67325 10.855C7.959 11.2588 8.11244 11.7413 8.11244 12.236C8.11244 12.7308 7.959 13.2133 7.67325 13.6171C7.38751 14.0209 6.98353 14.3262 6.51702 14.4908V15.423C6.51702 15.6343 6.43308 15.837 6.28366 15.9864C6.13424 16.1358 5.93159 16.2197 5.72028 16.2197C5.50898 16.2197 5.30632 16.1358 5.15691 15.9864C5.00749 15.837 4.92355 15.6343 4.92355 15.423V14.4908ZM9.70396 7.45564C9.70396 7.66694 9.7879 7.8696 9.93732 8.01901C10.0867 8.16843 10.2894 8.25237 10.5007 8.25237C10.712 8.25237 10.9147 8.16843 11.0641 8.01901C11.2135 7.8696 11.2974 7.66694 11.2974 7.45564C11.2974 7.24433 11.2135 7.04168 11.0641 6.89226C10.9147 6.74284 10.712 6.6589 10.5007 6.6589C10.2894 6.6589 10.0867 6.74284 9.93732 6.89226C9.7879 7.04168 9.70396 7.24433 9.70396 7.45564ZM9.70396 9.7104C9.23745 9.54579 8.83347 9.24053 8.54773 8.8367C8.26199 8.43286 8.10854 7.95034 8.10854 7.45564C8.10854 6.96093 8.26199 6.47841 8.54773 6.07457C8.83347 5.67074 9.23745 5.36548 9.70396 5.20087V4.26869C9.70396 4.05739 9.7879 3.85473 9.93732 3.70532C10.0867 3.5559 10.2894 3.47196 10.5007 3.47196C10.712 3.47196 10.9147 3.5559 11.0641 3.70532C11.2135 3.85473 11.2974 4.05739 11.2974 4.26869V5.20087C11.7639 5.36548 12.1679 5.67074 12.4537 6.07457C12.7394 6.47841 12.8929 6.96093 12.8929 7.45564C12.8929 7.95034 12.7394 8.43286 12.4537 8.8367C12.1679 9.24053 11.7639 9.54579 11.2974 9.7104V15.423C11.2974 15.6343 11.2135 15.837 11.0641 15.9864C10.9147 16.1358 10.712 16.2197 10.5007 16.2197C10.2894 16.2197 10.0867 16.1358 9.93732 15.9864C9.7879 15.837 9.70396 15.6343 9.70396 15.423V9.7104ZM14.4844 12.236C14.4844 12.4474 14.5683 12.65 14.7177 12.7994C14.8671 12.9488 15.0698 13.0328 15.2811 13.0328C15.4924 13.0328 15.6951 12.9488 15.8445 12.7994C15.9939 12.65 16.0778 12.4474 16.0778 12.236C16.0778 12.0247 15.9939 11.8221 15.8445 11.6727C15.6951 11.5233 15.4924 11.4393 15.2811 11.4393C15.0698 11.4393 14.8671 11.5233 14.7177 11.6727C14.5683 11.8221 14.4844 12.0247 14.4844 12.236ZM14.4844 14.4908C14.0179 14.3262 13.6139 14.0209 13.3281 13.6171C13.0424 13.2133 12.889 12.7308 12.889 12.236C12.889 11.7413 13.0424 11.2588 13.3281 10.855C13.6139 10.4512 14.0179 10.1459 14.4844 9.98129V4.26869C14.4844 4.05739 14.5683 3.85473 14.7177 3.70532C14.8671 3.5559 15.0698 3.47196 15.2811 3.47196C15.4924 3.47196 15.6951 3.5559 15.8445 3.70532C15.9939 3.85473 16.0778 4.05739 16.0778 4.26869V9.98129C16.5444 10.1459 16.9483 10.4512 17.2341 10.855C17.5198 11.2588 17.6733 11.7413 17.6733 12.236C17.6733 12.7308 17.5198 13.2133 17.2341 13.6171C16.9483 14.0209 16.5444 14.3262 16.0778 14.4908V15.423C16.0778 15.6343 15.9939 15.837 15.8445 15.9864C15.6951 16.1358 15.4924 16.2197 15.2811 16.2197C15.0698 16.2197 14.8671 16.1358 14.7177 15.9864C14.5683 15.837 14.4844 15.6343 14.4844 15.423V14.4908Z"
                fill="#495057"
              />
            </svg>

            <span className="ml-1 text-xs">Filter</span>
          </button>
        </div>

        {/* Number buttons */}
        <div className="flex mt-4">
          {[1, 2, 3, 4, 5, 6].map((num, index) => (
            <button
              key={num}
              className={`w-9 h-9 text-sm flex items-center justify-center rounded-md ${
                num === 3
                  ? "bg-[#EEFFF2] border border-[#28A745] text-[#28A745]"
                  : "bg-[#F4F4F9] border border-[#D1D5DB] text-[#495057]"
              } ${index < 5 ? "mr-3" : ""}`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Stock list */}
        <div className="mt-4">
          {stocks.map((stock, index) => (
            <div
              key={index}
              className="py-2 border-b border-gray-100 flex items-start"
            >
              <div className="w-6 h-6 flex items-center justify-center mr-2">
                <span className="text-sm">{stock.icon}</span>
              </div>
              <div className="flex-grow pr-2">
                <div className="text-base font-medium truncate">
                  {stock.name}
                </div>
                <div className="text-xs flex items-center font-medium text-gray-500 ">
                  <span>{stock.symbol}</span>
                  <span className="mx-1">•</span>
                  <span className="bg-[#F4F4F9] rounded-md p-1 text-[#495057]">
                    {stock.category}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[12px] font-medium">{stock.value}</div>
                <div
                  className={`text-[11px] ${
                    stock.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stock.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;