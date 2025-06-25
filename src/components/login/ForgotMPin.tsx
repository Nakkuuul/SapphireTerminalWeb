"use client";

import React, { useState, KeyboardEvent, ChangeEvent, useEffect } from "react";
import { ChevronLeft, Eye, EyeOff, RefreshCw } from "lucide-react";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

// Import the SuccessPage component
import SuccessPage from "./MPINSuccess";// Adjust path as needed

export interface ForgotMPinProps {
  username: string;
  greeting: string;
  setOtpCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel: () => void;
  sessionId: string;
  onNextStep: (nextStep: string, session: any) => void;
}

type ForgotMPinStep = 'initiate' | 'verify-otp' | 'reset-mpin';

const ForgotMPin: React.FC<ForgotMPinProps> = ({
  onCancel,
  setOtpCompleted = () => {},
  username,
  greeting,
  sessionId,
  onNextStep
}) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<ForgotMPinStep>('initiate');
  const [requestId, setRequestId] = useState<string>('');
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [newMpin, setNewMpin] = useState<string>("");
  const [confirmMpin, setConfirmMpin] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNewMpin, setShowNewMpin] = useState<boolean>(false);
  const [showConfirmMpin, setShowConfirmMpin] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Add state for showing success page
  const [showSuccessPage, setShowSuccessPage] = useState<boolean>(false);

  // Timer states for resend OTP
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Captcha states
  const [captchaInput, setCaptchaInput] = useState<string>("");
  const [captchaText, setCaptchaText] = useState<string>(generateCaptcha());
  const [captchaError, setCaptchaError] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);

  // Timer effect for resend OTP (matches OtpVerification format)
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    return `${seconds}`;
  };

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
    setCaptchaError(false);
  };

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

  const handleRedirect = () => {
    setTimeout(() => {
      router.push('/stocks');
    }, 700);
  };

  const handleSuccessPageContinue = () => {
    setShowSuccessPage(false);
    
    // Check if there's a next step stored
    const nextStepData = sessionStorage.getItem('nextStepData');
    if (nextStepData) {
      const { nextStep, sessionData } = JSON.parse(nextStepData);
      sessionStorage.removeItem('nextStepData');
      onNextStep(nextStep, sessionData);
    } else {
      // Default redirect to stocks page
      handleRedirect();
    }
  };

  const validateMpinInput = (value: string): string => {
    const cleanValue = value.replace(/[^\d]/g, '');
    return cleanValue.slice(0, 4);
  };

  const handleNewMpinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleanValue = validateMpinInput(e.target.value);
    setNewMpin(cleanValue);
    setError(null);
  };

  const handleConfirmMpinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleanValue = validateMpinInput(e.target.value);
    setConfirmMpin(cleanValue);
    setError(null);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(null);

    if (value && index < 5) {
      document.querySelector<HTMLInputElement>(`input[name="otp-${index + 1}"]`)?.focus();
    }

    if (newOtp.every((d) => d !== "") && value !== "") {
      setTimeout(() => {
        if (newOtp.every((d) => d !== "") && newOtp.join('').length === 6) {
          handleVerifyOTP(newOtp);
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

  const handleInitiate = async () => {
    // Validate captcha before proceeding
    if (captchaInput.toLowerCase() !== captchaText.toLowerCase()) {
      setCaptchaError(true);
      refreshCaptcha();
      setShake(true);
      setTimeout(() => setShake(false), 500);
      
      toast.error("Invalid Captcha", {
        description: "Please enter the correct captcha code.",
        duration: 3000,
      });
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login/forgot-mpin/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: username
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to initiate MPIN reset');
      }

      setRequestId(data.data?.requestId || '');
      setCurrentStep('verify-otp');
      
      // Start timer when OTP is first sent
      setTimeLeft(60);

      toast.success("OTP Sent", {
        description: "A verification code has been sent to your registered mobile number.",
        duration: 3000,
      });
      
    } catch (err: any) {
      toast.error("Request Failed", {
        description: err.message || "Failed to initiate MPIN reset. Please try again.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (otpArray?: string[]) => {
    if (isSubmitting) return;
    
    const otpValue = (otpArray || otp).join('');
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
      setError(null);
      console.log('Verifying OTP:', otpValue, 'Request ID:', requestId);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login/forgot-mpin/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId: requestId,
          otp: otpValue
        }),
      });

      const data = await response.json();
      console.log('OTP verification response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Invalid OTP');
      }

      setCurrentStep('reset-mpin');
      
    } catch (err: any) {
      console.error('OTP verification error:', err);
      
      toast.error("OTP Verification Failed", {
        description: err.message || "Invalid OTP. Please check your 6-digit code and try again.",
        duration: 3000,
      });
      
      setOtp(["", "", "", "", "", ""]);
      document.querySelector<HTMLInputElement>(`input[name="otp-0"]`)?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login/forgot-mpin/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId: requestId
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }

      setOtp(["", "", "", "", "", ""]);
      setTimeLeft(60); // Reset timer to 60 seconds
      setError(null);
      document.querySelector<HTMLInputElement>(`input[name="otp-0"]`)?.focus();

      toast.success("OTP Resent", {
        description: "A new verification code has been sent to your registered mobile number.",
        duration: 3000,
      });
      
    } catch (err: any) {
      toast.error("Resend Failed", {
        description: err.message || "Failed to resend OTP. Please try again.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetMPIN = async () => {
    if (newMpin.length !== 4) {
      toast.error("Invalid MPIN", {
        description: "MPIN must be exactly 4 digits.",
        duration: 3000,
      });
      return;
    }

    if (newMpin !== confirmMpin) {
      toast.error("MPIN Mismatch", {
        description: "MPINs do not match. Please try again.",
        duration: 3000,
      });
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login/forgot-mpin/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId: requestId,
          newMpin: newMpin
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset MPIN');
      }

      setOtpCompleted(true);
      
      // Show success page instead of immediate redirect
      setShowSuccessPage(true);
      
      // Handle next step logic after success page is dismissed
      if (data?.data?.nextStep) {
        // Store the next step data for later use
        sessionStorage.setItem('nextStepData', JSON.stringify({
          nextStep: data.data.nextStep,
          sessionData: data.data
        }));
      }
      
    } catch (err: any) {
      toast.error("Reset Failed", {
        description: err.message || "Failed to reset MPIN. Please try again.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderInitiateStep = () => (
    <div className="space-y-6 transition-all duration-200">
      {/* Inject the keyframes for the shake animation */}
      <style jsx>{keyframes}</style>
      
      <p className="text-[0.9rem] text-gray-600 dark:text-gray-300">
        We'll send a verification code to your registered mobile number to reset your MPIN.
      </p>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
          Captcha Verification
        </label>

        <div className="flex items-center space-x-2 mb-3">
          <div className="flex-1 p-2 text-center font-mono text-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded select-none">
            {captchaText}
          </div>
          <button
            type="button"
            onClick={refreshCaptcha}
            className="p-3 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <RefreshCw
              size={18}
              className="text-gray-800 dark:text-white"
            />
          </button>
        </div>

        <input
          type="text"
          value={captchaInput}
          onChange={(e) => {
            setCaptchaInput(e.target.value);
            setCaptchaError(false);
          }}
          placeholder="Enter captcha code"
          style={shakeStyle}
          className={`w-full p-2 rounded-lg border bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white 
          ${
            captchaError
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-400"
          } focus:ring-1 focus:ring-opacity-50`}
        />
      </div>

      <button
        type="button"
        onClick={handleInitiate}
        disabled={isLoading || !captchaInput}
        className={`w-full py-3 text-white font-semibold text-sm rounded-lg transition-all duration-200 ${
          isLoading || !captchaInput
            ? "bg-[#00A645] cursor-not-allowed opacity-70"
            : "bg-[#00C853] hover:bg-[#00B649]"
        }`}
      >
        {isLoading ? 'Sending...' : 'Send Verification Code'}
      </button>
    </div>
  );

  const renderVerifyOTPStep = () => (
    <div className="space-y-6 transition-all duration-200">
      <p className="text-[0.9rem] text-gray-600 dark:text-gray-300">
        Enter the 6-digit verification code sent to your mobile number.
      </p>

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
            disabled={isLoading || isSubmitting}
          />
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={handleResendOTP}
          disabled={timeLeft > 0}
          className={`text-xs ${
            timeLeft > 0
              ? "text-gray-400 dark:text-gray-500"
              : "text-[#00d05c]"
          }`}
        >
          {timeLeft > 0 
            ? `Resend Code (${formatTime(timeLeft)})`
            : "Resend Code"
          }
        </button>
      </div>

      <button 
        type="button" 
        onClick={() => handleVerifyOTP()} 
        disabled={isSubmitting || otp.join("").length !== 6} 
        className={`w-full py-3 text-white font-semibold text-sm rounded-lg transition-all duration-200 ${
          isSubmitting || otp.join("").length !== 6
            ? "bg-[#00A645] cursor-not-allowed opacity-70" 
            : "bg-[#00C853] hover:bg-[#00B649]"
        }`}
      >
        {isSubmitting ? 'Verifying...' : 'Continue'}
      </button>
    </div>
  );

  const renderResetMPINStep = () => (
    <div className="space-y-6 transition-all duration-200">
      <p className="text-[0.9rem] text-gray-600 dark:text-gray-300">
        Create a new 4-digit MPIN for your account.
      </p>

      <div>
        <label className="block text-[0.74rem] font-medium mb-[0.42rem] text-gray-700 dark:text-gray-200">
          Enter New MPIN
        </label>
        <div className="relative">
          <input
            type={showNewMpin ? "text" : "password"}
            value={newMpin}
            maxLength={4}
            autoComplete="off"
            inputMode="numeric"
            pattern="\d*"
            placeholder="Enter 4-digit MPIN"
            onChange={handleNewMpinChange}
            className="w-full p-[0.64rem] pr-[2.55rem] rounded-lg border bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white text-[0.85rem] border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-opacity-50 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowNewMpin(!showNewMpin)}
            className="absolute inset-y-0 right-0 flex items-center px-[0.64rem] text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
          >
            {showNewMpin ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-[0.74rem] font-medium mb-[0.42rem] text-gray-700 dark:text-gray-200">
          Confirm New MPIN
        </label>
        <div className="relative">
          <input
            type={showConfirmMpin ? "text" : "password"}
            value={confirmMpin}
            maxLength={4}
            autoComplete="off"
            inputMode="numeric"
            pattern="\d*"
            placeholder="Confirm 4-digit MPIN"
            onChange={handleConfirmMpinChange}
            className="w-full p-[0.64rem] pr-[2.55rem] rounded-lg border bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white text-[0.85rem] border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-opacity-50 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmMpin(!showConfirmMpin)}
            className="absolute inset-y-0 right-0 flex items-center px-[0.64rem] text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
          >
            {showConfirmMpin ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleResetMPIN}
        disabled={isLoading || newMpin.length !== 4 || confirmMpin.length !== 4}
        className={`w-full py-3 text-white font-semibold text-sm rounded-lg transition-all duration-200 ${
          isLoading || newMpin.length !== 4 || confirmMpin.length !== 4
            ? "bg-[#00A645] cursor-not-allowed opacity-70"
            : "bg-[#00C853] hover:bg-[#00B649]"
        }`}
      >
        {isLoading ? 'Resetting...' : 'Reset MPIN'}
      </button>
    </div>
  );

  // Render success page if MPIN reset is successful
  if (showSuccessPage) {
    return (
      <SuccessPage
        title="MPIN Reset Successfully"
        message="Your MPIN has been reset successfully. You can now login with your new MPIN."
        onContinue={handleSuccessPageContinue}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col space-y-[1.7rem] px-[0.21rem]">
      <div className="flex items-center -ml-[1.27rem] -mt-[0.42rem]">
        <button
          onClick={onCancel}
          className="p-[0.21rem] rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <ChevronLeft size={17} className="text-gray-800 dark:text-white" />
        </button>
        <h2 className="text-[1.02rem] font-medium text-gray-800 dark:text-white pl-[0.42rem]">
          {currentStep === 'initiate' && 'Forgot MPIN'}
          {currentStep === 'verify-otp' && 'Verify Code'}
          {currentStep === 'reset-mpin' && 'Create New MPIN'}
        </h2>
      </div>

      {currentStep === 'initiate' && renderInitiateStep()}
      {currentStep === 'verify-otp' && renderVerifyOTPStep()}
      {currentStep === 'reset-mpin' && renderResetMPINStep()}
    </div>
  );
};

export default ForgotMPin;