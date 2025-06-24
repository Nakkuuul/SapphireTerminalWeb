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

const Text2FA: React.FC<OtpScreenProps> = ({ 
  username, 
  greeting,
  sessionId,
  setOtpCompleted = () => {}, // Default no-op function
  onNextStep,
}) => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isF, setIsF] = useState<boolean>(false);
  const [iT, setIT] = useState<number>(30);
  const [iE, setIE] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [resendTimer, setResendTimer] = useState<number>(0);

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

  // Timer for resend OTP button
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  const handleResendOTP = async () => {
    if (isResending || resendTimer > 0) return;
    
    // Start timer immediately when button is clicked
    setResendTimer(15);
    
    try {
      setIsResending(true);
      console.log('Resending OTP for session ID:', sessionId);
      
      // Try the resend endpoint first
      let response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login/2fa/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId,
          // clientId: username
        })
      });

      // If resend endpoint fails, try using the verify endpoint with resend parameter
      if (!response.ok) {
        console.log('Resend endpoint failed, trying verify endpoint with resend parameter');
        response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login/verify-2fa`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: sessionId,
            action: 'resend'
          })
        });
      }

      const data = await response.json();
      console.log('Resend OTP response:', data, 'Status:', response.status);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }

      // Reset timer and clear OTP fields on success
      setIsF(true);
      setIT(30);
      setIE(false);
      setOtp(["", "", "", "", "", ""]);
      setError(null);
      console.log('OTP resent successfully');
      
      // Show success toast for resend
      toast.success("OTP Resent", {
        description: "A new 6-digit code has been sent to your registered email and mobile number.",
        duration: 3000,
      });
      
    } catch (err: any) {
      console.error('Resend OTP error:', err);
      
      // Show error toast for resend failure
      toast.error("Resend Failed", {
        description: err.message || "Failed to resend OTP. Please try again.",
        duration: 3000,
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleButtonClick = () => {
    handleSubmit();
  };

  const handleSubmit = async (otpArray?: string[]) => {
    if (isSubmitting) return; // Prevent multiple submissions
    
    setError(null);
    const otpValue = (otpArray || otp).join("");
    console.log('OTP Value:', otpValue, 'Length:', otpValue.length, 'OTP Array:', otpArray || otp);
    
    if (otpValue.length !== 6) {
      toast.error("Invalid OTP", {
        description: "Please enter the complete 6-digit OTP.",
        duration: 3000,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('Submitting OTP:', otpValue, 'Session ID:', sessionId);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login/verify-2fa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId,
          token: otpValue
        })
      });

      const data = await response.json();
      console.log('OTP verification response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'OTP verification failed.');
      }

      // Handle successful OTP verification
      setOtpCompleted(true);
      if (data?.data?.nextStep) {
        // Handle next step based on API response - could be 'mpin' or 'set-mpin'
        onNextStep(data.data.nextStep, data.data);
      } else {
        // Fallback or final step
        setIsRedirecting(true);
        setTimeout(() => {
          router.push('/stocks');
        }, 700);
      }

    } catch (err: any) {
      console.error('OTP verification error:', err);
      
      // Show Sonner toast for error instead of setting error state
      toast.error("OTP Verification Failed", {
        description: err.message || "Invalid OTP. Please check your 6-digit code and try again.",
        duration: 3000,
      });
      
      setOtp(["", "", "", "", "", ""]); // Clear OTP on error
      document.querySelector<HTMLInputElement>(`input[name="otp-0"]`)?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRedirect = () => {
    setTimeout(() => {
      router.push('/trades/stocks');
    }, 700); // delay in milliseconds (1.5 seconds)
  };  

  const handleOtpComplete = () => {
    handleSubmit();
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.querySelector<HTMLInputElement>(`input[name="otp-${index + 1}"]`)?.focus();
    }

    // Check if all fields are filled and auto-submit with a small delay
    if (newOtp.every((d) => d !== "") && value !== "") {
      // Add a small delay to ensure state is updated
      setTimeout(() => {
        if (newOtp.every((d) => d !== "") && newOtp.join('').length === 6) {
          handleSubmit(newOtp);
        }
      }, 100);
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

  return (
    <div key="otp" className="flex-1 flex flex-col justify-center space-y-6 px-1">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {greeting}, {username}!
      </h2>
      <div className="space-y-1">
        <h3 className="text-lg font-normal text-gray-900 dark:text-white pb-2">
          Enter the code we sent to you.
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-300">
           We have sent a 6-digit code to your registered email and mobile number
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
            disabled={isRedirecting || isSubmitting}
          />
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button 
          type="button"
          onClick={handleResendOTP}
          disabled={isResending || resendTimer > 0 || (isF && !iE)}
          className={`text-[#22F07D] transition-colors duration-200 text-sm ${
            isResending || resendTimer > 0 || (isF && !iE) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isResending ? 'Resending...' : 
           resendTimer > 0 ? `Resend in ${resendTimer}s` : 
           'Resend OTP'}
        </button>
      </div>
      
      <button
        onClick={handleButtonClick}
        disabled={allOtpEmpty || isRedirecting || isSubmitting}
        className={`w-full py-3 text-white font-semibold text-sm rounded-lg transition-all duration-200 ${
          allOtpEmpty || isRedirecting || isSubmitting
            ? "bg-[#00A645] cursor-not-allowed opacity-70"
            : "bg-[#00C853] hover:bg-[#00B649]"
        }`}
      >
        {isRedirecting || isSubmitting ? 'Verifying...' : 'Verify and Continue'}
      </button>
    </div>
  );
};

export default Text2FA;