"use client";

import { useState } from "react";

interface TradeSelectorProps {
  activeComponent: React.ReactNode;
  closedComponent: React.ReactNode;
}

function TradeSelector({ activeComponent, closedComponent }: TradeSelectorProps) {
  const [selected, setSelected] = useState<"active" | "closed">("active");

  return (
    <div className="flex flex-col w-full mt-4">
      {/* Toggle Buttons */}
      <div className="flex border-[1px] border-[#D1D5DB] rounded-full p-1 w-full ">
        <button
          className={`flex-1 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
            selected === "active"
              ? "bg-green-100 text-green-600 "
              : "text-gray-500 hover:bg-gray-200"
          }`}
          onClick={() => setSelected("active")}
        >
          Active Trade
        </button>
        <button
          className={`flex-1 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
            selected === "closed"
              ? "bg-green-100 text-green-600"
              : "text-gray-500 hover:bg-gray-200"
          }`}
          onClick={() => setSelected("closed")}
        >
          Closed Trade
        </button>
      </div>

      {/* Render Content Based on Selection */}
      <div className="mt-6 w-full">{selected === "active" ? activeComponent : closedComponent}</div>
    </div>
  );
}

export default TradeSelector;
