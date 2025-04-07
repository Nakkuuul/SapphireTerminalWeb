'use client';

import DownloadButton from '@/components/gen-components/DownloadButton';
import SearchButton from '@/components/gen-components/SearchButton';
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
    <div className="w-full py-8 px-2">
      {/* Header Summary */}
      <div className="flex w-full mb-4">
        <div className="w-1/2 border-r border-[#D1D5DB] text-center bg-[#F4F4F9] p-4">
          <div className="text-base font-medium">Daily P&L</div>
          <div className="text-xl font-medium text-red-500">
            {formatCurrency(summaryData.dailyPL.value)} {formatPercentage(summaryData.dailyPL.percentage)}
          </div>
        </div>
        <div className="w-1/2 text-center bg-[#F4F4F9] p-4">
          <div className="text-base font-medium">Net P&L</div>
          <div className="text-xl font-medium text-green-500">
            {formatCurrency(summaryData.netPL.value)} {formatPercentage(summaryData.netPL.percentage)}
          </div>
        </div>
      </div>

      {/* Positions Section Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-medium">Positions (5)</h2>
        <div className="flex items-center gap-2">
          <DownloadButton />
          <SearchButton />
        </div>
      </div>

      {/* Positions Table */}
      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-base font-medium">Action</th>
              <th className="px-4 py-3 text-left text-base  font-medium">Security</th>
              <th className="px-4 py-3 text-center text-base font-medium"></th>
              <th className="px-4 py-3 text-right text-base font-medium">Qty.</th>
              <th className="px-4 py-3 text-right text-base  font-medium">Avg. Price</th>
              <th className="px-4 py-3 text-right text-base font-medium">LTP</th>
              <th className="px-4 py-3 text-right text-base font-medium">Net P&L</th>
              <th className="px-4 py-3 text-right text-base font-medium">Daily P&L</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {positions.map((position, index) => (
              <tr key={index}>
                <td className="px-4 py-3 whitespace-nowrap text-[#6B7280] text-sm">{position.type}</td>
                <td className="px-4 py-3 whitespace-nowrap text-[#6B7280] text-sm">{position.security}</td>
                <td className="px-1 py-3 whitespace-nowrap">
                  <div className={`text-xs px-2 py-1 rounded-sm ${position.action === 'BUY' 
                    ? 'bg-green-100 text-green-500' 
                    : 'bg-red-100 text-red-500'}`}>
                    {position.action}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-[#6B7280] text-right text-sm">{position.quantity}</td>
                <td className="px-4 py-3 whitespace-nowrap text-[#6B7280] text-right text-sm">{formatCurrency(position.avgPrice)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-[#6B7280] text-right text-sm">{formatCurrency(position.ltp)}</td>
                <td className={`px-4 py-3 whitespace-nowrap text-right text-sm ${position.netPL.value < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {formatCurrency(position.netPL.value)} {formatPercentage(position.netPL.percentage)}
                </td>
                <td className={`px-4 py-3 whitespace-nowrap text-right text-sm ${position.dailyPL.value < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {formatCurrency(position.dailyPL.value)} {formatPercentage(position.dailyPL.percentage)}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-medium">
              <td colSpan={6} className="px-4 py-3 whitespace-nowrap text-sm">Total</td>
              <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-green-500">
                {formatCurrency(totalNetPL.value)} {formatPercentage(totalNetPL.percentage)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-green-500">
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