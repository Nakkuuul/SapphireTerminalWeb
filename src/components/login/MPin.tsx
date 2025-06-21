'use client';

import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import ForgotMPin from './ForgotMPin';

interface OtpScreenProps {
  username: string;
  greeting: string;
  sessionId: string;
  setOtpCompleted?: (completed: boolean) => void;
  onNextStep: (nextStep: string, session: any) => void;
  onShowForgotMPin: () => void;
}

const MPin: React.FC<OtpScreenProps> = ({ 
  username, 
  greeting,
  sessionId,
  setOtpCompleted = () => {}, // Default no-op function
  onNextStep,
  onShowForgotMPin
}) => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isF, setIsF] = useState<boolean>(false);
  const [iT, setIT] = useState<number>(30);
  const [iE, setIE] = useState<boolean>(false);
  const [showForgotMPin, setShowForgotMPin] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

  const handleSubmit = async (mpinArray?: string[]) => {
    if (isSubmitting) return; // Prevent multiple submissions
    
    setError(null);
    const mpinValue = (mpinArray || otp).join('');
    console.log('MPIN Value:', mpinValue, 'Length:', mpinValue.length, 'OTP Array:', mpinArray || otp);
    
    if (mpinValue.length !== 4) {
      setError("Please enter the complete 4-digit MPIN.");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('Submitting MPIN:', mpinValue, 'Session ID:', sessionId);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login/verify-mpin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId,
          mpin: mpinValue,
        }),
      });

      const data = await response.json();
      console.log('MPIN verification response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'MPIN verification failed.');
      }

      setOtpCompleted(true);
      if (data?.data?.nextStep) {
        onNextStep(data.data.nextStep, data.data);
      } else {
        setIsRedirecting(true);
        setTimeout(() => {
          router.push('/stocks');
        }, 700);
      }

    } catch (err: any) {
      console.error('MPIN verification error:', err);
      setError(err.message || "An unexpected error occurred.");
      setOtp(["", "", "", ""]);
      const firstInput = document.querySelector<HTMLInputElement>('input[name="otp-0"]');
      if (firstInput) {
        firstInput.focus();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRedirect = () => {
    setTimeout(() => {
      router.push('/stocks');
    }, 700); // delay in milliseconds (0.7 seconds)
  };  

  const handleOtpComplete = () => {
    handleSubmit();
  };

  const handleVerifyAndContinue = () => {
    if (isMpinComplete && !isSubmitting) {
      handleSubmit();
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

    // Check if all fields are filled and auto-submit with a small delay
    if (newOtp.every((d) => d !== "") && value !== "") {
      // Add a small delay to ensure state is updated
      setTimeout(() => {
        if (newOtp.every((d) => d !== "") && newOtp.join('').length === 4) {
          handleSubmit(newOtp);
        }
      }, 100);
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
        {error && <p className="text-xs text-red-500">{error}</p>}
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


    <div className="flex justify-between items-center w-full">
        <button
            onClick={onShowForgotMPin}
            className="text-xs text-blue-400 hover:text-blue-500 transition-colors duration-200"
        >
            Forgot MPIN?
        </button>

      <button
        type="submit"
        onClick={handleVerifyAndContinue}
        disabled={!isMpinComplete || isRedirecting || isSubmitting}
        className={`w-1/2 py-3 text-white font-semibold text-sm rounded-lg transition-all duration-200 ${
          !isMpinComplete || isSubmitting
            ? "bg-[#00A645] cursor-not-allowed opacity-70"
            : "bg-[#00C853] hover:bg-[#00B649]"
        }`}
      >
        {isRedirecting || isSubmitting ? 'Verifying...' : 'Verify and Continue'}
      </button>
    </div>
    </div>
  );
};

export default MPin;