"use client"

import React, { useState } from 'react';
import Performance from './Performance';

interface OrderBookEntry {
  price: number;
  orders: number;
  quantity: number;
}

interface MarketDepthProps {
  bidData?: OrderBookEntry[];
  offerData?: OrderBookEntry[];
  totalBuy?: number;
  totalSell?: number;
  showDepthCount?: number;
}

const MarketDepth: React.FC<MarketDepthProps> = ({
  bidData = Array.from({ length: 20 }, (_, i) => ({ price: 777.67 + i, orders: 2 + i, quantity: 29 + i * 10 })),
  offerData = Array.from({ length: 20 }, (_, i) => ({ price: 777.67 + i, orders: 2 + i, quantity: 29 + i * 10 })),
  totalBuy = 8_99_356,
  totalSell = 8_99_356,
  showDepthCount = 20
}) => {
  const [depth, setDepth] = useState(5);

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const formatPrice = (price: number): string => {
    return price.toFixed(2);
  };

  return (
    <div className="bg-white rounded-lg pt-3 font-sans mb-3 px-2">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-[14px] font-medium text-gray-900">Market Depth</h2>
        <div className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center">
          <span className="text-xs text-gray-600">i</span>
        </div>
      </div>

      {/* Table Headers and Order Book Data with full-height divider */}
      <div className="relative">
        {/* Full-height vertical divider from header to last row */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 z-0" style={{transform: 'translateX(-50%)'}} />
        <div className="relative z-10">
          <div className="grid grid-cols-6 gap-4 mb-2">
            <div className="text-[12px] font-regular text-left text-[#6b7280]">Bid</div>
            <div className="text-[12px] font-regular text-[#6b7280] ml-6 text-center">Orders</div>
            <div className="text-[12px] font-regular text-[#6b7280] ml-4 text-center">Qty.</div>
            <div className="text-[12px] font-regular text-left text-[#6b7280]">Offers</div>
            <div className="text-[12px] font-regular text-[#6b7280] ml-6 text-center">Orders</div>
            <div className="text-[12px] font-regular text-[#6b7280] text-right">Qty.</div>
          </div>
          {bidData.slice(0, depth).map((bid, index) => {
            const offer = offerData[index];
            return (
              <div key={index} className="grid grid-cols-6 gap-4 py-1 items-center">
                {/* Bid Side */}
                <div className="text-[12px] font-regular text-left text-green-600">{formatPrice(bid.price)}</div>
                <div className="text-[12px] text-green-600 ml-10 text-center">{bid.orders}</div>
                <div className="text-[12px] text-green-600 text-right">{bid.quantity}</div>
                {/* Offer Side */}
                <div className="text-[12px] font-regular text-left text-red-600">{formatPrice(offer.price)}</div>
                <div className="text-[12px] text-red-600 ml-10 text-center">{offer.orders}</div>
                <div className="text-[12px] text-red-600 text-right">{offer.quantity}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Totals */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-[12px] font-regular text-[#1a1a1a]">
            Total buy: {formatNumber(totalBuy)}
          </div>
          <div className="text-[12px] font-regular text-[#1a1a1a]">
            Total Sell: {formatNumber(totalSell)}
          </div>
        </div>
      </div>

      {/* Show More Depth Link */}
      <div className="mt-3 text-center">
        <button className="text-[12px] mb-3 py-1 px-[6px] text-green-600 hover:text-green-700 hover:underline" onClick={() => setDepth(depth === 5 ? 20 : 5)}>
          {depth === 5 ? `Show ${showDepthCount} depth` : 'Show less'}
        </button>
      </div>

      <div>
      <Performance />
      </div>
    </div>
  );
};

export default MarketDepth;