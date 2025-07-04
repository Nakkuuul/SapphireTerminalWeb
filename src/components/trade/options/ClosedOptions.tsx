"use client";

import React, { useState, useEffect } from 'react';
import FixedColumnTable from '@/components/gen-components/table/FixedColumnTable';
import SearchFilterControls from '@/components/gen-components/SearchFilterControl';
import GridViewOptions from '@/components/trade/options/GridViewOptions';

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
  status: string;
  postedBy: string;
  marginReq: string;
}

function ClosedTradesList() {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid'); // Default to 'grid'
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
      quantity: '100',
      duration: '1 month',
      net: '+₹1,200',
      status: "Target Miss",
      postedBy: "Nakul",
      marginReq: "₹1,34,099"
    },
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'TATASTEEL',
      type: 'SELL',
      entryPrice: '₹823.60',
      exitPrice: '₹788.40',
      quantity: '50',
      duration: '2 months',
      net: '-₹1,760',
      status: "Target Miss",
      postedBy: "Nakul",
      marginReq: "₹1,34,099"
    },
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'ITC',
      type: 'BUY',
      entryPrice: '₹467.00',
      exitPrice: '₹492.50',
      quantity: '200',
      duration: '1 year',
      net: '+₹5,100',
      status: "Target Miss",
      postedBy: "Nakul",
      marginReq: "₹1,34,099"
    },
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'MOTILALOSWL',
      type: 'SELL',
      entryPrice: '₹988.50',
      exitPrice: '₹930.25',
      quantity: '75',
      duration: '6 months',
      net: '+₹4,368',
      status: "Closed",
      postedBy: "Nakul",
      marginReq: "₹1,34,099"
    },
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'WIPRO',
      type: 'BUY',
      entryPrice: '₹924.50',
      exitPrice: '₹880.30',
      quantity: '120',
      duration: '4 months',
      net: '-₹5,304',
      status: "Closed",
      postedBy: "Nakul",
      marginReq: "₹1,34,099"   
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
      {/* Search Filter Controls with repositioned filter button */}
      <SearchFilterControls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchChange={handleSearchChange}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filterType={filterType}
        setFilterType={setFilterType}
        filterDuration={filterDuration}
        setFilterDuration={setFilterDuration}
        uniqueDurations={uniqueDurations}
        resetFilters={resetFilters}
        getActiveFiltersCount={getActiveFiltersCount}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      
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
        /* List View - Scrollable Table */
          <FixedColumnTable filteredTrades={filteredTrades} />
      ) : (
        /* Grid View */
        <GridViewOptions trades={filteredTrades.map(trade => ({
          ...trade,
          status: trade.status,
          postedBy: trade.postedBy,
          marginReq: trade.marginReq,
        }))} />
      )}
    </div>
  );
}

export default ClosedTradesList;