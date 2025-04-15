'use client';

import React, { useState } from 'react';
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
  const [withdrawAmount, setWithdrawAmount] = useState<number | null>(5000);
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
    <div className="mx-auto">
      {/* Back button */}
      <button onClick={onBack} className="flex items-center text-[#6B7280] mb-4">
        <ChevronLeft size={20} className="mr-1" />
        Withdraw
      </button>
      
      {/* Withdraw Form */}
      <div className="bg-white border border-gray-200 rounded-md">
      <div className="p-6 pb-0">
        <div className="flex flex-wrap -mx-2">
          {/* Amount Input Section */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <div className="mb-1">
              <span className="text-sm text-gray-700">Enter Amount</span>
              <span className="float-right text-xs text-gray-500">Available withdrawable balance : ₹{formatCurrency(availableBalance)}</span>
            </div>
            <input 
              type="text" 
              placeholder="₹20,000"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={`₹${formatCurrency(withdrawAmount ?? 0)}`}
              onChange={handleAmountChange}
            />
            <div className="mt-2 text-xs text-gray-500">
              Amount is Expected to credit by (next settlement cycle)
            </div>
            
            {/* Withdrawal Type Selection */}
            <div className="mt-2 flex items-center">
              <label className="inline-flex items-center mr-4">
                <input 
                  type="radio" 
                  name="withdrawType" 
                  checked={withdrawType === 'normal'} 
                  onChange={() => setWithdrawType('normal')} 
                  className="mr-1"
                />
                <span className="text-sm">Normal Withdraw</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  name="withdrawType" 
                  checked={withdrawType === 'instant'} 
                  onChange={() => setWithdrawType('instant')} 
                  className="mr-1"
                />
                <span className="text-sm">Instant Withdraw</span>
              </label>
              <div className="ml-1 inline-flex items-center">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                  i
                </div>
              </div>
            </div>
            
            {/* Withdraw All Checkbox */}
            <div className="mt-4">
              <label className="inline-flex items-center">
                <input 
                  type="checkbox" 
                  checked={withdrawAll} 
                  onChange={() => setWithdrawAll(!withdrawAll)} 
                  className="mr-2"
                />
                <span className="text-sm">Withdraw all</span>
              </label>
            </div>
          </div>
          
          {/* Bank Selection Section */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <div className="mb-1">
              <span className="text-sm text-gray-700">Select Bank</span>
            </div>
            <div className="relative">
              <div className="flex items-center justify-between w-full border border-gray-300 rounded px-3 py-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs mr-2">
                    B
                  </div>
                  <span>BOB - ******* 8829</span>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Submit Button - Full width, no padding */}
      <div className='flex bg-[#F4F4F9] p-4'>
        <button 
          className="flex justify-end bg-green-500 text-white font-medium px-10 py-3 rounded text-center"
          onClick={handleSubmit}
        >
          Add {'{amount}'}
        </button>
      </div>
    </div>
      
      {/* Withdrawal History */}
      <div>
      <h2 className="text-lg font-medium mb-4">Fund Withdraw History</h2>
      
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
                <td className="px-4 py-4 whitespace-nowrap text-sm text-[#6B7280] border-r">{item.account}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-[#6B7280] border-r">{item.bank}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-[#6B7280] border-r">{item.date} {item.time}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-[#6B7280] border-r">₹{formatCurrency(item.amount)}</td>
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