"use client";

import React, { useState, useEffect } from 'react';
import TradeCard from '../stocks/TradeCard';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';

// Define the Trade interface
interface Trade {
  symbol: string;
  date: string;
  type: string;
  price: number;
  percentChange: number;
  entryPrice: number;
  entryRange: string;
  stoploss: string;
  target: number;
  quantity: number;
  riskRewardRatio: string;
  marginRequired: number;
  netGain?: string;
  postedOn?: string;
  postedBy?: string;
  adviceId?: string;
}

export default function TradesList() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredTrades, setFilteredTrades] = useState<Trade[]>([]);
  
  // This is where you would normally fetch your active trades data
  const activeTradesData: Trade[] = [
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

  // Filter trades based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTrades(activeTradesData);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = activeTradesData.filter(trade => 
        trade.symbol.toLowerCase().includes(lowercasedQuery) ||
        trade.type.toLowerCase().includes(lowercasedQuery) ||
        (trade.postedBy && trade.postedBy.toLowerCase().includes(lowercasedQuery))
      );
      setFilteredTrades(filtered);
    }
  }, [searchQuery]);

  // Initialize filtered trades with all trades on component mount
  useEffect(() => {
    setFilteredTrades(activeTradesData);
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-4">
      <div className='flex items-center justify-between py-2'>
        {/* WhatsApp Alerts Button on the left */}
        <div className='flex items-center'>
        <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm border border-gray-200">
        <FaWhatsapp size={20} className="text-green-500" />
        <span>Get alerts on WhatsApp</span>
        </button>
        </div>

        {/* Search Feature on the right */}
        <div className='relative max-w-xs'>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search everything..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {filteredTrades.length === 0 ? (
        <div className="bg-white p-6 text-center rounded-lg border">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No trades found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search parameters.</p>
          <div className="mt-3">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              onClick={() => setSearchQuery('')}
            >
              Clear search
            </button>
          </div>
        </div>
      ) : (
        filteredTrades.map((trade, index) => (
          <TradeCard key={index} {...trade} />
        ))
      )}
    </div>
  );
}