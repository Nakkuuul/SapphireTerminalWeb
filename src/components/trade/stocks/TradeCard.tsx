import React from 'react';
import Image from 'next/image';
import { ChevronRight, Info, ArrowRight, ChevronDown } from 'lucide-react';

interface TradeCardProps {
  symbol: string;
  date: string;
  type: string;
  price: number;
  percentChange: number;
  entryPrice: number;
  entryRange: string;
  stoploss?: string;
  target: number;
  quantity: number;
  riskRewardRatio: string;
  marginRequired: number;
  netGain?: string;
  postedOn?: string;
  postedBy?: string;
  adviceId?: string;
}

const TradeCard: React.FC<TradeCardProps> = ({
  symbol,
  date,
  type,
  price,
  percentChange,
  entryPrice,
  entryRange,
  stoploss = '...',
  target,
  quantity,
  riskRewardRatio,
  marginRequired,
  netGain,
  postedOn,
  postedBy,
  adviceId,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [showGainInfo, setShowGainInfo] = React.useState(false);

  return (
    <div className="border rounded-lg p-3 sm:p-4 bg-[#F4F4F9]">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Image src="/globe.svg" alt="Stock" width={24} height={24} />
          <div className="text-base sm:text-xl font-medium truncate">{`${symbol} ${date} FUT`}</div>
          <div className={`text-xs sm:text-sm font-semibold px-2 py-0.5 rounded ${type === 'BUY' ? 'bg-[#E5FFDC] text-[#34A853]' : 'bg-red-100 text-red-700'}`}>{type}</div>
        </div>
        <div className="flex items-center mt-2 sm:mt-0 sm:ml-auto w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-lg sm:text-xl font-bold">₹{price.toLocaleString('en-IN')}</span>
          <span className={`text-xs sm:text-sm ml-2 ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>{percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%</span>
        </div>
      </div>

      {/* Trade Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 text-xs sm:text-sm mb-4">
        <div>
          <span className="text-gray-500">Entry Price</span>
          <div className='mt-1'>{entryPrice.toFixed(2)}</div>
        </div>
        <div>
          <span className="text-gray-500">Entry Range</span>
          <div className='mt-1'>{entryRange}</div>
        </div>
        <div>
          <span className="text-gray-500">Stoploss</span>
          <div className='mt-1'>{stoploss}</div>
        </div>
        <div>
          <span className="text-gray-500">Target</span>
          <div className='mt-1'>{target.toLocaleString('en-IN')}</div>
        </div>
        <div>
          <span className="text-gray-500">Quantity</span>
          <div className='mt-1'>{quantity}</div>
        </div>
        <div>
          <span className="text-gray-500">Risk/Reward Ratio</span>
          <div className='mt-1'>{riskRewardRatio}</div>
        </div>
      </div>

      {/* Margin Required Section */}
      <div className="flex items-center justify-center border-t-[0.5px] text-xs sm:text-base">
        <span className="text-gray-500 mt-2">Margin required: </span>
        <span className="font-medium mt-2 ml-1">₹{marginRequired.toLocaleString('en-IN')}</span>
        <Info size={14} className="ml-1 mt-2 text-gray-400" />
      </div>

      {/* Button Section */}
      <div className="flex items-center gap-10 pt-3">
        <button 
          className="bg-white text-center rounded border border-[#D1D5DB] text-gray-500 py-2 flex-1" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          About Trade
        </button>
        <button 
          className="bg-green-500 text-white py-2 rounded flex items-center justify-center flex-1"
        >
          Place Order <ArrowRight className='ml-2' size={20} />
        </button>
        <button 
          className="text-gray-400 p-2"
          onClick={() => setShowGainInfo(!showGainInfo)}
        >
          {showGainInfo ? <ChevronRight size={20} className="transform -rotate-90" /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* Show Gain Info Section (only visible when dropdown button is clicked) */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showGainInfo ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        {/* Net Gain Section */}
        {netGain && (
          <div className="bg-[#B8DBD94D] p-3 text-xs sm:text-lg rounded">
            <div>{`Net Gain: ${netGain}`}</div>
          </div>
        )}
        
        {/* Posted Information */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-gray-500 mt-2 text-xs sm:text-base">
          {postedOn && <div>Posted on: <span className='text-[#1A1A1A] font-medium'>{postedOn}</span></div>}
          {postedBy && <div>Posted by: <span className='text-[#1A1A1A] font-medium'>{postedBy}</span></div>}
          {adviceId && <div>Advice ID: <span className='text-[#1A1A1A] font-medium'>{adviceId}</span></div>}
        </div>
      </div>


    </div>
  );
};

export default TradeCard;