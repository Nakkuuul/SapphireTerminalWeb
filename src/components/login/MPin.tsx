'use client';

import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import ForgotMPin from './ForgotMPin';

interface OtpScreenProps {
  username: string;
  greeting: string;
  setOtpCompleted?: (completed: boolean) => void;
}

const MPin: React.FC<OtpScreenProps> = ({ 
  username, 
  greeting,
  setOtpCompleted = () => {} // Default no-op function
}) => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const [isF, setIsF] = useState<boolean>(false);
  const [iT, setIT] = useState<number>(30);
  const [iE, setIE] = useState<boolean>(false);
  const [showForgotMPin, setShowForgotMPin] = useState<boolean>(false);

  // Check if all MPIN fields are filled
  const isMpinComplete = otp.every((digit) => digit !== "");

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
    }, 700); // delay in milliseconds (0.7 seconds)
  };  

  const handleOtpComplete = () => {
    setIsRedirecting(true);
    setTimeout(() => router.push("/"), 500);
  };

  const handleVerifyAndContinue = () => {
    if (isMpinComplete) {
      setOtpCompleted(true);
      handleRedirect();
    }
  };




//   const handleForgotMPin = () => {
//     setShowForgotMPin(true);
//   };

//   const handleForgotMPinCancel = () => {
//     setShowForgotMPin(false);
//   };

// if (showForgotMPin) {
//     return (
//         <ForgotMPin
//             onCancel={handleForgotMPinCancel}
//             setOtpCompleted={setOtpCompleted}
//         />
//     );
// }




  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.querySelector<HTMLInputElement>(`input[name="otp-${index + 1}"]`)?.focus();
    }

    if (newOtp.every((d) => d !== "") && value !== "") {
      handleOtpComplete();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle Enter key press
    if (e.key === "Enter" && isMpinComplete) {
      e.preventDefault();
      handleVerifyAndContinue();
      return;
    }

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
          Enter Your MPIN
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-300">
           Please enter your 4-digit MPIN to continue
        </p>
      </div>

      <div className="flex justify-start gap-6">
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


    <div className="flex justify-end">
      <button
        className={`text-xs transition-colors duration-200 
        ${iE
          ? "text-blue-400 hover:text-blue-500"
          : isF
          ? "text-gray-400 hover:text-gray-500 cursor-not-allowed"
          : "text-blue-400 hover:text-blue-500"
        }`}
        disabled={isF && !iE}
      />

      <button
        type="submit"
        onClick={handleVerifyAndContinue}
        disabled={!isMpinComplete}
        className={`w-full py-3 text-white font-semibold text-sm rounded-lg transition-all duration-200 ${
          !isMpinComplete
            ? "bg-[#00A645] cursor-not-allowed opacity-70"
            : "bg-[#00C853] hover:bg-[#00B649]"
        }`}
      >
        Verify and Continue
      </button>
    </div>
    </div>
  );
};

export default MPin;