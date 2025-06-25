"use client";

import React, { useState, useEffect } from "react";
import { Search, X, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { HiOutlineAdjustments } from "react-icons/hi";
import Image from "next/image";

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
  netGain?: string;
  postedOn?: string;
  postedBy?: string;
  adviceId?: string;
}

interface TradeCardProps {
  trade: Trade;
  netGain?: string;
  postedOn?: string;
  postedBy?: string;
  adviceId?: string;
}

export default function TradesList() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredTrades, setFilteredTrades] = useState<Trade[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showGainInfo, setShowGainInfo] = useState<boolean>(false);

  // Updated trades data
  const activeTradesData: Trade[] = [
    {
      symbol: "INDIANOIL",
      strategy: "27 FEB 440 CE",
      type: "BUY",
      entryPrice: 40.35,
      exitPrice: 40.35,
      lotSize: 100,
      ltp: 40.35,
      stoplossAmount: 4570.8,
      targetAmount: 4780.8,
      marginRequired: 134099,
      finalMargin: 134099,
      netGain: "3.16% in 2 days",
      postedOn: "31 Jan 2023 12:20:40",
      postedBy: "[name]",
      adviceId: "[ID]"
    },
    {
      symbol: "INDIANOIL",
      strategy: "27 FEB 440 CE",
      type: "SELL",
      entryPrice: 30.35,
      exitPrice: 30.35,
      lotSize: 100,
      ltp: 9.35,
      stoplossAmount: 3570.8,
      targetAmount: 3780.8,
      marginRequired: 124099,
      finalMargin: 124099,
      netGain: "3.16% in 2 days",
      postedOn: "31 Jan 2023 12:20:40",
      postedBy: "[name]",
      adviceId: "[ID]"
    },
  ];

  useEffect(() => {
    let filtered = [...activeTradesData];

    if (filterType) {
      filtered = filtered.filter((trade) => trade.type === filterType);
    }

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

  useEffect(() => {
    setFilteredTrades(activeTradesData);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const resetFilters = () => {
    setFilterType("");
    setShowFilters(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div></div>

        <div className="flex items-center gap-2">
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

      <div className="space-y-4">
        {filteredTrades.map((trade, index) => (
          <div key={index} className="border border-gray-200 dark:border-dark-border rounded-lg bg-surface dark:bg-dark-cardbg overflow-hidden">
            <div className="py-[14px] px-5 ">
              <div className="flex items-center gap-2">
                <Image src="/globe.svg" alt="Stock" width={24} height={24} />
                <div className="text-base font-medium text-[#212529] dark:text-dark-lighttext">{trade.symbol}</div>
                <div
                  className={`text-xs font-medium px-2 py-0.5 rounded ${
                    trade.type === "BUY"
                      ? "bg-[#E5FFDC] text-[#34A853]"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {trade.type}
                </div>
              </div>
            </div>

            <div className="px-6">
              <div className="bg-[#B8DBD94D] dark:bg-[#23232399] rounded-sm px-4">
                <table className="w-full text-base">
                  <thead>
                    <tr className="text-[#6B7280] text-base dark:text-gray-400">
                      <th className="text-left font-normal py-2 pr-8">Strategy</th>
                      <th className="text-left font-normal py-2 pr-8">Entry</th>
                      <th className="text-left font-normal py-2 pr-8">Exit</th>
                      <th className="text-left font-normal py-2 pr-8">Lot size</th>
                      <th className="text-left font-normal pt-3">LTP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-gray-900 dark:text-white">
                      <td className="font-normal pb-2 pr-8">{trade.strategy}</td>
                      <td className="font-normal pb-2 pr-8">₹{trade.entryPrice.toFixed(2)}</td>
                      <td className="font-normal pb-2 pr-8">₹{trade.exitPrice.toFixed(2)}</td>
                      <td className="font-normal pb-2 pr-8">{trade.lotSize}</td>
                      <td className="font-normal pb-2">₹{trade.ltp.toFixed(2)}</td>
                    </tr>
                    <tr className="text-gray-900 dark:text-white">
                      <td className="font-normal pb-2 pr-8">{trade.strategy}</td>
                      <td className="font-normal pb-2 pr-8">₹30.35</td>
                      <td className="font-normal pb-2 pr-8">₹30.35</td>
                      <td className="font-normal pb-2 pr-8">100</td>
                      <td className="font-normal pb-2">₹9.35</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-6 py-4 flex justify-center gap-24">
              <div className="text-center">
                <div className="text-sm text-[#495057] dark:text-gray-400">Stoploss amount</div>
                <div className="text-sm font-normal text-gray-900 dark:text-white">-₹{trade.stoplossAmount?.toLocaleString("en-IN")}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-[#495057] dark:text-gray-400">Target amount</div>
                <div className="text-sm font-normal text-gray-900 dark:text-white">-₹{trade.targetAmount?.toLocaleString("en-IN")}</div>
              </div>
            </div>

            <div className="px-6 py-3 flex justify-center gap-12 mx-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <span className="text-sm text-[#6B7280] dark:text-gray-400">Margin required : </span>
                <span className="text-sm font-normal ml-2 text-gray-900 dark:text-white">₹{trade.marginRequired?.toLocaleString("en-IN")}</span>
                <Image src="/info.svg" alt="Info" width={16} height={16} className="ml-1 text-[#6B7280]" />
              </div>
              <div className="flex items-center">
                <span className="text-sm text-[#6B7280] dark:text-gray-400">Final Margin : </span>
                <span className="text-sm font-normal ml-2 text-gray-900 dark:text-white">₹{trade.finalMargin?.toLocaleString("en-IN")}</span>
                <Image src="/info.svg" alt="Info" width={16} height={16} className="ml-1 text-[#6B7280]" />
              </div>
            </div>

            <div className="px-6 py-3  ">
              <div className="flex gap-8">
                <button
                  className="w-full text-base text-[#6B7280] px-6 py-2.5 border border-[#D1D5DB] text-gray-700 bg-white dark:bg-dark-insidecard rounded-sm h-[42px]  dark:text-white flex items-center justify-center"
                >
                  About Trade
                </button>
                <button className="w-full text-base px-5 py-2.5 bg-[#00C853] text-white rounded-sm h-[42px]  flex items-center justify-center">
                  Place Order <ArrowRight className="ml-2" size={18} />
                </button>
                <button
                onClick={() => setShowGainInfo(!showGainInfo)}
                className="text-gray-400 py-2 hover:text-gray-600"
              >
                {showGainInfo ? (
                  <ChevronUp size={18} className="dark:text-[#D1D5DB]" />
                ) : (
                  <ChevronDown size={18} className="dark:text-[#D1D5DB]" />
                )}
              </button>
              </div>

            </div>

            {showGainInfo && (
              <div className="px-6 pb-4 space-y-3">
                {trade.netGain && (
                  <div className="bg-[#B8DBD94D] dark:bg-[#23232399] p-3 text-xs rounded dark:text-dark-lighttext">
                    <div>Net Gain: {trade.netGain}</div>
                  </div>
                )}
                <div className="flex gap-6 text-xs text-gray-500 dark:text-dark-graytext">
                  {trade.postedOn && (
                    <div>
                      Posted on:{" "}
                      <span className="text-[#1A1A1A] dark:text-dark-lighttext font-medium">
                        {trade.postedOn}
                      </span>
                    </div>
                  )}
                  {trade.postedBy && (
                    <div>
                      Posted by:{" "}
                      <span className="text-[#1A1A1A] dark:text-dark-lighttext font-medium">
                        {trade.postedBy}
                      </span>
                    </div>
                  )}
                  {trade.adviceId && (
                    <div>
                      Advice ID:{" "}
                      <span className="text-[#1A1A1A] dark:text-dark-lighttext font-medium">
                        {trade.adviceId}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
