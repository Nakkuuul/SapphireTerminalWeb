import DownloadButton from '@/components/gen-components/DownloadButton';
import SearchButton from '@/components/gen-components/SearchButton';
import React from 'react';

const MutualFundsTable = () => {
  // Summary data
  const summaryData = {
    investedValue: 49561.80,
    currentValue: 24780.90,
    dailyPL: {
      value: 4780.90,
      percentage: 8.79
    },
    netPL: {
      value: -24780.90,
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
      investmentValue: 2042.63,
      netPL: { value: 2042.63, percentage: 24.7 },
      dailyPL: { value: 5673.79, percentage: 24.7 }
    },
    {
      security: 'WIPRO',
      units: 575,
      avgNav: 923.42,
      marketNav: 46780,
      investmentValue: 2042.63,
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
    <div className="w-full py-8 px-2">
      {/* Header Summary */}
      <div className="grid grid-cols-5 bg-[#F4F4F9] mb-4">
        <div className="p-4">
          <div className="text-base text-gray-500">Invested Value</div>
          <div className="text-base font-medium">
            {formatCurrency(summaryData.investedValue)}
          </div>
        </div>
        <div className="p-4">
          <div className="text-base text-gray-500">Current Value</div>
          <div className="text-base font-medium">
            {formatCurrency(summaryData.currentValue)}
          </div>
        </div>
        <div className="p-4">
          <div className="text-base text-gray-500">Daily P&L</div>
          <div className="text-base font-medium text-green-500">
            {formatCurrency(summaryData.dailyPL.value)} {formatPercentage(summaryData.dailyPL.percentage)}
          </div>
        </div>
        <div className="p-4">
          <div className="text-base text-gray-500">Net P&L</div>
          <div className="text-base font-medium text-red-500">
            {formatCurrency(summaryData.netPL.value)} {formatPercentage(summaryData.netPL.percentage)}
          </div>
        </div>
        <div className="p-4">
          <div className="text-base text-gray-500">% XIRR</div>
          <div className="text-base font-medium text-green-500">
            +{summaryData.xirr}%
          </div>
        </div>
      </div>

      {/* Mutual Funds Section Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-medium">Mutual Funds (5)</h2>
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
              <th className="px-4 py-2 text-left text-base font-medium text-black ">Security</th>
              <th className="px-6 py-2 text-center text-base font-medium text-black "></th>
              <th className="px-4 py-2 text-right text-base font-medium text-black ">Units</th>
              <th className="px-4 py-2 text-right text-base font-medium text-black ">Avg. NAV</th>
              <th className="px-4 py-2 text-right text-base font-medium text-black ">Market NAV</th>
              <th className="px-4 py-2 text-right text-base font-medium text-black ">Investment value</th>
              <th className="px-4 py-2 text-right text-base font-medium text-black ">Net P&L</th>
              <th className="px-4 py-2 text-right text-base font-medium text-black ">Daily P&L</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {holdings.map((holding, index) => (
              <tr key={index}>
                <td className="px-4 py-2 whitespace-nowrap text-[#6B7280] text-sm">{holding.security}</td>
                <td className="px-1 py-2 whitespace-nowrap text-center">
                  <button className="text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-[#6B7280] text-sm text-right">{holding.units}</td>
                <td className="px-4 py-2 whitespace-nowrap text-[#6B7280] text-sm text-right">{formatCurrency(holding.avgNav)}</td>
                <td className="px-4 py-2 whitespace-nowrap text-[#6B7280] text-sm text-right">{formatCurrency(holding.marketNav)}</td>
                <td className={`px-4 py-2 whitespace-nowrap text-sm text-right ${holding.netPL.value < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {formatCurrency(holding.netPL.value)} {formatPercentage(holding.netPL.percentage)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-green-500">
                  {formatCurrency(holding.dailyPL.value)} {formatPercentage(holding.dailyPL.percentage)}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-medium">
              <td colSpan={5} className="px-4 py-2 whitespace-nowrap text-sm">Total</td>
              <td className="px-4 py-2 whitespace-nowrap text-[#6B7280] text-sm text-right">{formatCurrency(totalInvestmentValue)}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-green-500">
                {formatCurrency(totalNetPL.value)} {formatPercentage(totalNetPL.percentage)}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-green-500">
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