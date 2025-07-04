"use client";

import DownloadButton from "@/components/gen-components/DownloadButton";
import SearchButton from "@/components/gen-components/SearchButton";
import HoldingSelector from "@/components/holdings/HoldingSelector";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import React, { useState, useCallback, useMemo } from "react";

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

type SortField =
  | "security"
  | "units"
  | "avgNav"
  | "marketNav"
  | "investmentValue"
  | "netPL"
  | "dailyPL";
type SortDirection = "asc" | "desc";

const MutualFundsTable = () => {
  // Sorting state
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [hoveredHeader, setHoveredHeader] = useState<SortField | null>(null);

  // Search state
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Summary data
  const summaryData = {
    investedValue: 49561.8,
    currentValue: 2478.9,
    dailyPL: {
      value: 478.9,
      percentage: 8.79,
    },
    netPL: {
      value: -247.9,
      percentage: -3.67,
    },
    xirr: 15,
  };

  // Mutual Funds data
  const holdings = [
    {
      security: "MRF",
      units: 500,
      avgNav: 2042.63,
      marketNav: 46780,
      investmentValue: 2042.63,
      netPL: { value: 2042.63, percentage: 24.7 },
      dailyPL: { value: 5673.79, percentage: 24.7 },
    },
    {
      security: "TATASTEEL",
      units: 274,
      avgNav: 822.1,
      marketNav: 46780,
      investmentValue: 2042.63,
      netPL: { value: -2042.63, percentage: -24.7 },
      dailyPL: { value: 5673.79, percentage: 24.7 },
    },
    {
      security: "ITC",
      units: 2910,
      avgNav: 192281.63,
      marketNav: 46780,
      investmentValue: 2042.63,
      netPL: { value: 2042.63, percentage: 24.7 },
      dailyPL: { value: 5673.79, percentage: 24.7 },
    },
    {
      security: "MOTILALOSWAL",
      units: 190,
      avgNav: 87.42,
      marketNav: 46780,
      investmentValue: 202.63,
      netPL: { value: 2042.63, percentage: 24.7 },
      dailyPL: { value: 5673.79, percentage: 24.7 },
    },
    {
      security: "WIPRO",
      units: 575,
      avgNav: 923.42,
      marketNav: 46780,
      investmentValue: 204.63,
      netPL: { value: -2042.63, percentage: -24.7 },
      dailyPL: { value: 5673.79, percentage: 24.7 },
    },
  ];

  // Total values calculation
  const totalInvestmentValue = 2042.63;
  const totalNetPL = { value: 2042.63, percentage: 24.7 };
  const totalDailyPL = { value: 5673.79, percentage: 24.7 };

  // Format currency
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  // Format percentage
  const formatPercentage = (value: number): string => {
    return `(${value.toFixed(2)}%)`;
  };

  // Sort handler
  const handleSort = useCallback(
    (field: SortField) => {
      if (sortField === field) {
        // If same field clicked
        if (sortDirection === "asc") {
          // Change to descending
          setSortDirection("desc");
        } else {
          // Reset to unsorted
          setSortField(null);
          setSortDirection("asc");
        }
      } else {
        // New field, default to ascending
        setSortField(field);
        setSortDirection("asc");
      }
    },
    [sortField, sortDirection]
  );

  // Sorted holdings
  const sortedHoldings = useMemo(() => {
    if (!sortField) return holdings;

    return [...holdings].sort((a, b) => {
      let valueA, valueB;

      if (sortField === "netPL" || sortField === "dailyPL") {
        valueA = a[sortField].value;
        valueB = b[sortField].value;
      } else {
        valueA = a[sortField];
        valueB = b[sortField];
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return sortDirection === "asc"
        ? (valueA as number) - (valueB as number)
        : (valueB as number) - (valueA as number);
    });
  }, [holdings, sortField, sortDirection]);

  // Header cell component with sort logic
  const HeaderCell = ({
    field,
    label,
    className = "",
    width = "",
  }: {
    field: SortField;
    label: string | React.ReactNode;
    className?: string;
    width?: string;
  }) => {
    const isActive = sortField === field;

    return (
      <th
        className={`px-2 py-0 text-left text-xs font-normal border-r cursor-pointer hover:bg-gray-100 ${className} 
          ${isActive ? "bg-[#E8E8F0]" : "bg-[#F4F4F9]"}`}
        onClick={() => handleSort(field)}
        onMouseEnter={() => setHoveredHeader(field)}
        onMouseLeave={() => setHoveredHeader(null)}
        style={{ width }}
      >
        <div className="flex items-center justify-between">
          <span>{label}</span>
          <ArrowUpDown
            className={`w-3 h-3 ml-1 ${
              hoveredHeader === field || isActive ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </th>
    );
  };

  return (
    <div className="w-full">
      <HoldingSelector />
      {/* Header Summary */}
      <div className="grid grid-cols-5 bg-[#F4F4F9] mb-2 h-16 overflow-hidden">
        <div className="flex flex-col justify-center h-full px-1.5 relative text-center">
          <div className="text-xs text-gray-600 text-center">
            Invested Value
          </div>
          <div className="font-normal text-sm text-center">
            {formatCurrency(summaryData.investedValue)}
          </div>
          <div className="absolute right-0 top-2 h-4/5 w-px bg-[#D1D5DB]"></div>
        </div>

        <div className="flex flex-col justify-center h-full px-1.5 relative text-center">
          <div className="text-xs text-gray-600 text-center">
            Current Value
          </div>
          <div className="font-normal text-sm text-center">
            {formatCurrency(summaryData.currentValue)}
          </div>
          <div className="absolute right-0 top-2 h-4/5 w-px bg-[#D1D5DB]"></div>
        </div>

        <div className="flex flex-col justify-center h-full px-1.5 relative text-center">
          <div className="text-xs text-gray-600 text-center">Daily P&L</div>
          <div className="font-normal text-sm text-center text-[#22A06B]">
            {formatCurrency(summaryData.dailyPL.value)}{" "}
            <span className="text-[#22A06B] text-xs">
              {formatPercentage(summaryData.dailyPL.percentage)}
            </span>
          </div>
          <div className="absolute right-0 top-2 h-4/5 w-px bg-[#D1D5DB]"></div>
        </div>

        <div className="flex flex-col justify-center h-full px-1.5 relative text-center">
          <div className="text-xs text-gray-600 text-center">Net P&L</div>
          <div className="font-normal text-sm text-center text-red-500">
            {formatCurrency(summaryData.netPL.value)}{" "}
            <span className="text-red-500 text-xs">
              {formatPercentage(summaryData.netPL.percentage)}
            </span>
          </div>
          <div className="absolute right-0 top-2 h-4/5 w-px bg-[#D1D5DB]"></div>
        </div>

        <div className="flex flex-col justify-center h-full px-1.5 text-center">
          <div className="text-xs text-gray-600 text-center">% XIRR</div>
          <div className="font-normal text-sm text-center text-[#22A06B]">
            +{summaryData.xirr}%
          </div>
        </div>
      </div>

      {/* Mutual Funds Section Header */}
      <div className="flex justify-between items-center mt-4 mb-3">
        <h2 className="text-sm font-normal">Mutual Funds (5)</h2>
        <div className="flex items-center gap-2">
          <div
            className={`relative flex items-center transition-all duration-200 overflow-hidden`}
            style={{ width: searchExpanded ? 192 : 32 }}
          >
            <button
              onClick={() => setSearchExpanded(true)}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center z-10"
              aria-label="Expand search"
              tabIndex={searchExpanded ? -1 : 0}
              style={{ pointerEvents: searchExpanded ? 'none' : 'auto' }}
            >
              <SearchButton />
            </button>
            <input
              type="text"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onBlur={() => setSearchExpanded(false)}
              autoFocus={searchExpanded}
              className={`pl-9 pr-2 py-2 border border-gray-300 rounded-lg text-sm text-[#686868] focus:outline-none focus:border-blue-500 transition-all duration-200 bg-white ${searchExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              placeholder="Search..."
              style={{ width: searchExpanded ? 192 : 32, minWidth: 0 }}
            />
          </div>
          <DownloadButton />
        </div>
      </div>

      {/* Mutual Funds Table */}
      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-[#F4F4F9]">
            <tr className="bg-[#F4F4F9]" style={{ height: "36px" }}>
              <HeaderCell
                field="security"
                label="Security"
                width="180px"
              />
              <HeaderCell 
                field="units" 
                label="Qty" 
                width="80px" 
              />
              <HeaderCell 
                field="avgNav" 
                label="Avg. NAV" 
                width="100px" 
              />
              <HeaderCell
                field="marketNav"
                label="Market NAV"
                width="100px"
              />
              <HeaderCell
                field="investmentValue"
                label="Investment Value"
                width="130px"
              />
              <HeaderCell 
                field="netPL" 
                label="Net P&L" 
                width="120px" 
              />
              <HeaderCell
                field="dailyPL"
                label="Daily P&L"
                width="120px"
              />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedHoldings.map((holding, index) => (
              <tr 
                key={index} 
                style={{ height: "32px" }}
                className="hover:bg-[#FAFAFA] transition-colors duration-150"
              >
                <td className="px-2 py-0 whitespace-nowrap border-r">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[#6B7280]"
                      style={{ fontSize: "11px" }}
                    >
                      {holding.security}
                    </span>
                    <MoreHorizontal
                      strokeWidth={2}
                      className="w-3 h-3 ml-1.5 rotate-90 text-gray-400"
                    />
                  </div>
                </td>
                <td
                  className="px-2 py-0 text-center text-[#6B7280] whitespace-nowrap border-r"
                  style={{ fontSize: "11px" }}
                >
                  {holding.units}
                </td>
                <td
                  className="px-2 py-0 text-center text-[#6B7280] whitespace-nowrap border-r"
                  style={{ fontSize: "11px" }}
                >
                  {formatCurrency(holding.avgNav)}
                </td>
                <td
                  className="px-2 py-0 text-center text-[#6B7280] whitespace-nowrap border-r"
                  style={{ fontSize: "11px" }}
                >
                  {formatCurrency(holding.marketNav)}
                </td>
                <td
                  className="px-2 py-0 text-center text-[#6B7280] border-r"
                  style={{ fontSize: "11px" }}
                >
                  {formatCurrency(holding.investmentValue)}
                </td>
                <td
                  className="px-2 py-0 text-center whitespace-nowrap border-r"
                  style={{ fontSize: "11px" }}
                >
                  <span
                    className={
                      holding.netPL.value < 0
                        ? "text-red-500"
                        : "text-[#22A06B]"
                    }
                  >
                    {formatCurrency(holding.netPL.value)}{" "}
                    {formatPercentage(holding.netPL.percentage)}
                  </span>
                </td>
                <td
                  className="px-2 py-0 text-center whitespace-nowrap"
                  style={{ fontSize: "11px" }}
                >
                  <span
                    className={
                      holding.dailyPL.value < 0
                        ? "text-red-500"
                        : "text-[#22A06B]"
                    }
                  >
                    {formatCurrency(holding.dailyPL.value)}{" "}
                    {formatPercentage(holding.dailyPL.percentage)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-[#F4F4F9] font-medium" style={{ height: "32px" }}>
              <td
                colSpan={4}
                className="px-2 py-0 text-center whitespace-nowrap border-r"
                style={{ fontSize: "11px" }}
              >
                Total
              </td>
              <td
                className="px-2 py-0 text-center text-[#6B7280] whitespace-nowrap border-r"
                style={{ fontSize: "11px" }}
              >
                {formatCurrency(totalInvestmentValue)}
              </td>
              <td
                className="px-2 py-0 text-center whitespace-nowrap border-r"
                style={{ fontSize: "11px" }}
              >
                <span className="text-red-500">
                  {formatCurrency(totalNetPL.value)}{" "}
                  {formatPercentage(totalNetPL.percentage)}
                </span>
              </td>
              <td
                className="px-2 py-0 text-center whitespace-nowrap"
                style={{ fontSize: "11px" }}
              >
                <span className="text-[#22A06B]">
                  {formatCurrency(totalDailyPL.value)}{" "}
                  {formatPercentage(totalDailyPL.percentage)}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default MutualFundsTable;