"use client"
// components/Sidebar.tsx

import React from 'react';

interface Stock {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon?: string;
}

const Sidebar: React.FC = () => {
  const stocks: Stock[] = [
    {
      name: 'Reliance Industries Ltd.',
      value: '2,042.63',
      change: '+0.00 (+0.00%)',
      isPositive: true,
      icon: '🏭'
    },
    {
      name: 'Tata Consultancy Services Ltd.',
      value: '2,042.63',
      change: '-12.70 (-0.17%)',
      isPositive: false,
      icon: '💻'
    },
    {
      name: 'HDFC Bank Ltd.',
      value: '2,042.63',
      change: '+6.85 (+0.34%)',
      isPositive: true,
      icon: '🏦'
    },
    {
      name: 'Bharti Airtel Ltd.',
      value: '2,042.63',
      change: '-2.16 (-0.11%)',
      isPositive: false,
      icon: '📱'
    },
    {
      name: 'Bharti Airtel Ltd.',
      value: '2,042.63',
      change: '+0.00 (+0.00%)',
      isPositive: true,
      icon: '📱'
    }
  ];

  return (
    <div className="fixed top-16 left-0 bottom-0 w-1/4 bg-white border-r border-gray-200 overflow-auto">
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search everything..."
            className="w-full p-2 pl-8 border border-gray-300 rounded-md text-sm"
          />
          <div className="absolute left-2 top-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="absolute right-2 top-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
        </div>
        
        <div className="flex mt-4 mb-2">
          {[1, 2, 3, 4, 5, 6].map((num, index) => (
            <button 
              key={num}
              className={`w-8 h-8 text-xs flex items-center justify-center rounded-md ${num === 3 ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              style={{ marginRight: index < 5 ? '4px' : 0 }}
            >
              {num}
            </button>
          ))}
        </div>
        
        <div className="mt-4">
          {stocks.map((stock, index) => (
            <div key={index} className="py-2 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center mr-2">
                  <span>{stock.icon}</span>
                </div>
                <div className="flex-grow">
                  <div className="text-sm font-medium">{stock.name}</div>
                  <div className="flex items-center text-xs">
                    <span className="text-gray-600 mr-2">{stock.value}</span>
                    <span className={stock.isPositive ? 'text-green-500' : 'text-red-500'}>
                      {stock.change}
                    </span>
                  </div>
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