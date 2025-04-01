"use client";

import { useState, useRef, useEffect } from "react";

interface TradeSelectorProps {
  activeComponent: React.ReactNode;
  closedComponent: React.ReactNode;
}

function TradeSelector({ activeComponent, closedComponent }: TradeSelectorProps) {
  const [selected, setSelected] = useState<"active" | "closed">("active");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const activeButtonRef = useRef<HTMLButtonElement>(null);
  const closedButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update the indicator position when selection changes
  useEffect(() => {
    const updateIndicator = () => {
      const currentButton = selected === "active" ? activeButtonRef.current : closedButtonRef.current;
      const container = containerRef.current;
      
      if (currentButton && container) {
        // Calculate position relative to the container with padding adjustment
        const buttonRect = currentButton.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Account for the parent's padding (1px) to ensure the indicator stays inside
        const containerPadding = 4; // 1rem = 4px
        
        // Calculate top offset to center vertically
        const containerHeight = containerRect.height;
        const buttonHeight = buttonRect.height;
        const topOffset = containerHeight-buttonHeight-containerPadding-containerPadding/2; // Adjust for padding
        
        setIndicatorStyle({
          width: buttonRect.width,
          height: buttonRect.height,
          left: currentButton.offsetLeft,
          top: topOffset,
          position: 'absolute'
        });
      }
    };
    
    // Initial update with a small delay to ensure DOM is fully rendered
    setTimeout(updateIndicator, 0);
    
    // Update on window resize
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [selected]);

  return (
    <div className="flex flex-col w-full">
      {/* Toggle Buttons */}
      <div className="flex border-[1px] border-[#D1D5DB] rounded-full p-1 w-full relative" ref={containerRef}>
        {/* Animated Indicator */}
        <div 
          className="absolute bg-green-100 rounded-full transition-all duration-300 ease-in-out"
          style={indicatorStyle}
        />
        
        <button
          ref={activeButtonRef}
          className={`flex-1 px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-xl font-medium transition-colors duration-300 z-10 ${
            selected === "active"
              ? "text-green-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setSelected("active")}
        >
          Active Trade
        </button>
        <button
          ref={closedButtonRef}
          className={`flex-1 px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-xl font-medium transition-colors duration-300 z-10 ${
            selected === "closed"
              ? "text-green-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setSelected("closed")}
        >
          Closed Trade
        </button>
      </div>

      {/* Render Content Based on Selection */}
      <div className="mt-4 sm:mt-6 w-full">{selected === "active" ? activeComponent : closedComponent}</div>
    </div>
  );
}

export default TradeSelector;