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

export default function FundsPage() {
  const [activeSection, setActiveSection] = useState<
    "main" | "deposit" | "withdraw"
  >("main");

  // Replace with real API calls when integrating with backend
  const [summaryData, setSummaryData] = useState(fundsSummary);
  const [balanceData, setBalanceData] = useState(balanceBreakdown);
  const [profitLossData, setProfitLossData] = useState(pnlData);
  const [margins, setMargins] = useState(marginData as any); // Type assertion to fix margins type mismatch
  const [premiums, setPremiums] = useState(premiumData as any); // Type assertion to fix premiums type mismatch
  const [withdrawable, setWithdrawable] = useState(withdrawableBalance);
  const [transactions, setTransactions] = useState<RecentTransaction[]>(
    recentTransactions as any
  ); // Type assertion for transaction
  const [chartValues, setChartValues] = useState(chartData);

  // Calculate total balance for BalanceBreakdown component
  const totalBalance =
    balanceData.cashBalance +
    balanceData.collateralBalance +
    balanceData.collateralLiquidFunds;

  // Handle navigation between sections
  const handleNavigate = (section: "main" | "deposit" | "withdraw") => {
    setActiveSection(section);
  };

  if (activeSection === "deposit") {
    return <DepositPage onBack={() => handleNavigate("main")} />;
  }

  if (activeSection === "withdraw") {
    return <WithdrawPage onBack={() => handleNavigate("main")} />;
  }

  // Main view
  return (
    <div className="pb-10 mx-auto">
      <div className="mb-4">
        <FundsSummaryCards data={summaryData} />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Balance Breakdown */}
        <BalanceBreakdown
          balanceData={balanceData}
          profitLossData={profitLossData}
          margins={margins}
          premiums={premiums}
          withdrawable={withdrawable}
          totalBalance={totalBalance}
        />

        {/* Right Column - Recent Transactions and Chart */}
        <div>
          <RecentTransactions transactions={transactions} />
          <BalanceChart data={chartValues} />
        </div>
      </div>
    </div>
  );
}
