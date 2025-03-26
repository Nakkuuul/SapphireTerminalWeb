'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';

// Import sample data - replace with API calls in production
import { banks, withdrawHistory, withdrawableBalance } from '@/constants/funds-data';

// Utility functions
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value);
};

// Define interfaces for type safety
interface WithdrawPageProps {
  onBack: () => void;
}

interface WithdrawalRecord {
  account: string;
  bank: string;
  date: string;
  time: string;
  amount: number;
  status: 'pending' | 'success' | 'failed';
}

// Main Withdraw Page Component
const WithdrawPage: React.FC<WithdrawPageProps> = ({ onBack }) => {
  // State management
  const [withdrawAmount, setWithdrawAmount] = useState<number | null>(5000);
  const [selectedBank, setSelectedBank] = useState(banks[0]?.id || '');
  const [history, setHistory] = useState<WithdrawalRecord[]>([] as WithdrawalRecord[]);
  const [availableBalance, setAvailableBalance] = useState(withdrawableBalance);
  
  // Pre-defined withdrawal amounts
  const withdrawAmounts = [5000, 10000, 25000];

  // Handle amount selection
  const handleAmountSelect = (amount: number) => {
    setWithdrawAmount(amount);
  };

  // Handle amount input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setWithdrawAmount(value ? parseInt(value) : null);
  };

  // Handle bank selection
  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
  };
  
  // Handle form submission - will be connected to API
  const handleSubmit = () => {
    // Validate withdrawal amount against available balance
    if (withdrawAmount && withdrawAmount > availableBalance) {
      alert('Withdrawal amount exceeds available balance');
      return;
    }
    
    // In production, make an API call to process the withdrawal
    alert(`Withdrawing ₹${withdrawAmount?.toLocaleString()} to ${selectedBank}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back button */}
      <button onClick={onBack} className="flex items-center text-[#6B7280] mb-4">
        <ChevronLeft size={20} className="mr-1" />
        Withdraw
      </button>
      
      {/* Withdraw Form */}
      <div className="bg-white border border-gray-200 rounded-md p-6 mb-6">
        {/* Amount Input */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-[#6B7280] text-sm">Enter Amount</label>
            <div className="text-sm text-[#6B7280]">
              Available: <span className="text-[#1DB954] font-medium">₹{formatCurrency(availableBalance)}</span>
            </div>
          </div>
          <input 
            type="text" 
            placeholder="₹5,000"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={withdrawAmount ? `₹${withdrawAmount.toLocaleString()}` : ''}
            onChange={handleAmountChange}
          />
        </div>
        
        {/* Bank Selection */}
        <div className="mb-6">
          <label className="block text-[#6B7280] text-sm mb-2">Select Bank Account</label>
          <div className="flex items-center justify-between w-full border border-gray-300 rounded-md px-3 py-2">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center text-white text-xs mr-2">
                {banks[0]?.icon || 'B'}
              </div>
              <span>{banks[0]?.name} - {banks[0]?.maskedAccount}</span>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
        
        {/* Quick Amount Selection */}
        <div className="flex space-x-3 mb-6">
          {withdrawAmounts.map((amount) => (
            <div 
              key={amount}
              className={`border rounded-md px-3 py-1 text-sm cursor-pointer ${
                withdrawAmount === amount ? 'border-[#1DB954] text-[#1DB954]' : 'border-gray-300'
              }`}
              onClick={() => handleAmountSelect(amount)}
            >
              ₹{amount.toLocaleString()}
            </div>
          ))}
        </div>
        
        {/* Withdrawal Notes */}
        <div className="mb-6">
          <p className="text-sm text-[#6B7280] mb-2">Withdrawal Notes:</p>
          <ul className="text-xs text-[#6B7280] space-y-1 pl-5 list-disc">
            <li>A withdrawal request placed before 9 AM IST will be processed the same day.</li>
            <li>Requests after 9 AM IST will be processed the next business day.</li>
            <li>Bank holidays may result in delayed processing.</li>
            <li>Maximum withdrawal amount per day is ₹1,00,000.</li>
          </ul>
        </div>
        
        {/* Submit Button */}
        <button 
          className={`w-full py-2 rounded-md font-medium ${
            withdrawAmount && withdrawAmount <= availableBalance
              ? 'bg-[#1DB954] text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={handleSubmit}
          disabled={!withdrawAmount || withdrawAmount > availableBalance}
        >
          Withdraw {withdrawAmount ? `₹${withdrawAmount.toLocaleString()}` : 'amount'}
        </button>
      </div>
      
      {/* Withdrawal History */}
      <div>
        <h2 className="text-lg font-medium mb-4">Withdrawal History</h2>
        
        <div className="overflow-x-auto border rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">Account</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">Bank</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">Date & Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {history.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-[#6B7280]">{item.account}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-[#6B7280]">{item.bank}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-[#6B7280]">{item.date} {item.time}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">₹{formatCurrency(item.amount)}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-sm ${
                      item.status === 'pending' 
                        ? 'bg-[#FFF6DC] text-[#FFBF00]' 
                        : item.status === 'success' 
                          ? 'bg-green-100 text-[#1DB954]' 
                          : 'bg-red-100 text-red-500'
                    }`}>
                      {item.status === 'pending' 
                        ? 'Processing' 
                        : item.status === 'success' 
                          ? 'Completed' 
                          : 'Failed'
                      }
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;