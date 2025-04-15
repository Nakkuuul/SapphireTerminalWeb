'use client';

import React, { useState, useEffect } from 'react';
import { RotateCw } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';

interface VerifyScreenProps {
  username: string;
  setCurrentStep: (step: number) => void;
  greeting: string;
}

const VerifyScreen: React.FC<VerifyScreenProps> = ({ username, setCurrentStep, greeting }) => {
  const { isDarkMode } = useTheme();
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [verificationCode, setVerificationCode] = useState<number>(Math.floor(Math.random() * 90 + 10));
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [timeL, setTimeL] = useState<number>(10);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (!isExpired) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isExpired]);

  useEffect(() => {
    if (isFlipped && timeL > 0) {
      const timer = setInterval(() => {
        setTimeL((prev) => {
          if (prev <= 1) {
            setIsEnabled(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isFlipped, timeL]);

  const handleRetry = () => {
    setVerificationCode(Math.floor(Math.random() * 90 + 10));
    setTimeLeft(59);
    setIsExpired(false);
  };

  const handleClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      setTimeL(30);
    } else if (isEnabled) {
      setCurrentStep(2);
    }
  };

  const formatTime = (seconds: number): string => `00:${seconds.toString().padStart(2, "0")}`;

  // Common circle size style to maintain consistent size
  const circleStyle = "w-16 h-16 flex items-center justify-center text-2xl font-bold text-white bg-[#3B3B3B] rounded-full shadow-lg";

  return (
    <div key="verify" className="flex-1 flex flex-col justify-center space-y-3 px-2">
      <div className="flex justify-center">
        <Image 
          src="/login/clock.png" 
          alt="Time" 
          width={56} 
          height={56} 
          className="w-14"
          priority
        />
      </div>
      <div className="space-y-2 text-center">
        <h2 className={`text-xl font-normal ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          {greeting}, {username}!
        </h2>
        <h3 className={`text-lg font-normal ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Check your Mobile Phone
        </h3>
        <p className={`text-xs ${isDarkMode ? "text-gray-200" : "text-gray-600"}`}>
          Check your notification bar and tap the displayed code to sign in to the terminal.
        </p>
      </div>

      <div className="flex justify-center py-2 h-20">
        {isExpired ? (
          <motion.button
            onClick={handleRetry}
            className={circleStyle}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.1 }}
          >
            <RotateCw className="w-6 h-6" />
          </motion.button>
        ) : (
          <div className={circleStyle}>
            {verificationCode}
          </div>
        )}
      </div>

      <p className={`text-sm font-medium text-center ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
        {isExpired ? (
          "Click the retry button to generate a new code"
        ) : (
          <>
            Verification code expires in <span className="text-[#478AFF]">{formatTime(timeLeft)}</span>
          </>
        )}
      </p>

      <div className="flex justify-end">
        <button
          onClick={handleClick}
          className={`text-xs transition-colors duration-200 
            ${isEnabled
              ? "text-blue-400 hover:text-blue-500"
              : isFlipped
              ? "text-gray-400 hover:text-gray-500 cursor-not-allowed"
              : "text-blue-400 hover:text-blue-500"
            }`}
          disabled={isFlipped && !isEnabled}
        >
          {isFlipped
            ? `Email/Mobile Otp ${timeL > 0 ? `(${timeL}s)` : ""}`
            : "Looking for more ways to sign in?"}
        </button>
      </div>
    </div>
  );
};

export default VerifyScreen;