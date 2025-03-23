'use client';

import React from 'react';

// TypeScript interfaces
interface PLValue {
  value: number;
  percentage: number;
}

interface Position {
  type: string;
  security: string;
  action: 'BUY' | 'SELL';
  quantity: number;
  avgPrice: number;
  ltp: number;
  netPL: PLValue;
  dailyPL: PLValue;
}

interface SummaryData {
  dailyPL: PLValue;
  netPL: PLValue;
}

const Positions: React.FC = () => {
  // Summary data
  const summaryData: SummaryData = {
    dailyPL: {
      value: -24780.90,
      percentage: -3.67,
    },
    netPL: {
      value: 44780.90,
      percentage: 8.79,
    },
  };

  // Positions data
  const positions: Position[] = [
    {
      type: 'Intraday',
      security: 'MRF',
      action: 'BUY',
      quantity: 820,
      avgPrice: 2042.64,
      ltp: 46780,
      netPL: { value: 2042.63, percentage: 24.7 },
      dailyPL: { value: 2042.63, percentage: 24.7 }
    },
    {
      type: 'Delivery',
      security: 'TATASTEEL',
      action: 'SELL',
      quantity: 400,
      avgPrice: 822.10,
      ltp: 46780,
      netPL: { value: 2042.63, percentage: 24.7 },
      dailyPL: { value: 2042.63, percentage: 24.7 }
    },
    {
      type: 'Delivery',
      security: 'ITC',
      action: 'BUY',
      quantity: 100,
      avgPrice: 92281.63,
      ltp: 46780,
      netPL: { value: 2042.63, percentage: 24.7 },
      dailyPL: { value: 2042.63, percentage: 24.7 }
    },
    {
      type: 'Intraday',
      security: 'MOTILALOSWAL',
      action: 'SELL',
      quantity: -5000,
      avgPrice: 87.42,
      ltp: 46780,
      netPL: { value: -2042.63, percentage: 24.7 },
      dailyPL: { value: -2042.63, percentage: 24.7 }
    },
    {
      type: 'Intraday',
      security: 'MOTILALOSWAL',
      action: 'BUY',
      quantity: 2910,
      avgPrice: 87.42,
      ltp: 46780,
      netPL: { value: 2042.63, percentage: 24.7 },
      dailyPL: { value: 2042.63, percentage: 24.7 }
    },
    {
      type: 'Intraday',
      security: 'MOTILALOSWAL',
      action: 'SELL',
      quantity: 5750,
      avgPrice: 87.42,
      ltp: 46780,
      netPL: { value: 2042.63, percentage: 24.7 },
      dailyPL: { value: 2042.63, percentage: 24.7 }
    },
    {
      type: 'Intraday',
      security: 'MOTILALOSWAL',
      action: 'SELL',
      quantity: 2350,
      avgPrice: 87.42,
      ltp: 46780,
      netPL: { value: 2042.63, percentage: 24.7 },
      dailyPL: { value: 2042.63, percentage: 24.7 }
    }
  ];

  // Total values calculation
  const totalNetPL: PLValue = {
    value: 5673.79,
    percentage: 24.7
  };

  const totalDailyPL: PLValue = {
    value: 5673.79,
    percentage: 24.7
  };

  // Format currency
  const formatCurrency = (value: number): string => {
    return value.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
  };

  // Format percentage
  const formatPercentage = (value: number): string => {
    return `(${value.toFixed(1)}%)`;
  };

  return (
    <div className="w-full py-8 ">
      {/* Header Summary */}
      <div className="flex w-full mb-4">
        <div className="w-1/2 bg-gray-50 p-4">
          <div className="font-medium" style={{ fontSize: '16px' }}>Daily P&L</div>
          <div className="font-bold text-[#F10930]" style={{ fontSize: '20px' }}>
            {formatCurrency(summaryData.dailyPL.value)} {formatPercentage(summaryData.dailyPL.percentage)}
          </div>
        </div>
        <div className="w-1/2 bg-gray-50 p-4">
          <div className="font-medium" style={{ fontSize: '16px' }}>Net P&L</div>
          <div className="font-bold text-[#34A853]" style={{ fontSize: '20px' }}>
            {formatCurrency(summaryData.netPL.value)} {formatPercentage(summaryData.netPL.percentage)}
          </div>
        </div>
      </div>

      {/* Positions Section Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium" style={{ fontSize: '16px' }}>Positions (5)</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center px-3 py-1 border rounded-md text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
          <div className="relative">
            <input type="text" placeholder="Search everything..." className="border rounded-md px-3 py-1 text-sm pr-8 w-48" />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Positions Table */}
      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase" style={{ fontSize: '14px' }}>Action</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase" style={{ fontSize: '14px' }}>Security</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase"></th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase" style={{ fontSize: '14px' }}>Qty.</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase" style={{ fontSize: '14px' }}>Avg. Price</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase" style={{ fontSize: '14px' }}>LTP</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase" style={{ fontSize: '14px' }}>Net P&L</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase" style={{ fontSize: '14px' }}>Daily P&L</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {positions.map((position, index) => (
              <tr key={index}>
                <td className="px-4 py-3 whitespace-nowrap" style={{ fontSize: '14px' }}>{position.type}</td>
                <td className="px-4 py-3 whitespace-nowrap" style={{ fontSize: '14px' }}>{position.security}</td>
                <td className="px-1 py-3 whitespace-nowrap">
                  <div className={`text-xs px-2 py-1 rounded-sm ${position.action === 'BUY' 
                    ? 'bg-[#D5FFC6] text-[#34A853]' 
                    : 'bg-[#FFE4DD] text-[#F10930]'}`}>
                    {position.action}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right" style={{ fontSize: '14px' }}>{position.quantity}</td>
                <td className="px-4 py-3 whitespace-nowrap text-right" style={{ fontSize: '14px' }}>{formatCurrency(position.avgPrice)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-right" style={{ fontSize: '14px' }}>{formatCurrency(position.ltp)}</td>
                <td className={`px-4 py-3 whitespace-nowrap text-right ${position.netPL.value < 0 ? 'text-[#F10930]' : 'text-[#34A853]'}`} style={{ fontSize: '14px' }}>
                  {formatCurrency(position.netPL.value)} {formatPercentage(position.netPL.percentage)}
                </td>
                <td className={`px-4 py-3 whitespace-nowrap text-right ${position.dailyPL.value < 0 ? 'text-[#F10930]' : 'text-[#34A853]'}`} style={{ fontSize: '14px' }}>
                  {formatCurrency(position.dailyPL.value)} {formatPercentage(position.dailyPL.percentage)}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-medium">
              <td colSpan={6} className="px-4 py-3 whitespace-nowrap" style={{ fontSize: '14px' }}>Total</td>
              <td className="px-4 py-3 whitespace-nowrap text-right text-[#34A853]" style={{ fontSize: '14px' }}>
                {formatCurrency(totalNetPL.value)} {formatPercentage(totalNetPL.percentage)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-right text-[#34A853]" style={{ fontSize: '14px' }}>
                {formatCurrency(totalDailyPL.value)} {formatPercentage(totalDailyPL.percentage)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Positions;