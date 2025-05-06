"use client";

import React, { useState, useEffect } from "react";
import { Search, X, LayoutList, LayoutGrid } from "lucide-react";
import { HiOutlineAdjustments } from "react-icons/hi";
import Whatsapp from "@/components/gen-components/Whatsapp";
import TradeCardOptions from "./TradeCardOptions";
import GridViewOptions from "./GridViewOptions";

// Define the updated Trade interface to match the new TradeCard props
interface Trade {
  symbol: string;
  strategy: string;
  type: string;
  entryPrice: number;
  exitPrice: number;
  lotSize: number;
  ltp: number;
  stoplossAmount?: number;
  targetAmount?: number;
  marginRequired?: number;
  finalMargin?: number;
}

export default function TradesList() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredTrades, setFilteredTrades] = useState<Trade[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>("");
  const [viewMode, setViewMode] = useState<"card" | "grid">("card");

  // Updated trades data to match the new TradeCard props
  const activeTradesData: Trade[] = [
    {
      symbol: "INDIANOIL",
      strategy: "27 FEB 440 CE",
      type: "BUY",
      entryPrice: 140.35,
      exitPrice: 140.35,
      lotSize: 100,
      ltp: 140.35,
      stoplossAmount: 4570.8,
      targetAmount: 4780.8,
      marginRequired: 134099,
      finalMargin: 134099,
    },
    {
      symbol: "INDIANOIL",
      strategy: "27 FEB 440 CE",
      type: "SELL",
      entryPrice: 40.35,
      exitPrice: 40.35,
      lotSize: 100,
      ltp: 40.35,
      stoplossAmount: 5570.8,
      targetAmount: 5780.8,
      marginRequired: 144099,
      finalMargin: 144099,
    },
    {
      symbol: "INDIANOIL",
      strategy: "27 FEB 440 CE",
      type: "BUY",
      entryPrice: 30.35,
      exitPrice: 30.35,
      lotSize: 100,
      ltp: 9.35,
      stoplossAmount: 3570.8,
      targetAmount: 3780.8,
      marginRequired: 124099,
      finalMargin: 124099,
    },
  ];

  // Filter trades based on search query and filter type
  useEffect(() => {
    let filtered = [...activeTradesData];

    // Apply type filter if selected
    if (filterType) {
      filtered = filtered.filter((trade) => trade.type === filterType);
    }

    // Apply search query if entered
    if (searchQuery.trim() !== "") {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (trade) =>
          trade.symbol.toLowerCase().includes(lowercasedQuery) ||
          trade.type.toLowerCase().includes(lowercasedQuery) ||
          trade.strategy.toLowerCase().includes(lowercasedQuery)
      );
    }

    setFilteredTrades(filtered);
  }, [searchQuery, filterType]);

  // Initialize filtered trades with all trades on component mount
  useEffect(() => {
    setFilteredTrades(activeTradesData);
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilterType("");
    setShowFilters(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        {/* WhatsApp Alerts Button on the left */}
        <Whatsapp />

        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center gap-2 p-1 bg-[#F4F4F9] dark:bg-dark-insidecard rounded-lg">
            <button
              onClick={() => setViewMode("card")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded ${
                viewMode === "card"
                  ? "bg-white dark:bg-dark-cardbg text-[#1DB954]"
                  : "text-gray-500"
              }`}
            >
              <LayoutList size={16} />
              <span className="text-xs">Card</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded ${
                viewMode === "grid"
                  ? "bg-white dark:bg-dark-cardbg text-[#1DB954]"
                  : "text-gray-500"
              }`}
            >
              <LayoutGrid size={16} />
              <span className="text-xs">Grid</span>
            </button>
          </div>

          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-2.5 bg-[#F4F4F9] dark:bg-dark-insidecard rounded-md border dark:border-none h-[42px] ${
                showFilters || filterType
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-[#D1D5DB] text-gray-700"
              }`}
            >
              <HiOutlineAdjustments size={18} className="dark:text-white" />
              <span className="text-xs dark:text-white">Filter</span>
              {filterType && (
                <div className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                  1
                </div>
              )}
            </button>

            {/* Filter Dropdown */}
            {showFilters && (
              <div className="absolute z-10 mt-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <div className="px-4 py-2 text-xs font-medium text-gray-700">
                    Option Type
                  </div>
                  <button
                    className={`w-full px-4 py-2 text-left text-xs ${
                      filterType === "CALL"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setFilterType("CALL")}
                  >
                    CALL
                  </button>
                  <button
                    className={`w-full px-4 py-2 text-left text-xs ${
                      filterType === "PUT"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setFilterType("PUT")}
                  >
                    PUT
                  </button>
                  {filterType && (
                    <div className="border-t border-gray-100 px-4 py-2">
                      <button
                        className="text-xs text-red-500 hover:text-red-700"
                        onClick={resetFilters}
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Search Feature */}
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search size={14} className="text-[#686868]" />
            </div>
            <input
              type="text"
              placeholder="Search everything..."
              className="w-full pl-3 pr-[70px] py-2.5 border border-[#D1D5DB] dark:border-dark-border dark:bg-[#121212] rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 h-[42px]"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {filterType && (
        <div className="flex items-center bg-blue-50 px-4 py-2 rounded-md">
          <span className="text-xs text-gray-700">Filtered by: </span>
          <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            {filterType} options
            <button
              onClick={resetFilters}
              className="ml-1 text-blue-500 hover:text-blue-700"
            >
              <X size={12} />
            </button>
          </span>
        </div>
      )}

      {/* Render based on view mode */}
      {viewMode === "card" ? (
        <div className="space-y-4">
          {filteredTrades.map((trade, index) => (
            <TradeCardOptions key={index} {...trade} />
          ))}
        </div>
      ) : (
        <GridViewOptions
          trades={filteredTrades.map((trade) => ({
            security: trade.symbol,
            type: trade.type === "BUY" ? "BUY" : "SELL",
            date:
              trade.strategy.split(" ")[0] + " " + trade.strategy.split(" ")[1],
            time: "10:30 AM",
            status: "Active",
            entryPrice: `₹${trade.entryPrice.toFixed(2)}`,
            exitPrice: `₹${trade.exitPrice.toFixed(2)}`,
            quantity: trade.lotSize.toString(),
            net: `₹${((trade.ltp - trade.entryPrice) * trade.lotSize).toFixed(
              2
            )}`,
            postedBy: "Trade Advisor",
            marginReq: `₹${trade.marginRequired?.toLocaleString("en-IN")}`,
            duration: "2 days",
          }))}
        />
      )}
    </div>
  );
}
