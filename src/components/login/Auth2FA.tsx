'use client';

import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

interface OtpScreenProps {
  username: string;
  greeting: string;
  sessionId: string;
  setOtpCompleted?: (completed: boolean) => void;
  onNextStep: (nextStep: string, session: any) => void;
}

const OtpScreen: React.FC<OtpScreenProps> = ({ 
  username, 
  greeting,
  sessionId,
  setOtpCompleted = () => {}, // Default no-op function
  onNextStep,
}) => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const [isF, setIsF] = useState<boolean>(false);
  const [iT, setIT] = useState<number>(30);
  const [iE, setIE] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);

  useEffect(() => {
    if (isF && iT > 0) {
      const timer = setInterval(() => {
        setIT((prev) => {
          if (prev <= 1) {
            setIE(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isF, iT]);

  const handleRedirect = () => {
    setTimeout(() => {
      router.push('/trades/stocks');
    }, 700); // delay in milliseconds (1.5 seconds)
  };  

  const handleOtpComplete = async () => {
    const otpValue = otp.join('');
    setError(false);
    setShake(false);
    setIsRedirecting(true);

    // Validate OTP length before making API call
    if (otpValue.length !== 6) {
      toast.error("Invalid OTP", {
        description: "Please enter the complete 6-digit authentication code.",
        duration: 3000,
      });
      setIsRedirecting(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          otp: otpValue,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Invalid OTP");
      }

      // OTP verification successful
      console.log("OTP verification successful:", data);
      setOtpCompleted(true);
      
      if (data?.data?.nextStep) {
        // Handle next step based on API response - could be 'mpin' or 'set-mpin'
        onNextStep(data.data.nextStep, data.data);
      } else {
        // Default redirect to dashboard
        handleRedirect();
      }

    } catch (err: any) {
      setError(true);
      setShake(true);
      setIsRedirecting(false);
      setTimeout(() => setShake(false), 500);
      setOtp(["", "", "", "", "", ""]);
      
      // Show Sonner toast for error instead of relying on the red text
      toast.error("Authentication Failed", {
        description: err.message || "Invalid authentication code. Please check your authenticator app and try again.",
        duration: 3000,
      });
      
      // Focus first input
      document.querySelector<HTMLInputElement>(`input[name="otp-0"]`)?.focus();
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(false);

    if (value && index < 5) {
      document.querySelector<HTMLInputElement>(`input[name="otp-${index + 1}"]`)?.focus();
    }

    if (newOtp.every((d) => d !== "") && value !== "") {
      handleOtpComplete();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index]) {
      e.preventDefault();
      const newOtp = [...otp];
      const prevIndex = index - 1;
      if (prevIndex >= 0) {
        newOtp[prevIndex] = "";
        setOtp(newOtp);
        document.querySelector<HTMLInputElement>(`input[name="otp-${prevIndex}"]`)?.focus();
      }
    }
  };

  const demon = () => {
    if (!isF) {
      setIsF(true);
      setIT(30);
    } else if (iE) {
      window.location.reload();
    }
  };

  // Check if all OTP fields are empty
  const allOtpEmpty = otp.every((digit) => digit === "");

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

  return (
    <div key="otp" className="flex-1 flex flex-col justify-center space-y-6 px-1">
      {/* Inject the keyframes for the shake animation */}
      <style jsx>{keyframes}</style>

      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {greeting}, {username}!
      </h2>
      <div className="space-y-1">
        <h3 className="text-lg font-normal text-gray-900 dark:text-white pb-2">
          Enter your authentication code.
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-300">
          Open Your Authenticator App and Enter the 6-Digit Code
        </p>
      </div>

      <div className="flex justify-start gap-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            name={`otp-${index}`}
            value={digit}
            maxLength={1}
            autoComplete="off"
            inputMode="numeric"
            pattern="\d*"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
            style={shakeStyle}
            className={`w-[42px] h-[42px] text-center text-lg rounded-md border bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white transition-all duration-200 focus:ring-1 focus:ring-opacity-50 focus:outline-none ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-400"
            }`}
            autoFocus={index === 0}
            disabled={isRedirecting}
          />
        ))}
      </div>

      <button
        onClick={() => {
          const otpValue = otp.join('');
          if (otpValue.length === 6) {
            handleOtpComplete();
          } else {
            toast.error("Invalid OTP", {
              description: "Please enter the complete 6-digit authentication code.",
              duration: 3000,
            });
          }
        }}
        disabled={allOtpEmpty || isRedirecting}
        className={`w-full py-3 text-white font-semibold text-sm rounded-lg transition-all duration-200 ${
          allOtpEmpty || isRedirecting
            ? "bg-[#00A645] cursor-not-allowed opacity-70"
            : "bg-[#00C853] hover:bg-[#00B649]"
        }`}
      >
        {isRedirecting ? "Verifying..." : "Verify and Continue"}
      </button>
    </div>
  );
};

export default OtpScreen; 