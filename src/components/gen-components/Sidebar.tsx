"use client";
import React, { useState } from 'react';
import { Search, Filter, Plus, ChevronUp, ChevronDown, Edit2, Layers, Link, TrendingUp, Trash2, ChevronRight } from 'lucide-react';

interface Stock {
  id: string;
  name: string;
  symbol: string;
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  logo?: React.ReactNode;
}

const Sidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(3);
  const [showTopStocks, setShowTopStocks] = useState(true);
  const [showLatest, setShowLatest] = useState(true);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Hard-coded stock data
  const topStocks: Stock[] = [
    {
      id: '1',
      name: 'Reliance Industries Ltd.',
      symbol: 'RELIANCE',
      exchange: 'NSE',
      price: 2042.63,
      change: 4.10,
      changePercent: 24.7,
      logo: '🏭'
    },
    {
      id: '2',
      name: 'Tata Consultancy Services Ltd.',
      symbol: 'TCS',
      exchange: 'NSE',
      price: 2042.63,
      change: -4.10,
      changePercent: -24.7,
      logo: '💼'
    },
    {
      id: '3',
      name: 'HDFC Bank Ltd.',
      symbol: 'HDFCBANK',
      exchange: 'NSE',
      price: 2042.63,
      change: 4.10,
      changePercent: 24.7,
      logo: '🏦'
    },
    {
      id: '4',
      name: 'Bharti Airtel Ltd.',
      symbol: 'BHARTIARTL',
      exchange: 'NSE',
      price: 2042.63,
      change: 4.10,
      changePercent: 24.7,
      logo: '📱'
    },
    {
      id: '5',
      name: 'Bharti Airtel Ltd.',
      symbol: 'BHARTIARTL',
      exchange: 'NSE',
      price: 2042.63,
      change: 4.10,
      changePercent: 24.7,
      logo: '📱'
    }
  ];

  const latestStocks: Stock[] = [
    {
      id: '6',
      name: 'Reliance Industries Ltd.',
      symbol: 'RELIANCE',
      exchange: 'NSE',
      price: 2042.63,
      change: 4.10,
      changePercent: 24.7,
      logo: '🏭'
    },
    {
      id: '7',
      name: 'Tata Consultancy Services Ltd.',
      symbol: 'TCS',
      exchange: 'NSE',
      price: 2042.63,
      change: -4.10,
      changePercent: -24.7,
      logo: '💼'
    }
  ];

  // Search results data
  const searchResults: Stock[] = [
    {
      id: 'search1',
      name: 'Reliance Industries Ltd.',
      symbol: 'RELIANCE',
      exchange: 'NSE',
      price: 2042.63,
      change: 4.10,
      changePercent: 24.7,
      logo: '🏭'
    },
    {
      id: 'search2',
      name: 'Tata Consultancy Services Ltd.',
      symbol: 'TCS',
      exchange: 'NSE',
      price: 2042.63,
      change: -4.10,
      changePercent: -24.7,
      logo: '💼'
    },
    {
      id: 'search3',
      name: 'Bharti Airtel Ltd.',
      symbol: 'BHARTIARTL',
      exchange: 'NSE',
      price: 2042.63,
      change: 4.10,
      changePercent: 24.7,
      logo: '📱'
    },
    {
      id: 'search4',
      name: 'HDFC Bank Ltd.',
      symbol: 'HDFCBANK',
      exchange: 'NSE',
      price: 2042.63,
      change: 4.10,
      changePercent: 24.7,
      logo: '🏦'
    },
    {
      id: 'search5',
      name: 'HDFC Bank Ltd.',
      symbol: 'HDFCBANK',
      exchange: 'NSE',
      price: 2042.63,
      change: 4.10,
      changePercent: 24.7,
      logo: '🏦'
    },
    {
      id: 'search6',
      name: 'HDFC Bank Ltd.',
      symbol: 'HDFCBANK',
      exchange: 'NSE',
      price: 2042.63,
      change: 4.10,
      changePercent: 24.7,
      logo: '🏦'
    },
    {
      id: 'search7',
      name: 'Bharti Airtel Ltd.',
      symbol: 'BHARTIARTL',
      exchange: 'NSE',
      price: 2042.63,
      change: 4.10,
      changePercent: 24.7,
      logo: '📱'
    }
  ];

  const handleSearchClick = () => {
    setShowSearchResults(true);
  };

  const handleBackToMain = () => {
    setShowSearchResults(false);
    setSearchQuery('');
  };

  const StockItem: React.FC<{ stock: Stock }> = ({ stock }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div 
        className="flex items-center justify-between py-3 hover:bg-gray-50 transition-colors relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
            {stock.logo}
          </div>
          <div>
            <div
              className="font-medium text-gray-900 text-sm"
              style={{
                width: '156px',
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                display: 'block',
              }}
            >
              {stock.name}
            </div>
            <div className="text-xs text-gray-500">
              {stock.symbol} • {stock.exchange}
            </div>
          </div>
        </div>
        
        {/* Hover Action Buttons */}
        {isHovered && (
          <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center z-10">
            <div className="flex items-center space-x-1 px-2">
              <button className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded flex items-center justify-center transition-colors shadow-sm">
                <span className="text-sm font-bold">B</span>
              </button>
              <button className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded flex items-center justify-center transition-colors shadow-sm">
                <span className="text-sm font-bold">S</span>
              </button>
              <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded flex items-center justify-center transition-colors shadow-sm border border-gray-300">
                <Layers className="w-3 h-3" />
              </button>
              <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded flex items-center justify-center transition-colors shadow-sm border border-gray-300">
                <Link className="w-3 h-3" />
              </button>
              <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded flex items-center justify-center transition-colors shadow-sm border border-gray-300">
                <TrendingUp className="w-3 h-3" />
              </button>
              <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded flex items-center justify-center transition-colors shadow-sm border border-gray-300">
                <Trash2 className="w-3 h-3" />
              </button>
              <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded flex items-center justify-center transition-colors shadow-sm border border-gray-300">
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        <div className="text-right">
          <div className="font-semibold text-gray-900 text-[14px]">{stock.price.toFixed(2)}</div>
          <div className={`text-[12px] ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(1)}%)
          </div>
        </div>
      </div>
    );
  };

  const SearchResultItem: React.FC<{ stock: Stock }> = ({ stock }) => (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors border-b border-gray-100">
      <div className="flex items-center space-x-3 flex-1">
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
          {stock.logo}
        </div>
        <div className="flex-1">
          <div className="font-medium text-gray-900 text-sm">
            {stock.name}
          </div>
          <div className="text-xs text-gray-500">
            {stock.symbol} • {stock.exchange}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors">
          B
        </button>
        <button className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors">
          S
        </button>
        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>
    </div>
  );

  const SectionHeader: React.FC<{ title: string; isExpanded: boolean; onToggle: () => void }> = ({
    title,
    isExpanded,
    onToggle
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [savedTitle, setSavedTitle] = useState(title);

    const handleTitleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsEditing(true);
    };

    const handleTitleSave = () => {
      setSavedTitle(editedTitle);
      setIsEditing(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleTitleSave();
      }
      if (e.key === 'Escape') {
        setEditedTitle(savedTitle);
        setIsEditing(false);
      }
    };

    return (
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-100 transition-colors border-b border-gray-200"
      >
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={handleKeyPress}
              className="text-xs font-semibold text-gray-600 uppercase tracking-wide bg-transparent border-none outline-none focus:ring-0 p-0"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide border-none">
              {savedTitle}
            </span>
          )}
          <button
            onClick={handleTitleClick}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <Edit2 className="w-3 h-3" />
          </button>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
    );
  };

  const FilterTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    
    return (
      <div className="flex items-center px-4 py-3 border-b border-gray-200">
        {['All', 'Cash', 'Future', 'Option', 'MF'].map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(index)}
            className={`text-sm font-medium pb-2 border-b-2 transition-colors w-16 ${
              activeTab === index 
                ? 'text-green-600 border-green-500' 
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  };

  if (showSearchResults) {
    return (
      <div className="w-[320px] h-screen mx-auto bg-white shadow-sm ml-[26px] mt-[18px] flex flex-col">
        {/* Search Bar - Fixed */}
        <div className="pt-0 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 text-[#686868]" />
              <input
                type="text"
                placeholder="Search everything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none  text-[#686868]"
              />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <FilterTabs />

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto">
          {searchResults.map((stock) => (
            <SearchResultItem key={stock.id} stock={stock} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-[320px] h-screen mx-auto bg-white shadow-sm ml-[26px] mt-[18px] flex flex-col">
      {/* Search Bar - Fixed */}
      <div className="border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <button 
              onClick={handleSearchClick}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 text-[#686868] z-10"
            >
              <Search className="w-4 h-4" />
            </button>
            <input
              type="text"
              placeholder="Search everything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchClick}
              className="w-full pl-9 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#686868]"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1">
              <Filter className="w-4 h-4 text-[#686868]" />
            </button>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Plus className="w-4 h-4 text-[#686868]" />
          </button>
        </div>
      </div>

      {/* Pagination - Fixed */}
      <div className=" py-3 border-b border-gray-00 flex-shrink-0">
        <div className="flex items-center space-x-1 gap-3">
          {[1, 2, 3, 4, 5, 6].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 h-8 rounded text-sm font-medium transition-colors border-[0.5px] ${currentPage === page
                ? 'bg-[#EEFFF2] text-green-700 border-green-200'
                : 'text-gray-600 bg-[#F4F4F9] border-[#E5E7EB]'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className=" overflow-y-auto">
        {/* Top Stocks Section */}
        <div className='border-none'>
          <SectionHeader
            title="TOP STOCKS"
            isExpanded={showTopStocks}
            onToggle={() => setShowTopStocks(!showTopStocks)}
          />
          {showTopStocks && (
            <div className="divide-y divide-gray-100">
              {topStocks.map((stock) => (
                <StockItem key={stock.id} stock={stock} />
              ))}
            </div>
          )}
        </div>

        {/* Latest Section */}
        <div className="">
          <SectionHeader
            title="LATEST"
            isExpanded={showLatest}
            onToggle={() => setShowLatest(!showLatest)}
          />
          {showLatest && (
            <div className="divide-y divide-gray-100">
              {latestStocks.map((stock) => (
                <StockItem key={stock.id} stock={stock} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;