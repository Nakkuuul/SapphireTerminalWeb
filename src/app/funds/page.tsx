'use client';

import React, { useState } from 'react';
import FundsSummaryCards from '@/components/funds/FundsSummaryCards';
import ActionButtons from '@/components/funds/ActionButtons';
import BalanceBreakdown from '@/components/funds/BalanceBreakdown';
import RecentTransactions from '@/components/funds/RecentTransactions';
import BalanceChart from '@/components/funds/BalanceChart';
import DepositPage from '@/components/funds/DepositPage';
import WithdrawPage from '@/components/funds/Withdraw';
// Import sample data - replace with API calls in production
import {
  fundsSummary,
  balanceBreakdown,
  pnlData,
  marginData,
  premiumData,
  withdrawableBalance,
  recentTransactions,
  chartData
} from '@/constants/funds-data';

// Define Transaction interface
interface Transaction {
  id: string;
  amount: number;
  date: string;
  status: 'success' | 'processing' | 'failed';
  statusText: string;
}

export default function FundsPage() {
  const [activeSection, setActiveSection] = useState<'main' | 'deposit' | 'withdraw'>('main');
  
  // Replace with real API calls when integrating with backend
  const [summaryData, setSummaryData] = useState(fundsSummary);
  const [balanceData, setBalanceData] = useState(balanceBreakdown);
  const [profitLossData, setProfitLossData] = useState(pnlData);
  const [margins, setMargins] = useState(marginData);
  const [premiums, setPremiums] = useState(premiumData);
  const [withdrawable, setWithdrawable] = useState(withdrawableBalance);
  const [transactions, setTransactions] = useState<Transaction[]>(recentTransactions as Transaction[]);
  const [chartValues, setChartValues] = useState(chartData);

  // Handle navigation between sections
  const handleNavigate = (section: 'main' | 'deposit' | 'withdraw') => {
    setActiveSection(section);
  };
  
  if (activeSection === 'deposit') {
    return <DepositPage onBack={() => handleNavigate('main')} />;
  }
  
  if (activeSection === 'withdraw') {
    return <WithdrawPage onBack={() => handleNavigate('main')} />;
  }
  
  // Main view
  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      {/* Balance Summary Cards */}
      <FundsSummaryCards data={summaryData} />
      
      {/* Action Buttons */}
      <ActionButtons 
        onDeposit={() => handleNavigate('deposit')} 
        onWithdraw={() => handleNavigate('withdraw')} 
      />
      
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Balance Breakdown */}
        <BalanceBreakdown 
          balanceData={balanceData}
          profitLossData={profitLossData}
          margins={margins}
          premiums={premiums}
          withdrawable={withdrawable}
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