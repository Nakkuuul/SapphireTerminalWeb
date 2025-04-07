// components/RecentTransactions.tsx
import React from 'react';
import TransactionStatusBadge from '@/components/gen-components/TransactionStatusBadge';
import TransactionStatusIcon from '@/components/gen-components/TrasactionStatusIcon';

interface Transaction {
  id: string;
  amount: number;
  date: string;
  status: 'completed' | 'processing' | 'failed';
  cardLastDigits: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(Math.abs(value));
};

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="mb-4 text-gray-800 font-medium">Recent Transactions</div>
      
      <div className="">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="bg-gray-50 border-b border-[#D1D5DB] p-3">
            <div className="flex justify-between mb-1">
              <div className="text-xs text-gray-500">#{transaction.id}</div>
              <div className="text-sm font-medium text-gray-800">
                {transaction.amount < 0 ? '-' : ''}₹{formatCurrency(transaction.amount)}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="text-xs text-gray-500">{transaction.date}</div>
                <div className="mx-1 text-gray-500">•</div>
                <TransactionStatusBadge status={transaction.status} />
              </div>
              
              <div className="flex items-center space-x-2">
                <TransactionStatusIcon status={transaction.status} />
                <div className="text-xs text-gray-500">***** {transaction.cardLastDigits}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;