import React from 'react';
import { ChevronRight, Plus } from 'lucide-react';

interface ActionButtonsProps {
  onDeposit: () => void;
  onWithdraw: () => void;
}

const ActionButtons = ({ onDeposit, onWithdraw }: ActionButtonsProps) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button 
        onClick={onDeposit}
        className="flex items-center text-[#6B7280] border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
      >
        <Plus size={18} className="mr-2 text-[#1DB954]" />
        Deposit
      </button>
      
      <button 
        onClick={onWithdraw}
        className="flex items-center text-[#6B7280] border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#1DB954]">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
        Withdraw
      </button>
      
      <div className="flex-grow"></div>
      
      <button className="flex items-center text-[#6B7280] px-4 py-2 rounded-md hover:bg-gray-50">
        <span className="mr-2">View All Transaction History</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default ActionButtons;