import React from 'react';
import { X } from 'lucide-react';

interface AboutTradePopupProps {
  isOpen: boolean;
  onClose: () => void;
  tradeData: {
    entryPrice: string | number;
    target: string | number;
    stopLoss: string | number;
    quantity: string | number;
    marginRequire: string | number;
    holdDuration: string | number;
    postedBy: string | number;
    date: string;
    status: string;
  };
}

const AboutTradePopup: React.FC<AboutTradePopupProps> = ({
  isOpen,
  onClose,
  tradeData
}) => {
  if (!isOpen) return null;

  // Format numbers with commas
  const formatNumber = (value: string | number): string => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return value.toString();
    return num.toLocaleString('en-IN');
  };

  // Get status color
  const getStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('target')) return 'text-[#FFBF00]';
    if (statusLower.includes('profit') || statusLower.includes('success')) return 'text-green-500';
    if (statusLower.includes('loss') || statusLower.includes('stop')) return 'text-red-500';
    return 'text-gray-600';
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-0 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-md max-w-md w-full mx-auto">
        {/* Header */}
        <div className="bg-[#EAF4F4] px-6 py-4 rounded-t-lg flex items-center justify-between border-b border-gray-200">
          <h2 className="text-base font-medium text-[#1A1A1A]">About Trade</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-3 px-4 space-y-6">
          {/* First Row - Entry Price, Target, Stop Loss */}
          <div className="grid grid-cols-3 px-2 py-3 bg-[#F4F4F9] rounded-md gap-3">
            <div className="text-center">
              <p className="text-sm font-normal text-gray-500 mb-1">Entry Price</p>
              <p className="text-base font-normal text-[#1A1A1A]">{formatNumber(tradeData.entryPrice)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-normal text-gray-500 mb-1">Target</p>
              <p className="text-base font-normal text-[#1A1A1A]">{formatNumber(tradeData.target)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-normal text-gray-500 mb-1">Stop Loss</p>
              <p className="text-base font-normal text-[#1A1A1A]">₹{formatNumber(tradeData.stopLoss)}</p>
            </div>
          </div>

          {/* Data Rows */}
          <div className="space-y-3 px-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-normal text-gray-500">Quantity</span>
              <span className="text-sm font-normal text-[#1A1A1A]">{formatNumber(tradeData.quantity)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-normal text-gray-500">Margin Require</span>
              <span className="text-sm font-normal text-[#1A1A1A]">{formatNumber(tradeData.marginRequire)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-normal text-gray-500">Hold Duration</span>
              <span className="text-sm font-normal text-[#1A1A1A]">{formatNumber(tradeData.holdDuration)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-normal text-gray-500">Posted By</span>
              <span className="text-sm font-normal text-black">{formatNumber(tradeData.postedBy)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-normal text-gray-500">Date</span>
              <span className="text-sm font-normal text-[#1A1A1A]">{tradeData.date}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-normal text-gray-500">Status</span>
              <span className={`text-[10px] bg-[#FFF6DC] p-1 rounded font-normal ${getStatusColor(tradeData.status)}`}>
                {tradeData.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTradePopup;