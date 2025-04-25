import React from "react";
import { Info, ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";

interface TradeCardProps {
  symbol: string;
  strategy?: string;
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

const TradeCardOptions: React.FC<TradeCardProps> = ({
  symbol = "INDIANOIL",
  strategy = "27 FEB 440 CE",
  type = "BUY",
  entryPrice = 40.35,
  exitPrice = 40.35,
  lotSize = 100,
  ltp = 40.35,
  stoplossAmount = 4570.8,
  targetAmount = 4780.8,
  marginRequired = 134099,
  finalMargin = 134099,
  netGain = "+₹12,450 (8.9%)",
  postedOn = "Feb 12, 2024",
  postedBy = "Trade Advisor",
  adviceId = "ADV123456",
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [showGainInfo, setShowGainInfo] = React.useState(false);

  return (
    <div className="border border-border dark:border-dark-border rounded-lg p-4 sm:p-6 bg-surface dark:bg-dark-cardbg">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-[26px]">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Image src="/globe.svg" alt="Stock" width={24} height={24} />
          <div className="text-sm sm:text-base font-normal truncate dark:text-dark-lighttext">{`${symbol} ${strategy}`}</div>
          <div
            className={`text-xs font-semibold px-2 py-0.5 rounded ${
              type === "CALL"
                ? "bg-[#E5FFDC] text-[#34A853]"
                : "bg-red-100 text-red-700"
            }`}
          >
            {type}
          </div>
          <div className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-700 dark:bg-dark-insidecard dark:text-dark-lighttext">
            ₹{exitPrice.toFixed(2)}
          </div>
        </div>
        <div className="flex items-center mt-2 sm:mt-0 sm:ml-auto w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-base sm:text-lg font-normal">
            ₹{ltp.toFixed(2)}
          </span>
          <span
            className={`text-xs ml-2 ${
              ltp >= exitPrice ? "text-green-500" : "text-red-500"
            }`}
          >
            {ltp >= exitPrice ? "+" : ""}
            {(((ltp - exitPrice) / exitPrice) * 100).toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Trade Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 text-xs mb-4">
        <div>
          <span className="text-sm text-text dark:text-dark-graytext">
            Entry Price
          </span>
          <div className="mt-1 text-base font-normal dark:text-dark-lighttext">
            ₹{entryPrice.toFixed(2)}
          </div>
        </div>
        <div>
          <span className="text-sm text-text dark:text-dark-graytext">
            Exit Price
          </span>
          <div className="mt-1 text-base font-normal dark:text-dark-lighttext">
            ₹{exitPrice.toFixed(2)}
          </div>
        </div>
        <div>
          <span className="text-sm text-text dark:text-dark-graytext">
            Lot size
          </span>
          <div className="mt-1 text-base font-normal dark:text-dark-lighttext">
            {lotSize}
          </div>
        </div>
        <div>
          <span className="text-sm text-text dark:text-dark-graytext">
            Stoploss
          </span>
          <div className="mt-1 text-base font-normal dark:text-dark-lighttext">
            ₹{stoplossAmount.toLocaleString("en-IN")}
          </div>
        </div>
        <div>
          <span className="text-sm text-text dark:text-dark-graytext">
            Target
          </span>
          <div className="mt-1 text-base font-normal dark:text-dark-lighttext">
            ₹{targetAmount.toLocaleString("en-IN")}
          </div>
        </div>
        <div>
          <span className="text-sm text-text dark:text-dark-graytext">
            Margin required
          </span>
          <div className="mt-1 text-base font-normal dark:text-dark-lighttext">
            ₹{marginRequired.toLocaleString("en-IN")}
          </div>
        </div>
      </div>

      {/* Margin Required Section */}
      <div className="flex items-center justify-center border-t-[0.5px] py-2 dark:border-t-dark-border text-xs">
        <span className="text-text dark:text-dark-graytext mt-2">
          Final Margin:{" "}
        </span>
        <span className="font-normal mt-2 ml-2 dark:text-dark-lighttext">
          ₹{finalMargin.toLocaleString("en-IN")}
        </span>
        <Image
          src="/info.svg"
          alt="Info"
          width={16}
          height={16}
          className="ml-1 mt-2 text-gray-400"
        />
      </div>

      {/* Button Section */}
      <div className="flex items-center gap-10 pt-3">
        <button
          className="bg-white text-center rounded border border-border text-text dark:text-[#6B7280] py-2 flex-1 text-sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          About Trade
        </button>
        <button className="bg-[#00C853] text-white py-2 rounded flex items-center justify-center flex-1 text-sm">
          Place Order <ArrowRight className="ml-2" size={18} />
        </button>
        <button
          className="text-gray-400 p-2"
          onClick={() => setShowGainInfo(!showGainInfo)}
        >
          {showGainInfo ? (
            <ChevronRight
              size={18}
              className="transform -rotate-90 dark:text-[#D1D5DB]"
            />
          ) : (
            <ChevronDown size={18} className="dark:text-[#D1D5DB]" />
          )}
        </button>
      </div>

      {/* Show Gain Info Section (only visible when dropdown button is clicked) */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showGainInfo ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        {/* Net Gain Section */}
        {netGain && (
          <div className="bg-[#B8DBD94D] dark:bg-[#23232399] p-3 text-xs rounded dark:text-dark-lighttext">
            <div>{`Net Gain: ${netGain}`}</div>
          </div>
        )}

        {/* Posted Information */}
        <div className="flex gap-x-6 sm:gap-4 text-gray-500 dark:text-dark-graytext mt-2 text-xs">
          {postedOn && (
            <div>
              Posted on:{" "}
              <span className="text-[#1A1A1A] dark:text-dark-lighttext font-medium">
                {postedOn}
              </span>
            </div>
          )}
          {postedBy && (
            <div>
              Posted by:{" "}
              <span className="text-[#1A1A1A] dark:text-dark-lighttext font-medium">
                {postedBy}
              </span>
            </div>
          )}
          {adviceId && (
            <div>
              Advice ID:{" "}
              <span className="text-[#1A1A1A] dark:text-dark-lighttext font-medium">
                {adviceId}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradeCardOptions;
