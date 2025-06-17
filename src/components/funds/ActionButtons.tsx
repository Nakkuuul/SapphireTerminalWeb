import React from "react";
import { ChevronRight } from "lucide-react";

interface ActionButtonsProps {
  onNavigate: (section: "main" | "deposit" | "withdraw") => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onNavigate }) => {
  return (
    <div className="flex justify-end pr-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigate("withdraw")}
          className="py-2 px-6 border border-green-500 text-green-600 rounded-md bg-[#D1FADF4D] hover:bg-green-100 transition-colors"
          style={{ width: "170px" }}
        >
          Withdraw
        </button>

        <button
          onClick={() => onNavigate("deposit")}
          className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          style={{ width: "170px" }}
        >
          Deposit
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;