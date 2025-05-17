"use client";
import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ChevronUp, ChevronDown, X, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

// Types
interface OrderPopupProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  stock: {
    name: string;
    price: number;
    change: number;
    changePercent: number;
    exchange: string;
  };
}

type OrderTab = 'Instant' | 'Normal' | 'Iceberg' | 'Cover';

const OrderPopup: React.FC<OrderPopupProps> = ({
  open,
  setOpen,
  stock = {
    name: "Reliance Industries",
    price: 1687.45,
    change: -19.10,
    changePercent: -2.70,
    exchange: "NSE"
  }
}) => {
  // Draggable functionality
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Order state
  const [isBuy, setIsBuy] = useState(true);
  const [currentTab, setCurrentTab] = useState<OrderTab>('Instant');
  const [showAllTabs, setShowAllTabs] = useState(false);
  const [productType, setProductType] = useState<string>("Intraday");
  const [quantity, setQuantity] = useState<string>("0");
  const [price, setPrice] = useState<string>("0");
  const [triggerPrice, setTriggerPrice] = useState<string>("0");
  const [orderType, setOrderType] = useState<string>("Limit");
  const [stopLossType, setStopLossType] = useState<string>("SL");
  const [showValidity, setShowValidity] = useState(false);
  const [orderValidity, setOrderValidity] = useState<string>("Day");
  const [disclosedQty, setDisclosedQty] = useState<string>("0");
  const [minutes, setMinutes] = useState<string>("0");
  const [numberOfLegs, setNumberOfLegs] = useState<string>("0");

  // Exchange selection
  const [selectedExchange, setSelectedExchange] = useState<string>("BSE");
  
  // Margin info
  const marginRequired = "₹5,908.00";
  const totalCharges = "₹5.00";
  const availableMargin = "₹5,90,478.00";

  // Center the dialog when first opened
  useEffect(() => {
    if (open && dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      setPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: Math.max(20, (window.innerHeight - rect.height) / 2)
      });
    }
  }, [open]);

  // Handle mouse events for dragging
  const startDrag = (e: React.MouseEvent) => {
    if (dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Title based on current tab and buy/sell state
  const getPopupTitle = () => {
    return `Buy pop up ${currentTab.toUpperCase()}`;
  };

  // Tab components
  const allTabs: OrderTab[] = ['Instant', 'Normal', 'Iceberg', 'Cover'];
  
  // Toggle between showing 2 or all tabs
  const toggleTabsView = () => {
    setShowAllTabs(!showAllTabs);
  };
  
  // Render visible tabs
  const visibleTabs = showAllTabs ? allTabs : allTabs.slice(0, 2);
  
  return (
    <div 
      ref={dialogRef}
      className={`fixed z-50 bg-white rounded-lg shadow-xl w-[740px] ${open ? 'block' : 'hidden'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'auto'
      }}
    >
      {/* Header */}
      <div 
        className="p-3 bg-gray-50 cursor-grab rounded-t-lg"
        onMouseDown={startDrag}
      >
<div className="flex justify-between items-center">
 <div>
   <div className="flex items-center">
     <h2 className="text-lg font-medium">{stock.name}</h2>
     <span className="text-xs font-normal bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
       {stock.exchange}
     </span>
   </div>
   <div className="flex items-center mt-1">
     <span className="text-lg font-medium">{stock.price}</span>
     <span className={`text-sm ml-2 ${stock.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
       {stock.change} ({stock.changePercent}%)
     </span>
   </div>
 </div>
 
 <div className="flex items-center self-center">
   {/* Exchange selection for Normal/Iceberg/Cover */}
   {currentTab !== 'Instant' && (
    <div className="flex flex-col gap-[6px] mr-3 items-center">
    <div className="flex items-center gap-1 whitespace-nowrap justify-center">
      <input 
        type="radio" 
        id="nse" 
        name="exchange" 
        value="NSE"
        checked={selectedExchange === "NSE"}
        onChange={() => setSelectedExchange("NSE")}
        className="h-3.5 w-3.5"
      />
      <label htmlFor="nse" className={`text-xs cursor-pointer ${selectedExchange !== "NSE" ? "opacity-60" : ""}`}>
        NSE: ₹ 1,245.66
      </label>
    </div>
 <div className="flex items-center gap-1 whitespace-nowrap justify-center">
   <input 
     type="radio" 
     id="bse" 
     name="exchange" 
     value="BSE"
     checked={selectedExchange === "BSE"}
     onChange={() => setSelectedExchange("BSE")}
     className="h-3.5 w-3.5"
   />
   <label htmlFor="bse" className={`text-xs cursor-pointer ${selectedExchange !== "BSE" ? "opacity-60" : ""}`}>
     BSE: ₹ 2,455.99
   </label>
 </div>
</div>
   )}
   
   {/* Buy/Sell Toggle and Buttons */}
   <div className="flex items-center gap-1 mx-3 justify-center">
     <Button
       variant="ghost"
       onClick={() => setIsBuy(true)}
       className={`h-7 px-3 rounded-md ${
         isBuy
           ? "bg-[#00C852] hover:bg-[#00B84D] text-white"
           : "text-[#00C852]/60 hover:text-[#00B84D] bg-[#00B84D]/20 hover:bg-[#00B84D]/30"
       }`}
     >
       BUY
     </Button>
     <Switch
       checked={!isBuy}
       onCheckedChange={(checked) => setIsBuy(!checked)}
       className="data-[state=checked]:bg-[#FF5252] data-[state=unchecked]:bg-[#00C852] mx-1"
     />
     <Button
       variant="ghost"
       onClick={() => setIsBuy(false)}
       className={`h-7 px-3 rounded-md ${
         !isBuy
           ? "bg-[#FF5252] hover:bg-[#E63529] text-white"
           : "text-[#FF5252]/40 hover:text-[#E63529] bg-[#FF5252]/10 hover:bg-[#FF5252]/30"
       }`}
     >
       SELL
     </Button>
   </div>
   
   {/* Close Button */}
   <button 
     onClick={() => setOpen(false)}
     className="text-gray-500 hover:text-gray-700 ml-1"
   >
     <X size={28} />
   </button>
 </div>
</div>
      </div>

      {/* Order Tabs */}
      <div className="border-b">
        <div className="flex items-center">
          {visibleTabs.map((tab) => (
            <button
              key={tab}
              className={`py-2 px-6 text-sm font-medium relative ${
                currentTab === tab 
                  ? 'text-[#28A745] border-b-2 border-[#28A745]' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </button>
          ))}
          
          <button 
            onClick={toggleTabsView}
            className="ml-2 text-gray-600 p-1"
          >
            {showAllTabs ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>
      </div>

      {/* Order Form Content */}
      <div className="p-4">
        {/* Product Type - Common for all tabs */}
        <div className="flex items-center gap-4">
          <label className="text-sm">Product Type:</label>
          <div className="flex items-center gap-1.5 ml-2">
            <input 
              type="radio" 
              id="intraday" 
              name="productType" 
              value="Intraday"
              checked={productType === "Intraday"}
              onChange={() => setProductType("Intraday")}
              className="h-4 w-4"
            />
            <label htmlFor="intraday" className="text-sm cursor-pointer">
              Intraday
            </label>
          </div>
          <div className="flex items-center gap-1.5">
            <input 
              type="radio" 
              id="delivery" 
              name="productType" 
              value="Delivery"
              checked={productType === "Delivery"}
              onChange={() => setProductType("Delivery")}
              className="h-4 w-4"
            />
            <label htmlFor="delivery" className="text-sm cursor-pointer">
              Delivery
            </label>
          </div>
          <div className="flex items-center gap-1.5">
            <input 
              type="radio" 
              id="mtf" 
              name="productType" 
              value="MTF"
              checked={productType === "MTF"}
              onChange={() => setProductType("MTF")}
              className="h-4 w-4"
            />
            <label htmlFor="mtf" className="text-sm cursor-pointer">
              MTF
            </label>
          </div>
        </div>

        {/* Instant Tab Content */}
        {currentTab === 'Instant' && (
          <div>
            <div className="mt-4 mb-3 ">
              <label className="block text-sm mb-1.5">Quantity</label>
              <div className="relative">
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full pr-8 h-9 border rounded-md px-3"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                  <ChevronUp size={12} className="text-gray-500" />
                  <ChevronDown size={12} className="text-gray-500" />
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <label className="block text-sm mb-1.5">Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-6 h-10 border rounded-md px-3"
                />
              </div>
            </div>
            
            <div className="flex  items-center gap-4 mb-3">
              <div className="flex items-center gap-1.5">
                <input 
                  type="radio" 
                  id="limit" 
                  name="orderType" 
                  value="Limit"
                  checked={orderType === "Limit"}
                  onChange={() => setOrderType("Limit")}
                  className="h-4 w-4"
                />
                <label htmlFor="limit" className="text-sm cursor-pointer">
                  Limit
                </label>
              </div>
              <div className="flex items-center gap-1.5">
                <input 
                  type="radio" 
                  id="market" 
                  name="orderType" 
                  value="Market"
                  checked={orderType === "Market"}
                  onChange={() => setOrderType("Market")}
                  className="h-4 w-4"
                />
                <label htmlFor="market" className="text-sm cursor-pointer">
                  Market
                </label>
              </div>
            </div>
            <hr className='mb-3' />
          </div>
        )}

        {/* Normal Tab Content */}
        {currentTab === 'Normal' && (
  <div>
    <div className="grid grid-cols-3 gap-3 mt-4  mb-4">
      <div className=''>
        <label className="block text-sm mb-1.5">Quantity</label>
        <div className="relative">
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full pr-8 h-9 border rounded-md px-3"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
            <ChevronUp size={12} className="text-gray-500" />
            <ChevronDown size={12} className="text-gray-500" />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm mb-1.5">Price</label>
        <div className="flex">
          <div className="w-10 flex items-center justify-center border border-r-0 rounded-l bg-gray-50 text-gray-500">
            ₹
          </div>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="flex-1 border rounded-l-none h-10 px-3 rounded-r-md"
          />
        </div>
        
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <input 
              type="radio" 
              id="limit-normal" 
              name="orderType" 
              value="Limit"
              checked={orderType === "Limit"}
              onChange={() => setOrderType("Limit")}
              className="h-3.5 w-3.5"
            />
            <label htmlFor="limit-normal" className="text-xs cursor-pointer">
              Limit
            </label>
          </div>
          <div className="flex items-center gap-1.5">
            <input 
              type="radio" 
              id="market-normal" 
              name="orderType" 
              value="Market"
              checked={orderType === "Market"}
              onChange={() => setOrderType("Market")}
              className="h-3.5 w-3.5"
            />
            <label htmlFor="market-normal" className="text-xs cursor-pointer">
              Market
            </label>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm mb-1.5">Trigger Price</label>
        <div className="flex">
          <div className="w-10 flex items-center justify-center border border-r-0 rounded-l bg-gray-50 text-gray-500">
            ₹
          </div>
          <input
            type="text"
            value={triggerPrice}
            onChange={(e) => setTriggerPrice(e.target.value)}
            className="flex-1 border rounded-l-none h-10 px-3 rounded-r-md"
          />
        </div>
        
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <input 
              type="radio" 
              id="sl-normal" 
              name="stopLossType" 
              value="SL"
              checked={stopLossType === "SL"}
              onChange={() => setStopLossType("SL")}
              className="h-3.5 w-3.5"
            />
            <label htmlFor="sl-normal" className="text-xs cursor-pointer">
              SL
            </label>
          </div>
          <div className="flex items-center gap-1.5">
            <input 
              type="radio" 
              id="slm-normal" 
              name="stopLossType" 
              value="SL-M"
              checked={stopLossType === "SL-M"}
              onChange={() => setStopLossType("SL-M")}
              className="h-3.5 w-3.5"
            />
            <label htmlFor="slm-normal" className="text-xs cursor-pointer">
              SL-M
            </label>
          </div>
        </div>
      </div>
    </div>
    
    {/* Show Validity/Disclose Qty Section */}
    <div className="  py-2 ">
              <button 
                className="flex items-center gap-1 text-gray-700 text-sm"
                onClick={() => setShowValidity(!showValidity)}
              >
                <span>Show Validity/Disclose Qty</span>
                {showValidity ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
            
            {/* Order Validity Section */}
            {showValidity && (
              <div className=" mt-3 mb-4">
                <div className="grid grid-cols-3 gap-4">
                <div className=''>
                <label className="block text-sm mb-1.5">Order Validity</label>
                <div className="flex p-[2px] bg-[#F4F4F9] rounded">
                  <button 
                    className={`flex-1 px-3 py-2 text-xs rounded ${orderValidity === 'Day' ? 'bg-[#E2ECEF] text-[#1DB954]' : 'bg-transparent text-[#6B7280]'}`}
                    onClick={() => setOrderValidity('Day')}
                  >
                    Day
                  </button>
                  <button 
                    className={`flex-1 px-3 py-2 text-xs rounded ${orderValidity === 'Immediate' ? 'bg-[#E2ECEF] text-[#1DB954]' : 'bg-transparent text-[#6B7280]'}`}
                    onClick={() => setOrderValidity('Immediate')}
                  >
                    Immediate
                  </button>
                  <button 
                    className={`flex-1 px-3 py-2 text-xs rounded ${orderValidity === 'Minutes' ? 'bg-[#E2ECEF] text-[#1DB954]' : 'bg-transparent text-[#6B7280]'}`}
                    onClick={() => setOrderValidity('Minutes')}
                  >
                    Minutes
                  </button>
                </div>
                </div>
                  
                  <div>
                    <label className="block text-sm mb-1.5">Disclosed Quantity</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={disclosedQty}
                        onChange={(e) => setDisclosedQty(e.target.value)}
                        className="w-full pr-8 h-9 border rounded-md px-3"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                        <ChevronUp size={12} className="text-gray-500" />
                        <ChevronDown size={12} className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-1.5">Minutes</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                        className="w-full pr-8 h-9 border rounded-md px-3"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                        <ChevronUp size={12} className="text-gray-500" />
                        <ChevronDown size={12} className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
  </div>
)}

        {/* Iceberg Tab Content */}
        {currentTab === 'Iceberg' && (
          <div>
            <div className="grid grid-cols-2 gap-6 my-4">
              <div>
                <label className="block text-sm mb-1.5">Quantity</label>
                <div className="relative">
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full pr-8 h-9 border rounded-md px-3"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                    <ChevronUp size={12} className="text-gray-500" />
                    <ChevronDown size={12} className="text-gray-500" />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm mb-1.5">Price</label>
                <div className="flex">
                  <div className="w-10 flex items-center justify-center border border-r-0 rounded-l bg-gray-50 text-gray-500">
                    ₹
                  </div>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="flex-1 border rounded-l-none h-10 px-3 rounded-r-md"
                  />
                </div>
                
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5">
                    <input 
                      type="radio" 
                      id="limit-iceberg" 
                      name="orderType" 
                      value="Limit"
                      checked={orderType === "Limit"}
                      onChange={() => setOrderType("Limit")}
                      className="h-3.5 w-3.5"
                    />
                    <label htmlFor="limit-iceberg" className="text-xs cursor-pointer">
                      Limit
                    </label>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <input 
                      type="radio" 
                      id="market-iceberg" 
                      name="orderType" 
                      value="Market"
                      checked={orderType === "Market"}
                      onChange={() => setOrderType("Market")}
                      className="h-3.5 w-3.5"
                    />
                    <label htmlFor="market-iceberg" className="text-xs cursor-pointer">
                      Market
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm mb-1.5">Trigger Price</label>
                <div className="flex">
                  <div className="w-10 flex items-center justify-center border border-r-0 rounded-l bg-gray-50 text-gray-500">
                    ₹
                  </div>
                  <input
                    type="text"
                    value={triggerPrice}
                    onChange={(e) => setTriggerPrice(e.target.value)}
                    className="flex-1 border rounded-l-none h-10 px-3 rounded-r-md"
                  />
                </div>
                
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5">
                    <input 
                      type="radio" 
                      id="sl-iceberg" 
                      name="stopLossType" 
                      value="SL"
                      checked={stopLossType === "SL"}
                      onChange={() => setStopLossType("SL")}
                      className="h-3.5 w-3.5"
                    />
                    <label htmlFor="sl-iceberg" className="text-xs cursor-pointer">
                      SL
                    </label>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <input 
                      type="radio" 
                      id="slm-iceberg" 
                      name="stopLossType" 
                      value="SL-M"
                      checked={stopLossType === "SL-M"}
                      onChange={() => setStopLossType("SL-M")}
                      className="h-3.5 w-3.5"
                    />
                    <label htmlFor="slm-iceberg" className="text-xs cursor-pointer">
                      SL-M
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm mb-1.5">Number of legs</label>
                <input
                  type="text"
                  value={numberOfLegs}
                  onChange={(e) => setNumberOfLegs(e.target.value)}
                  className="w-full h-10 border rounded-md px-3"
                />
              </div>
            </div>
            
            {/* Show Validity/Disclose Qty Section */}
            <div className="  py-2">
              <button 
                className="flex items-center gap-1 text-gray-700 text-sm"
                onClick={() => setShowValidity(!showValidity)}
              >
                <span>Show Validity/Disclose Qty</span>
                {showValidity ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
            
            {/* Order Validity Section */}
            {showValidity && (
              <div className="mt-3 mb-4">
                <div className="grid grid-cols-3 gap-4">
                <div>
                <label className="block text-sm mb-1.5">Order Validity</label>
                <div className="flex bg-[#F4F9F9] py-[2px] rounded">
                  <button 
                    className={`flex-1 px-3 py-2 text-xs rounded ${orderValidity === 'Day' ? 'bg-[#E2ECEF] text-[#1DB954]' : 'bg-transparent text-[#1A1A1A]'}`}
                    onClick={() => setOrderValidity('Day')}
                  >
                    Day
                  </button>
                  <button 
                    className={`flex-1 px-3 py-2 text-xs rounded ${orderValidity === 'Immediate' ? 'bg-[#E2ECEF] text-[#1DB954]' : 'bg-transparent text-[#1A1A1A]'}`}
                    onClick={() => setOrderValidity('Immediate')}
                  >
                    Immediate
                  </button>
                  <button 
                    className={`flex-1 px-3 py-2 text-xs rounded ${orderValidity === 'Minutes' ? 'bg-[#E2ECEF] text-[#1DB954]' : 'bg-transparent text-[#1A1A1A]'}`}
                    onClick={() => setOrderValidity('Minutes')}
                  >
                    Minutes
                  </button>
                </div>
                </div>
                  
                  <div>
                    <label className="block text-sm mb-1.5">Disclosed Quantity</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={disclosedQty}
                        onChange={(e) => setDisclosedQty(e.target.value)}
                        className="w-full pr-8 h-9 border rounded-md px-3"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                        <ChevronUp size={12} className="text-gray-500" />
                        <ChevronDown size={12} className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-1.5">Minutes</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                        className="w-full pr-8 h-9 border rounded-md px-3"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                        <ChevronUp size={12} className="text-gray-500" />
                        <ChevronDown size={12} className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Cover Tab Content */}
        {currentTab === 'Cover' && (
            <div>
                <div className="grid grid-cols-3 gap-3 my-4">
                <div>
                    <label className="block text-sm mb-1.5">Quantity</label>
                    <div className="relative">
                    <input
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full pr-8 h-9 border rounded-md px-3"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                        <ChevronUp size={12} className="text-gray-500" />
                        <ChevronDown size={12} className="text-gray-500" />
                    </div>
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm mb-1.5">Price</label>
                    <div className="flex">
                    <div className="w-10 flex items-center justify-center border border-r-0 rounded-l bg-gray-50 text-gray-500">
                        ₹
                    </div>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="flex-1 border rounded-l-none h-10 px-3 rounded-r-md"
                    />
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                        <input 
                        type="radio" 
                        id="limit-cover" 
                        name="orderType" 
                        value="Limit"
                        checked={orderType === "Limit"}
                        onChange={() => setOrderType("Limit")}
                        className="h-3.5 w-3.5"
                        />
                        <label htmlFor="limit-cover" className="text-xs cursor-pointer">
                        Limit
                        </label>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <input 
                        type="radio" 
                        id="market-cover" 
                        name="orderType" 
                        value="Market"
                        checked={orderType === "Market"}
                        onChange={() => setOrderType("Market")}
                        className="h-3.5 w-3.5"
                        />
                        <label htmlFor="market-cover" className="text-xs cursor-pointer">
                        Market
                        </label>
                    </div>
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm mb-1.5">Number of legs</label>
                    <input
                    type="text"
                    value={numberOfLegs}
                    onChange={(e) => setNumberOfLegs(e.target.value)}
                    className="w-full h-10 border rounded-md px-3"
                    />
                </div>
                </div>
                
                {/* Show Validity/Disclose Qty Section */}
                <div className="  py-2">
              <button 
                className="flex items-center gap-1 text-gray-700 text-sm"
                onClick={() => setShowValidity(!showValidity)}
              >
                <span>Show Validity/Disclose Qty</span>
                {showValidity ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
            
            {/* Order Validity Section */}
            {showValidity && (
              <div className="mt-3 mb-4">
                <div className="grid grid-cols-3 gap-4">
                <div>
                <label className="block text-sm mb-1.5">Order Validity</label>
                <div className="flex bg-[#F4F9F9] py-[2px] rounded">
                  <button 
                    className={`flex-1 px-3 py-2 text-xs rounded ${orderValidity === 'Day' ? 'bg-[#E2ECEF] text-[#1DB954]' : 'bg-transparent text-[#1A1A1A]'}`}
                    onClick={() => setOrderValidity('Day')}
                  >
                    Day
                  </button>
                  <button 
                    className={`flex-1 px-3 py-2 text-xs rounded ${orderValidity === 'Immediate' ? 'bg-[#E2ECEF] text-[#1DB954]' : 'bg-transparent text-[#1A1A1A]'}`}
                    onClick={() => setOrderValidity('Immediate')}
                  >
                    Immediate
                  </button>
                  <button 
                    className={`flex-1 px-3 py-2 text-xs rounded ${orderValidity === 'Minutes' ? 'bg-[#E2ECEF] text-[#1DB954]' : 'bg-transparent text-[#1A1A1A]'}`}
                    onClick={() => setOrderValidity('Minutes')}
                  >
                    Minutes
                  </button>
                </div>
                </div>
                  
                  <div>
                    <label className="block text-sm mb-1.5">Disclosed Quantity</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={disclosedQty}
                        onChange={(e) => setDisclosedQty(e.target.value)}
                        className="w-full pr-8 h-9 border rounded-md px-3"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                        <ChevronUp size={12} className="text-gray-500" />
                        <ChevronDown size={12} className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-1.5">Minutes</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                        className="w-full pr-8 h-9 border rounded-md px-3"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                        <ChevronUp size={12} className="text-gray-500" />
                        <ChevronDown size={12} className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            </div>
            )}


            <hr className='mb-3'/>

          {/* Footer with Margin Info */}
          <div className="flex items-center justify-between mt-2">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs mb-1 text-gray-500">Margin Required</div>
                <div className="text-sm font-medium">{marginRequired}</div>
              </div>
              <div>
                <div className="text-xs mb-1 text-gray-500">Total Charges</div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">{totalCharges}</span>
                  <RefreshCw size={14} className="text-gray-500" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xs mb-1 text-gray-500">Available Margin</span>
                </div>
                <div className="text-sm font-medium text-green-500">{availableMargin}</div>
              </div>
            </div>
  
            <div className="flex gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-6 py-2 w-[120px] bg-gray-100 text-[#0F1817] rounded text-sm font-medium"
              >
                Cancel
              </button>
              <button
                className={`px-6 py-2 w-[120px] rounded text-sm font-medium ${isBuy ? 'bg-green-500' : 'bg-[#FF5252]'} text-white`}
              >
                {isBuy ? 'Buy' : 'Sell'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default OrderPopup;