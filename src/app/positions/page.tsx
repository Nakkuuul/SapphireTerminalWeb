"use client";

import DownloadButton from "@/components/gen-components/DownloadButton";
import SearchButton from "@/components/gen-components/SearchButton";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import React, { useState, useCallback, useMemo } from "react";

// TypeScript interfaces
interface PLValue {
  value: number;
  percentage: number;
}

// Update the Position interface to include isClosed property
interface Position {
  type: string;
  security: string;
  action: "BUY" | "SELL";
  quantity: number;
  avgPrice: number;
  ltp: number;
  netPL: PLValue;
  dailyPL: PLValue;
  isClosed: boolean; // New property to track if a trade is closed
}

interface SummaryData {
  dailyPL: PLValue;
  netPL: PLValue;
}

// Sort types
type SortField =
  | "type"
  | "security"
  | "action"
  | "quantity"
  | "avgPrice"
  | "ltp"
  | "netPL"
  | "dailyPL";
type SortDirection = "asc" | "desc";

const Positions: React.FC = () => {
  // State for sorting
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [hoveredHeader, setHoveredHeader] = useState<SortField | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  // Summary data
  const summaryData: SummaryData = {
    dailyPL: {
      value: -24780.9,
      percentage: -3.67,
    },
    netPL: {
      value: 44780.9,
      percentage: 8.79,
    },
  };

  // Positions data
  const initialPositions: Position[] = [
    {
      type: "INT",
      security: "MRF",
      action: "BUY",
      quantity: 820,
      avgPrice: 2042.64,
      ltp: 46780,
      netPL: { value: 2042.63, percentage: 24.7 },
      dailyPL: { value: 2042.63, percentage: 24.7 },
      isClosed: false,
    },
    {
      type: "DEL",
      security: "TATASTEEL",
      action: "SELL",
      quantity: 400,
      avgPrice: 822.1,
      ltp: 46780,
      netPL: { value: 2042.63, percentage: 24.7 },
      dailyPL: { value: 2042.63, percentage: 24.7 },
      isClosed: false,
    },
    {
      type: "MTF",
      security: "ITC",
      action: "BUY",
      quantity: 100,
      avgPrice: 92281.63,
      ltp: 46780,
      netPL: { value: 2042.63, percentage: 24.7 },
      dailyPL: { value: 2042.63, percentage: 24.7 },
      isClosed: false,
    },
    {
      type: "CFD",
      security: "MOTILALOSWAL",
      action: "SELL",
      quantity: -5000,
      avgPrice: 87.42,
      ltp: 46780,
      netPL: { value: -2042.63, percentage: 24.7 },
      dailyPL: { value: -2042.63, percentage: 24.7 },
      isClosed: true, // This is a closed trade
    },
    {
      type: "INT",
      security: "MOTILALOSWAL",
      action: "BUY",
      quantity: 2910,
      avgPrice: 87.42,
      ltp: 46780,
      netPL: { value: 2042.63, percentage: 24.7 },
      dailyPL: { value: 2042.63, percentage: 24.7 },
      isClosed: true, // This is a closed trade
    },
    {
      type: "INT",
      security: "MOTILALOSWAL",
      action: "SELL",
      quantity: 5750,
      avgPrice: 87.42,
      ltp: 46780,
      netPL: { value: 2042.63, percentage: 24.7 },
      dailyPL: { value: 2042.63, percentage: 24.7 },
      isClosed: true, // This is a closed trade
    },
    {
      type: "INT",
      security: "MOTILALOSWAL",
      action: "SELL",
      quantity: 2350,
      avgPrice: 87.42,
      ltp: 46780,
      netPL: { value: 2042.63, percentage: 24.7 },
      dailyPL: { value: 2042.63, percentage: 24.7 },
      isClosed: false,
    },
  ];

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

  // Sorted positions
  const sortedPositions = useMemo(() => {
    // First, separate active and closed trades
    const activeTrades = initialPositions.filter(position => !position.isClosed);
    const closedTrades = initialPositions.filter(position => position.isClosed);
  
    // If no sorting field is selected, just return active trades followed by closed trades
    if (!sortField) return [...activeTrades, ...closedTrades];
  
    // Sort function for both groups
    const sortByField = (a: Position, b: Position) => {
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
    };
  
    // Sort active trades
    const sortedActiveTrades = [...activeTrades].sort(sortByField);
  
    // Sort closed trades
    const sortedClosedTrades = [...closedTrades].sort(sortByField);
  
    // Always return active trades first, followed by closed trades
    return [...sortedActiveTrades, ...sortedClosedTrades];
  }, [initialPositions, sortField, sortDirection]);

  // Total values calculation
  const totalNetPL: PLValue = {
    value: 5673.79,
    percentage: 24.7,
  };

  const totalDailyPL: PLValue = {
    value: 5673.79,
    percentage: 24.7,
  };

  // Format currency
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  // Format percentage
  const formatPercentage = (value: number): string => {
    return `(${value.toFixed(1)}%)`;
  };

  // Helper function to get action badge styles
  const getActionBadgeStyles = (action: "BUY" | "SELL", isClosed: boolean) => {
    // Base background colors at 100% opacity
    const buyBgColor = "#D5FFC6";
    const sellBgColor = "#FFE4DD";
    // Base text colors at 100% opacity
    const buyTextColor = "#34A853";
    const sellTextColor = "#F10930";

    // For closed (faded) positions, apply 50% opacity to both bg and text
    return {
      backgroundColor: isClosed 
        ? action === "BUY" ? buyBgColor + "80" : sellBgColor + "80"
        : action === "BUY" ? buyBgColor : sellBgColor,
      color: isClosed
        ? action === "BUY" ? buyTextColor + "80" : sellTextColor + "80"
        : action === "BUY" ? buyTextColor : sellTextColor
    };
  };

  // Helper function to get type badge styles
  const getTypeBadgeStyles = (type: string, isClosed: boolean) => {
    // Base background colors and text colors based on type
    let bgColor, textColor;
    
    switch (type) {
      case "DEL":
        bgColor = "#F1F8F6";
        textColor = "#2E7D6F";
        break;
      case "CFD":
        bgColor = "#E3F2FD";
        textColor = "#64B5F6";
        break;
      case "INT":
        bgColor = "#FFF3E0";
        textColor = "#FFB74D";
        break;
      case "MTF":
        bgColor = "#F3E5F5";
        textColor = "#BA68C8";
        break;
      default:
        bgColor = "#F1F1F1";
        textColor = "#666666";
    }

    // Apply opacity for closed positions
    const opacity = isClosed ? "80" : "CC"; // CC is ~80% opacity, 80 is 50% opacity
    
    return {
      backgroundColor: bgColor + opacity,
      color: textColor + (isClosed ? "80" : "B3") // B3 is ~70% opacity
    };
  };

  // Header cell component with sort logic
  const HeaderCell = ({
    field,
    label,
    className = "",
  }: {
    field: SortField;
    label: string;
    className?: string;
  }) => {
    const isActive = sortField === field;

    return (
      <th
        className={`px-2.5 py-0 text-left text-xs font-normal border-r cursor-pointer hover:bg-gray-100 ${className} 
          ${isActive ? "bg-gray-200" : "bg-gray-50"}`}
        onClick={() => handleSort(field)}
        onMouseEnter={() => setHoveredHeader(field)}
        onMouseLeave={() => setHoveredHeader(null)}
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
    <div className="w-full max-w-[80vw] mx-auto">
      {/* Positions Section Header */}
      <div className="flex justify-between items-end mb-2">
        <h2 className="text-base font-normal">Positions (5)</h2>
        <div className="flex items-center gap-2">
          <DownloadButton />
          <SearchButton />
        </div>
      </div>

      {/* Positions Table */}
      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50" style={{ height: "42px" }}>
              <HeaderCell
                field="security"
                label="Security"
                className="w-[20%]"
              />
              <HeaderCell field="quantity" label="Qty." className="w-[10%]" />
              <HeaderCell
                field="avgPrice"
                label="Avg. Price"
                className="w-[12%]"
              />
              <HeaderCell field="ltp" label="LTP" className="w-[12%]" />
              <HeaderCell field="type" label="Action" className="w-[16%]" />
              <HeaderCell field="netPL" label="Net P&L" className="w-[15%]" />
              <HeaderCell
                field="dailyPL"
                label="Daily P&L"
                className="w-[15%]"
              />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedPositions.map((position, index) => (
              <tr 
                key={index} 
                className="relative"
                style={{ 
                  height: "38px", 
                  backgroundColor: position.isClosed ? "rgba(232, 232, 232, 0.4)" : "" 
                }}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-2.5 py-0 whitespace-nowrap border-r">
                  <div className="flex items-center justify-between">
                    <span
                      className={position.isClosed ? "text-[#9E9E9E]" : "text-[#6B7280]"}
                      style={{ fontSize: "12px" }}
                    >
                      {position.security}
                    </span>
                    <MoreHorizontal
                      strokeWidth={2}
                      className="w-3 h-3 ml-2 rotate-90 text-gray-400"
                    />
                  </div>
                </td>
                <td
                  className={`px-2.5 py-0 text-center whitespace-nowrap border-r ${position.isClosed ? "text-[#9E9E9E]" : "text-[#6B7280]"}`}
                  style={{ fontSize: "12px" }}
                >
                  {position.quantity}
                </td>
                <td
                  className={`px-2.5 py-0 text-center whitespace-nowrap border-r ${position.isClosed ? "text-[#9E9E9E]" : "text-[#6B7280]"}`}
                  style={{ fontSize: "12px" }}
                >
                  {formatCurrency(position.avgPrice)}
                </td>
                <td
                  className={`px-2.5 py-0 text-center whitespace-nowrap border-r ${position.isClosed ? "text-[#9E9E9E]" : "text-[#6B7280]"}`}
                  style={{ fontSize: "12px" }}
                >
                  {formatCurrency(position.ltp)}
                </td>
                <td
                  className="px-2.5 py-0 whitespace-nowrap border-r"
                  style={{ fontSize: "12px" }}
                >
                  <div className="flex items-center justify-center ">
                    <div
                      className="text-[10px] py-[3px] px-1 rounded-[4px] text-center mr-2 w-auto"
                      style={getActionBadgeStyles(position.action, position.isClosed)}
                    >
                      {position.action}
                    </div>
                    <div
                      className="text-[10px] rounded-[4px] text-center w-auto"
                      style={{
                        padding: "3px 4px",
                        ...getTypeBadgeStyles(position.type, position.isClosed)
                      }}
                    >
                      {position.type}
                    </div>
                  </div>
                </td>
                <td
                  className="px-2.5 py-0 text-center whitespace-nowrap border-r"
                  style={{ fontSize: "12px" }}
                >
                  <span
                    className={
                      position.isClosed
                        ? position.netPL.value < 0
                          ? "text-[#E5393580]" // Faded red for closed trades
                          : "text-[#22A06B80]" // Faded green for closed trades
                        : position.netPL.value < 0
                        ? "text-[#E53935]" // Regular red for active trades
                        : "text-[#22A06B]" // Regular green for active trades
                    }
                  >
                    {formatCurrency(position.netPL.value)}{" "}
                    {formatPercentage(position.netPL.percentage)}
                  </span>
                </td>
                <td
                  className="px-2.5 py-0 text-center whitespace-nowrap"
                  style={{ fontSize: "12px" }}
                >
                  <span
                    className={
                      position.isClosed
                        ? position.dailyPL.value < 0
                          ? "text-[#E5393580]" // Faded red for closed trades
                          : "text-[#22A06B80]" // Faded green for closed trades
                        : position.dailyPL.value < 0
                        ? "text-[#E53935]" // Regular red for active trades
                        : "text-[#22A06B]" // Regular green for active trades
                    }
                  >
                    {formatCurrency(position.dailyPL.value)}{" "}
                    {formatPercentage(position.dailyPL.percentage)}
                  </span>
                </td>

                {/* Hover Buttons - Only show for closed positions */}
                {position.isClosed && hoveredRow === index && (
                  <td className="absolute left-20 top-1/2 transform -translate-y-1/2 z-20">
                    <div className="flex items-center gap-1 bg-[#ffffff] rounded-md px-2 py-1 border-[0.5px] border-[#d1d5d3]">
                      <button 
                        className="flex items-center justify-center w-5 h-5 bg-[#00c852] text-white text-xs font-medium rounded"
                        onClick={() => console.log('Buy clicked for', position.security)}
                      >
                        B
                      </button>
                      <span className="text-[#00c852] text-xs font-medium cursor-pointer">Buy</span>
                      <button 
                        className="flex items-center justify-center w-5 h-5 bg-[#ff5254] text-white text-xs font-medium rounded ml-2"
                        onClick={() => console.log('Sell clicked for', position.security)}
                      >
                        S
                      </button>
                      <span className="text-[#ff5254] text-xs font-medium cursor-pointer">Sell</span>
                      <button 
                        className="flex items-center justify-center w-4 h-6 text-[#6b7280] ml-1"
                        onClick={() => console.log('More options clicked for', position.security)}
                      >
                        <MoreHorizontal className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                )}

                {/* Hover Buttons - Only show for open positions */}
                {!position.isClosed && hoveredRow === index && (
                  <td className="absolute left-20 top-1/2 transform -translate-y-1/2 z-20">
                    <div className="flex items-center gap-1 bg-[#ffffff] rounded-md px-2 py-1 border-[0.5px] border-[#d1d5d3]">
                      <button 
                        className="flex items-center justify-center w-5 h-5 bg-[#00c852] text-white text-xs font-medium rounded"
                        onClick={() => console.log('Buy clicked for', position.security)}
                        aria-label="Buy more"
                      >
                        B
                      </button>
                      <span className="text-[#00c852] text-xs font-medium cursor-pointer">Buy more</span>

                      <span 
                        className="flex items-center gap-1 text-[#6b7280] text-xs font-medium cursor-pointer ml-2"
                        onClick={() => console.log('Set SL/Target clicked for', position.security)}
                      >
                        <img src="/positions/Danger.svg" width={14} height={14} alt="Danger" className="inline-block align-middle text-[#6b7280]" />
                        Set SL/Target
                      </span>

                      <button 
                        className="flex items-center justify-center w-5 h-5 text-white text-xs font-medium rounded ml-2"
                        onClick={() => console.log('Exit clicked for', position.security)}
                        aria-label="Exit"
                      >
                        <img src="/positions/MinusSquare.svg" width={14} height={14} alt="Exit" className="inline-block align-middle text-[#6b7280]" />
                      </button>
                      <span className="text-gray-500 text-xs font-medium cursor-pointer">Exit</span>

                      <button 
                        className="flex items-center justify-center w-4 h-6 text-[#6b7280] ml-1 cursor-pointer"
                        onClick={() => console.log('More options clicked for', position.security)}
                        aria-label="More options"
                      >
                        <svg width="12" height="12" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="19" cy="12" r="1" />
                          <circle cx="5" cy="12" r="1" />
                        </svg>
                      </button>
                    </div>
                  </td>
                )}

              </tr>
            ))}
            <tr className="bg-gray-50 font-medium" style={{ height: "38px" }}>
              <td
                colSpan={5}
                className="px-2.5 py-0 whitespace-nowrap text-xs text-center border-r"
              >
                Total
              </td>
              <td className="px-2.5 py-0 whitespace-nowrap text-center text-xs border-r">
                <span className="text-[#22A06B]">
                  {formatCurrency(totalNetPL.value)}{" "}
                  {formatPercentage(totalNetPL.percentage)}
                </span>
              </td>
              <td className="px-2.5 py-0 whitespace-nowrap text-center text-xs">
                <span className="text-[#22A06B]">
                  {formatCurrency(totalDailyPL.value)}{" "}
                  {formatPercentage(totalDailyPL.percentage)}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Positions;