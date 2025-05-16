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
    <div className="border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-cardbg overflow-hidden">
      {/* Header Section */}
      <div className="p-4 pb-2">
        <div className="flex items-center gap-2">
          <Image src="/globe.svg" alt="Stock" width={24} height={24} />
          <div className="text-base font-medium text-gray-900 dark:text-dark-lighttext">{symbol}</div>
          <div
            className={`text-xs font-medium px-2 py-0.5 rounded ${
              type === "BUY"
                ? "bg-[#E5FFDC] text-[#34A853]"
                : "bg-red-100 text-red-700"
            }`}
          >
            {type}
          </div>
        </div>
      </div>

      {/* Strategy Table */}
      <div className="bg-[#B8DBD94D] dark:bg-[#23232399] px-4 py-3">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-600 dark:text-gray-400">
              <th className="text-left font-normal pb-2">Strategy</th>
              <th className="text-left font-normal pb-2">Entry</th>
              <th className="text-left font-normal pb-2">Exit</th>
              <th className="text-left font-normal pb-2">Lot size</th>
              <th className="text-left font-normal pb-2">LTP</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-gray-900 dark:text-white">
              <td className="font-normal">{strategy}</td>
              <td className="font-normal">₹{entryPrice.toFixed(2)}</td>
              <td className="font-normal">₹{exitPrice.toFixed(2)}</td>
              <td className="font-normal">{lotSize}</td>
              <td className="font-normal">₹{ltp.toFixed(2)}</td>
            </tr>
            {/* Second row if needed */}
            <tr className="text-gray-900 dark:text-white">
              <td className="font-normal">{strategy}</td>
              <td className="font-normal">₹30.35</td>
              <td className="font-normal">₹30.35</td>
              <td className="font-normal">100</td>
              <td className="font-normal">₹9.35</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Stoploss and Target */}
      <div className="px-4 py-3 flex justify-between">
        <div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Stoploss amount</div>
          <div className="text-base font-normal text-gray-900 dark:text-white">-₹{stoplossAmount.toLocaleString("en-IN")}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Target amount</div>
          <div className="text-base font-normal text-gray-900 dark:text-white">-₹{targetAmount.toLocaleString("en-IN")}</div>
        </div>
      </div>

      {/* Margin Required Section */}
      <div className="px-4 py-3 flex justify-between border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Margin required : </span>
          <span className="text-sm font-normal ml-2 text-gray-900 dark:text-white">₹{marginRequired.toLocaleString("en-IN")}</span>
          <Image
            src="/info.svg"
            alt="Info"
            width={16}
            height={16}
            className="ml-1 text-gray-400"
          />
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Final Margin : </span>
          <span className="text-sm font-normal ml-2 text-gray-900 dark:text-white">₹{finalMargin.toLocaleString("en-IN")}</span>
          <Image
            src="/info.svg"
            alt="Info"
            width={16}
            height={16}
            className="ml-1 text-gray-400"
          />
        </div>
      </div>

      {/* Button Section */}
      <div className="flex px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <button
          className="bg-white border border-gray-300 text-gray-700 rounded-md py-2 px-4 flex-1 text-sm mr-4"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          About Trade
        </button>
        <button className="bg-[#00C853] text-white py-2 px-4 rounded-md flex items-center justify-center flex-1 text-sm">
          Place Order <ArrowRight className="ml-2" size={18} />
        </button>
        <button
          className="text-gray-400 p-2 ml-2"
          onClick={() => setShowGainInfo(!showGainInfo)}
        >
          <ChevronDown size={18} className="dark:text-[#D1D5DB]" />
        </button>
      </div>
    </div>
  );
};

export default TradeCardOptions;
