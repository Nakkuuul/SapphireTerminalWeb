"use client";
import React, { useState } from 'react';
import { Search, Filter, Plus, ChevronUp, ChevronDown, Edit2, Layers, Link, TrendingUp, Trash2, ChevronRight } from 'lucide-react';
import MarketDepth from './MarketDepth';

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
  const [openDepthId, setOpenDepthId] = useState<string | null>(null);

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
      name: 'Infosys Ltd.',
      symbol: 'INFY',
      exchange: 'NSE',
      price: 1500.50,
      change: 10.25,
      changePercent: 0.7,
      logo: '💻'
    },
    {
      id: '6',
      name: 'ICICI Bank Ltd.',
      symbol: 'ICICIBANK',
      exchange: 'NSE',
      price: 900.10,
      change: -2.15,
      changePercent: -0.24,
      logo: '🏦'
    },
    {
      id: '7',
      name: 'Hindustan Unilever Ltd.',
      symbol: 'HINDUNILVR',
      exchange: 'NSE',
      price: 2500.00,
      change: 5.00,
      changePercent: 0.2,
      logo: '🧴'
    },
    {
      id: '8',
      name: 'State Bank of India',
      symbol: 'SBIN',
      exchange: 'NSE',
      price: 600.75,
      change: 3.50,
      changePercent: 0.58,
      logo: '🏦'
    },
    {
      id: '9',
      name: 'Asian Paints Ltd.',
      symbol: 'ASIANPAINT',
      exchange: 'NSE',
      price: 3200.20,
      change: -12.00,
      changePercent: -0.37,
      logo: '🎨'
    },
    {
      id: '10',
      name: 'Bajaj Finance Ltd.',
      symbol: 'BAJFINANCE',
      exchange: 'NSE',
      price: 7000.00,
      change: 50.00,
      changePercent: 0.72,
      logo: '💳'
    },
    {
      id: '11',
      name: 'Maruti Suzuki India Ltd.',
      symbol: 'MARUTI',
      exchange: 'NSE',
      price: 9000.00,
      change: 100.00,
      changePercent: 1.12,
      logo: '🚗'
    },
    {
      id: '12',
      name: 'Larsen & Toubro Ltd.',
      symbol: 'LT',
      exchange: 'NSE',
      price: 2500.00,
      change: 20.00,
      changePercent: 0.81,
      logo: '🏗️'
    },
    {
      id: '13',
      name: 'Sun Pharmaceutical Industries Ltd.',
      symbol: 'SUNPHARMA',
      exchange: 'NSE',
      price: 1100.00,
      change: 8.00,
      changePercent: 0.73,
      logo: '💊'
    },
    {
      id: '14',
      name: 'Nestle India Ltd.',
      symbol: 'NESTLEIND',
      exchange: 'NSE',
      price: 22000.00,
      change: -150.00,
      changePercent: -0.68,
      logo: '🍫'
    },
    {
      id: '15',
      name: 'UltraTech Cement Ltd.',
      symbol: 'ULTRACEMCO',
      exchange: 'NSE',
      price: 8000.00,
      change: 60.00,
      changePercent: 0.75,
      logo: '🏢'
    }
  ];

  const latestStocks: Stock[] = [
    {
      id: '16',
      name: 'Reliance Industries Ltd.',
      symbol: 'RELIANCE',
      exchange: 'NSE',
      price: 2042.63,
      change: 4.10,
      changePercent: 24.7,
      logo: '🏭'
    },
    {
      id: '17',
      name: 'Tata Consultancy Services Ltd.',
      symbol: 'TCS',
      exchange: 'NSE',
      price: 2042.63,
      change: -4.10,
      changePercent: -24.7,
      logo: '💼'
    },
    {
      id: '18',
      name: 'HDFC Bank Ltd.',
      symbol: 'HDFCBANK',
      exchange: 'NSE',
      price: 2042.63,
      change: 4.10,
      changePercent: 24.7,
      logo: '🏦'
    },
    {
      id: '19',
      name: 'Bharti Airtel Ltd.',
      symbol: 'BHARTIARTL',
      exchange: 'NSE',
      price: 2042.63,
      change: 4.10,
      changePercent: 24.7,
      logo: '📱'
    },
    {
      id: '20',
      name: 'Infosys Ltd.',
      symbol: 'INFY',
      exchange: 'NSE',
      price: 1500.50,
      change: 10.25,
      changePercent: 0.7,
      logo: '💻'
    },
    {
      id: '21',
      name: 'ICICI Bank Ltd.',
      symbol: 'ICICIBANK',
      exchange: 'NSE',
      price: 900.10,
      change: -2.15,
      changePercent: -0.24,
      logo: '🏦'
    },
    {
      id: '22',
      name: 'Hindustan Unilever Ltd.',
      symbol: 'HINDUNILVR',
      exchange: 'NSE',
      price: 2500.00,
      change: 5.00,
      changePercent: 0.2,
      logo: '🧴'
    },
    {
      id: '23',
      name: 'State Bank of India',
      symbol: 'SBIN',
      exchange: 'NSE',
      price: 600.75,
      change: 3.50,
      changePercent: 0.58,
      logo: '🏦'
    },
    {
      id: '24',
      name: 'Asian Paints Ltd.',
      symbol: 'ASIANPAINT',
      exchange: 'NSE',
      price: 3200.20,
      change: -12.00,
      changePercent: -0.37,
      logo: '🎨'
    },
    {
      id: '25',
      name: 'Bajaj Finance Ltd.',
      symbol: 'BAJFINANCE',
      exchange: 'NSE',
      price: 7000.00,
      change: 50.00,
      changePercent: 0.72,
      logo: '💳'
    },
    {
      id: '26',
      name: 'Maruti Suzuki India Ltd.',
      symbol: 'MARUTI',
      exchange: 'NSE',
      price: 9000.00,
      change: 100.00,
      changePercent: 1.12,
      logo: '🚗'
    },
    {
      id: '27',
      name: 'Larsen & Toubro Ltd.',
      symbol: 'LT',
      exchange: 'NSE',
      price: 2500.00,
      change: 20.00,
      changePercent: 0.81,
      logo: '🏗️'
    },
    {
      id: '28',
      name: 'Sun Pharmaceutical Industries Ltd.',
      symbol: 'SUNPHARMA',
      exchange: 'NSE',
      price: 1100.00,
      change: 8.00,
      changePercent: 0.73,
      logo: '💊'
    },
    {
      id: '29',
      name: 'Nestle India Ltd.',
      symbol: 'NESTLEIND',
      exchange: 'NSE',
      price: 22000.00,
      change: -150.00,
      changePercent: -0.68,
      logo: '🍫'
    },
    {
      id: '30',
      name: 'UltraTech Cement Ltd.',
      symbol: 'ULTRACEMCO',
      exchange: 'NSE',
      price: 8000.00,
      change: 60.00,
      changePercent: 0.75,
      logo: '🏢'
    }
  ];

  // Combine all stocks for searching
  const allStocks: Stock[] = [...topStocks, ...latestStocks];

  // Filtered search results based on searchQuery
  const filteredSearchResults: Stock[] =
    searchQuery.trim() === ''
      ? []
      : allStocks.filter(stock =>
          stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.exchange.toLowerCase().includes(searchQuery.toLowerCase())
        );

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
        className="flex items-center justify-between py-3 transition-colors relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
            {stock.logo}
          </div>
          <div>
            <div
              className="font-medium text-gray-900 text-sm mb-[4px]"
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
              {stock.symbol} • <span className='bg-[#F4F4F9] rounded-[3px] px-[6px] py-[2px]'>{stock.exchange}</span>
            </div>
          </div>
        </div>
        
        {/* Hover Action Buttons */}
        {isHovered && (
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#F4F4F9] flex flex-col items-center z-10 rounded-[3px] shadow-[0_2px_4px_0_#FAFAFA] w-1/2 min-w-[120px] w-auto px-[6px] py-[6px] border border-gray-200"
          >
            <div className="flex items-center space-x-1">
              <button className="w-6 h-6 hover:bg-[#04B94E] text-white rounded flex items-center justify-center transition-colors shadow-sm bg-[#00CA52]">
                <span className="text-xs font-bold">B</span>
              </button>
              <button className="w-6 h-6 hover:bg-[#F84848] text-white rounded flex items-center justify-center transition-colors shadow-sm bg-[#FF5252]">
                <span className="text-xs font-bold">S</span>
              </button>
              <button className="w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded flex items-center justify-center transition-colors shadow-sm border-[0.3px] border-[#8F8F8F]"
                onClick={e => { e.stopPropagation(); setOpenDepthId(openDepthId === stock.id ? null : stock.id); }}>
                <img src="/LayerIcon.svg" alt="Layer" className="w-3 h-3" style={{fontSize: '12px'}} />
              </button>
              <button className="w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded flex items-center justify-center transition-colors shadow-sm border-[0.3px] border-[#8F8F8F]">
                <img src="/LinkIcon.svg" alt="Link" className="w-3 h-3" style={{fontSize: '12px'}} />
              </button>
              <button className="w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded flex items-center justify-center transition-colors shadow-sm border-[0.3px] border-[#8F8F8F]">
                <img src="/GraphIcon.svg" alt="TrendingUp" className="w-3 h-3" style={{fontSize: '12px'}} />
              </button>
              <button className="w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded flex items-center justify-center transition-colors shadow-sm border-[0.3px] border-[#8F8F8F]">
                <img src="/DustbinIcon.svg" alt="Trash" className="w-3 h-3" style={{fontSize: '12px'}} />
              </button>
              <button className="w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded flex items-center justify-center transition-colors shadow-sm border-[0.3px] border-[#8F8F8F]">
                <ChevronRight className="w-3 h-3" style={{fontSize: '12px'}} />
              </button>
            </div>
          </div>
        )}

        <div className="text-right">
          <div className="font-semibold text-medium text-gray-900 text-[14px] mb-[4px]">{stock.price.toFixed(2)}</div>
          <div className={`text-[12px] ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(1)}%)
          </div>
        </div>
      </div>
    );
  };

  const SearchResultItem: React.FC<{ stock: Stock }> = ({ stock }) => (
    <div className="flex items-center justify-between py-3 hover:bg-gray-50 transition-colors border-b border-gray-100">
      <div className="flex items-center space-x-3 flex-1">
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
          {stock.logo}
        </div>
        <div className="flex-1">
          <div className="font-medium text-gray-900 text-sm mb-[4px]">
            {stock.name}
          </div>
          <div className="text-xs text-gray-500">
            {stock.symbol} • <span className='bg-[#F4F4F9] rounded-[3px] px-[6px] py-[2px]'>{stock.exchange}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <button className="px-2 py-1 bg-green-500 text-white text-xs rounded rounded-[3px] transition-colors">
          B
        </button>
        <button className="px-2 py-1 bg-red-500 text-white text-xs rounded rounded-[3px] transition-colors">
          S
        </button>
        <button className="p-1 pl-0 text-gray-400 hover:text-gray-600 transition-colors">
          <img src="/BookmarkLogo.svg" alt="Bookmark" className="w-6 h-6" />
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
      <div className="flex items-center border-b border-gray-200 mb-[6px]">
        {['All', 'Cash', 'Future', 'Option', 'MF'].map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(index)}
            className={`text-sm font-medium p-[10px] border-b-[2px] transition-colors w-16 ${
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
      <div className="fixed top-20 left-0 w-[320px] h-[calc(100vh-64px)] bg-white shadow-sm ml-[26px] mt-[18px] flex flex-col overflow-hidden z-30">
        {/* Search Bar - Fixed */}
        <div className="pt-0  border-gray-200 flex-shrink-0  mb-2">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <button 
                onClick={handleSearchClick}
                className="absolute left-3 top-1/2 transform -translate-y-1/2  w-4 h-4 text-[#686868] z-10"
              >
                <Search className="w-4 h-4" />
              </button>
              <input
                type="text"
                placeholder="Search everything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchClick}
                className="w-full pl-9 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none  text-[#686868]"
              />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <FilterTabs />

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          {filteredSearchResults.length === 0 && searchQuery.trim() !== '' && (
            <div className="text-center text-gray-400 py-8">No results found.</div>
          )}
          {filteredSearchResults.map((stock) => (
            <SearchResultItem key={stock.id} stock={stock} />
          ))}
        </div>
      </div>
    );
  }

  return (
    // <div className="w-[320px] h-screen mx-auto bg-white shadow-sm ml-[26px] mt-[18px] flex flex-col overflow-hidden">
      <div className="fixed top-20 left-0 w-[328px] h-[calc(100vh-64px)] bg-white shadow-sm ml-[26px] mt-[18px] flex flex-col overflow-hidden z-30">
      {/* Search Bar - Fixed */}
      <div className=" border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <button 
              onClick={handleSearchClick}
              className="absolute left-3 top-1/2 transform -translate-y-1/2  w-4 h-4 text-[#686868] z-10"
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
          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <Plus className="w-5 h-5 text-[#686868]" />
          </button>
        </div>
      </div>

      {/* Pagination - Fixed */}
      <div className="py-3 border-b border-gray-00 flex-shrink-0">
        <div className="relative">
          <div className="flex items-center space-x-1 gap-3 overflow-x-auto hide-scrollbar pb-0">
            {Array.from({ length: 20 }, (_, i) => i + 1).map((page) => (
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
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto hide-scrollbar pr-1 border border-gray-200 pl-[6px] pr-[6px]">
        {/* Top Stocks Section */}
        <div className='border-none'>
          <SectionHeader
            title="TOP STOCKS"
            isExpanded={showTopStocks}
            onToggle={() => setShowTopStocks(!showTopStocks)}
          />
          {showTopStocks && (
            <div className="divide-y divide-gray-100">
              {topStocks.map((stock) => [
                <StockItem key={stock.id} stock={stock} />,
                openDepthId === stock.id && (
                  <div key={stock.id + '-depth'} className="w-full"><MarketDepth /></div>
                )
              ])}
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
              {latestStocks.map((stock) => [
                <StockItem key={stock.id} stock={stock} />,
                openDepthId === stock.id && (
                  <div key={stock.id + '-depth'} className="w-full"><MarketDepth /></div>
                )
              ])}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

/* Add this to your global CSS for auto-hide scrollbars */
/*
.auto-hide-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  transition: scrollbar-color 0.2s;
}
.auto-hide-scrollbar:hover, .auto-hide-scrollbar:focus-within, .auto-hide-scrollbar:active {
  scrollbar-color: #9CA3AF #F3F4F6;
}
.auto-hide-scrollbar::-webkit-scrollbar {
  height: 0.5px;
  width: 6px;
  background: transparent;
}
.auto-hide-scrollbar::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 0;
  transition: background 0.2s;
}
.auto-hide-scrollbar:hover::-webkit-scrollbar-thumb,
.auto-hide-scrollbar:focus-within::-webkit-scrollbar-thumb,
.auto-hide-scrollbar:active::-webkit-scrollbar-thumb {
  background: #9CA3AF;
}
*/