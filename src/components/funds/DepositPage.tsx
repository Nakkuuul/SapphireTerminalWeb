"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronDown, ArrowUpDown, ChevronRight } from "lucide-react";
import UpiPaymentModal from "@/components/funds/pop-ups/UpiPaymentModal";
import QrPaymentModal from "@/components/funds/pop-ups/QrPaymentModal";
import BankTransferModal from "@/components/funds/pop-ups/BankTransferModal";

// Import sample data - replace with API calls in production
import {
  depositAmountOptions,
  banks,
  depositHistory,
} from "@/constants/funds-data";
import Image from "next/image";

// Utility functions that can be moved to a separate file
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);
};

// Define interfaces for type safety
interface DepositPageProps {
  onBack: () => void;
}

// Main Deposit Page Component
const DepositPage: React.FC<DepositPageProps> = ({ onBack }) => {
  // State management
  const [selectedAmount, setSelectedAmount] = useState<number | null>(10000);
  const [selectedBank, setSelectedBank] = useState(banks[0]?.id || "");
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("upi");
  const [history, setHistory] = useState(depositHistory);

  // Modal states
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isBankTransferModalOpen, setIsBankTransferModalOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Handle increment from chips
  const handleAmountIncrement = (amount: number) => {
    setSelectedAmount((prevAmount) => {
      // If no amount is selected, start with 0
      const currentAmount = prevAmount || 0;
      return currentAmount + amount;
    });
  };

  // Handle amount input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setSelectedAmount(value ? parseInt(value) : null);
  };

  // Handle payment mode selection
  const handlePaymentModeSelect = (mode: string) => {
    setSelectedPaymentMode(mode);
  };

  // Handle payment button click
  const handlePaymentClick = () => {
    if (!selectedAmount) {
      alert("Please enter an amount");
      return;
    }

    // Open the appropriate modal based on the selected payment mode
    if (selectedPaymentMode === "upi") {
      setIsUpiModalOpen(true);
    } else if (selectedPaymentMode === "qr") {
      setIsQrModalOpen(true);
    } else if (
      selectedPaymentMode === "netbanking" ||
      selectedPaymentMode === "transfer"
    ) {
      setIsBankTransferModalOpen(true);
    }
  };

  // Handle successful payment
  const handlePaymentSuccess = () => {
    // Close all modals
    setIsUpiModalOpen(false);
    setIsQrModalOpen(false);
    setIsBankTransferModalOpen(false);

    // In a real implementation, you would update the UI and show a success message
    alert(`Successfully added ₹${selectedAmount?.toLocaleString()}`);

    // Reset form or navigate back
    // onBack(); // Uncomment to navigate back after successful payment
  };

  // Handle sorting
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort data
  const sortedHistory = React.useMemo(() => {
    let sortableItems = [...history];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [history, sortConfig]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedHistory.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="w-full max-w-[80vw] mx-auto text-sm">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center text-[#6B7280] mb-2 whitespace-nowrap text-xs py-1 px-2"
      >
        <ChevronLeft size={16} className="mr-1" />
        Deposit
      </button>

      {/* Deposit Form */}
      <div className="bg-[#FAFAFA] border border-gray-200 rounded-md mb-4 max-w-[80vw] mx-auto p-4">
        <div className="p-3">
          {/* Title and Balance */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm text-[#212529]">Enter Amount</h2>
            <div className="text-[#6B7280] text-sm">Avl. Balance : <span className="text-[#333333]">₹1,39,000 </span></div>
          </div>
          
          {/* Amount Input */}
          <input 
            type="text" 
            placeholder="₹20,000"
            className="w-full border border-gray-300 rounded-md px-3 py-3 mb-6 text-sm"
            value={selectedAmount ? `₹${selectedAmount.toLocaleString()}` : ""}
            onChange={handleAmountChange}
          />
          
          {/* Quick Amount Selection */}
          <div className="flex space-x-3 mb-6">
            <div className="relative">
              <div
                className="bg-[#F4F4F9] rounded text-[#333333] px-3 py-2 text-sm cursor-pointer hover:bg-gray-50"
                onClick={() => handleAmountIncrement(5000)}
              >
                + ₹5,000
              </div>
            </div>
            
            <div className="relative">
              <div className="relative -mt-2">
                {/* Gradient border using pseudo-element */}
                <div
                  className="absolute inset-0 rounded bg-gradient-to-t from-[#34A853] via-[#34A853]/40 to-transparent p-[1px]"
                  style={{ margin: "-2px" }}
                ></div>
                <div
                  className="relative bg-[#F4F4F9] text-[#333333] rounded px-3 py-2 text-sm cursor-pointer"
                  onClick={() => handleAmountIncrement(10000)}
                >
                  + ₹10,000
                </div>
              </div>
              <span className="absolute text-xs text-center w-full text-green-500 mt-1">
                Popular
              </span>
            </div>
            
            <div className="relative">
              <div
                className="bg-[#F4F4F9] text-[#333333] rounded px-3 py-2 text-sm cursor-pointer hover:bg-gray-50"
                onClick={() => handleAmountIncrement(20000)}
              >
                + ₹20,000
              </div>
            </div>
          </div>
          
          {/* Bank Selection */}
          <h2 className="text-sm text-[#212529] mb-2">Select Bank</h2>
          <div className="relative mb-6">
            <div className="flex items-center justify-between w-full border border-gray-300 rounded-md px-3 py-3 ">
              <div className="flex items-center">
                <Image
                  alt="Bank"
                  src="/funds/bank-transfer.svg"
                  width={27}
                  height={27}
                  className="mr-2"
                />
                <span className="text-[#21252980] ml-2">BOB - ******* 8829</span>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
          
          {/* Payment Mode */}
          <h2 className="text-sm text-[#212529] mb-2">Payment mode:</h2>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button
              className={`flex items-center justify-center border rounded py-3 px-4 ${
                selectedPaymentMode === "upi"
                  ? "border-green-500 text-green-600"
                  : "border-gray-300 text-[#212529]"
              }`}
              onClick={() => handlePaymentModeSelect("upi")}
            >
              <Image
                alt="UPI"
                src="/funds/upi-logo.svg"
                width={20}
                height={20}
                className="mr-2"
              />
              UPI
            </button>
          
            <button
              className={`flex items-center justify-center border rounded py-3 px-4 ${
                selectedPaymentMode === "qr"
                  ? "border-green-500 text-green-600"
                  : "border-gray-300 text-[#212529]"
              }`}
              onClick={() => handlePaymentModeSelect("qr")}
            >
              <Image
                alt="QR"
                src="/funds/qr.svg"
                width={20}
                height={20}
                className="mr-2"
              />
              Scan QR
            </button>
          
            <button
              className={`flex items-center justify-center border rounded py-3 px-4 ${
                selectedPaymentMode === "netbanking"
                  ? "border-green-500 text-green-600"
                  : "border-gray-300 text-[#212529]"
              }`}
              onClick={() => handlePaymentModeSelect("netbanking")}
            >
              <Image
                alt="Net Banking"
                src="/funds/net.svg"
                width={20}
                height={20}
                className="mr-2"
              />
              Net Banking
            </button>
          </div>
          
          {/* UPI ID Input - Only show when UPI is selected */}
          {selectedPaymentMode === "upi" && (
            <div className="mb-6">
              <h2 className="text-sm text-[#212529] mb-2">Enter UPI ID</h2>
              <input
                type="text"
                placeholder="abcd@ybl"
                className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm"
              />
            </div>
          )}
          
          {/* Submit Button */}
          <button 
            className="w-full bg-green-500 text-white font-medium py-3 rounded-md text-center text-sm"
            onClick={handlePaymentClick}
            disabled={!selectedAmount}
          >
            Add {selectedAmount ? `₹${selectedAmount.toLocaleString()}` : "amount"}
          </button>
        </div>
      </div>

      {/* Horizontal Divider */}
      <hr className="my-6 border-gray-200" />

      {/* Deposit History */}
      <div>
        <h2 className="text-lg font-medium mb-4">Fund Deposit History</h2>

        <div className="overflow-x-auto border rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#F4F4F9]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border-r group hover:bg-gray-100 cursor-pointer">
                  <div 
                    className="flex items-center justify-between w-full"
                    onClick={() => handleSort('account')}
                  >
                    <span>Account</span>
                    <ArrowUpDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border-r group hover:bg-gray-100 cursor-pointer">
                  <div 
                    className="flex items-center justify-between w-full"
                    onClick={() => handleSort('bank')}
                  >
                    <span>Bank</span>
                    <ArrowUpDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border-r group hover:bg-gray-100 cursor-pointer">
                  <div 
                    className="flex items-center justify-between w-full"
                    onClick={() => handleSort('date')}
                  >
                    <span>Date & Time</span>
                    <ArrowUpDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border-r group hover:bg-gray-100 cursor-pointer">
                  <div 
                    className="flex items-center justify-between w-full"
                    onClick={() => handleSort('amount')}
                  >
                    <span>Amount</span>
                    <ArrowUpDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider group hover:bg-gray-100 cursor-pointer">
                  <div 
                    className="flex items-center justify-between w-full"
                    onClick={() => handleSort('status')}
                  >
                    <span>Status</span>
                    <ArrowUpDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-[#6B7280] text-center border-r">
                    {item.account}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-[#6B7280] text-center border-r">
                    {item.bank}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-[#6B7280] text-center border-r">
                    {item.date} {item.time}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-[#6B7280] text-center border-r">
                    ₹{formatCurrency(item.amount)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-sm ${
                        item.status === "pending"
                          ? "bg-[#FFF6DC] text-[#FFBF00]"
                          : item.status === "success"
                          ? "bg-green-100 text-[#1DB954]"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {item.status === "pending"
                        ? "Pending"
                        : item.status === "success"
                        ? "Success"
                        : "Failed"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(endIndex, sortedHistory.length)} of {sortedHistory.length} entries
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 border rounded ${
                  currentPage === page
                    ? "bg-blue-500 text-white border-blue-500"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modals */}
      <UpiPaymentModal
        isOpen={isUpiModalOpen}
        onClose={() => setIsUpiModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />

      <QrPaymentModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />

      <BankTransferModal
        isOpen={isBankTransferModalOpen}
        onClose={() => setIsBankTransferModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default DepositPage;