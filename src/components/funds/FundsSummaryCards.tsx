import React from 'react';
import { Info } from 'lucide-react';

// Define the Props Interface
interface FundsSummaryCardsProps {
  data: {
    availableMargin: number;
    cashBalance: number;
    marginFromPledge: number;
  };
}

const FundsSummaryCards: React.FC<FundsSummaryCardsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-gray-50 p-4 rounded-md">
        <div className="text-xs text-[#6B7280] mb-1 flex items-center">
          Available Margin <Info size={14} className="ml-2 text-gray-400" />
        </div>
        <div className="font-semibold text-xl">₹{data.availableMargin.toFixed(2)}</div>
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <div className="text-xs text-[#6B7280] mb-1 flex items-center">
          Cash Balance <Info size={14} className="ml-2 text-gray-400" />
        </div>
        <div className="font-semibold text-xl">₹{data.cashBalance.toFixed(2)}</div>
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <div className="text-xs text-[#6B7280] mb-1 flex items-center">
          Margin from Pledge <Info size={14} className="ml-2 text-gray-400" />
        </div>
        <div className="font-semibold text-xl">₹{data.marginFromPledge.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default FundsSummaryCards;
