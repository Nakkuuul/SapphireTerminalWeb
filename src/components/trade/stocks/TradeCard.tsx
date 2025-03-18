import React from 'react';
import Image from 'next/image';
import { ChevronRight, Info } from 'lucide-react';

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

  return (
    <div className="border rounded-lg shadow-md p-4 bg-[#F4F4F9]">
      <div className="flex items-center gap-2 mb-4">
        <Image src="/globe.svg" alt="Stock" width={24} height={24} />
        <div className="text-lg font-semibold">{`${symbol} ${date} FUT`}</div>
        <div className={`text-sm font-semibold px-2 py-0.5 rounded ${type === 'BUY' ? 'bg-[#E5FFDC] text-[#34A853]' : 'bg-red-100 text-red-700'}`}>{type}</div>
        <div className="ml-auto flex items-center">
          <span className="text-xl font-bold">₹{price.toLocaleString('en-IN')}</span>
          <span className={`text-sm ml-2 ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>{percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%</span>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 text-sm mb-4">
        <div>
          <span className="text-gray-500">Entry Price</span>
          <div>{entryPrice.toFixed(2)}</div>
        </div>
        <div>
          <span className="text-gray-500">Entry Range</span>
          <div>{entryRange}</div>
        </div>
        <div>
          <span className="text-gray-500">Stoploss</span>
          <div>{stoploss}</div>
        </div>
        <div>
          <span className="text-gray-500">Target</span>
          <div>{target.toLocaleString('en-IN')}</div>
        </div>
        <div>
          <span className="text-gray-500">Quantity</span>
          <div>{quantity}</div>
        </div>
        <div>
          <span className="text-gray-500">Risk/Reward Ratio</span>
          <div>{riskRewardRatio}</div>
        </div>
      </div>

      <div className="flex items-center justify-center mb-4 border-b-2">
        <span className="text-gray-500">Margin required: </span>
        <span className=" font-medium text-gray-700 ml-1">₹{marginRequired.toLocaleString('en-IN')}</span>
        <Info size={14} className="ml-1  text-gray-400" />
      </div>

      <div className="flex justify-center gap-x-10 border-t border-gray-100 pt-4">
        <button className="flex-1 bg-white text-center rounded border border-[#D1D5DB] text-gray-500" onClick={() => setIsExpanded(!isExpanded)}>
          About Trade
        </button>
        <button className="flex-1 bg-green-500 text-white py-2 rounded flex items-center justify-center">
          Place Order <ChevronRight size={16} />
        </button>
      </div>

      {netGain && (
        <div className="bg-[#B8DBD94D] p-3 mt-4 text-sm rounded">
          <div>{`Net Gain: ${netGain}`}</div>
          {/* {postedOn && (
            <div className="text-gray-500 mt-2">
              <div>{`Posted on: ${postedOn}`}</div>
              {postedBy && <div>{`Posted by: ${postedBy}`}</div>}
              {adviceId && <div>{`Advice ID: ${adviceId}`}</div>}
            </div>
          )} */}
        </div>
      )}
      <div className="grid grid-cols-3 gap-4 text-gray-500 mt-2">
            <div>{`Posted on: ${postedOn}`}</div>
            <div>{`Posted by: ${postedBy}`}</div>
            <div>{`Advice ID: ${adviceId}`}</div>
      </div>
    </div>
  );
};

export default TradeCard;