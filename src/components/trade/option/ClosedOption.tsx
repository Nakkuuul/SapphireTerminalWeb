"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUpDown, List, MoreVertical, X, ArrowRight, LayoutGrid } from 'lucide-react';
import { HiOutlineAdjustments } from "react-icons/hi";
import FixedColumnTable from '@/components/gen-components/FixedColumnTable';

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
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState<'BUY' | 'SELL' | ''>('');
  const [filterDuration, setFilterDuration] = useState<string>('');
  
  const closedTradesData: ClosedTrade[] = [
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'MRF',
      type: 'BUY',
      entryPrice: '₹2,042.63',
      exitPrice: '₹2,042.63',
      quantity: '₹2,042.63',
      duration: '1 month',
      net: '+1'
    },
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'TATASTEEL',
      type: 'SELL',
      entryPrice: '₹8223.60',
      exitPrice: '₹8223.60',
      quantity: '₹8223.60',
      duration: '2 months',
      net: '-1'
    },
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'ITC',
      type: 'BUY',
      entryPrice: '₹92,467.00',
      exitPrice: '₹92,467.00',
      quantity: '₹92,467.00',
      duration: '1 year',
      net: '+8'
    },
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'MOTILALOSWL',
      type: 'SELL',
      entryPrice: '₹88.50',
      exitPrice: '₹88.50',
      quantity: '₹88.50',
      duration: '6 months',
      net: '-1'
    },
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'WIPRO',
      type: 'BUY',
      entryPrice: '₹924.5',
      exitPrice: '₹924.5',
      quantity: '₹924.5',
      duration: '4 year',
      net: '-1'
    }
  ];

  // Filter trades whenever search query or filters change
  useEffect(() => {
    let filtered = [...closedTradesData];
    
    // Apply type filter if selected
    if (filterType) {
      filtered = filtered.filter(trade => trade.type === filterType);
    }
    
    // Apply duration filter if selected
    if (filterDuration) {
      filtered = filtered.filter(trade => trade.duration === filterDuration);
    }
    
    // Apply search query if entered
    if (searchQuery.trim() !== '') {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(trade => 
        trade.security.toLowerCase().includes(lowercasedQuery) ||
        trade.date.toLowerCase().includes(lowercasedQuery) ||
        trade.type.toLowerCase().includes(lowercasedQuery) ||
        trade.entryPrice.toLowerCase().includes(lowercasedQuery) ||
        trade.exitPrice.toLowerCase().includes(lowercasedQuery) ||
        trade.quantity.toLowerCase().includes(lowercasedQuery) ||
        trade.duration.toLowerCase().includes(lowercasedQuery) ||
        trade.net.toLowerCase().includes(lowercasedQuery)
      );
    }
    
    setFilteredTrades(filtered);
  }, [searchQuery, filterType, filterDuration]);

  // Initialize filtered trades with all trades on component mount
  useEffect(() => {
    setFilteredTrades(closedTradesData);
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilterType('');
    setFilterDuration('');
    setShowFilters(false);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filterType) count++;
    if (filterDuration) count++;
    return count;
  };

  const uniqueDurations = Array.from(new Set(closedTradesData.map(trade => trade.duration)));

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search everything..."
            className="w-full h-10 pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {searchQuery ? (
              <button 
                onClick={() => setSearchQuery('')}
                className="h-full w-5 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            ) : (
              <svg className="h-full w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </div>
        </div>
        
        <div className="flex items-center ml-4 gap-4">
          {/* Filter Button - Same height as search */}
          <div className="relative">
            <button 
              className={`flex items-center gap-1 px-3 h-10 rounded-lg border ${
                getActiveFiltersCount() > 0 ? 'bg-blue-50 text-blue-600 border-blue-300' : 'bg-gray-100 text-gray-700 border-gray-300'
              }`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <HiOutlineAdjustments size={16} />
              <span className="text-sm">Filter</span>
              {getActiveFiltersCount() > 0 && (
                <div className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                  {getActiveFiltersCount()}
                </div>
              )}
            </button>
            
            {/* Filter Dropdown */}
            {showFilters && (
              <div className="absolute z-10 mt-1 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <div className="px-4 py-2 text-sm font-medium text-gray-700">Trade Type</div>
                  <button
                    className={`w-full px-4 py-2 text-left text-sm ${filterType === 'BUY' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setFilterType(filterType === 'BUY' ? '' : 'BUY')}
                  >
                    Buy
                  </button>
                  <button
                    className={`w-full px-4 py-2 text-left text-sm ${filterType === 'SELL' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setFilterType(filterType === 'SELL' ? '' : 'SELL')}
                  >
                    Sell
                  </button>
                  
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <div className="px-4 py-2 text-sm font-medium text-gray-700">Duration</div>
                    {uniqueDurations.map((duration) => (
                      <button
                        key={duration}
                        className={`w-full px-4 py-2 text-left text-sm ${filterDuration === duration ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => setFilterDuration(filterDuration === duration ? '' : duration)}
                      >
                        {duration}
                      </button>
                    ))}
                  </div>
                  
                  {getActiveFiltersCount() > 0 && (
                    <div className="border-t border-gray-100 px-4 py-2">
                      <button
                        className="text-sm text-red-500 hover:text-red-700"
                        onClick={resetFilters}
                      >
                        Clear All Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* View Mode Toggle - Same height as search */}
          <div className="flex border rounded-lg overflow-hidden">
            <button 
              className={`p-3 h-full ${viewMode === 'grid' ? 'bg-[#F6F6F6] text-[#28A745]' : 'text-[#212529]'}`}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              className={`p-3 h-full ${viewMode === 'list' ? 'bg-[#F6F6F6] text-[#28A745]' : 'text-[#212529]'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Active Filters Display */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex items-center bg-blue-50 px-4 py-2 rounded-md mb-4">
          <span className="text-sm text-gray-700">Filtered by: </span>
          {filterType && (
            <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {filterType}
              <button onClick={() => setFilterType('')} className="ml-1 text-blue-500 hover:text-blue-700">
                <X size={14} />
              </button>
            </span>
          )}
          {filterDuration && (
            <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {filterDuration}
              <button onClick={() => setFilterDuration('')} className="ml-1 text-blue-500 hover:text-blue-700">
                <X size={14} />
              </button>
            </span>
          )}
          <button 
            onClick={resetFilters}
            className="ml-auto text-xs text-blue-600 hover:text-blue-800"
          >
            Clear All
          </button>
        </div>
      )}
      
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
              onClick={() => {
                setSearchQuery('');
                resetFilters();
              }}
            >
              Clear all filters
            </button>
          </div>
        </div>
      ) : viewMode === 'list' ? (
        /* List View - Scrollable Table with updated styles */
        <FixedColumnTable filteredTrades={closedTradesData} />
      ) : (
        /* Grid View */
      <div className=''>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-4">
        {filteredTrades.map((trade, index) => (
          <div key={index} className="border border-[#8F8F8FCC] rounded-lg overflow-hidden  bg-[#F4F4F9]">
            {/* Card Header */}
            <div className="flex items-center p-4">
              <div className="w-8 h-8 bg-indigo-100 rounded-md flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-lg">{trade.security}</div>
                <div className="text-xs text-[#6B7280] flex items-center">
                  <span>{trade.date}</span> · <span>{trade.time}</span>
                </div>
              </div>
              <div className="ml-auto">
                <span className={`px-2 py-0.5 text-xs rounded ${
                  trade.type === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {trade.type}
                </span>
              </div>
            </div>

            {/* Status Label */}
            <div className="px-3">
              <div className="text-xs text-right">
                <span className="text-gray-500">Status</span>
              </div>
              <div className="text-xs text-right font-medium text-green-600">
                Target Met
              </div>
            </div>
            
            {/* Card Content */}
            <div className="grid grid-cols-4 p-4">
              <div className="flex flex-col">
                <span className="text-base text-gray-500">Entry Price</span>
                <span className="text-base font-medium">{trade.entryPrice}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base text-gray-500">Exit Price</span>
                <span className="text-base font-medium">{trade.exitPrice}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base text-gray-500">Quantity</span>
                <span className="text-base font-medium">{trade.quantity}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base text-gray-500">Net G/L</span>
                <span className="text-base font-medium">{trade.net}</span>
              </div>
            </div>
            
            {/* Posted By */}
            <div className=" p-3 ">
              <div className="text-base py-3 px-2 rounded bg-[rgba(184,219,217,0.3)] text-gray-500">
                Posted by: <span className="text-base text-black ">(Posted.by)</span>
              </div>
            </div>
            
            {/* Margin Requirement */}
            <div className="px-3 py-2 border-t flex items-center justify-center">
              <span className="text-base text-gray-500">Margin req.: </span>
              <span className="text-base ml-1">₹1,34,099</span>
              <svg className="w-3 h-3 ml-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
            </div>
            
            {/* Action Button */}
            <div className="p-3">
              <button className="flex items-center justify-center w-full p-3  rounded bg-[#00C853] text-white hover:bg-green-400 transition-colors">
                About Trade
                <ArrowRight size={22} className='ml-3' />
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>

      )}
    </div>
  );
}