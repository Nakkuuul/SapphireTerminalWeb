"use client";

import React, { useState } from 'react';
import AboutTradePopup from '@/components/trade/AboutTradePopup';

const AboutTradeDemo = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Sample trade data matching your image
  const sampleTradeData = {
    entryPrice: "3,000",
    target: "9,55,466.89",
    stopLoss: "1,198.00",
    quantity: "JQN407",
    marginRequire: "36,772,878.83",
    holdDuration: "0.00",
    postedBy: "0.00",
    date: "12 June 2025",
    status: "Target Miss"
  };

  // Alternative sample data
  const alternativeTradeData = {
    entryPrice: 2500,
    target: 3000,
    stopLoss: 2200,
    quantity: 100,
    marginRequire: 25000,
    holdDuration: 5,
    postedBy: 101,
    date: "15 June 2025",
    status: "Target Hit"
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-8">About Trade Popup Demo</h1>
      
      <div className="space-y-4">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Open About Trade Popup
        </button>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Usage Example:</h2>
          
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`import AboutTradePopup from '@/components/AboutTradePopup';

const [isPopupOpen, setIsPopupOpen] = useState(false);

const tradeData = {
  entryPrice: "3,000",
  target: "9,55,466.89", 
  stopLoss: "1,198.00",
  quantity: "JQN407",
  marginRequire: "36,772,878.83",
  holdDuration: "0.00",
  postedBy: "0.00",
  date: "12 June 2025",
  status: "Target Miss"
};

<AboutTradePopup
  isOpen={isPopupOpen}
  onClose={() => setIsPopupOpen(false)}
  tradeData={tradeData}
/>`}
          </pre>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Features:</h2>
          <ul className="space-y-2 text-sm">
            <li>✅ Reusable component with props interface</li>
            <li>✅ Header background color: #EAF4F4</li>
            <li>✅ All text 14px font-weight 400 (except heading 18px)</li>
            <li>✅ Auto number formatting with commas</li>
            <li>✅ Dynamic status colors (orange for Target Miss, etc.)</li>
            <li>✅ Responsive design with proper spacing</li>
            <li>✅ Modal overlay with close functionality</li>
            <li>✅ TypeScript interface for type safety</li>
          </ul>
        </div>
      </div>

      {/* Popup Component */}
      <AboutTradePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        tradeData={sampleTradeData}
      />
    </div>
  );
};

export default AboutTradeDemo;