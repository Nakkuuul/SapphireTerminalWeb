import React from 'react';
import { ChevronRight, Plus, ArrowRightLeft} from 'lucide-react';

interface ActionButtonsProps {
  onDeposit: () => void;
  onWithdraw: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onDeposit, onWithdraw }: ActionButtonsProps) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button 
        onClick={onDeposit}
        className="flex items-center text-[#6B7280] border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
      >
        Deposit
        <Plus size={20} className=" ml-7 text-[#1DB954]" />
      </button>
      
      <button 
        onClick={onWithdraw}
        className="flex items-center text-[#6B7280] border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
      >
        Withdraw
       //TODO : Add withdraw icon
      </button>
      
      <div className="flex-grow"></div>
      
      <button className="flex items-center border border-[#D1D5DB] text-[#6B7280] px-4 py-2 rounded-md hover:bg-gray-50">
        <ArrowRightLeft size={20} className='mr-2' />
        <span className="mr-6">View All Transaction History</span>
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default ActionButtons;