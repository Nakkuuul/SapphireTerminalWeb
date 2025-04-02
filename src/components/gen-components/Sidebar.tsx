"use client"

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
      name: 'Tata Consultancy Services Ltd.',
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
        <div className="flex justify-between items-center">
          <div className="relative flex-1 mr-2">
            <input
              type="text"
              placeholder="Search everything..."
              className="w-full py-1.5 pl-8 pr-3 border border-gray-300 rounded-md text-xs"
            />
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button className="flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
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
                num === 3 ? 'bg-[#EEFFF2] border border-[#28A745] text-[#28A745]' : 'bg-[#F4F4F9] border border-[#D1D5DB] text-[#495057]'
              } ${index < 5 ? 'mr-3' : ''}`}
            >
              {num}
            </button>
          ))}
        </div>
        
        {/* Stock list */}
        <div className="mt-4">
          {stocks.map((stock, index) => (
            <div key={index} className="py-2 border-b border-gray-100 flex items-start">
              <div className="min-w-5 h-5 flex items-center justify-center mr-2">
                <span className="text-sm">{stock.icon}</span>
              </div>
              <div className="flex-grow pr-2">
                <div className="text-xs font-medium truncate">{stock.name}</div>
                <div className="text-[10px] text-gray-500 flex">
                  <span>{stock.symbol}</span>
                  <span className="mx-1">•</span>
                  <span>{stock.category}</span>
                </div>
              </div>
              <div className="text-right ml-1 border-l border-gray-100 pl-2">
                <div className="text-xs font-medium">{stock.value}</div>
                <div className={`text-[10px] ${stock.isPositive ? 'text-green-500' : 'text-red-500'}`}>
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