import React from 'react';
import { Info, ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';
import Image from 'next/image';

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
  strategy = '27 FEB 440 CE',
  type = "BUY",
  entryPrice = 40.35,
  exitPrice = 40.35,
  lotSize = 100,
  ltp = 40.35,
  stoplossAmount = 4570.80,
  targetAmount = 4780.80,
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
    <div className="border rounded-lg bg-[#F4F4F9] dark:bg-dark-cardbg shadow-sm p-6">
      {/* Header Section */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-orange-500 flex items-center justify-center text-white">
          <span className="text-xs font-bold">{symbol.substring(0, 3)}</span>
        </div>
        <div className="text-base font-medium dark:text-dark-lighttext">{symbol}</div>
        <div className={`ml-1 px-2 py-0.5 rounded text-xs font-semibold ${type === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {type}
        </div>
      </div>

      {/* Strategy and Details Section */}
      <div className="bg-[#B8DBD94D] dark:bg-dark-insidecard rounded mt-3">
        <div className="grid grid-cols-5 text-lg">
          <div className="p-3">
            <div className="text-text text-base dark:text-dark-graytext">Strategy</div>
            <div className="font-normal mt-1  dark:text-dark-lighttext" >{strategy}</div>
            <div className="font-normal   dark:text-dark-lighttext">{strategy}</div>
          </div>
          <div className="p-3">
            <div className="text-text text-base dark:text-dark-graytext">Entry</div>
            <div className="font-normal mt-1  dark:text-dark-lighttext" >₹{entryPrice.toFixed(2)}</div>
            <div className="font-normal  dark:text-dark-lighttext" >₹{entryPrice.toFixed(2)}</div>
          </div>
          <div className="p-3">
            <div className="text-text text-base dark:text-dark-graytext">Exit</div>
            <div className="font-normal mt-1  dark:text-dark-lighttext" >₹{exitPrice.toFixed(2)}</div>
            <div className="font-normal  dark:text-dark-lighttext" >₹{exitPrice.toFixed(2)}</div>
          </div>
          <div className="p-3">
            <div className="text-text text-base dark:text-dark-graytext">Lot size</div>
            <div className="font-normal mt-1 dark:text-dark-lighttext">{lotSize}</div>
            <div className="font-normal dark:text-dark-lighttext">{lotSize}</div>
          </div>
          <div className="p-3">
            <div className="text-text text-base dark:text-dark-graytext">LTP</div>
            <div className="font-normal mt-1 dark:text-dark-lighttext">₹{ltp.toFixed(2)}</div>
            <div className="font-normal dark:text-dark-lighttext">₹{ltp.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Stoploss and Target Section */}
      <div className="flex justify-center gap-x-5 text-base">
        <div className="p-3 text-center">
          <div className="text-gray-600  dark:text-dark-graytext">Stoploss amount</div>
          <div className="font-normal mt-1 text-lg dark:text-dark-lighttext">-₹{stoplossAmount.toLocaleString('en-IN')}</div>
        </div>
        <div className="p-3 text-center">
          <div className="text-gray-600 dark:text-dark-graytext">Target amount</div>
          <div className="font-normal mt-1 text-lg dark:text-dark-lighttext">-₹{targetAmount.toLocaleString('en-IN')}</div>
        </div>
      </div>

      {/* Margin Information */}
      <div className="flex justify-center gap-6 text-base border-t dark:border-t-dark-border pt-3 text-[#6B7280] dark:text-dark-graytext">
        <div className="flex items-center">
          <span >Margin required :</span>
          <span className="ml-1 text-[#1A1A1A] font-normal dark:text-dark-lighttext">₹{marginRequired.toLocaleString('en-IN')}</span>
          <Image src="/info.svg" alt="Info" width={16} height={16} className="ml-1 text-gray-400" />
        </div>
        <div className="flex items-center">
          <span >Final Margin :</span>
          <span className="ml-1 text-[#1A1A1A] font-normal dark:text-dark-lighttext">₹{finalMargin.toLocaleString('en-IN')}</span>
          <Image src="/info.svg" alt="Info" width={16} height={16} className="ml-1 text-gray-400" />
        </div>
      </div>

      {/* Button Section */}
      <div className="flex text-xl font-medium mt-4 gap-4">
        <button 
          className="bg-white text-center border border-gray-200 text-gray-600 py-3 px-4 rounded flex-1" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          About Trade
        </button>
        <button 
          className="bg-green-500 text-white py-3 px-4 rounded flex items-center justify-center flex-1"
        >
          Place Order <ArrowRight className="ml-2" size={18} />
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
          <div className="bg-[#B8DBD94D] p-3 text-sm sm:text-lg rounded">
            <div>{`Net Gain: ${netGain}`}</div>
          </div>
        )}
        
        {/* Posted Information */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-gray-500 mt-2 text-sm">
          {postedOn && <div>Posted on: <span className='text-[#1A1A1A] dark:text-dark-lighttext font-medium'>{postedOn}</span></div>}
          {postedBy && <div>Posted by: <span className='text-[#1A1A1A] dark:text-dark-lighttext font-medium'>{postedBy}</span></div>}
          {adviceId && <div>Advice ID: <span className='text-[#1A1A1A] dark:text-dark-lighttext font-medium'>{adviceId}</span></div>}
        </div>
      </div>
    </div>
  );
};

export default TradeCardOptions;