'use client';

import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
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
      toast.error("Invalid MPIN", {
        description: "Please enter the complete 4-digit MPIN.",
        duration: 3000,
      });
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

      // Save token to cookies when MPIN verification is successful
      // Token is at root level of response, not inside data
      if (data?.token) {
        saveTokenToCookies(data.token);
        console.log('Token saved:', data.token); // Debug log
      }

      setOtpCompleted(true);
      if (data?.data?.nextStep) {
        onNextStep(data.data.nextStep, data.data);
      } else {
        setIsRedirecting(true);
        setTimeout(() => {
          router.push('/home');
        }, 700);
      }

    } catch (err: any) {
      console.error('MPIN verification error:', err);
      
      // Show Sonner toast for error instead of setting error state
      toast.error("MPIN Verification Failed", {
        description: err.message || "Invalid MPIN. Please check your 4-digit MPIN and try again.",
        duration: 3000,
      });
      
      setOtp(["", "", "", ""]);
      const firstInput = document.querySelector<HTMLInputElement>('input[name="otp-0"]');
      if (firstInput) {
        firstInput.focus();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to save token in cookies
  const saveTokenToCookies = (token: string) => {
    try {
      // Set HTTP-only cookie with proper settings
      const cookieString = `auth-token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; samesite=strict${process.env.NODE_ENV === 'production' ? '; secure' : ''}`;
      document.cookie = cookieString;
      
      console.log('Cookie set:', cookieString); // Debug log
      
      // Verify cookie was set
      const cookies = document.cookie.split(';');
      const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth-token='));
      console.log('Cookie verification:', authCookie); // Debug log
      
    } catch (error) {
      console.error('Error setting cookie:', error);
    }
  };

  const handleRedirect = () => {
    setTimeout(() => {
      router.push('/home');
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

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(null);

    if (value && index < 3) {
      document.querySelector<HTMLInputElement>(`input[name="otp-${index + 1}"]`)?.focus();
    }

    // Removed auto-submission - user must click "Verify and Continue" button manually
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
    <div key="otp" className="flex-1 flex flex-col justify-center space-y-6 px-">
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
            disabled={isRedirecting || isSubmitting}
          />
        ))}
      </div>

    <div className="flex justify-between items w-full flex-col">
        <div className="flex justify-end w-full">
          <button
            onClick={onShowForgotMPin}
            className="text-xs text-blue-400 hover:text-blue-500 transition-colors duration-200 pb-3"
          >
            Forgot MPIN?
          </button>
        </div>

      <button
        type="submit"
        onClick={handleVerifyAndContinue}
        disabled={!isMpinComplete || isRedirecting || isSubmitting}
        className={`w-full py-3 text-white font-semibold text-sm rounded-lg transition-all duration-200 ${
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