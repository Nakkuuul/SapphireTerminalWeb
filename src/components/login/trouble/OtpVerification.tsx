'use client';

import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";

interface OtpVerificationProps {
  setCurrentStep: (step: number) => void;
  onCancel: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({ 
  setCurrentStep, 
  onCancel 
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input if value is entered
    if (value && index < 5) {
      document.querySelector<HTMLInputElement>(`input[name="otp-${index + 1}"]`)?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      document.querySelector<HTMLInputElement>(`input[name="otp-${index - 1}"]`)?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpValue = otp.join("");
    
    if (otpValue.length !== 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }
    
    if (!/^\d{6}$/.test(otpValue)) {
      setError("OTP must contain 6 digits");
      return;
    }
    
    // For demo, just check if OTP is "123456"
    if (otpValue !== "123456") {
      setError("Invalid OTP. For demo, use 123456");
      return;
    }
    
    // All validations passed, proceed to next step
    setCurrentStep(2);
  };

  const handleResendOtp = () => {
    // Reset OTP fields
    setOtp(["", "", "", "", "", ""]);
    
    // Reset timer
    setTimeLeft(120);
    
    // Clear error
    setError("");
    
    // Focus on first input
    document.querySelector<HTMLInputElement>(`input[name="otp-0"]`)?.focus();
  };

  return (
    <div className="flex-1 flex flex-col space-y-4 px-2">
      <div className="flex items-center mb-2">
        <button 
          onClick={() => setCurrentStep(0)}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <ChevronLeft size={20} className="text-gray-800 dark:text-white" />
        </button>
        <h2 className="text-lg font-medium ml-2 text-gray-800 dark:text-white">
          OTP Verification
        </h2>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300">
        We have sent a 6-digit OTP to your registered email and phone number.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
            Enter OTP
          </label>
          
          <div className="flex justify-start gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                name={`otp-${index}`}
                value={digit}
                maxLength={1}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                autoComplete="off"
                className="w-[42px] h-[42px] text-center text-lg rounded-md border bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-opacity-50 focus:outline-none"
                autoFocus={index === 0}
              />
            ))}
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-xs">
            {error}
          </p>
        )}

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={timeLeft > 0}
            className={`text-xs ${
              timeLeft > 0
                ? "text-gray-400 dark:text-gray-500"
                : "text-blue-500 hover:text-blue-600"
            }`}
          >
            {timeLeft > 0 
              ? `Resend OTP in ${formatTime(timeLeft)}`
              : "Resend OTP"
            }
          </button>
        </div>
        
        <button
          type="submit"
          className={`px-4 py-2 text-white font-semibold text-sm rounded-lg transition-all duration-200 ${
            otp.join("").length !== 6
              ? "bg-[#00A645] cursor-not-allowed opacity-70"
              : "bg-[#00C853] hover:bg-[#00B649]"
          }`}
          disabled={otp.join("").length !== 6}
        >
          Verify
        </button>
      </form>
      
    </div>
  );
};

export default OtpVerification;