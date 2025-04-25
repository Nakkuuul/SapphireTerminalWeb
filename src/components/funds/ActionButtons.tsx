import React from "react";
import { ChevronRight } from "lucide-react";

interface ActionButtonsProps {
  onDeposit: () => void;
  onWithdraw: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onDeposit,
  onWithdraw,
}: ActionButtonsProps) => {
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={onWithdraw}
            className="px-5 py-2 border border-green-500 text-green-600 rounded-md bg-green-50 hover:bg-green-100 transition-colors"
          >
            Withdraw
          </button>

          <button
            onClick={onDeposit}
            className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Deposit
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default ActionButtons;
