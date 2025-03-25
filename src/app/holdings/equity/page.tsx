'use client'
import React, { useState } from 'react';

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

const PortfolioDashboard: React.FC = () => {
  // Initial portfolio data
  const [portfolioSummary] = useState<PortfolioSummary>({
    investmentValue: 49561.80,
    currentValue: 24780.90,
    dailyPL: {
      value: 4780.90,
      percentage: 8.79,
    },
    netPL: {
      value: -24780.90,
      percentage: -3.67,
    },
  });

  const [holdings] = useState<StockHolding[]>([
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
        percentage: 24.7,
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
        percentage: 24.7,
      },
      dailyPL: {
        value: 5673.79,
        percentage: 24.7,
      },
    },
  ]);

  // Calculate total values
  const totalInvestmentValue = holdings.reduce((sum, holding) => sum + holding.investmentValue, 0);
  const totalNetPL: PLValue = {
    value: holdings.reduce((sum, holding) => sum + holding.netPL.value, 0),
    percentage: 24.7, // This would normally be calculated
  };
  const totalDailyPL: PLValue = {
    value: holdings.reduce((sum, holding) => sum + holding.dailyPL.value, 0),
    percentage: 24.7, // This would normally be calculated
  };

  // Format currency values
  const formatCurrency = (value: number): string => {
    return value.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  // Format percentage values
  const formatPercentage = (value: number): string => {
    return `(${value.toFixed(2)}%)`;
  };

  return (
    <div className="portfolio-dashboard max-w-6xl mx-auto py-8 px-2">
      {/* Summary Section */}
      <div className="grid grid-cols-4 bg-gray-100 rounded-md mb-4">
        <div className="p-3">
          <div className="text-base text-gray-600">Investment Value</div>
          <div className="font-semibold text-xl">{formatCurrency(portfolioSummary.investmentValue)}</div>
        </div>
        <div className="p-3">
          <div className="text-base text-gray-600">Current Value</div>
          <div className="font-semibold text-xl">{formatCurrency(portfolioSummary.currentValue)}</div>
        </div>
        <div className="p-3">
          <div className="text-sbasem text-gray-600">Daily P&L</div>
          <div className="font-semibold text-xl text-green-500">
            {formatCurrency(portfolioSummary.dailyPL.value)} {formatPercentage(portfolioSummary.dailyPL.percentage)}
          </div>
        </div>
        <div className="p-3">
          <div className="text-base text-gray-600">Net P&L</div>
          <div className="font-semibold text-xl text-red-500">
            {formatCurrency(portfolioSummary.netPL.value)} {formatPercentage(portfolioSummary.netPL.percentage)}
          </div>
        </div>
      </div>

      {/* Equity Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-medium" style={{ fontSize: '16px' }}>Equity (5)</h2>
          <div className="flex gap-2">
            <button className="flex items-center border rounded-md px-2 py-1 text-xs">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search everything..."
                className="border rounded-md px-2 py-1 text-xs w-40"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Corrected Equity Table with vertical columns */}
        <div className="overflow-x-auto border rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-base font-medium">
                  Security
                </th>
                <th className="px-4 py-2 text-left text-base font-medium" >
                  Qty
                </th>
                <th className="px-4 py-2 text-left text-base font-medium  " >
                  Avg. Price
                </th>
                <th className="px-4 py-2 text-left text-base font-medium ">
                  LTP
                </th>
                <th className="px-4 py-2 text-left text-base font-medium ">
                  Investment Value

                </th>
                <th className="px-4 py-2 text-left text-base font-medium ">
                  Net P&L
                </th>
                <th className="px-4 py-2 text-left text-base font-medium  " >
                  Daily P&L
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {holdings.map((holding, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className='text-[#6B7280]' style={{ fontSize: '14px' }}>{holding.security}</span>
                      <button className="ml-2">
                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-[#6B7280] whitespace-nowrap" style={{ fontSize: '14px' }}>{holding.quantity}</td>
                  <td className="px-4 py-2 text-[#6B7280] whitespace-nowrap" style={{ fontSize: '14px' }}>{formatCurrency(holding.avgPrice)}</td>
                  <td className="px-4 py-2 text-[#6B7280] whitespace-nowrap" style={{ fontSize: '14px' }}>{formatCurrency(holding.ltp)}</td>
                  <td className="px-4 py-2 text-[#6B7280] whitespace-nowrap" style={{ fontSize: '14px' }}>{formatCurrency(holding.investmentValue)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-green-500" style={{ fontSize: '14px' }}>
                    {formatCurrency(holding.netPL.value)} {formatPercentage(holding.netPL.percentage)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-red-500" style={{ fontSize: '14px' }}>
                    {formatCurrency(holding.dailyPL.value)} {formatPercentage(holding.dailyPL.percentage)}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-medium">
                <td className="px-4 py-2 whitespace-nowrap" style={{ fontSize: '14px' }}>Total</td>
                <td className="px-4 py-2 whitespace-nowrap"></td>
                <td className="px-4 py-2 whitespace-nowrap"></td>
                <td className="px-4 py-2 whitespace-nowrap"></td>
                <td className="px-4 py-2 text-[#6B7280] whitespace-nowrap" style={{ fontSize: '14px' }}>{formatCurrency(totalInvestmentValue)}</td>
                <td className="px-4 py-2 whitespace-nowrap text-green-500" style={{ fontSize: '14px' }}>
                  {formatCurrency(totalNetPL.value)} {formatPercentage(totalNetPL.percentage)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-red-500" style={{ fontSize: '14px' }}>
                  {formatCurrency(totalDailyPL.value)} {formatPercentage(totalDailyPL.percentage)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDashboard;