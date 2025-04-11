'use client';

import DownloadButton from '@/components/gen-components/DownloadButton';
import SearchButton from '@/components/gen-components/SearchButton';
import { ArrowUpDown } from 'lucide-react';
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
    <div className="w-full">
      {/* Header Summary */}
      <div className="flex w-full mb-4">
        <div className="w-1/2 border-r border-[#D1D5DB] text-center bg-[#F4F4F9] p-4">
          <div className="text-base text-[#6B7280] font-medium">Daily P&L</div>
          <div className="text-xl font-medium text-loss">
            {formatCurrency(summaryData.dailyPL.value)} {formatPercentage(summaryData.dailyPL.percentage)}
          </div>
        </div>
        <div className="w-1/2 text-center bg-[#F4F4F9] p-4">
          <div className="text-base text-[#6B7280] font-medium">Net P&L</div>
          <div className="text-xl font-medium text-profit">
            {formatCurrency(summaryData.netPL.value)} {formatPercentage(summaryData.netPL.percentage)}
          </div>
        </div>
      </div>

      {/* Positions Section Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Positions (5)</h2>
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
            <th className="px-4 py-3 text-left text-base font-medium border-r border-[#D1D5DB] whitespace-nowrap">
              <div className="flex items-center justify-between">
                <span>Action</span>
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-base font-medium border-r border-[#D1D5DB] whitespace-nowrap">
              <div className="flex items-center justify-between">
                <span>Security</span>
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </th>
            <th className="px-4 py-3 text-right text-base font-medium border-r border-[#D1D5DB] whitespace-nowrap">
              <div className="flex items-center justify-between">
                <span>Qty.</span>
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </th>
            <th className="px-4 py-3 text-right text-base font-medium whitespace-nowrap">
              <div className="flex items-center justify-between">
                <span>Avg. Price</span>
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </th>
            <th className="px-4 py-3 text-right text-base font-medium border-l border-[#D1D5DB] whitespace-nowrap">
              <div className="flex items-center justify-between">
                <span>LTP</span>
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </th>
            <th className="px-4 py-3 text-right text-base font-medium border-l border-[#D1D5DB] whitespace-nowrap">
              <div className="flex items-center justify-between">
                <span>Net P&L</span>
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </th>
            <th className="px-4 py-3 text-right text-base font-medium border-l border-[#D1D5DB] whitespace-nowrap">
              <div className="flex items-center justify-between">
                <span>Daily P&L</span>
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {positions.map((position, index) => (
            <tr key={index}>
              <td className="px-4 py-3 whitespace-nowrap text-[#6B7280] text-sm border-r border-[#D1D5DB]">{position.type}</td>
              <td className="px-4 py-3 border-r border-[#D1D5DB]">
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280] text-sm">{position.security}</span>
                  <div className={`text-xs ml-8 px-2 py-1 rounded-sm ${position.action === 'BUY' 
                    ? 'bg-[#D5FFC6] text-[#34A853]' 
                    : 'bg-red-100 text-[#E53935]'}`}>
                    {position.action}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-[#6B7280] text-right text-sm border-r border-[#D1D5DB]">{position.quantity}</td>
              <td className="px-4 py-3 whitespace-nowrap text-[#6B7280] text-right text-sm">{formatCurrency(position.avgPrice)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-[#6B7280] text-right text-sm border-l border-[#D1D5DB]">{formatCurrency(position.ltp)}</td>
              <td className={`px-4 py-3 whitespace-nowrap text-right text-sm border-l border-[#D1D5DB] ${position.netPL.value < 0 ? 'text-[#E53935]' : 'text-[#22A06B]'}`}>
                {formatCurrency(position.netPL.value)} {formatPercentage(position.netPL.percentage)}
              </td>
              <td className={`px-4 py-3 whitespace-nowrap text-right text-sm border-l border-[#D1D5DB] ${position.dailyPL.value < 0 ? 'text-[#E53935]' : 'text-[#22A06B]'}`}>
                {formatCurrency(position.dailyPL.value)} {formatPercentage(position.dailyPL.percentage)}
              </td>
            </tr>
          ))}
          <tr className="bg-gray-50 font-medium">
            <td colSpan={5} className="px-4 py-3 whitespace-nowrap text-sm">Total</td>
            <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-profit border-l border-[#D1D5DB]">
              {formatCurrency(totalNetPL.value)} {formatPercentage(totalNetPL.percentage)}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-profit border-l border-[#D1D5DB]">
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