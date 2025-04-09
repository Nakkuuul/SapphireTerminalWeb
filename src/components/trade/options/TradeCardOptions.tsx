import React from 'react';
import Image from 'next/image';
import { Info, ArrowRight, ChevronDown } from 'lucide-react';

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
}

const TradeCardOptions: React.FC<TradeCardProps> = ({
  symbol,
  strategy = '',
  type,
  entryPrice,
  exitPrice,
  lotSize,
  ltp,
  stoplossAmount,
  targetAmount,
  marginRequired,
  finalMargin,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="border rounded-lg bg-white shadow-sm">
      {/* Header Section */}
      <div className="flex items-center p-3 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white">
            <span>●</span>
          </div>
          <div className="text-base font-medium uppercase">{symbol}</div>
        </div>
        <div className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-sm ${type === 'BUY' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{type}</div>
      </div>

      {/* Strategy and Details Section */}
      <div className="bg-green-50 p-4">
        <div className="grid grid-cols-4 text-sm mb-4">
          <div>
            <span className="text-gray-500">Strategy</span>
            <div className="font-medium">{strategy}</div>
          </div>
          <div>
            <span className="text-gray-500">Entry</span>
            <div className="font-medium">₹{entryPrice.toFixed(2)}</div>
          </div>
          <div>
            <span className="text-gray-500">Exit</span>
            <div className="font-medium">₹{exitPrice.toFixed(2)}</div>
          </div>
          <div>
            <span className="text-gray-500">Lot size</span>
            <div className="font-medium">{lotSize}</div>
          </div>
          <div className="col-span-4 mt-4">
            <span className="text-gray-500">LTP</span>
            <div className="font-medium">₹{ltp.toFixed(2)}</div>
          </div>
        </div>

        {/* Stoploss and Target Section */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex-1">
            <span className="text-gray-500 text-xs">Stoploss amount</span>
            <div className="font-medium text-red-600">-₹{(stoplossAmount || 0).toLocaleString('en-IN')}</div>
          </div>
          <div className="flex-1 text-right">
            <span className="text-gray-500 text-xs">Target amount</span>
            <div className="font-medium text-green-600">+₹{(targetAmount || 0).toLocaleString('en-IN')}</div>
          </div>
        </div>

        {/* Margin Information */}
        <div className="flex justify-between items-center mt-4 text-xs">
          <div className="flex items-center">
            <span className="text-gray-500">Margin required:</span>
            <span className="ml-1 font-medium">₹{(marginRequired || 0).toLocaleString('en-IN')}</span>
            <Info size={12} className="ml-1 text-gray-400" />
          </div>
          <div className="flex items-center">
            <span className="text-gray-500">Final Margin:</span>
            <span className="ml-1 font-medium">₹{(finalMargin || 0).toLocaleString('en-IN')}</span>
            <Info size={12} className="ml-1 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Button Section */}
      <div className="grid grid-cols-2 border-t">
        <button 
          className="bg-white text-center text-gray-600 py-3 px-4 border-r"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          About Trade
        </button>
        <button 
          className="bg-green-500 text-white py-3 px-4 flex items-center justify-center"
        >
          Place Order <ArrowRight className="ml-2" size={16} />
        </button>
      </div>

      {/* Expand/Collapse Button */}
      <div className="flex justify-center border-t">
        <button 
          className="text-gray-400 p-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChevronDown size={20} />
        </button>
      </div>
    </div>
  );
};

export default TradeCardOptions;