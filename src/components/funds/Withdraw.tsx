'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronDown, HelpCircle, ArrowUpDown } from 'lucide-react';

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
  const [withdrawAmount, setWithdrawAmount] = useState<number | null>(null);
  const [selectedBank, setSelectedBank] = useState(banks[0]?.id || '');
  const [history, setHistory] = useState<WithdrawalRecord[]>(withdrawHistory as WithdrawalRecord[]);
  const [availableBalance, setAvailableBalance] = useState(withdrawableBalance);
  const [withdrawType, setWithdrawType] = useState('normal');
  const [withdrawAll, setWithdrawAll] = useState(false);
  
  // Pre-defined withdrawal amounts
  const withdrawAmounts = [5000, 10000, 25000];

  // Handle amount selection
  const handleAmountSelect = (amount: number) => {
    setWithdrawAmount(amount);
  };

  // Handle amount input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the raw input value and remove all non-numeric characters
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    
    // Convert to number or null if empty
    const numericValue = inputValue ? parseInt(inputValue) : null;
    
    // Update state with the raw numeric value (no auto-formatting)
    setWithdrawAmount(numericValue);
  };

  // Effect to set withdraw all amount
  useEffect(() => {
    if (withdrawAll) {
      setWithdrawAmount(availableBalance);
    }
  }, [withdrawAll, availableBalance]);

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
    <div className="mx-auto ">
      {/* Back button */}
      <button onClick={onBack} className="flex items-center text-[#6B7280] mb-4">
        <ChevronLeft size={20} className="mr-1" />
        Withdraw
      </button>
      
      {/* Withdraw Form */}
      <div className="max-w-xl mx-auto my-8 bg-[#FAFAFA] border border-gray-200 rounded-md">
        <div className="p-6">
          {/* Title and Balance */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm text-[#212529]">Enter Amount</h2>
            <div className="text-sm text-[#6B7280]">Wdl. Balance : <span className='text-[#333333]'>₹{formatCurrency(availableBalance)}</span></div>
          </div>
          
          {/* Amount Input */}
          <input 
            type="text" 
            placeholder="₹20,000"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
            value={withdrawAmount !== null ? `₹${withdrawAmount}` : ''}
            onChange={handleAmountChange}
          />
          <div className="text-sm text-gray-500 mb-4">
            Amount is Expected to credit by (next settlement cycle)
          </div>
          
          {/* Withdrawal Type Selection */}
          <div className="flex items-center mb-6">
            <label className="inline-flex items-center mr-6">
              <input 
                type="radio" 
                name="withdrawType" 
                checked={withdrawType === 'instant'} 
                onChange={() => setWithdrawType('instant')} 
                className="mr-2 h-5 w-5"
              />
              <span className="text-gray-500 text-base">Instant Withdraw</span>
            </label>
            <label className="inline-flex items-center">
              <input 
                type="radio" 
                name="withdrawType" 
                checked={withdrawType === 'normal'} 
                onChange={() => setWithdrawType('normal')} 
                className="mr-2 h-5 w-5"
              />
              <span className="text-gray-500 text-base">Normal Withdraw</span>
            </label>
          </div>
          
          {/* Bank Selection */}
          <h2 className="text-lg font-medium mb-2">Select Bank</h2>
          <div className="relative mb-4">
            <div className="flex items-center justify-between w-full border border-gray-300 rounded-md px-3 py-2">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs mr-2">
                  B
                </div>
                <span>BOB - ******* 8829</span>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
          
          {/* Withdraw All Checkbox */}
          <label className="inline-flex items-center mb-6">
            <input 
              type="checkbox" 
              checked={withdrawAll} 
              onChange={() => setWithdrawAll(!withdrawAll)} 
              className="mr-2 h-5 w-5"
            />
            <span className="text-gray-500 text-base">Withdraw all</span>
          </label>
          
          {/* Submit Button */}
          <button 
            className="w-full bg-green-500 text-white font-medium py-3 rounded-md text-center"
            onClick={handleSubmit}
          >
            Withdraw {withdrawAmount ? `₹${formatCurrency(withdrawAmount)}` : 'Amount'}
          </button>
        </div>
      </div>
      
      {/* Withdrawal History */}
      <div>
        <h2 className="text-lg font-medium my-4">Fund Withdraw History</h2>
        
        <div className="overflow-x-auto border rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#F4F4F9]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border-r">
                  <div className="flex items-center justify-between w-full">
                    <span> Account </span>
                    <ArrowUpDown className="\ w-4 h-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border-r">
                  <div className="flex items-center justify-between w-full">
                    <span> Bank</span>
                    <ArrowUpDown className="ml-1 w-4 h-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border-r">
                  <div className="flex items-center justify-between w-full">
                    <span> Date & Time </span>
                    <ArrowUpDown className="ml-1 w-4 h-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border-r">
                  <div className="flex items-center justify-between w-full">
                    <span> Amount </span>
                    <ArrowUpDown className="ml-1 w-4 h-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <div className="flex items-center justify-between w-full">
                    <span> Status </span>
                    <ArrowUpDown className="ml-1 w-4 h-4" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {history.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-[#6B7280] text-center border-r">{item.account}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-[#6B7280] text-center border-r">{item.bank}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-[#6B7280] text-center border-r">{item.date} {item.time}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-[#6B7280] text-center border-r">₹{formatCurrency(item.amount)}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-sm ${
                      item.status === 'pending' 
                        ? 'bg-[#FFF6DC] text-[#FFBF00]' 
                        : item.status === 'success' 
                          ? 'bg-green-100 text-[#1DB954]' 
                          : 'bg-red-100 text-red-500'
                    }`}>
                      {item.status === 'pending' 
                        ? 'Pending' 
                        : item.status === 'success' 
                          ? 'Success' 
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