"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Filter, Grid, List, MoreVertical } from 'lucide-react';

interface ClosedTrade {
  date: string;
  time: string;
  security: string;
  type: 'BUY' | 'SELL';
  entryPrice: string;
  exitPrice: string;
  quantity: string;
  duration: string;
  net: string;
}

export default function ClosedTradesList() {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTrades, setFilteredTrades] = useState<ClosedTrade[]>([]);
  
  const closedTradesData: ClosedTrade[] = [
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'TATAMOTORS 27 FEB FUT',
      type: 'BUY',
      entryPrice: '₹4,780.90',
      exitPrice: '₹4,780.90',
      quantity: '100',
      duration: '1 month',
      net: '100'
    },
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'TATAMOTORS 27 FEB FUT',
      type: 'BUY',
      entryPrice: '₹4,780.90',
      exitPrice: '₹4,780.90',
      quantity: '100',
      duration: '2 months',
      net: '100'
    },
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'TATAMOTORS 27 FEB FUT',
      type: 'SELL',
      entryPrice: '₹4,780.90',
      exitPrice: '₹4,780.90',
      quantity: '100',
      duration: '1 year',
      net: '100'
    },
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'TATAMOTORS 27 FEB FUT',
      type: 'BUY',
      entryPrice: '₹4,780.90',
      exitPrice: '₹4,780.90',
      quantity: '100',
      duration: '6 months',
      net: '100'
    }
  ];

  // Filter trades whenever search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTrades(closedTradesData);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = closedTradesData.filter(trade => 
        trade.security.toLowerCase().includes(lowercasedQuery) ||
        trade.date.toLowerCase().includes(lowercasedQuery) ||
        trade.type.toLowerCase().includes(lowercasedQuery) ||
        trade.entryPrice.toLowerCase().includes(lowercasedQuery) ||
        trade.exitPrice.toLowerCase().includes(lowercasedQuery) ||
        trade.quantity.toLowerCase().includes(lowercasedQuery) ||
        trade.duration.toLowerCase().includes(lowercasedQuery) ||
        trade.net.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredTrades(filtered);
    }
  }, [searchQuery]);

  // Initialize filtered trades with all trades on component mount
  useEffect(() => {
    setFilteredTrades(closedTradesData);
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search everything..."
            className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="absolute right-3 top-2.5">
            {searchQuery ? (
              <button 
                onClick={() => setSearchQuery('')}
                className="h-5 w-5 text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ) : (
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </div>
        </div>
        
        <div className="flex items-center ml-4 gap-4">
          <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-lg text-gray-700">
            <Filter size={16} />
            <span className="text-sm">Filter</span>
          </button>
          
          <div className="flex border rounded-lg overflow-hidden">
            <button 
              className={`p-1.5 ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} className="text-gray-700" />
            </button>
            <button 
              className={`p-1.5 ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={16} className="text-gray-700" />
            </button>
          </div>
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
      ) : viewMode === 'list' ? (
        /* List View - Scrollable Table */
        <div className="w-full overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">
                  <div className="flex items-center">
                    Date & Time
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th className="p-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">
                  <div className="flex items-center">
                    Security
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th className="p-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">
                  <div className="flex items-center">
                    Entry Price
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th className="p-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">
                  <div className="flex items-center">
                    Exit Price
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th className="p-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">
                  <div className="flex items-center">
                    Quantity
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th className="p-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">
                  <div className="flex items-center">
                    Duration
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th className="p-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">
                  <div className="flex items-center">
                    Net
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTrades.map((trade, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{trade.date}</div>
                    <div className="text-sm text-gray-500">{trade.time}</div>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{trade.security}</span>
                      <span className={`ml-2 px-2 py-0.5 text-xs rounded ${
                        trade.type === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {trade.type}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 whitespace-nowrap text-sm text-gray-900">{trade.entryPrice}</td>
                  <td className="p-3 whitespace-nowrap text-sm text-gray-900">{trade.exitPrice}</td>
                  <td className="p-3 whitespace-nowrap text-sm text-gray-900">{trade.quantity}</td>
                  <td className="p-3 whitespace-nowrap text-sm text-gray-900">{trade.duration}</td>
                  <td className="p-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {trade.net}
                    </div>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {filteredTrades.map((trade, index) => (
            <div key={index} className="border rounded-lg overflow-hidden bg-white">
              {/* Card Header */}
              <div className="flex justify-between items-center p-3 border-b">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{trade.security}</div>
                    <div className="text-xs text-gray-500">
                      <span>{trade.date}</span> · <span>{trade.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-0.5 text-xs rounded ${
                    trade.type === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {trade.type}
                  </span>
                  <div className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                    {index % 2 === 0 ? "Target Met" : "Stopped Out"}
                  </div>
                </div>
              </div>
              
              {/* Card Content */}
              <div className="grid grid-cols-3 gap-1 p-3">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Entry Price</span>
                  <span className="text-sm font-medium">{trade.entryPrice}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Exit Price</span>
                  <span className="text-sm font-medium">{trade.exitPrice}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Quantity</span>
                  <span className="text-sm font-medium">{trade.quantity}</span>
                </div>
                
                <div className="flex flex-col mt-1">
                  <span className="text-xs text-gray-500">Net G/L</span>
                  <span className="text-sm font-medium">{trade.net}</span>
                </div>
              </div>
              
              {/* Card Footer */}
              <div className="p-3 pt-0 flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  <span>Posted by: <span className="text-gray-700">(Posted.by)</span></span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center text-xs">
                    <span className="text-gray-500 mr-1">Margin req.: </span>
                    <span className="text-gray-700">₹1,34,099</span>
                    <svg className="w-3 h-3 ml-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Action Button */}
              <div className="border-t">
                <button className="flex items-center justify-center w-full p-2 bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                  About Trade
                  <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}