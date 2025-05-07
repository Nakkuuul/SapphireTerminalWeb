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
            className=" py-2 border border-green-500 text-green-600 rounded-md bg-[#D1FADF4D] hover:bg-green-100 transition-colors"
            style={{ width: "170px" }}
          >
            Withdraw
          </button>

          <button
            onClick={onDeposit}
            className=" py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            style={{ width: "170px" }}
          >
            Deposit
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default ActionButtons;
