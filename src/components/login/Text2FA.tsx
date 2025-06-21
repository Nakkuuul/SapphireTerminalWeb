'use client';

import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

interface OtpScreenProps {
  username: string;
  greeting: string;
  setOtpCompleted?: (completed: boolean) => void;
}

const Text2FA: React.FC<OtpScreenProps> = ({ 
  username, 
  greeting,
  setOtpCompleted = () => {} // Default no-op function
}) => {
  const router = useRouter();
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

  const handleRedirect = () => {
    setTimeout(() => {
      router.push('/trades/stocks');
    }, 700); // delay in milliseconds (1.5 seconds)
  };  

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

  return (
    <div key="otp" className="flex-1 flex flex-col justify-center space-y-6 px-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {greeting}, {username}!
      </h2>
      <div className="space-y-1">
        <h3 className="text-lg font-normal text-gray-900 dark:text-white pb-2">
          Enter the code we sent to you.
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-300">
           We have sent a 6-digit code to your phone number ending
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-300">
           with ••••4567
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
            className="w-[42px] h-[42px] text-center text-lg rounded-md border bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-opacity-50 focus:outline-none"
            autoFocus={index === 0}
            disabled={isRedirecting}
          />
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button className="text-[#22F07D] transition-colors duration-200 text-sm">
          Resend OTP
        </button>
      </div>
      
      <button
        onClick={() => {
          setOtpCompleted(true);
          handleRedirect();
        }}
        className="mt-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
      >
        Verify and Continue
      </button>
    </div>
  );
};

export default Text2FA;