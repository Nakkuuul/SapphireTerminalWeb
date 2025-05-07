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
      type: "Intraday",
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
      type: "Delivery",
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
      type: "CarryForward",
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
      type: "Intraday",
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
      type: "Intraday",
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
      type: "Intraday",
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
        className={`px-4 py-0 text-left text-base font-normal border-r cursor-pointer hover:bg-gray-100 ${className} 
          ${isActive ? "bg-gray-200" : "bg-gray-50"}`}
        onClick={() => handleSort(field)}
        onMouseEnter={() => setHoveredHeader(field)}
        onMouseLeave={() => setHoveredHeader(null)}
      >
        <div className="flex items-center justify-between">
          <span>{label}</span>
          <ArrowUpDown
            className={`w-4 h-4 ml-2 ${
              hoveredHeader === field || isActive ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </th>
    );
  };

  return (
    <div className="w-full">
      {/* Positions Section Header */}
      <div className="flex justify-between items-center mt-6 mb-4">
        <h2 className="text-xl font-normal">Positions (5)</h2>
        <div className="flex items-center gap-2">
          <DownloadButton />
          <SearchButton />
        </div>
      </div>

      {/* Positions Table */}
      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50" style={{ height: "54px" }}>
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
                style={{ 
                  height: "50px", 
                  backgroundColor: position.isClosed ? "rgba(232, 232, 232, 0.4)" : "" 
                }}
              >
                <td className="px-4 py-0 whitespace-nowrap border-r">
                  <div className="flex items-center justify-between">
                    <span
                      className={position.isClosed ? "text-[#9E9E9E]" : "text-[#6B7280]"}
                      style={{ fontSize: "14px" }}
                    >
                      {position.security}
                    </span>
                    <MoreHorizontal
                      strokeWidth={2}
                      className="w-4 h-4 ml-4 rotate-90 text-gray-400"
                    />
                  </div>
                </td>
                <td
                  className={`px-4 py-0 text-center whitespace-nowrap border-r ${position.isClosed ? "text-[#9E9E9E]" : "text-[#6B7280]"}`}
                  style={{ fontSize: "14px" }}
                >
                  {position.quantity}
                </td>
                <td
                  className={`px-4 py-0 text-center whitespace-nowrap border-r ${position.isClosed ? "text-[#9E9E9E]" : "text-[#6B7280]"}`}
                  style={{ fontSize: "14px" }}
                >
                  {formatCurrency(position.avgPrice)}
                </td>
                <td
                  className={`px-4 py-0 text-center whitespace-nowrap border-r ${position.isClosed ? "text-[#9E9E9E]" : "text-[#6B7280]"}`}
                  style={{ fontSize: "14px" }}
                >
                  {formatCurrency(position.ltp)}
                </td>
                <td
                  className="px-4 py-0 whitespace-nowrap border-r"
                  style={{ fontSize: "14px" }}
                >
                  <div className="flex items-center justify-center">
                    <div
                      className="text-xs rounded-md mr-2 text-center"
                      style={{
                        padding: "3px 6px",
                        minWidth: position.type === "MTF" ? "auto" : "auto",
                        backgroundColor:
                          position.type === "Delivery"
                            ? "#F1F8F6CC"
                            : position.type === "CarryForward"
                            ? "#E3F2FDCC"
                            : position.type === "Intraday"
                            ? "#FFF3E0CC"
                            : position.type === "MTF"
                            ? "#F3E5F5CC"
                            : "#F1F1F1",
                        color:
                          position.type === "Delivery"
                            ? "#2E7D6FB3"
                            : position.type === "CarryForward"
                            ? "#64B5F6B3"
                            : position.type === "Intraday"
                            ? "#FFB74DB3"
                            : position.type === "MTF"
                            ? "#BA68C8B3"
                            : "#666666",
                      }}
                    >
                      {position.type}
                    </div>
                    <div
                      className="text-xs py-[3px] px-1 rounded-md min-w-[50px] text-center"
                      style={{
                        backgroundColor: position.action === "BUY" ? "#E8F5E9CC" : "#FFEBEECC",
                        color: position.action === "BUY" ? "#81C784CC" : "#E57373CC"
                      }}
                    >
                      {position.action}
                    </div>
                  </div>
                </td>
                <td
                  className="px-4 py-0 text-center whitespace-nowrap border-r"
                  style={{ fontSize: "14px" }}
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
                  className="px-4 py-0 text-center whitespace-nowrap"
                  style={{ fontSize: "14px" }}
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
              </tr>
            ))}
            <tr className="bg-gray-50 font-medium" style={{ height: "50px" }}>
              <td
                colSpan={5}
                className="px-4 py-0 whitespace-nowrap text-sm text-center border-r"
              >
                Total
              </td>
              <td className="px-4 py-0 whitespace-nowrap text-center text-sm border-r">
                <span className="text-[#22A06B]">
                  {formatCurrency(totalNetPL.value)}{" "}
                  {formatPercentage(totalNetPL.percentage)}
                </span>
              </td>
              <td className="px-4 py-0 whitespace-nowrap text-center text-sm">
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
