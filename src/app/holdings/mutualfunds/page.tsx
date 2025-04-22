'use client';

import DownloadButton from '@/components/gen-components/DownloadButton';
import SearchButton from '@/components/gen-components/SearchButton';
import HoldingSelector from '@/components/holdings/HoldingSelector';
import { ArrowUpDown } from 'lucide-react';
import React, { useState, useCallback, useMemo } from 'react';

// TypeScript interfaces
interface PLValue {
  value: number;
  percentage: number;
}

interface MutualFund {
  security: string;
  units: number;
  avgNav: number;
  marketNav: number;
  investmentValue: number;
  netPL: PLValue;
  dailyPL: PLValue;
}

type SortField = 'security' | 'units' | 'avgNav' | 'marketNav' | 'investmentValue' | 'netPL' | 'dailyPL';
type SortDirection = 'asc' | 'desc';

const MutualFundsTable = () => {
  // State for sorting
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [hoveredHeader, setHoveredHeader] = useState<SortField | null>(null);

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

  // Sort handler
  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      // If same field clicked
      if (sortDirection === 'asc') {
        // Change to descending
        setSortDirection('desc');
      } else {
        // Reset to unsorted
        setSortField(null);
        setSortDirection('asc');
      }
    } else {
      // New field, default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField, sortDirection]);

  // Sorted holdings
  const sortedHoldings = useMemo(() => {
    if (!sortField) return holdings;

    return [...holdings].sort((a, b) => {
      let valueA, valueB;

      if (sortField === 'netPL' || sortField === 'dailyPL') {
        valueA = a[sortField].value;
        valueB = b[sortField].value;
      } else {
        valueA = a[sortField];
        valueB = b[sortField];
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return sortDirection === 'asc'
        ? (valueA as number) - (valueB as number)
        : (valueB as number) - (valueA as number);
    });
  }, [holdings, sortField, sortDirection]);

  // Header cell component with sort logic
  const HeaderCell = ({ field, label, className = '' }: { field: SortField, label: string | React.ReactNode, className?: string }) => {
    const isActive = sortField === field;
    
    return (
      <th 
        className={`px-4 py-3 text-left text-base font-normal whitespace-nowrap h-[54px] cursor-pointer ${className} 
          ${isActive ? 'bg-gray-200' : 'bg-gray-50'}`}
        onClick={() => handleSort(field)}
        onMouseEnter={() => setHoveredHeader(field)}
        onMouseLeave={() => setHoveredHeader(null)}
      >
        <div className="flex items-center justify-between">
          <span>{label}</span>
          <ArrowUpDown 
            className={`h-4 w-4 transition-opacity ${hoveredHeader === field || isActive ? 'opacity-100' : 'opacity-0'}`} 
          />
        </div>
      </th>
    );
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
            <tr>
              <HeaderCell 
                field="security" 
                label="Security" 
                className="border-r border-[#D1D5DB]"
              />
              <HeaderCell 
                field="units" 
                label="Units" 
                className="border-r border-[#D1D5DB]"
              />
              <HeaderCell 
                field="avgNav" 
                label="Avg. NAV"
                className="border-r border-[#D1D5DB]"
              />
              <HeaderCell 
                field="marketNav" 
                label="Market NAV"
                className="border-r border-[#D1D5DB]"
              />
              <HeaderCell 
                field="investmentValue" 
                label={<>Investment<br />Value</>} 
                className="border-r border-[#D1D5DB]"
              />
              <HeaderCell 
                field="netPL" 
                label="Net P&L"
                className="border-r border-[#D1D5DB]"
              />
              <HeaderCell 
                field="dailyPL" 
                label="Daily P&L"
              />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedHoldings.map((holding, index) => (
              <tr key={index} className="h-[50px]">
                <td className="px-4 py-3 border-r border-[#D1D5DB]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7280] text-sm">{holding.security}</span>
                    <button className="text-gray-400 ml-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-[#6B7280] text-sm border-r border-[#D1D5DB]">{holding.units}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-[#6B7280] text-sm border-r border-[#D1D5DB]">{formatCurrency(holding.avgNav)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-[#6B7280] text-sm border-r border-[#D1D5DB]">{formatCurrency(holding.marketNav)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-[#6B7280] text-sm border-r border-[#D1D5DB]">{formatCurrency(holding.investmentValue)}</td>
                <td className={`px-4 py-3 whitespace-nowrap text-sm text-center border-r border-[#D1D5DB] ${holding.netPL.value < 0 ? 'text-red-500' : 'text-[#22A06B]'}`}>
                  {formatCurrency(holding.netPL.value)} {formatPercentage(holding.netPL.percentage)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-[#22A06B]">
                  {formatCurrency(holding.dailyPL.value)} {formatPercentage(holding.dailyPL.percentage)}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-medium h-[50px]">
              <td colSpan={4} className="px-4 py-3 whitespace-nowrap text-center text-sm border-r border-[#D1D5DB]">Total</td>
              <td className="px-4 py-3 whitespace-nowrap text-center text-[#6B7280] text-sm border-r border-[#D1D5DB]">{formatCurrency(totalInvestmentValue)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-[#22A06B] border-r border-[#D1D5DB]">
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