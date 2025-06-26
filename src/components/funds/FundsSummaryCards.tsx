// components/FundsSummaryCards.tsx
import React from "react";
import { ChevronRight, RefreshCw } from "lucide-react";
import ActionButtons from "./ActionButtons";
import TransactionStatusBadge from "../gen-components/TransactionStatusBadge";
import Image from "next/image";

interface FundsSummaryCardsProps {
  data: {
    availableMargin: number;
    cashBalance: number;
    marginFromPledge: number;
  };
  onNavigate: (section: "main" | "deposit" | "withdraw") => void;
}

const FundsSummaryCards: React.FC<FundsSummaryCardsProps> = ({ data, onNavigate }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div style={{
      position: 'relative',
      borderRadius: '8px',
      padding: '1px',
      width: '100%',
      maxWidth: '80vw',
      margin: '0 auto',
      fontSize: '0.875rem' // text-sm
    }}>
      {/* Dashed border using pseudo-element */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '8px',
        border: 'none',
        background: 'transparent',
        backgroundImage: `
          linear-gradient(90deg, #D1D5DB 16px, transparent 4px, transparent 20px),
          linear-gradient(270deg, #D1D5DB 16px, transparent 4px, transparent 20px),
          linear-gradient(180deg, #D1D5DB 16px, transparent 4px, transparent 20px),
          linear-gradient(0deg, #D1D5DB 16px, transparent 4px, transparent 20px)
        `,
        backgroundSize: '20px 1px, 20px 1px, 1px 20px, 1px 20px',
        backgroundPosition: '0 0, 0 100%, 0 0, 100% 0',
        backgroundRepeat: 'repeat-x, repeat-x, repeat-y, repeat-y',
        pointerEvents: 'none'  // Allow clicks to pass through to content
      }} />
      
      {/* Content */}
      <div className="bg-[#F4F4F9] rounded-lg p-[18px] max-w-[80vw] mx-auto text-xs">
        <div className="flex items-center justify-between whitespace-nowrap ">
          <div className="flex flex-col">
            <div className="text-[#6B7080] text-base">
              Trading Balance (Cash + Collateral)
            </div>
            <div className="flex items-center mt-1">
              <span className="text-[18px] font-medium">₹49,561.80</span>
              <RefreshCw
                size={16}
                className="ml-2 text-gray-500 cursor-pointer"
              />
            </div>
          </div>
          <ActionButtons onNavigate={onNavigate} />
        </div>
        <div className="w-full mt-8 py-1 text-md text-gray-500 text-center mx-auto border-t border-gray-400/30">
          <div className="flex items-center justify-center mt-4 whitespace-nowrap">
            <Image src='/transaction.svg' width={20} height={20} className="mr-2" alt='Transaction History' />
             View All Transaction History 
             <ChevronRight size={18} className="ml-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundsSummaryCards;