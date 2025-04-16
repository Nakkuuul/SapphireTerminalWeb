"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronDown, ArrowUpDown } from "lucide-react";
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

  return (
    <div className="mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center text-[#6B7280] mb-4"
      >
        <ChevronLeft size={20} className="mr-1" />
        Deposit
      </button>

      {/* Deposit Form */}
      <div className="bg-white border border-[#D1D5DB] rounded-md mb-6">
        <div className="p-6">
          <div className="flex w-[80%] gap-x-5">
            {/* Amount Input - Increased height */}
            <div className="mb-6 w-full">
              <label className="block text-[#6B7280] text-sm mb-2">
                Enter Amount
              </label>
              <input
                type="text"
                placeholder="₹20,000"
                className="w-full border border-gray-300 rounded-md px-3 py-3 text-lg"
                value={
                  selectedAmount ? `₹${selectedAmount.toLocaleString()}` : ""
                }
                onChange={handleAmountChange}
              />
            </div>

            {/* Bank Selection - Increased height */}
            <div className="mb-6 w-full">
              <label className="block text-[#6B7280] text-sm mb-2">
                Select Bank
              </label>
              <div className="flex items-center justify-between w-full border border-gray-300 rounded-md px-3 py-3 h-12">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center text-white text-xs mr-2">
                    {banks[0]?.icon || "B"}
                  </div>
                  <span>
                    {banks[0]?.name} - {banks[0]?.maskedAccount}
                  </span>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Quick Amount Selection - Now increments instead of sets value */}
          <div className="flex space-x-3 mb-6">
            {depositAmountOptions.map((amount: any) => (
              <div key={amount} className="relative">
                {amount === 10000 ? (
                  <div className="relative -mt-2">
                    {/* Gradient border using pseudo-element */}
                    <div
                      className="absolute inset-0 rounded-md bg-gradient-to-t from-[#34A853] via-[#34A853]/40 to-transparent p-[1px]"
                      style={{ margin: "-2px" }}
                    ></div>
                    <div
                      className="relative bg-[#F4F4F9] rounded-sm px-3 py-1 text-sm cursor-pointer shadow-md"
                      onClick={() => handleAmountIncrement(amount)}
                    >
                      + ₹{amount.toLocaleString()}
                    </div>
                  </div>
                ) : (
                  <div
                    className="border border-gray-300 bg-[#F4F4F9] rounded-sm px-3 py-1 text-sm cursor-pointer hover:bg-[#E5E7EB]"
                    onClick={() => handleAmountIncrement(amount)}
                  >
                    + ₹{amount.toLocaleString()}
                  </div>
                )}
                {amount === 10000 && (
                  <span className="absolute text-xs text-center w-full text-[#1DB954] mt-1">
                    Popular
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Payment Modes */}
          <div className="mb-4">
            <p className="text-sm text-[#6B7280] mb-2">Payment mode:</p>
            <div className="grid w-[80%] grid-cols-4 gap-3">
              <button
                className={`flex items-center justify-start bg-[#FAFAFA] border rounded-sm py-3 ${
                  selectedPaymentMode === "upi"
                    ? "border-[#1DB954] text-[#1DB954]"
                    : "border-gray-300 "
                }`}
                onClick={() => handlePaymentModeSelect("upi")}
              >
                <Image
                  alt="UPI"
                  src="/funds/upi-logo.svg"
                  width={20}
                  height={20}
                  className="ml-2 mr-3 "
                />
                UPI
              </button>

              <button
                className={`flex items-center justify-start bg-[#FAFAFA] border rounded-md py-3 ${
                  selectedPaymentMode === "qr"
                    ? "border-[#1DB954] text-[#1DB954]"
                    : "border-gray-300 "
                }`}
                onClick={() => handlePaymentModeSelect("qr")}
              >
                <Image
                  alt="QR"
                  src="/funds/qr.svg"
                  width={20}
                  height={20}
                  className="ml-2 mr-3 "
                />
                Scan QR
              </button>

              <button
                className={`flex items-center justify-start bg-[#FAFAFA] border rounded-md py-3 ${
                  selectedPaymentMode === "netbanking"
                    ? "border-[#1DB954] text-[#1DB954]"
                    : "border-gray-300 "
                }`}
                onClick={() => handlePaymentModeSelect("netbanking")}
              >
                <Image
                  alt="Net Banking"
                  src="/funds/net.svg"
                  width={20}
                  height={20}
                  className="ml-2 mr-3 "
                />
                Net Banking
              </button>

              <button
                className={`flex items-center justify-start bg-[#FAFAFA] border rounded-md py-3 ${
                  selectedPaymentMode === "transfer"
                    ? "border-[#1DB954] text-[#1DB954]"
                    : "border-gray-300 "
                }`}
                onClick={() => handlePaymentModeSelect("transfer")}
              >
                <Image
                  alt="Bank Transfer"
                  src="/funds/bank-transfer.svg"
                  width={24}
                  height={24}
                  className="ml-2 mr-3"
                />
                Bank Transfer
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button - In separate footer section */}
        <div className="flex justify-end bg-[#F4F4F9] p-4">
          <button
            className="bg-[#22C55E] text-white py-2 px-20 rounded-md font-medium"
            onClick={handlePaymentClick}
            disabled={!selectedAmount}
          >
            Add{" "}
            {selectedAmount ? `₹${selectedAmount.toLocaleString()}` : "amount"}
          </button>
        </div>
      </div>

      {/* Deposit History */}
      <div>
        <h2 className="text-lg font-medium mb-4">Fund Deposit History</h2>

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
