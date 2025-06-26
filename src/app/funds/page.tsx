"use client";

import React, { useState } from "react";
import FundsSummaryCards from "@/components/funds/FundsSummaryCards";
import ActionButtons from "@/components/funds/ActionButtons";
import BalanceBreakdown from "@/components/funds/BalanceBreakdown";
import RecentTransactions from "@/components/funds/RecentTransactions";
import BalanceChart from "@/components/funds/BalanceChart";
import DepositPage from "@/components/funds/DepositPage";
import WithdrawPage from "@/components/funds/Withdraw";
// Import sample data - replace with API calls in production
import {
  fundsSummary,
  balanceBreakdown,
  pnlData,
  marginData,
  premiumData,
  withdrawableBalance,
  recentTransactions,
  chartData,
} from "@/constants/funds-data";

// Define Transaction interface that matches the one from RecentTransactions
interface RecentTransaction {
  id: string;
  amount: number;
  date: string;
  status: "processing" | "failed" | "completed";
  statusText: string;
  cardLastDigits: string;
}

// Define proper interfaces for margins and premiums to match BalanceBreakdown expectations
interface MarginData {
  spanMargin: number;
  exposureMargin: number;
  cncAmount: number;
  commodityAdditionalMargin: number;
  cashIntradayMTFMargin: number;
  coroMargin: number;
}

interface PremiumData {
  fnoOptionPremium: number;
  currencyPremium: number;
  commodityPremium: number;
  totalPremium: number;
}

export default function FundsPage() {
  const [activeSection, setActiveSection] = useState<
    "main" | "deposit" | "withdraw"
  >("main");

  // Replace with real API calls when integrating with backend
  const [summaryData] = useState(fundsSummary);
  const [balanceData] = useState(balanceBreakdown);
  const [profitLossData] = useState(pnlData);
  
  // Fix margin data structure to match expected interface
  const [margins] = useState<MarginData>({
    spanMargin: marginData.spanMargin || 0,
    exposureMargin: marginData.exposureMargin || 0,
    cncAmount: marginData.spanAddOn || 0, // Use spanAddOn for cncAmount
    commodityAdditionalMargin: marginData.commodityAdditionalMargin || 0,
    cashIntradayMTFMargin: marginData.cashIntradayMISMargin || 0, // Fixed: use the correct property name
    coroMargin: marginData.coroMargin || 0,
  });
  
  // Fix premium data structure to match expected interface
  const [premiums] = useState<PremiumData>({
    fnoOptionPremium: premiumData.optionPremium || 0, // Use optionPremium for fnoOptionPremium
    currencyPremium: premiumData.currencyPremium || 0,
    commodityPremium: premiumData.commodityPremium || 0,
    totalPremium: premiumData.totalPremium || 0,
  });
  
  const [withdrawable] = useState(withdrawableBalance);
  const [transactions] = useState<RecentTransaction[]>(
    recentTransactions as RecentTransaction[]
  );
  const [chartValues] = useState(chartData);

  // Calculate total balance for BalanceBreakdown component
  const totalBalance =
    balanceData.cashBalance +
    balanceData.collateralBalance +
    balanceData.collateralLiquidFunds;

  // Handle navigation between sections
  const handleNavigate = (section: "main" | "deposit" | "withdraw") => {
    setActiveSection(section);
  };

  // No need to transform data - pass summaryData directly

  // Render based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "deposit":
        return <DepositPage onBack={() => handleNavigate("main")} />;
        
      case "withdraw":
        return <WithdrawPage onBack={() => handleNavigate("main")} />;
        
      case "main":
      default:
        return (
          <div className="flex flex-col h-full">
            {/* Fixed Header - FundsSummaryCards */}
            <div className="flex-shrink-0 mb-4">
              <FundsSummaryCards data={summaryData} onNavigate={handleNavigate} />
            </div>

            {/* Scrollable Content - Two Column Layout */}
            <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-2 pt-3 gap-6 pb-6">
                {/* Left Column - Balance Breakdown */}
                <div className="mb-12">
                  <BalanceBreakdown
                    balanceData={balanceData}
                    profitLossData={profitLossData}
                    margins={margins}
                    premiums={premiums}
                    withdrawable={withdrawable}
                    totalBalance={totalBalance}
                  />
                </div>

                {/* Right Column - Recent Transactions and Chart */}
                <div className="mb-12">
                  <RecentTransactions transactions={transactions} />
                  <BalanceChart data={chartValues} />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col pb-10 mx-auto">
      {renderContent()}
    </div>
  );
}