// components/FundsSummaryCards.tsx
import React from 'react';
import { Equal, Info, Plus } from 'lucide-react';

interface FundsSummaryCardsProps {
  data: {
    availableMargin: number;
    cashBalance: number;
    marginFromPledge: number;
  };
}

const FundsSummaryCards: React.FC<FundsSummaryCardsProps> = ({ data }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="bg-[#F4F4F9] rounded-md mb-6 py-6 px-20 flex justify-between items-center">
      {/* Available Margin */}
      <div className="flex flex-col items-center">
        <div className="text-base text-[#6B7280] flex items-center">
          Available Margin
        </div>
        <div className="text-xl font-semibold text-[#1A1A1A] mt-1">
          ₹{formatCurrency(data.availableMargin)}
        </div>
      </div>

      {/* Equals Symbol */}
      <Equal className='text-[#6B7280]' />

      {/* Cash Balance */}
      <div className="flex flex-col items-center">
        <div className="text-base text-[#6B7280] flex items-center">
          Cash Balance <Info size={14} className="ml-1 text-gray-400" />
        </div>
        <div className="text-xl font-semibold text-[#1A1A1A] mt-1">
          ₹{formatCurrency(data.cashBalance)}
        </div>
      </div>

      {/* Plus Symbol */}
      <Plus className='text-[#6B7280]'/>

      {/* Margin from Pledge */}
      <div className="flex flex-col items-center">
        <div className="text-base text-[#6B7280] flex items-center">
          Margin from Pledge <Info size={14} className="ml-1 text-gray-400" />
        </div>
        <div className="text-xl font-semibold text-[#1A1A1A] mt-1">
          ₹{formatCurrency(data.marginFromPledge)}
        </div>
      </div>
    </div>
  );
};

export default FundsSummaryCards;
