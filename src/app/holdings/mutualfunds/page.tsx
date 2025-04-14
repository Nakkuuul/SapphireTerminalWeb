import DownloadButton from '@/components/gen-components/DownloadButton';
import SearchButton from '@/components/gen-components/SearchButton';
import HoldingSelector from '@/components/holdings/HoldingSelector';
import { ArrowUpDown } from 'lucide-react';
import React from 'react';

const MutualFundsTable = () => {
  // Summary data
  const summaryData = {
    investedValue: 49561.80,
    currentValue: 2478.90,
    dailyPL: {
      value: 478.90,
      percentage: 8.79
    },
    netPL: {
      value: -247.90,
      percentage: -3.67
    },
    xirr: 15
  };

  // Mutual Funds data
  const holdings = [
    {
      security: 'MRF',
      units: 500,
      avgNav: 2042.63,
      marketNav: 46780,
      investmentValue: 2042.63,
      netPL: { value: 2042.63, percentage: 24.7 },
      dailyPL: { value: 5673.79, percentage: 24.7 }
    },
    {
      security: 'TATASTEEL',
      units: 274,
      avgNav: 822.10,
      marketNav: 46780,
      investmentValue: 2042.63,
      netPL: { value: -2042.63, percentage: -24.7 },
      dailyPL: { value: 5673.79, percentage: 24.7 }
    },
    {
      security: 'ITC',
      units: 2910,
      avgNav: 192281.63,
      marketNav: 46780,
      investmentValue: 2042.63,
      netPL: { value: 2042.63, percentage: 24.7 },
      dailyPL: { value: 5673.79, percentage: 24.7 }
    },
    {
      security: 'MOTILALOSWAL',
      units: 190,
      avgNav: 87.42,
      marketNav: 46780,
      investmentValue: 202.63,
      netPL: { value: 2042.63, percentage: 24.7 },
      dailyPL: { value: 5673.79, percentage: 24.7 }
    },
    {
      security: 'WIPRO',
      units: 575,
      avgNav: 923.42,
      marketNav: 46780,
      investmentValue: 204.63,
      netPL: { value: -2042.63, percentage: -24.7 },
      dailyPL: { value: 5673.79, percentage: 24.7 }
    }
  ];

  // Total values calculation
  const totalInvestmentValue = 2042.63;
  const totalNetPL = { value: 2042.63, percentage: 24.7 };
  const totalDailyPL = { value: 5673.79, percentage: 24.7 };

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
    <div className="w-full ">
      <HoldingSelector />
      {/* Header Summary */}
      <div className="grid grid-cols-5 bg-[#F4F4F9] h-24 mb-4">
      {/* First column */}
      <div className="p-4 flex flex-col justify-center items-center relative">
        <div className="text-base text-gray-500 font-normal">Invested Value</div>
        <div className="text-xl font-normal">
          {formatCurrency(summaryData.investedValue)}
        </div>
        {/* Right divider */}
        <div className="absolute right-0 h-[90%] top-[4%] w-px bg-[#D1D5DB]"></div>
      </div>

      {/* Second column */}
      <div className="p-4 flex flex-col justify-center items-center relative">
        <div className="text-base text-gray-500 font-normal">Current Value</div>
        <div className="text-xl font-normal">
          {formatCurrency(summaryData.currentValue)}
        </div>
        {/* Right divider */}
        <div className="absolute right-0 h-[90%] top-[4%] w-px bg-[#D1D5DB]"></div>
      </div>

      {/* Third column */}
      <div className="p-4 flex flex-col justify-center items-center relative">
        <div className="text-base text-gray-500 font-normal">Daily P&L</div>
        <div className="text-xl font-normal text-profit">
          {formatCurrency(summaryData.dailyPL.value)} <span className='text-sm'>{formatPercentage(summaryData.dailyPL.percentage)}</span>
        </div>
        {/* Right divider */}
        <div className="absolute right-0 h-[90%]  w-px bg-[#D1D5DB]"></div>
      </div>

      {/* Fourth column */}
      <div className="p-4 flex flex-col justify-center items-center relative">
        <div className="text-base text-gray-500 font-normal">Net P&L</div>
        <div className="text-xl font-normal text-loss">
          {formatCurrency(summaryData.netPL.value)} <span className='text-sm'>{formatPercentage(summaryData.netPL.percentage)}</span>
        </div>
        {/* Right divider */}
        <div className="absolute right-0 h-[90%]  w-px bg-[#D1D5DB]"></div>
      </div>

      {/* Fifth column */}
      <div className="p-4 flex flex-col justify-center items-center">
        <div className="text-base text-gray-500 font-normal">% XIRR</div>
        <div className="text-xl font-normal text-green-500">
          +{summaryData.xirr}%
        </div>
      </div>
    </div>

      {/* Mutual Funds Section Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-normal">Mutual Funds (5)</h2>
        <div className="flex items-center gap-2">
          <DownloadButton />
          <SearchButton />
        </div>
      </div>

      {/* Mutual Funds Table */}
      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-base font-normal text-black border-[#D1D5DB] whitespace-nowrap h-[54px]">
                <div className="flex items-center justify-between">
                  <span>Security</span>
                </div>
              </th>
              <th className="px-6 py-3 text-center text-base font-normal text-black border-r border-[#D1D5DB] whitespace-nowrap h-[54px]">
                <div className="flex items-center justify-between">
                  <ArrowUpDown className="h-4 w-4"  />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-base font-normal text-black border-r border-[#D1D5DB] whitespace-nowrap h-[54px]">
                <div className="flex items-center justify-between">
                  <span>Units</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-base font-normal text-black whitespace-nowrap h-[54px]">
                <div className="flex items-center justify-between">
                  <span>Avg. NAV</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-base font-normal text-black whitespace-nowrap h-[54px]">
                <div className="flex items-center justify-between">
                  <span>Market NAV</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-base font-normal text-black border-l border-r border-[#D1D5DB] whitespace-nowrap h-[54px]">
                <div className="flex items-center justify-between">
                  <span>Investment value</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-base font-normal text-black whitespace-nowrap h-[54px]">
                <div className="flex items-center justify-between">
                  <span>Net P&L</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-base font-normal text-black whitespace-nowrap h-[54px]">
                <div className="flex items-center justify-between">
                  <span>Daily P&L</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {holdings.map((holding, index) => (
              <tr key={index} className="h-[50px]">
                <td className="px-4 py-3 whitespace-nowrap text-center text-[#6B7280] text-sm border-[#D1D5DB]">{holding.security}</td>
                <td className="px-1 py-3 whitespace-nowrap text-center border-r border-[#D1D5DB]">
                  <button className="text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-[#6B7280] text-sm border-r border-[#D1D5DB]">{holding.units}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-[#6B7280] text-sm">{formatCurrency(holding.avgNav)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-[#6B7280] text-sm">{formatCurrency(holding.marketNav)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-[#6B7280] text-sm border-l border-r border-[#D1D5DB]">{formatCurrency(holding.investmentValue)}</td>
                <td className={`px-4 py-3 whitespace-nowrap text-sm text-center ${holding.netPL.value < 0 ? 'text-red-500' : 'text-[#22A06B]'}`}>
                  {formatCurrency(holding.netPL.value)} {formatPercentage(holding.netPL.percentage)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-[#22A06B]">
                  {formatCurrency(holding.dailyPL.value)} {formatPercentage(holding.dailyPL.percentage)}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-medium h-[50px]">
              <td colSpan={5} className="px-4 py-3 whitespace-nowrap text-center text-sm">Total</td>
              <td className="px-4 py-3 whitespace-nowrap text-center text-[#6B7280] text-sm border-l border-r border-[#D1D5DB]">{formatCurrency(totalInvestmentValue)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-[#22A06B]">
                {formatCurrency(totalNetPL.value)} {formatPercentage(totalNetPL.percentage)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-[#22A06B]">
                {formatCurrency(totalDailyPL.value)} {formatPercentage(totalDailyPL.percentage)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MutualFundsTable;