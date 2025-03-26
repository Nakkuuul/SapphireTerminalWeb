// components/RecentTransactions.tsx
import React from 'react';
import { ArrowUp, ArrowDown, RefreshCw } from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  date: string;
  status: 'success' | 'processing' | 'failed';
  statusText: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value);
};

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-4">Recent Transactions</h2>
      
      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <div key={index} className="bg-gray-50 rounded-md p-3">
            <div className="flex justify-between mb-1">
              <div className="text-xs text-[#6B7280]">{transaction.id}</div>
              <div className="text-sm font-medium">₹{formatCurrency(transaction.amount)}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xs text-[#6B7280]">{transaction.date}</div>
              <div className={`flex items-center text-xs px-2 py-0.5 rounded-sm ${
                transaction.status === 'success' 
                  ? 'bg-green-100 text-[#1DB954]' 
                  : transaction.status === 'processing' 
                    ? 'bg-[#FFF6DC] text-[#FFBF00]' 
                    : 'bg-red-100 text-red-500'
              }`}>
                {transaction.statusText}
              </div>
              <div className="flex items-center">
                {transaction.status === 'success' ? (
                  <ArrowUp size={16} className="text-[#1DB954]" />
                ) : transaction.status === 'processing' ? (
                  <RefreshCw size={16} className="text-[#FFBF00]" />
                ) : (
                  <ArrowDown size={16} className="text-red-500" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;