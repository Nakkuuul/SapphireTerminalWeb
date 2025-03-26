'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';

// Import sample data - replace with API calls in production
import { depositAmountOptions, banks, depositHistory } from '@/constants/funds-data';

// Utility functions that can be moved to a separate file
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value);
};

// Define interfaces for type safety
interface DepositPageProps {
  onBack: () => void;
}

// Payment method interface
interface PaymentMethod {
  id: string;
  name: string;
}

// Main Deposit Page Component
const DepositPage: React.FC<DepositPageProps> = ({ onBack }) => {
  // State management
  const [selectedAmount, setSelectedAmount] = useState<number | null>(10000);
  const [selectedBank, setSelectedBank] = useState(banks[0]?.id || '');
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('upi');
  const [history, setHistory] = useState(depositHistory);
  
  // Payment methods can come from backend in future
  const paymentMethods: PaymentMethod[] = [
    { id: 'upi', name: 'UPI' },
    { id: 'qr', name: 'Scan QR' },
    { id: 'netbanking', name: 'Net Banking' },
    { id: 'transfer', name: 'Bank Transfer' }
  ];

  // Handle amount selection
  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
  };

  // Handle amount input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setSelectedAmount(value ? parseInt(value) : null);
  };

  // Handle payment mode selection
  const handlePaymentModeSelect = (mode: string) => {
    setSelectedPaymentMode(mode);
  };
  
  // Handle form submission - will be connected to API
  const handleSubmit = () => {
    // In production, make an API call to process the deposit
    alert(`Depositing ₹${selectedAmount?.toLocaleString()} using ${selectedPaymentMode}`);
  };

  return (
    <div className="max-w-[75%] mx-auto">
      {/* Back button */}
      <button onClick={onBack} className="flex items-center text-[#6B7280] mb-4">
        <ChevronLeft size={20} className="mr-1" />
        Deposit
      </button>
      
      {/* Deposit Form */}
      <div className="bg-white border border-gray-200 rounded-md p-6 mb-6">
        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-[#6B7280] text-sm mb-2">Enter Amount</label>
          <input 
            type="text" 
            placeholder="₹20,000"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={selectedAmount ? `₹${selectedAmount.toLocaleString()}` : ''}
            onChange={handleAmountChange}
          />
        </div>
        
        {/* Bank Selection */}
        <div className="mb-6">
          <label className="block text-[#6B7280] text-sm mb-2">Select Bank</label>
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
          {depositAmountOptions.map((amount) => (
            <div 
              key={amount}
              className={`border rounded-md px-3 py-1 text-sm cursor-pointer ${
                selectedAmount === amount ? 'border-[#1DB954] text-[#1DB954]' : 'border-gray-300'
              }`}
              onClick={() => handleAmountSelect(amount)}
            >
              + ₹{amount.toLocaleString()}
              {selectedAmount === amount && amount === 10000 && (
                <span className="text-xs ml-1 text-[#1DB954]">Popular</span>
              )}
            </div>
          ))}
        </div>
        
        {/* Payment Modes */}
        <div className="mb-6">
          <p className="text-sm text-[#6B7280] mb-2">Payment mode:</p>
          <div className="grid grid-cols-4 gap-3">
            {paymentMethods.map((method) => (
              <button 
                key={method.id}
                className={`flex items-center justify-center border rounded-md py-2 ${
                  selectedPaymentMode === method.id 
                    ? 'border-[#1DB954] text-[#1DB954]' 
                    : 'border-gray-300 text-[#6B7280]'
                }`}
                onClick={() => handlePaymentModeSelect(method.id)}
              >
                {getPaymentIcon(method.id)}
                {method.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Submit Button */}
        <button 
          className="w-full bg-[#1DB954] text-white py-2 rounded-md font-medium"
          onClick={handleSubmit}
          disabled={!selectedAmount}
        >
          Add {selectedAmount ? `₹${selectedAmount.toLocaleString()}` : 'amount'}
        </button>
      </div>
      
      {/* Deposit History */}
      <div>
        <h2 className="text-lg font-medium mb-4">Fund Deposit History</h2>
        
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

// Helper function to get payment icons
function getPaymentIcon(method: string) {
  switch (method) {
    case 'upi':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'qr':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
          <path d="M3 11V3H11V11H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 21V17H7V21H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 21V13H21V21H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 7V3H17V7H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 11V3H21.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 11H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 17V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 13H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'netbanking':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
          <path d="M20 12V22H4V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 7H2V12H22V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 22V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 7H16.5C17.3284 7 18 6.32843 18 5.5C18 4.67157 17.3284 4 16.5 4C15.6716 4 15 4.67157 15 5.5V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 7H7.5C6.67157 7 6 6.32843 6 5.5C6 4.67157 6.67157 4 7.5 4C8.32843 4 9 4.67157 9 5.5V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'transfer':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
          <path d="M16 6L12 2L8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 2V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 11L22 17C22 18.6569 20.6569 20 19 20L5 20C3.34315 20 2 18.6569 2 17L2 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return null;
  }
}

export default DepositPage;