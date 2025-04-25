// components/FundsSummaryCards.tsx
import React, { useState } from "react";
import { ChevronRight, RefreshCw } from "lucide-react";
import ActionButtons from "./ActionButtons";
import DepositPage from "./DepositPage";
import WithdrawPage from "./Withdraw";
import TransactionStatusBadge from "../gen-components/TransactionStatusBadge";

interface FundsSummaryCardsProps {
  data: {
    availableMargin: number;
    cashBalance: number;
    marginFromPledge: number;
  };
}

const FundsSummaryCards: React.FC<FundsSummaryCardsProps> = ({ data }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(value);
  };

  const [activeSection, setActiveSection] = useState<
    "main" | "deposit" | "withdraw"
  >("main");

  const handleNavigate = (section: "main" | "deposit" | "withdraw") => {
    setActiveSection(section);
  };

  if (activeSection === "deposit") {
    return <DepositPage onBack={() => handleNavigate("main")} />;
  }

  if (activeSection === "withdraw") {
    return <WithdrawPage onBack={() => handleNavigate("main")} />;
  }

  return (
    <div className="bg-[#F4F4F9] border border-[#D1D5DB] rounded-lg p-6 mb-1">
      <div className="flex items-center justify-between ">
        <div className="flex flex-col">
          <div className="text-gray-700 text-base">
            Trading Balance (Cash + Collateral)
          </div>
          <div className="flex items-center mt-1">
            <span className="text-2xl font-medium">₹49,561.80</span>
            <RefreshCw
              size={16}
              className="ml-2 text-gray-500 cursor-pointer"
            />
          </div>
        </div>
        <ActionButtons
          onDeposit={() => handleNavigate("deposit")}
          onWithdraw={() => handleNavigate("withdraw")}
        />
      </div>
      <div className="w-[90%] mt-8 py-1 text-md text-gray-500 text-center  mx-auto border-t border-gray-400/30">
        <div className="flex items-center justify-center mt-4">

          View All Transaction History <ChevronRight />
        </div>
      </div>
    </div>
  );
};

export default FundsSummaryCards;
