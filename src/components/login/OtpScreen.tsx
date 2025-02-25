// src/components/login/OtpScreen.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

interface OtpScreenProps {
  username: string;
  greeting: string;
}

const OtpScreen: React.FC<OtpScreenProps> = ({ username, greeting }) => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const [isF, setIsF] = useState<boolean>(false);
  const [iT, setIT] = useState<number>(30);
  const [iE, setIE] = useState<boolean>(false);

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

  const handleOtpComplete = () => {
    setIsRedirecting(true);
    setTimeout(() => router.push("/"), 500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.querySelector<HTMLInputElement>(`input[name="otp-${index + 1}"]`)?.focus();
    }

    if (newOtp.every((d) => d !== "") && value !== "") {
      handleOtpComplete();
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

  return (
    <div key="otp" className="flex-1 flex flex-col justify-center space-y-6 sm:space-y-8 px-4 sm:px-6">
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        {greeting}, {username}!
      </h2>
      <div className="space-y-2 sm:space-y-3">
        <h3 className={`text-xl sm:text-2xl font-normal ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Enter OTP
        </h3>
        <p className={`text-base sm:text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          We have sent an OTP to registered email & phone
        </p>
      </div>

      <div className="flex justify-start gap-2 sm:gap-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            autoComplete="off"
            inputMode="numeric"
            pattern="\d*"
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !digit) {
                e.preventDefault();
                const newOtp = [...otp];
                const prevIndex = index - 1;
                if (prevIndex >= 0) {
                  newOtp[prevIndex] = "";
                  setOtp(newOtp);
                  document.querySelector<HTMLInputElement>(`input[name="otp-${prevIndex}"]`)?.focus();
                }
              }
            }}
            name={`otp-${index}`}
            className={`w-8 sm:w-12 h-12 sm:h-16 text-center border-t-0 border-l-0 border-r-0 border-b-2 
                     text-xl sm:text-2xl font-bold outline-none transition-all duration-200 ${
                       isDarkMode
                         ? "bg-[#1E1E1E] border-gray-400 text-white focus:border-white"
                         : "bg-white border-gray-300 text-gray-900 focus:border-black"
                     }`}
            autoFocus={index === 0}
            disabled={isRedirecting}
          />
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button className="text-[#22F07D] transition-colors duration-200 text-base sm:text-lg">
          Resend OTP
        </button>
      </div>
      <div className="flex justify-end">
        <button
          onClick={demon}
          className={`text-sm sm:text-base transition-colors duration-200 
            ${iE
              ? "text-blue-400 hover:text-blue-500"
              : isF
              ? "text-gray-400 hover:text-gray-500 cursor-not-allowed"
              : "text-blue-400 hover:text-blue-500"
            }`}
          disabled={isF && !iE}
        >
          {isF
            ? `Mobile Prompt ${iT > 0 ? `(${iT}s)` : ""}`
            : "Looking for more ways to sign in?"}
        </button>
      </div>
    </div>
  );
};

export default OtpScreen;