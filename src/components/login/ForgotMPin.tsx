"use client";

import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from 'next/navigation';

export interface ForgotMPinProps {
  username: string;
  greeting: string;
  setOtpCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel: () => void;
}

const ForgotMPin: React.FC<ForgotMPinProps> = ({
  onCancel,
  setOtpCompleted = () => {}
}) => {
  const router = useRouter();
  const [newMpin, setNewMpin] = useState<string>("");
  const [confirmMpin, setConfirmMpin] = useState<string>("");
  const [newMpinError, setNewMpinError] = useState<boolean>(false);
  const [confirmMpinError, setConfirmMpinError] = useState<boolean>(false);
  const [showNewMpin, setShowNewMpin] = useState<boolean>(false);
  const [showConfirmMpin, setShowConfirmMpin] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleRedirect = () => {
    setTimeout(() => {
      router.push('/trades/stocks');
    }, 700);
  };

  const validateMpinInput = (value: string): string => {
    // Remove any non-digit characters and spaces
    const cleanValue = value.replace(/[^\d]/g, '');
    // Limit to 4 digits maximum
    return cleanValue.slice(0, 4);
  };

  const handleNewMpinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleanValue = validateMpinInput(e.target.value);
    setNewMpin(cleanValue);
    setNewMpinError(false);
  };

  const handleConfirmMpinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleanValue = validateMpinInput(e.target.value);
    setConfirmMpin(cleanValue);
    setConfirmMpinError(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Allow only numbers, backspace, delete, arrow keys, tab
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    const isNumber = /^[0-9]$/.test(e.key);
    
    if (!isNumber && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  // Inline animation styles
  const shakeStyle = shake
    ? {
        animation: "shake 0.5s ease-in-out",
      }
    : {};

  const keyframes = `
    @keyframes shake {
      0% { transform: translateX(0); }
      10% { transform: translateX(-4px); }
      30% { transform: translateX(4px); }
      50% { transform: translateX(-4px); }
      70% { transform: translateX(4px); }
      90% { transform: translateX(-4px); }
      100% { transform: translateX(0); }
    }
  `;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let hasError = false;

    // Check if new MPIN is exactly 4 digits
    if (newMpin.length !== 4) {
      setNewMpinError(true);
      hasError = true;
    }

    // Check if confirm MPIN is exactly 4 digits
    if (confirmMpin.length !== 4) {
      setConfirmMpinError(true);
      hasError = true;
    }

    // Check if MPINs match
    if (newMpin !== confirmMpin) {
      setNewMpinError(true);
      setConfirmMpinError(true);
      hasError = true;
    }

    if (hasError) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOtpCompleted(true);
      handleRedirect();
    } catch (error: any) {
      alert(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex-1 flex flex-col space-y-[1.7rem] px-[0.21rem]">
        {/* Inject the keyframes for the shake animation */}
        <style jsx>{keyframes}</style>

        <div className="flex items-center -ml-[1.27rem] -mt-[0.42rem]">
          <button
            onClick={onCancel}
            className="p-[0.21rem] rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <ChevronLeft size={17} className="text-gray-800 dark:text-white" />
          </button>
          <h2
            onClick={onCancel}
            className="text-[1.02rem] font-medium hover:cursor-pointer text-gray-800 dark:text-white pl-[0.42rem]"
          >
            Create New MPIN
          </h2>
        </div>

        <p className="text-[0.74rem] text-gray-600 dark:text-gray-300 pt-8">
          Create a 4-digit MPIN for quick and secure access to your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-[1.7rem]">
          <div>
            <label className="block text-[0.74rem] font-medium mb-[0.42rem] text-gray-700 dark:text-gray-200">
              Enter New MPIN (4 digits only)
            </label>
            <div className="relative">
              <input
                type={showNewMpin ? "text" : "password"}
                name="new-mpin"
                value={newMpin}
                maxLength={4}
                autoComplete="off"
                inputMode="numeric"
                pattern="\d*"
                placeholder="Enter 4-digit MPIN"
                onChange={handleNewMpinChange}
                onKeyDown={handleKeyDown}
                style={shakeStyle}
                className={`w-full p-[0.64rem] pr-[2.55rem] rounded-lg border bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white text-[0.85rem]
                ${
                  newMpinError
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-400"
                } focus:ring-1 focus:ring-opacity-50 focus:outline-none`}
                autoFocus
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowNewMpin(!showNewMpin)}
                className="absolute inset-y-0 right-0 flex items-center px-[0.64rem] text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
              >
                {showNewMpin ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
            {newMpinError && (
              <p className="text-[0.64rem] text-red-500 mt-[0.21rem]">
                {newMpin.length !== 4 ? "MPIN must be exactly 4 digits" : "MPINs do not match"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[0.74rem] font-medium mb-[0.42rem] text-gray-700 dark:text-gray-200">
              Confirm New MPIN (4 digits only)
            </label>
            <div className="relative">
              <input
                type={showConfirmMpin ? "text" : "password"}
                name="confirm-mpin"
                value={confirmMpin}
                maxLength={4}
                autoComplete="off"
                inputMode="numeric"
                pattern="\d*"
                placeholder="Confirm 4-digit MPIN"
                onChange={handleConfirmMpinChange}
                onKeyDown={handleKeyDown}
                style={shakeStyle}
                className={`w-full p-[0.64rem] pr-[2.55rem] rounded-lg border bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white text-[0.85rem]
                ${
                  confirmMpinError
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-400"
                } focus:ring-1 focus:ring-opacity-50 focus:outline-none`}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowConfirmMpin(!showConfirmMpin)}
                className="absolute inset-y-0 right-0 flex items-center px-[0.64rem] text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
              >
                {showConfirmMpin ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
            {confirmMpinError && (
              <p className="text-[0.64rem] text-red-500 mt-[0.21rem]">
                {confirmMpin.length !== 4 ? "MPIN must be exactly 4 digits" : "MPINs do not match"}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-[0.64rem] text-white font-semibold text-[0.74rem] rounded-lg transition-all duration-200 mt-[0.85rem] ${
              newMpin.length !== 4 || confirmMpin.length !== 4 || isSubmitting
                ? "bg-[#00A645] cursor-not-allowed opacity-70"
                : "bg-[#00C853] hover:bg-[#00B649]"
            }`}
            disabled={newMpin.length !== 4 || confirmMpin.length !== 4 || isSubmitting}
          >
            {isSubmitting ? "Creating MPIN..." : "Create MPIN"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotMPin;