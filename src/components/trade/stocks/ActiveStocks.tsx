"use client";

import React from 'react';
import TradeCard from './TradeCard';

export default function TradesList() {
  // This is where you would normally fetch your active trades data
  const activeTradesData = [
    {
      symbol: 'HINDUUNILVR',
      date: '27 FEB',
      type: 'BUY',
      price: 1489.68,
      percentChange: 2.56,
      entryPrice: 4780.90,
      entryRange: '400-410',
      stoploss: '...',
      target: 4880.00,
      quantity: 300,
      riskRewardRatio: '1/2',
      marginRequired: 334099,
      netGain: '3.16% in 2 days',
      postedOn: '31 Jan 2023 12:20:40',
      postedBy: '[name]',
      adviceId: '[ID]',
    },
    {
      symbol: 'HINDUUNILVR',
      date: '27 FEB',
      type: 'BUY',
      price: 1489.68,
      percentChange: 2.56,
      entryPrice: 4780.90,
      entryRange: '400-410',
      stoploss: '...',
      target: 4880.00,
      quantity: 300,
      riskRewardRatio: '1/2',
      marginRequired: 334099,
    },
    {
      symbol: 'HINDUUNILVR',
      date: '27 FEB',
      type: 'BUY',
      price: 1489.68,
      percentChange: 2.56,
      entryPrice: 4780.90,
      entryRange: '400-410',
      stoploss: '...',
      target: 4880.00,
      quantity: 300,
      riskRewardRatio: '1/2',
      marginRequired: 334099,
    }
  ];

  return (
    <div className="space-y-4">
      {activeTradesData.map((trade, index) => (
        <TradeCard key={index} {...trade} />
      ))}
    </div>
  );
}