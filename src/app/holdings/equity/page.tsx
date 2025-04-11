'use client'
import React, { useState } from 'react';
import { Download, Search, MoreVertical, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import DownloadButton from '@/components/gen-components/DownloadButton';
import SearchButton from '@/components/gen-components/SearchButton';
import HoldingSelector from '@/components/holdings/HoldingSelector';

// TypeScript interfaces
interface PortfolioSummary {
  investmentValue: number;
  currentValue: number;
  dailyPL: {
    value: number;
    percentage: number;
  };
  netPL: {
    value: number;
    percentage: number;
  };
}

interface StockHolding {
  security: string;
  quantity: number;
  avgPrice: number;
  ltp: number;
  investmentValue: number;
  netPL: {
    value: number;
    percentage: number;
  };
  dailyPL: {
    value: number;
    percentage: number;
  };
}

interface PLValue {
  value: number;
  percentage: number;
}

const EquityHoldings = () => {
  // Initial portfolio data
  const [portfolioSummary] = useState({
    investmentValue: 49561.80,
    currentValue: 24780.90,
    dailyPL: {
      value: 4780.90,
      percentage: 8.79,
    },
    netPL: {
      value: -2478.8,
      percentage: -3.67,
    },
  });

  const [holdings] = useState([
    {
      security: 'MRF',
      quantity: 500,
      avgPrice: 2042.63,
      ltp: 46780.00,
      investmentValue: 2042.63,
      netPL: {
        value: 2042.63,
        percentage: 24.7,
      },
      dailyPL: {
        value: 5673.79,
        percentage: 24.7,
      },
    },
    {
      security: 'TATASTEEL',
      quantity: 274,
      avgPrice: 822.10,
      ltp: 46780.00,
      investmentValue: 2042.63,
      netPL: {
        value: 2042.63,
        percentage: -24.7,
      },
      dailyPL: {
        value: 5673.79,
        percentage: 24.7,
      },
    },
    {
      security: 'ITC',
      quantity: 2910,
      avgPrice: 192281.63,
      ltp: 46780.00,
      investmentValue: 2042.63,
      netPL: {
        value: 2042.63,
        percentage: 24.7,
      },
      dailyPL: {
        value: 5673.79,
        percentage: 24.7,
      },
    },
    {
      security: 'MOTILALOSWAL',
      quantity: 190,
      avgPrice: 87.42,
      ltp: 46780.00,
      investmentValue: 2042.63,
      netPL: {
        value: 2042.63,
        percentage: 24.7,
      },
      dailyPL: {
        value: 5673.79,
        percentage: 24.7,
      },
    },
    {
      security: 'WIPRO',
      quantity: 575,
      avgPrice: 923.42,
      ltp: 46780.00,
      investmentValue: 2042.63,
      netPL: {
        value: 2042.63,
        percentage: -24.7,
      },
      dailyPL: {
        value: 5673.79,
        percentage: 24.7,
      },
    },
  ]);

  // Calculate total values
  const totalInvestmentValue = holdings.reduce((sum, holding) => sum + holding.investmentValue, 0);
  const totalNetPL = {
    value: holdings.reduce((sum, holding) => sum + holding.netPL.value, 0),
    percentage: -24.7, // This would normally be calculated
  };
  const totalDailyPL = {
    value: holdings.reduce((sum, holding) => sum + holding.dailyPL.value, 0),
    percentage: 24.7, // This would normally be calculated
  };

  // Format currency values
  const formatCurrency = (value : any) => {
    return value.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  // Format percentage values
  const formatPercentage = (value: any) => {
    return `(${value.toFixed(2)}%)`;
  };

  return (
    <div className=" max-w-6xl mx-auto">
      <HoldingSelector />
      {/* Summary Section */}
      <div className="grid grid-cols-4 bg-[#F4F4F9] mb-4 h-24  overflow-hidden">
        <div className="flex flex-col justify-center h-full px-3 relative text-center">
          <div className="text-base text-gray-600 text-center">Investment Value</div>
          <div className="font-normal text-xl text-center">{formatCurrency(portfolioSummary.investmentValue)}</div>
          <div className="absolute right-0 top-2 h-4/5 w-px bg-[#D1D5DB]"></div>
        </div>
        <div className="flex flex-col justify-center h-full px-3 relative text-center">
          <div className="text-base text-gray-600 text-center">Current Value</div>
          <div className="font-normal text-xl text-center">{formatCurrency(portfolioSummary.currentValue)}</div>
          <div className="absolute right-0 top-2 h-4/5 w-px bg-[#D1D5DB]"></div>
        </div>
        <div className="flex flex-col justify-center h-full px-3 relative text-center">
          <div className="text-base text-gray-600 text-center">Daily P&L</div>
          <div className="font-normal text-xl text-center text-[#22A06B]">
            {formatCurrency(portfolioSummary.dailyPL.value)} <span className="text-[#22A06B] text-sm">{formatPercentage(portfolioSummary.dailyPL.percentage)}</span>
          </div>
          <div className="absolute right-0 top-2 h-4/5 w-px bg-[#D1D5DB]"></div>
        </div>
        <div className="flex flex-col justify-center h-full px-3 text-center">
          <div className="text-base text-gray-600 text-center">Net P&L</div>
          <div className="font-normal text-xl text-center text-[#E53935]">
            {formatCurrency(portfolioSummary.netPL.value)} <span className="text-[#E53935] text-sm">{formatPercentage(portfolioSummary.netPL.percentage)}</span>
          </div>
        </div>
      </div>

      {/* Equity Section */}
      <div className="mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-normal">Equity (5)</h2>
        <div className="flex items-center gap-2">
          <DownloadButton />
          <SearchButton />
        </div>
      </div>

        {/* Equity Table with vertical columns and divider lines */}
        <div className="overflow-x-auto border rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50" style={{ height: '54px' }}>
                <th className="px-4 py-0 text-center text-base font-normal border-r">
                  <div className="flex items-center justify-between">
                    Security
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="px-4 py-0 text-center text-base font-normal border-r">
                  <div className="flex items-center justify-between">
                    Qty
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="px-4 py-0 text-center text-base font-normal">
                  <div className="flex items-center justify-between">
                    Avg. Price
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="px-4 py-0 text-center text-base font-normal border-r">
                  <div className="flex items-center justify-between">
                    LTP
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="px-4 py-0 text-center text-base font-normal border-r">
                  <div className="flex items-center justify-between">
                    Investment value
                    <ArrowUpDown className="min-w-4 min-h-4" />
                  </div>
                </th>
                <th className="px-4 py-0 text-center text-base font-normal">
                  <div className="flex items-center justify-between">
                    Net P&L
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="px-4 py-0 text-center text-base font-normal">
                  <div className="flex items-center justify-between">
                    Daily P&L
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {holdings.map((holding, index) => (
                <tr key={index} style={{ height: '50px' }}>
                  <td className="px-4 py-0 text-center whitespace-nowrap border-r">
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B7280]" style={{ fontSize: '14px' }}>{holding.security}</span>
                      <MoreHorizontal strokeWidth={2} className="w-4 h-4 ml-4 rotate-90 text-gray-400" />
                    </div>
                  </td>
                  <td className="px-4 py-0 text-center text-[#6B7280] whitespace-nowrap border-r" style={{ fontSize: '14px' }}>{holding.quantity}</td>
                  <td className="px-4 py-0 text-center text-[#6B7280] whitespace-nowrap" style={{ fontSize: '14px' }}>{formatCurrency(holding.avgPrice)}</td>
                  <td className="px-4 py-0 text-center text-[#6B7280] whitespace-nowrap border-r" style={{ fontSize: '14px' }}>{formatCurrency(holding.ltp)}</td>
                  <td className="px-4 py-0 text-center text-[#6B7280]  border-r" style={{ fontSize: '14px' }}>{formatCurrency(holding.investmentValue)}</td>
                  <td className="px-4 py-0 text-center whitespace-nowrap" style={{ fontSize: '14px' }}>
                    <span className={holding.netPL.percentage < 0 ? "text-red-500" : "text-[#22A06B]"}>
                      {formatCurrency(holding.netPL.value)} {formatPercentage(holding.netPL.percentage)}
                    </span>
                  </td>
                  <td className="px-4 py-0 text-center whitespace-nowrap" style={{ fontSize: '14px' }}>
                    <span className="text-[#22A06B]">
                      {formatCurrency(holding.dailyPL.value)} {formatPercentage(holding.dailyPL.percentage)}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-medium" style={{ height: '50px' }}>
                <td className="px-4 py-0 text-center whitespace-nowrap border-r" style={{ fontSize: '14px' }}>Total</td>
                <td className="px-4 py-0 text-center whitespace-nowrap border-r"></td>
                <td className="px-4 py-0 text-center whitespace-nowrap"></td>
                <td className="px-4 py-0 text-center whitespace-nowrap border-r"></td>
                <td className="px-4 py-0 text-center text-[#6B7280] whitespace-nowrap border-r" style={{ fontSize: '14px' }}>{formatCurrency(totalInvestmentValue)}</td>
                <td className="px-4 py-0 text-center whitespace-nowrap" style={{ fontSize: '14px' }}>
                  <span className="text-red-500">
                    {formatCurrency(totalNetPL.value)} {formatPercentage(totalNetPL.percentage)}
                  </span>
                </td>
                <td className="px-4 py-0 text-center whitespace-nowrap" style={{ fontSize: '14px' }}>
                  <span className="text-[#22A06B]">
                    {formatCurrency(totalDailyPL.value)} {formatPercentage(totalDailyPL.percentage)}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EquityHoldings;