import React from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

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
    <div className="border-b border-gray-200 pb-2">
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-indigo-100 p-1 rounded">
          <Image src="/stock-icon.svg" alt="Stock" width={16} height={16} />
        </div>
        <div className="text-sm font-semibold">{`${symbol} ${date} FUT`}</div>
        <div className={`text-xs font-semibold px-2 py-0.5 rounded ${type === 'BUY' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {type}
        </div>
        <div className="ml-auto flex items-center">
          <div className="font-semibold">₹{price.toLocaleString('en-IN')}</div>
          <div className={`text-xs ml-2 ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-xs mb-4">
        <div>
          <div className="text-gray-500 mb-1">Entry Price</div>
          <div>{entryPrice.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-gray-500 mb-1">Entry Range</div>
          <div>{entryRange}</div>
        </div>
        <div>
          <div className="text-gray-500 mb-1">Stoploss</div>
          <div>{stoploss}</div>
        </div>
        <div>
          <div className="text-gray-500 mb-1">Target</div>
          <div>{target.toLocaleString('en-IN')}</div>
        </div>
        <div>
          <div className="text-gray-500 mb-1">Quantity</div>
          <div>{quantity}</div>
        </div>
        <div>
          <div className="text-gray-500 mb-1">Risk/Reward Ratio</div>
          <div>{riskRewardRatio}</div>
        </div>
      </div>

      <div className="flex items-center mb-2">
        <div className="text-xs text-gray-500 flex items-center">
          Margin required: <span className="font-medium text-gray-700 ml-1">₹{marginRequired.toLocaleString('en-IN')}</span>
          <Info size={12} className="ml-1 text-gray-400" />
        </div>
      </div>

      <div className="flex border-t border-gray-100 mt-2">
        <button 
          className="flex-1 text-center py-2 text-sm text-gray-500"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          About Trade
        </button>
        <button className="flex-1 bg-green-500 text-white py-2 rounded flex items-center justify-center gap-1 text-sm">
          Place Order <ChevronDown size={16} />
        </button>
      </div>
      
      {netGain && (
        <div className="bg-green-50 p-2 mt-2 text-xs text-green-800">
          <div>{`Net Gain: ${netGain}`}</div>
          {postedOn && (
            <div className="flex items-center mt-1 text-gray-500 gap-4">
              <div>{`Posted on: ${postedOn}`}</div>
              {postedBy && <div>{`Posted by: ${postedBy}`}</div>}
              {adviceId && <div>{`Advice ID: ${adviceId}`}</div>}
            </div>
          )}
        </div>
      )}
      
      <div className="flex justify-center mt-1">
        <button 
          className="text-gray-400"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
    </div>
  );
};

export default TradeCard;