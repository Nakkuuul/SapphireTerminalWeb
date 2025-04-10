//@ts-nocheck
"use client"

import { Filter, Plus, X, Edit, Check, GripVertical, ChevronDown, ChevronRight } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface Stock {
  id: string;
  name: string;
  symbol: string;
  category: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon?: string;
}

interface Subheading {
  id: string;
  title: string;
  isExpanded: boolean;
  stocks: Stock[];
}

interface Watchlist {
  id: number;
  name: string;
  subheadings: Subheading[];
  unassignedStocks: Stock[];
}

// Drag item types
const ItemTypes = {
  SUBHEADING: 'subheading',
  STOCK: 'stock'
};


// Draggable Stock component with hover actions that replace price info
// Draggable Stock component with hover actions and popup menu
const DraggableStock = ({ stock, subheadingId, index, moveStock }) => {
  const ref = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    }

    // Add event listener when popup is shown
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  // Set up drag
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.STOCK,
    item: {
      type: ItemTypes.STOCK,
      id: stock.id,
      fromSubheadingId: subheadingId,
      index // Add index for reordering
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Set up drop for reordering within the same subheading
  const [, drop] = useDrop({
    accept: ItemTypes.STOCK,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex && item.fromSubheadingId === subheadingId) {
        return;
      }

      // Only handle reordering within the same subheading here
      if (item.fromSubheadingId === subheadingId) {
        // Call moveStock to reorder within the subheading
        moveStock(item.fromSubheadingId, dragIndex, hoverIndex);

        // Update the index for the dragged item
        item.index = hoverIndex;
      }
    },
  });

  // Connect drag and drop refs
  drag(drop(ref));

  // Action handlers
  const handleBuy = (e) => {
    e.stopPropagation();
    console.log(`Placing buy order for ${stock.symbol}`);
  };

  const handleSell = (e) => {
    e.stopPropagation();
    console.log(`Placing sell order for ${stock.symbol}`);
  };

  const handleEye = (e) => {
    e.stopPropagation();
    console.log(`Add ${stock.symbol} to watchlist`);
  };

  const handleLink = (e) => {
    e.stopPropagation();
    console.log(`Copy link to ${stock.symbol}`);
  };

  const handleChart = (e) => {
    e.stopPropagation();
    console.log(`View chart for ${stock.symbol}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    console.log(`Remove ${stock.symbol} from watchlist`);
  };

  const handleMore = (e) => {
    e.stopPropagation();
    setShowPopup(true);
  };

  // Popup menu item handlers
  const handleAddSectionAbove = () => {
    console.log(`Add section above ${stock.symbol}`);
    setShowPopup(false);
  };

  const handleOpenChart = () => {
    console.log(`Open chart for ${stock.symbol}`);
    setShowPopup(false);
  };

  const handleAddAlert = () => {
    console.log(`Add alert for ${stock.symbol}`);
    setShowPopup(false);
  };

  const handleCreateGTT = () => {
    console.log(`Create GTT for ${stock.symbol}`);
    setShowPopup(false);
  };

  const handleOptionChain = () => {
    console.log(`View option chain for ${stock.symbol}`);
    setShowPopup(false);
  };

  return (
    <div
      ref={ref}
      className={`py-3 border-b border-gray-100 flex items-center cursor-move ${isDragging ? 'opacity-50' : 'opacity-100'
        } relative`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="w-6 h-6 flex items-center justify-center mr-2">
        <GripVertical size={14} className="text-gray-300 mr-1" />
        <span className="text-sm">{stock.icon}</span>
      </div>
      <div className="flex-grow pr-2">
        <div className="text-base font-medium truncate">
          {stock.name}
        </div>
        <div className="text-xs flex items-center font-medium text-gray-500 ">
          <span>{stock.symbol}</span>
          <span className="mx-1">•</span>
          <span className="bg-[#F4F4F9] rounded-md p-1 text-[#495057]">
            {stock.category}
          </span>
        </div>
      </div>

      {/* Conditionally show either price info or action buttons */}
      <div className="min-w-[170px] flex justify-end items-center">
        {isHovering && !isDragging ? (
          <div className="flex space-x-1">
            {/* Buy button */}
            <button
              onClick={handleBuy}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors shadow-sm"
              title="Buy"
            >
              <span className="font-bold text-xs">B</span>
            </button>

            {/* Sell button */}
            <button
              onClick={handleSell}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm"
              title="Sell"
            >
              <span className="font-bold text-xs">S</span>
            </button>

            {/* Eye/Watch button */}
            <button
              onClick={handleEye}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors shadow-sm"
              title="Watch"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>

            {/* Link button */}
            <button
              onClick={handleLink}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors shadow-sm"
              title="Copy Link"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>

            {/* Chart button */}
            <button
              onClick={handleChart}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors shadow-sm"
              title="Chart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4m0 10v-6m0 0H7m0 0v6m6-6v6" />
              </svg>
            </button>

            {/* Delete button */}
            <button
              onClick={handleDelete}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors shadow-sm"
              title="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>

            {/* More button - now opens popup */}
            <div className="relative">
              <button
                onClick={handleMore}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors shadow-sm relative"
                title="More"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Popup Menu */}
              {showPopup && (
                <div
                  ref={popupRef}
                  className="absolute z-50 right-0 top-8 bg-white shadow-lg rounded-md border border-gray-200 w-60"
                >
                  {/* Locate options */}
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="text-sm font-medium mb-1">Locate</div>
                    <div className="flex gap-2">
                      <button className="w-8 h-6 bg-green-100 rounded-md text-xs text-gray-700 hover:bg-green-200">1</button>
                      <button className="w-8 h-6 bg-green-100 rounded-md text-xs text-gray-700 hover:bg-green-200">2</button>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="py-1">
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                      onClick={handleAddSectionAbove}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      </svg>
                      Add section above
                    </button>

                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-left bg-blue-50 hover:bg-blue-100"
                      onClick={handleOpenChart}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4m0 10v-6m0 0H7m0 0v6m6-6v6" />
                      </svg>
                      Open Chart
                    </button>

                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                      onClick={handleAddAlert}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      Add alert
                    </button>

                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                      onClick={handleCreateGTT}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create GTT
                    </button>
                  </div>

                  {/* Bottom menu item with border */}
                  <div className="border-t border-gray-100">
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                      onClick={handleOptionChain}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Option chain
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-right">
            <div className="text-[12px] font-medium">{stock.value}</div>
            <div
              className={`text-[11px] ${stock.isPositive ? "text-green-500" : "text-red-500"
                }`}
            >
              {stock.change}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
// Draggable Subheading component
const DraggableSubheading = ({ subheading, index, moveSubheading, updateSubheading, removeSubheading, moveStockToSubheading, moveStockWithinSubheading }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.SUBHEADING,
    item: { type: ItemTypes.SUBHEADING, id: subheading.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.SUBHEADING,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Move the subheading in the list
      moveSubheading(dragIndex, hoverIndex);

      // Update the index for the dragged item
      item.index = hoverIndex;
    },
  });

  const [, stockDrop] = useDrop({
    accept: ItemTypes.STOCK,
    drop: (item) => {
      if (item.fromSubheadingId !== subheading.id) {
        // Moving from one subheading to another
        moveStockToSubheading(item.id, item.fromSubheadingId, subheading.id);
      }
    },
  });

  // Connect drag and drop refs
  drag(drop(stockDrop(ref)));

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(subheading.title);

  const toggleExpanded = () => {
    updateSubheading(subheading.id, {
      ...subheading,
      isExpanded: !subheading.isExpanded
    });
  };

  const handleEditSave = () => {
    if (editTitle.trim()) {
      updateSubheading(subheading.id, {
        ...subheading,
        title: editTitle.trim()
      });
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={ref}
      className={`mb-4 rounded-md border border-gray-200 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="bg-gray-50 p-3 rounded-t-md flex items-center">
        <div className="cursor-move mr-2 text-gray-400">
          <GripVertical size={16} />
        </div>

        <div className="flex-1 flex items-center">
          <button
            onClick={toggleExpanded}
            className="mr-2 text-gray-500"
          >
            {subheading.isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>

          {isEditing ? (
            <div className="flex items-center">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm w-48"
                autoFocus
              />
              <button
                onClick={handleEditSave}
                className="ml-2 text-green-500"
              >
                <Check size={14} />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="ml-1 text-red-500"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div className="font-medium text-sm flex-1">{subheading.title}</div>
          )}
        </div>

        <div className="flex items-center">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-gray-600 mr-2"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => removeSubheading(subheading.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {subheading.isExpanded && (
        <div className="p-2">
          {subheading.stocks.length > 0 ? (
            subheading.stocks.map((stock, stockIndex) => (
              <DraggableStock
                key={stock.id}
                stock={stock}
                subheadingId={subheading.id}
                index={stockIndex}
                moveStock={moveStockWithinSubheading}
              />
            ))
          ) : (
            <div className="py-3 text-center text-gray-500 text-xs italic">
              Drag stocks here
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Unassigned Stocks Drop Area component
const UnassignedStocksArea = ({ stocks, moveStockToSubheading, searchTerm, moveStockWithinSubheading }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.STOCK,
    drop: (item) => {
      if (item.fromSubheadingId !== null) {
        moveStockToSubheading(item.id, item.fromSubheadingId, null);
      }
    },
  });

  const filteredStocks = searchTerm
    ? stocks.filter(stock =>
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : stocks;

  return (
    <div ref={drop} className="mt-4">
      <h4 className="text-xs font-medium text-gray-500 mb-2">
        Unassigned Stocks ({filteredStocks.length})
      </h4>

      {filteredStocks.length > 0 ? (
        filteredStocks.map((stock, index) => (
          <DraggableStock
            key={stock.id}
            stock={stock}
            subheadingId={null}
            index={index}
            moveStock={moveStockWithinSubheading}
          />
        ))
      ) : (
        <div className="py-4 text-center text-gray-500 text-sm">
          {searchTerm
            ? "No stocks matching your search"
            : "All stocks have been assigned to groups"}
        </div>
      )}
    </div>
  );
};

// Main wrapper component to be used in the app
const Sidebar = () => {
  // Generate unique IDs for stocks and subheadings
  const generateId = () => `id-${Math.random().toString(36).substr(2, 9)}`;

  // Initial stock data
  const initialStocks = [
    {
      id: generateId(),
      name: "Reliance Industries Ltd.",
      symbol: "RELIANCE",
      category: "NSE",
      value: "2,042.63",
      change: "+0.10 (+0.47%)",
      isPositive: true,
      icon: "🏭",
    },
    {
      id: generateId(),
      name: "Tata Consultancy Ltd.",
      symbol: "TCS",
      category: "NSE",
      value: "2,042.63",
      change: "-12.70 (-0.24%)",
      isPositive: false,
      icon: "💻",
    },
    {
      id: generateId(),
      name: "HDFC Bank Ltd.",
      symbol: "HDFCBANK",
      category: "NSE",
      value: "1,678.20",
      change: "+6.85 (+0.42%)",
      isPositive: true,
      icon: "🏦",
    },
    {
      id: generateId(),
      name: "Bharti Airtel Ltd.",
      symbol: "BHARTIARTL",
      category: "NSE",
      value: "895.50",
      change: "+0.10 (+0.47%)",
      isPositive: true,
      icon: "📱",
    },
    {
      id: generateId(),
      name: "Infosys Ltd.",
      symbol: "INFY",
      category: "NSE",
      value: "1,478.90",
      change: "+10.35 (+0.71%)",
      isPositive: true,
      icon: "💻",
    },
    {
      id: generateId(),
      name: "ICICI Bank Ltd.",
      symbol: "ICICIBANK",
      category: "NSE",
      value: "956.40",
      change: "+3.25 (+0.34%)",
      isPositive: true,
      icon: "🏦",
    },
  ];

  // Initial watchlists with some subheadings
  const initialWatchlists = [
    {
      id: 1,
      name: "My Portfolio",
      subheadings: [
        {
          id: generateId(),
          title: "Banking Stocks",
          isExpanded: true,
          stocks: [initialStocks[2], initialStocks[5]],
        },
        {
          id: generateId(),
          title: "Tech Stocks",
          isExpanded: true,
          stocks: [initialStocks[1], initialStocks[4]],
        },
      ],
      unassignedStocks: [initialStocks[0], initialStocks[3]],
    },
    {
      id: 2,
      name: "Market Watch",
      subheadings: [],
      unassignedStocks: initialStocks.slice(0, 3),
    },
    {
      id: 3,
      name: "High Growth",
      subheadings: [
        {
          id: generateId(),
          title: "Top Gainers",
          isExpanded: true,
          stocks: [initialStocks[0], initialStocks[4]],
        },
      ],
      unassignedStocks: [initialStocks[2]],
    },
    {
      id: 4,
      name: "Dividend Stocks",
      subheadings: [],
      unassignedStocks: [initialStocks[3], initialStocks[5]],
    },
  ];

  const marketIndices = [
    {
      name: "Nifty 50",
      value: "21,754.29",
      change: "+37.02 (+0.17%)",
      isPositive: true,
    },
    {
      name: "Sensex",
      value: "71,715.96",
      change: "-27.43 (-0.38%)",
      isPositive: false,
    },
  ];

  // State management
  const [watchlists, setWatchlists] = useState(initialWatchlists);
  const [activeTab, setActiveTab] = useState(1);
  const [showAddTab, setShowAddTab] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState("");
  const [editingWatchlist, setEditingWatchlist] = useState(null);
  const [editName, setEditName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddSubheading, setShowAddSubheading] = useState(false);
  const [newSubheadingName, setNewSubheadingName] = useState("");

  // Get active watchlist
  const activeWatchlist =
    watchlists.find((wl) => wl.id === activeTab) || watchlists[0];

  // Get all stocks from the active watchlist
  const getAllStocks = () => {
    const subheadingStocks = activeWatchlist.subheadings.flatMap(
      (sh) => sh.stocks
    );
    return [...subheadingStocks, ...activeWatchlist.unassignedStocks];
  };

  // Filter stocks based on search term
  const filteredStocks = searchTerm
    ? getAllStocks().filter(
      (stock) =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : getAllStocks();

  // Handle adding a new watchlist
  const handleAddWatchlist = () => {
    if (newWatchlistName.trim()) {
      const newId = Math.max(...watchlists.map((wl) => wl.id), 0) + 1;

      // Add 5 dummy stocks to the new watchlist
      const dummyStocks = Array(5)
        .fill(null)
        .map((_, i) => ({
          id: generateId(),
          name: `${newWatchlistName.trim()} Stock ${i + 1}`,
          symbol: `STCK${i + 1}`,
          category: "NSE",
          value: `${Math.floor(1000 + Math.random() * 9000)}.${Math.floor(
            Math.random() * 100
          )}`,
          change:
            Math.random() > 0.5
              ? `+${(Math.random() * 10).toFixed(2)} (+${(
                Math.random() * 2
              ).toFixed(2)}%)`
              : `-${(Math.random() * 10).toFixed(2)} (-${(
                Math.random() * 2
              ).toFixed(2)}%)`,
          isPositive: Math.random() > 0.5,
          icon: ["🏭", "💻", "🏦", "📱", "🌐"][Math.floor(Math.random() * 5)],
        }));

      const newWatchlist = {
        id: newId,
        name: newWatchlistName.trim(),
        subheadings: [],
        unassignedStocks: dummyStocks,
      };

      setWatchlists([...watchlists, newWatchlist]);
      setActiveTab(newId);
      setShowAddTab(false);
      setNewWatchlistName("");
    }
  };

  // Handle removing a watchlist
  const handleRemoveWatchlist = (id, e) => {
    e.stopPropagation();
    if (watchlists.length > 1) {
      const newWatchlists = watchlists.filter((wl) => wl.id !== id);
      setWatchlists(newWatchlists);

      // If the active tab is being removed, set the first available tab as active
      if (activeTab === id) {
        setActiveTab(newWatchlists[0].id);
      }
    }
  };

  // Handle editing a watchlist name
  const startEditingWatchlist = (id, name, e) => {
    e.stopPropagation();
    setEditingWatchlist(id);
    setEditName(name);
  };

  const saveWatchlistName = (id) => {
    if (editName.trim()) {
      setWatchlists(
        watchlists.map((wl) =>
          wl.id === id ? { ...wl, name: editName.trim() } : wl
        )
      );
      setEditingWatchlist(null);
      setEditName("");
    }
  };

  // Handle adding a new subheading
  const handleAddSubheading = () => {
    if (newSubheadingName.trim()) {
      const newSubheading = {
        id: generateId(),
        title: newSubheadingName.trim(),
        isExpanded: true,
        stocks: [],
      };

      setWatchlists(
        watchlists.map((wl) =>
          wl.id === activeTab
            ? {
              ...wl,
              subheadings: [...wl.subheadings, newSubheading],
            }
            : wl
        )
      );

      setShowAddSubheading(false);
      setNewSubheadingName("");
    }
  };

  // Handle updating a subheading
  const updateSubheading = (subheadingId, updatedSubheading) => {
    setWatchlists(
      watchlists.map((wl) =>
        wl.id === activeTab
          ? {
            ...wl,
            subheadings: wl.subheadings.map((sh) =>
              sh.id === subheadingId ? updatedSubheading : sh
            ),
          }
          : wl
      )
    );
  };

  // Handle removing a subheading
  const removeSubheading = (subheadingId) => {
    // Find the subheading first to get its stocks
    const subheadingToRemove = activeWatchlist.subheadings.find(
      (sh) => sh.id === subheadingId
    );

    if (subheadingToRemove) {
      // Move all stocks from the subheading to unassigned
      setWatchlists(
        watchlists.map((wl) =>
          wl.id === activeTab
            ? {
              ...wl,
              subheadings: wl.subheadings.filter(
                (sh) => sh.id !== subheadingId
              ),
              unassignedStocks: [
                ...wl.unassignedStocks,
                ...subheadingToRemove.stocks,
              ],
            }
            : wl
        )
      );
    }
  };

  // Handle moving a subheading in the list (drag and drop)
  const moveSubheading = (dragIndex, hoverIndex) => {
    const draggedSubheading = activeWatchlist.subheadings[dragIndex];

    setWatchlists(
      watchlists.map((wl) => {
        if (wl.id === activeTab) {
          const newSubheadings = [...wl.subheadings];
          newSubheadings.splice(dragIndex, 1);
          newSubheadings.splice(hoverIndex, 0, draggedSubheading);

          return {
            ...wl,
            subheadings: newSubheadings,
          };
        }
        return wl;
      })
    );
  };

  // NEW FUNCTION: Handle moving stocks within a subheading (reordering)
  const moveStockWithinSubheading = (subheadingId, fromIndex, toIndex) => {
    setWatchlists(
      watchlists.map((wl) => {
        if (wl.id === activeTab) {
          if (subheadingId === null) {
            // Reordering within unassigned stocks
            const newUnassignedStocks = [...wl.unassignedStocks];
            const movedStock = newUnassignedStocks[fromIndex];
            newUnassignedStocks.splice(fromIndex, 1);
            newUnassignedStocks.splice(toIndex, 0, movedStock);

            return {
              ...wl,
              unassignedStocks: newUnassignedStocks,
            };
          } else {
            // Reordering within a subheading
            return {
              ...wl,
              subheadings: wl.subheadings.map((sh) => {
                if (sh.id === subheadingId) {
                  const newStocks = [...sh.stocks];
                  const movedStock = newStocks[fromIndex];
                  newStocks.splice(fromIndex, 1);
                  newStocks.splice(toIndex, 0, movedStock);

                  return {
                    ...sh,
                    stocks: newStocks,
                  };
                }
                return sh;
              }),
            };
          }
        }
        return wl;
      })
    );
  };

  // Handle moving a stock between subheadings or to/from unassigned
  const moveStockToSubheading = (stockId, fromSubheadingId, toSubheadingId) => {
    // If from and to are the same, do nothing
    if (fromSubheadingId === toSubheadingId) return;

    setWatchlists(
      watchlists.map((wl) => {
        if (wl.id === activeTab) {
          let updatedWatchlist = { ...wl };
          let stockToMove;

          // Remove stock from source
          if (fromSubheadingId === null) {
            // Moving from unassigned stocks
            stockToMove = updatedWatchlist.unassignedStocks.find(
              (s) => s.id === stockId
            );
            updatedWatchlist.unassignedStocks =
              updatedWatchlist.unassignedStocks.filter((s) => s.id !== stockId);
          } else {
            // Moving from a subheading
            const sourceSubheadingIndex =
              updatedWatchlist.subheadings.findIndex(
                (sh) => sh.id === fromSubheadingId
              );

            if (sourceSubheadingIndex !== -1) {
              stockToMove = updatedWatchlist.subheadings[
                sourceSubheadingIndex
              ].stocks.find((s) => s.id === stockId);

              updatedWatchlist.subheadings[sourceSubheadingIndex].stocks =
                updatedWatchlist.subheadings[
                  sourceSubheadingIndex
                ].stocks.filter((s) => s.id !== stockId);
            }
          }

          // Add stock to destination
          if (stockToMove) {
            if (toSubheadingId === null) {
              // Moving to unassigned stocks
              updatedWatchlist.unassignedStocks.push(stockToMove);
            } else {
              // Moving to a subheading
              const destSubheadingIndex =
                updatedWatchlist.subheadings.findIndex(
                  (sh) => sh.id === toSubheadingId
                );

              if (destSubheadingIndex !== -1) {
                updatedWatchlist.subheadings[destSubheadingIndex].stocks.push(
                  stockToMove
                );
              }
            }
          }

          return updatedWatchlist;
        }
        return wl;
      })
    );
  };

  // The main sidebar content component that needs DnD context
  const SidebarContent = () => (
    <div className="hidden md:flex fixed top-16 left-0 bottom-0 w-[30%] bg-white dark:bg-dark-background border-r border-gray-200 dark:border-dark-border flex-col">
      {/* Search and filter - Fixed section */}
      <div className="p-5 border-b border-gray-200 dark:border-dark-border flex-shrink-0">
        <div className="flex justify-between items-center">
          <div className="relative flex-1 mr-2">
            <input
              type="text"
              placeholder="Search stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-8 pr-3 border border-gray-300 dark:border-dark-border rounded-md text-sm bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-dark-secondary"
            />
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400 dark:text-dark-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <button className="flex items-center justify-center px-3 py-3 bg-[#F4F4F9] dark:bg-dark-surface rounded-md">
            <Filter size={16} className="text-gray-600 dark:text-dark-secondary" />
            <span className="ml-1 text-xs text-gray-600 dark:text-dark-secondary">Filter</span>
          </button>
        </div>

        {/* Watchlist tabs */}
        <div className="flex mt-4 overflow-x-auto pb-2 scrollbar-thin">
          {watchlists.map((watchlist) => (
            <button
              key={watchlist.id}
              onClick={() => setActiveTab(watchlist.id)}
              className={`h-9 flex items-center justify-center rounded-md px-3 min-w-min whitespace-nowrap mr-2 ${activeTab === watchlist.id
                ? "bg-[#EEFFF2] border border-[#28A745] text-[#28A745]"
                : "bg-[#F4F4F9] border border-[#D1D5DB] text-[#495057]"
                }`}
            >
              {editingWatchlist === watchlist.id ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-20 px-1 bg-transparent border-none focus:outline-none text-sm"
                    autoFocus
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      saveWatchlistName(watchlist.id);
                    }}
                    className="text-green-500 ml-1"
                  >
                    <Check size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="text-sm">{watchlist.name}</span>
                  <div className="ml-2 flex items-center">
                    <button
                      onClick={(e) =>
                        startEditingWatchlist(watchlist.id, watchlist.name, e)
                      }
                      className="text-gray-400 hover:text-gray-600 mx-0.5"
                    >
                      <Edit size={12} />
                    </button>
                    {watchlists.length > 1 && (
                      <button
                        onClick={(e) => handleRemoveWatchlist(watchlist.id, e)}
                        className="text-gray-400 hover:text-red-500 mx-0.5"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </button>
          ))}

          {/* Add new watchlist button or input field */}
          {showAddTab ? (
            <div className="flex items-center bg-[#F4F4F9] border border-[#D1D5DB] rounded-md px-2 h-9 mr-2">
              <input
                type="text"
                placeholder="Watchlist name"
                value={newWatchlistName}
                onChange={(e) => setNewWatchlistName(e.target.value)}
                className="w-24 bg-transparent border-none focus:outline-none text-sm"
                autoFocus
              />
              <button
                onClick={handleAddWatchlist}
                className="text-green-500 ml-1"
              >
                <Check size={14} />
              </button>
              <button
                onClick={() => {
                  setShowAddTab(false);
                  setNewWatchlistName("");
                }}
                className="text-red-500 ml-1"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAddTab(true)}
              className="h-9 flex items-center justify-center rounded-md px-3 bg-[#F4F4F9] border border-[#D1D5DB] text-[#495057] mr-2"
            >
              <Plus size={14} className="mr-1" />
              <span className="text-xs">New</span>
            </button>
          )}
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-5">
          {/* Market indices */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Market Indices
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {marketIndices.map((index, i) => (
                <div key={i} className="bg-[#F4F4F9] p-2 rounded">
                  <div className="text-xs font-medium">{index.name}</div>
                  <div className="text-sm font-bold">{index.value}</div>
                  <div
                    className={`text-xs ${index.isPositive ? "text-green-500" : "text-red-500"
                      }`}
                  >
                    {index.change}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Watchlist header with add subheading button */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-700">
              {activeWatchlist.name} ({filteredStocks.length})
            </h3>

            {/* Add Subheading Button */}
            {showAddSubheading ? (
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Group name"
                  value={newSubheadingName}
                  onChange={(e) => setNewSubheadingName(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-xs w-32"
                  autoFocus
                />
                <button
                  onClick={handleAddSubheading}
                  className="text-green-500 ml-1"
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={() => {
                    setShowAddSubheading(false);
                    setNewSubheadingName("");
                  }}
                  className="text-red-500 ml-1"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAddSubheading(true)}
                className="text-xs flex items-center text-green-600 hover:text-green-700"
              >
                <Plus size={14} className="mr-1" />
                Add Group
              </button>
            )}
          </div>

          {/* Subheadings with their stocks */}
          <div className="space-y-2">
            {activeWatchlist.subheadings.map((subheading, index) => (
              <DraggableSubheading
                key={subheading.id}
                subheading={subheading}
                index={index}
                moveSubheading={moveSubheading}
                updateSubheading={updateSubheading}
                removeSubheading={removeSubheading}
                moveStockToSubheading={moveStockToSubheading}
                moveStockWithinSubheading={moveStockWithinSubheading}
              />
            ))}
          </div>

          {/* Unassigned stocks section with drop zone - using separate component */}
          <UnassignedStocksArea
            stocks={activeWatchlist.unassignedStocks}
            moveStockToSubheading={moveStockToSubheading}
            moveStockWithinSubheading={moveStockWithinSubheading}
            searchTerm={searchTerm}
          />

          {/* If no stocks at all */}
          {filteredStocks.length === 0 &&
            activeWatchlist.unassignedStocks.length === 0 && (
              <div className="mt-6 py-6 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
                <p className="mb-2">No stocks in this watchlist</p>
                <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                  + Add stocks
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );

  // Wrap the sidebar content with DndProvider
  return (
    <DndProvider backend={HTML5Backend}>
      <SidebarContent />
    </DndProvider>
  );
};

export default Sidebar;