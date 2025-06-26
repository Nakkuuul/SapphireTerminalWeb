import React from "react";
import { ChevronRight } from "lucide-react";

interface ActionButtonsProps {
  onNavigate: (section: "main" | "deposit" | "withdraw") => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onNavigate }) => {
  return (
    <div className="flex justify-end pr-3 w-full whitespace-nowrap max-w-[80vw] mx-auto text-xs">
      <div className="flex items-center gap-3 whitespace-nowrap">
        <button
          onClick={() => onNavigate("withdraw")}
          className="py-2 px-4 border border-green-500 text-green-600 rounded-md bg-[#D1FADF4D] hover:bg-green-100 transition-colors text-xs"
          style={{ width: "120px" }}
        >
          Withdraw
        </button>

        <button
          onClick={() => onNavigate("deposit")}
          className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-xs"
          style={{ width: "120px" }}
        >
          Deposit
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;