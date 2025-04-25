"use client";

import React, { useState } from "react";
import { ChevronLeft, RefreshCw } from "lucide-react";

interface PanVerificationProps {
  panNumber: string;
  setPanNumber: (pan: string) => void;
  setCurrentStep: (step: number) => void;
  onCancel: () => void;
}

const PanVerification: React.FC<PanVerificationProps> = ({
  panNumber,
  setPanNumber,
  setCurrentStep,
  onCancel,
}) => {
  const [captchaInput, setCaptchaInput] = useState<string>("");
  const [captchaText, setCaptchaText] = useState<string>(generateCaptcha());
  const [panError, setPanError] = useState<boolean>(false);
  const [captchaError, setCaptchaError] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);

  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setCaptchaInput("");
    setCaptchaError(false);
  };

  const validatePAN = (pan: string) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  // New function to handle PAN input with format enforcement
  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();

    // If deleting, just update the state
    if (value.length < panNumber.length) {
      setPanNumber(value);
      setPanError(false);
      return;
    }

    // If adding a new character
    const newChar = value.charAt(value.length - 1);

    // PAN format is: AAAAA0000A (5 letters, 4 numbers, 1 letter)
    if (value.length <= 5) {
      // First 5 characters must be letters
      if (/^[A-Z]$/.test(newChar)) {
        setPanNumber(value);
      }
    } else if (value.length <= 9) {
      // Next 4 characters must be numbers
      if (/^[0-9]$/.test(newChar)) {
        setPanNumber(value);
      }
    } else if (value.length === 10) {
      // Last character must be a letter
      if (/^[A-Z]$/.test(newChar)) {
        setPanNumber(value);
      }
    }

    setPanError(false);
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
      10% { transform: translateX(-5px); }
 
      30% { transform: translateX(5px); }

      50% { transform: translateX(-5px); }

      70% { transform: translateX(5px); }

      90% { transform: translateX(-5px); }
      100% { transform: translateX(0); }
    }
  `;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (!panNumber) {
      setPanError(true);
      hasError = true;
    }

    if (!validatePAN(panNumber)) {
      setPanError(true);
      hasError = true;
    }

    if (captchaInput.toLowerCase() !== captchaText.toLowerCase()) {
      setCaptchaError(true);
      refreshCaptcha();
      hasError = true;
    }

    if (hasError) {
      // Trigger shake animation
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    // All validations passed, proceed to next step
    setCurrentStep(1);
  };

  return (
    <>
      <div className="flex-1 flex flex-col space-y-8 px-6">
        {/* Inject the keyframes for the shake animation */}
        <style jsx>{keyframes}</style>

        <div className="flex items-center -ml-9 -mt-2 ">
          <button
            onClick={onCancel}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <ChevronLeft size={20} className="text-gray-800 dark:text-white" />
          </button>
          <h2
            onClick={onCancel}
            className="text-lg  font-medium  hover:cursor-pointer text-gray-800 dark:text-white"
          >
            Account Recovery
          </h2>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          Please verify your PAN number to recover your account access.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              PAN Number (Format: AAAAA0000A)
            </label>
            <input
              type="text"
              value={panNumber}
              onChange={handlePanChange}
              maxLength={10}
              placeholder="Enter PAN Number"
              style={shakeStyle}
              className={`w-full p-2 rounded-lg border bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white 
              ${
                panError
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-400"
              } focus:ring-1 focus:ring-opacity-50`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Captcha Verification
            </label>

            <div className="flex items-center space-x-2 mb-3">
              <div className="flex-1 p-2 text-center font-mono text-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded select-none">
                {captchaText}
              </div>
              <button
                type="button"
                onClick={refreshCaptcha}
                className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                <RefreshCw
                  size={18}
                  className="text-gray-800 dark:text-white"
                />
              </button>
            </div>

            <input
              type="text"
              value={captchaInput}
              onChange={(e) => {
                setCaptchaInput(e.target.value);
                setCaptchaError(false);
              }}
              placeholder="Enter captcha code"
              style={shakeStyle}
              className={`w-full p-2 rounded-lg border bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white 
              ${
                captchaError
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-400"
              } focus:ring-1 focus:ring-opacity-50`}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 text-white font-semibold text-sm rounded-lg transition-all duration-200 mt-4 ${
              !panNumber || !captchaInput
                ? "bg-[#00A645] cursor-not-allowed opacity-70"
                : "bg-[#00C853] hover:bg-[#00B649]"
            }`}
            disabled={!panNumber || !captchaInput}
          >
            Verify & Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default PanVerification;
