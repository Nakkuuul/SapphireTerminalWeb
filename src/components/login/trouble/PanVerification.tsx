'use client';

import React, { useState } from "react";
import { ChevronLeft, RefreshCw } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

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
  onCancel 
}) => {
  const { isDarkMode } = useTheme();
  const [captchaInput, setCaptchaInput] = useState<string>("");
  const [captchaText, setCaptchaText] = useState<string>(generateCaptcha());
  const [error, setError] = useState<string>("");

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
  };

  const validatePAN = (pan: string) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!panNumber) {
      setError("Please enter your PAN number");
      return;
    }
    
    if (!validatePAN(panNumber)) {
      setError("Please enter a valid PAN number");
      return;
    }
    
    if (captchaInput.toLowerCase() !== captchaText.toLowerCase()) {
      setError("Captcha does not match");
      refreshCaptcha();
      return;
    }
    
    // All validations passed, proceed to next step
    setCurrentStep(1);
  };

  return (
    <div className="flex-1 flex flex-col space-y-8 px-3">
      <div className="flex items-center mb-2">
        <button 
          onClick={onCancel}
          className={`p-1 rounded-full ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
        >
          <ChevronLeft size={20} className={isDarkMode ? "text-white" : "text-gray-800"} />
        </button>
        <h2 className={`text-lg font-medium ml-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Account Recovery
        </h2>
      </div>

      <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
        Please verify your PAN number to recover your account access.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label 
            className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
          >
            PAN Number
          </label>
          <input
            type="text"
            value={panNumber}
            onChange={(e) => {
              setPanNumber(e.target.value.toUpperCase());
              setError("");
            }}
            maxLength={10}
            placeholder="Enter PAN Number"
            className={`w-full p-2 rounded-lg border ${
              isDarkMode 
                ? "bg-[#1E1E1E] text-white border-gray-600 focus:border-blue-400" 
                : "bg-white text-gray-900 border-gray-300 focus:border-blue-500"
            } focus:ring-1 focus:ring-opacity-50`}
          />
        </div>

        <div>
          <label 
            className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
          >
            Captcha Verification
          </label>
          
          <div className="flex items-center space-x-2 mb-3">
            <div 
              className={`flex-1 p-2 text-center font-mono text-lg ${
                isDarkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-800"
              } rounded select-none`}
            >
              {captchaText}
            </div>
            <button
              type="button"
              onClick={refreshCaptcha}
              className={`p-2 rounded ${
                isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <RefreshCw size={18} className={isDarkMode ? "text-white" : "text-gray-800"} />
            </button>
          </div>
          
          <input
            type="text"
            value={captchaInput}
            onChange={(e) => {
              setCaptchaInput(e.target.value);
              setError("");
            }}
            placeholder="Enter captcha code"
            className={`w-full p-2 rounded-lg border ${
              isDarkMode 
                ? "bg-[#1E1E1E] text-white border-gray-600 focus:border-blue-400" 
                : "bg-white text-gray-900 border-gray-300 focus:border-blue-500"
            } focus:ring-1 focus:ring-opacity-50`}
          />
        </div>

        {error && (
          <p className="text-red-500 text-xs mt-3">
            {error}
          </p>
        )}

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
  );
};

export default PanVerification;