'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginScreen from '../login/LoginScreen';
import OtpScreen from './Auth2FA';
import ProgressBar from "../login/ProgressBar";
import Text2FA from "../login/Text2FA";
import MPin from "../login/MPin";
import ForgotMPin from "../login/ForgotMPin";
import MPinSetup from "../login/MPinSetup";

// Define the session data interface for better type safety
interface SessionData {
  sessionId: string;
  nextStep: string;
  firstName: string;
  twoFactorMethod?: string;
  deviceInfo?: any;
}

const Login = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("");
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const [showProgressBar, setShowProgressBar] = useState<boolean>(true);
  const [otpCompleted, setOtpCompleted] = useState<boolean>(false);
  const [disableAnimation, setDisableAnimation] = useState<boolean>(false);

  const [activeScreen, setActiveScreen] = useState<"login" | "sms_otp" | "authenticator" | "mpin" | "set_mpin" | "forgot_mpin">("login");
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  const setActiveScreenFromNextStep = (nextStep: string, session: any) => {
    console.log("Setting active screen with:", { nextStep, session }); // Debug log
    console.log("Session ID received:", session?.sessionId);
    console.log("First Name received:", session?.firstName);
    
    // Ensure session data is properly structured based on your API response
    const formattedSession: SessionData = {
      sessionId: session?.sessionId || '',
      nextStep: nextStep,
      firstName: session?.firstName || '',
      twoFactorMethod: session?.twoFactorMethod || '',
      deviceInfo: session?.deviceInfo
    };

    console.log("Formatted session data:", formattedSession);
    setSessionData(formattedSession);
    setDisableAnimation(false); // Enable animation for normal flow

    switch (nextStep) {
      case "authenticator":
        setActiveScreen("authenticator");
        setCurrentStep(1);
        break;
      case "sms_otp":
        setActiveScreen("sms_otp");
        setCurrentStep(1);
        break;
      case "set-mpin":
        setActiveScreen("set_mpin");
        setCurrentStep(2);
        break;
      case "mpin":
        setActiveScreen("mpin");
        setCurrentStep(3);
        break;
      default:
        setActiveScreen("login");
        setCurrentStep(0);
    }
  };

  const handleForgotMPinCancel = () => {
    setDisableAnimation(true); // Disable animation for this transition
    setActiveScreen("mpin");
    setCurrentStep(4);
  };

  const handleShowForgotMPin = () => {
    setDisableAnimation(true); // Disable animation for this transition
    setActiveScreen("forgot_mpin");
    setCurrentStep(0);
  };

  const slideVariants = {
    initial: (direction: number) => ({
      x: disableAnimation ? 0 : (direction > 0 ? 100 : -100),
      opacity: disableAnimation ? 1 : 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: disableAnimation ? 0 : (direction > 0 ? -100 : 100),
      opacity: disableAnimation ? 1 : 0,
    }),
  };

  const transition = {
    type: "spring",
    stiffness: 400,
    damping: 30,
    duration: disableAnimation ? 0 : undefined,
  };

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return "Good Morning";
      if (hour < 17) return "Good Afternoon";
      return "Good Evening";
    };
    setGreeting(getGreeting());
    
    // Check if user already has a token and should be redirected
    const checkExistingAuth = () => {
      const cookies = document.cookie.split(';').map(cookie => cookie.trim());
      const authToken = cookies.find(cookie => cookie.startsWith('auth-token='));
      
      if (authToken) {
        console.log('🔍 Found existing auth token, checking for redirect...');
        
        // Check for redirect cookie
        const redirectCookie = cookies.find(cookie => cookie.startsWith('redirect-after-login='));
        
        if (redirectCookie) {
          const encodedUrl = redirectCookie.split('=')[1];
          const redirectUrl = decodeURIComponent(encodedUrl);
          
          console.log('✅ Found redirect URL for existing session:', redirectUrl);
          
          // Clear redirect cookie
          document.cookie = 'redirect-after-login=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
          
          // Redirect to stored URL
          if (redirectUrl && redirectUrl !== '/' && redirectUrl !== '/login') {
            console.log('🚀 Redirecting existing session to:', redirectUrl);
            window.location.href = redirectUrl;
            return;
          }
        }
        
        // Default redirect if already logged in
        console.log('📍 User already logged in, redirecting to /stocks');
        window.location.href = '/stocks';
      }
    };
    
    // Small delay to ensure cookies are available
    setTimeout(checkExistingAuth, 100);
  }, []);

  // Add safety check for sessionData
  const safeSessionData: SessionData = sessionData || {
    sessionId: '',
    nextStep: '',
    firstName: '',
    twoFactorMethod: '',
    deviceInfo: undefined
  };
  const displayUsername = safeSessionData.firstName || username;
  const sessionId = safeSessionData.sessionId || '';

  // Log for debugging
  console.log("Current session data:", sessionData);
  console.log("Session ID being passed:", sessionId);

  let screenToRender;
  switch (activeScreen) {
    case "authenticator":
      screenToRender = (
        <OtpScreen 
          username={displayUsername}
          greeting={greeting}
          setOtpCompleted={setOtpCompleted}
          sessionId={sessionId}
          onNextStep={setActiveScreenFromNextStep}
        />
      );
      break;
    case "sms_otp":
      screenToRender = (
        <Text2FA 
          username={displayUsername}
          greeting={greeting}
          setOtpCompleted={setOtpCompleted}
          sessionId={sessionId}
          onNextStep={setActiveScreenFromNextStep}
        />
      );
      break;
    case "mpin":
      screenToRender = (
        <MPin 
          username={displayUsername}
          greeting={greeting}
          setOtpCompleted={setOtpCompleted}
          sessionId={sessionId}
          onNextStep={setActiveScreenFromNextStep}
          onShowForgotMPin={handleShowForgotMPin}
        />
      );
      break;
    case "set_mpin":
      screenToRender = (
        <MPinSetup 
          username={displayUsername}
          greeting={greeting}
          setOtpCompleted={setOtpCompleted}
          sessionId={sessionId}
          onNextStep={setActiveScreenFromNextStep}
        />
      );
      break;
    case "forgot_mpin":
      screenToRender = (
        <ForgotMPin
          username={displayUsername}
          greeting={greeting}
          setOtpCompleted={setOtpCompleted}
          sessionId={sessionId}
          onCancel={handleForgotMPinCancel}
          onNextStep={setActiveScreenFromNextStep}
        />
      );
      break;
    default:
      screenToRender = (
        <LoginScreen
          setCurrentStep={setCurrentStep}
          username={username}
          setUsername={setUsername}
          setShowProgressBar={setShowProgressBar}
          onNextStep={(step, session) => setActiveScreenFromNextStep(step, session)}
        />
      );
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center p-[0.75rem] transition-colors duration-300 bg-[#FFFFF] dark:bg-[#121212]">
      <div className="container max-w-md flex flex-col items-center justify-center gap-3">
        <div className="w-full h-[31.25rem] sm:h-[32.5rem] md:h-[34.375rem] shadow-xl transition-colors duration-300 flex flex-col overflow-hidden rounded-md bg-[#FAFAFA] dark:bg-[#1E1E1E] scale-90 origin-center">
          {showProgressBar && (
            <ProgressBar currentStep={currentStep} isRedirecting={isRedirecting} otpCompleted={otpCompleted} />
          )}
          
          <div className="p-[1rem] sm:p-[1.25rem] md:p-[1.5rem] flex-1 flex flex-col overflow-hidden">
            <AnimatePresence mode="wait" initial={false} custom={currentStep}>
              <motion.div
                key={activeScreen}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                custom={currentStep}
                className="flex-1 flex flex-col"
              >
                {screenToRender}
              </motion.div>
            </AnimatePresence>

            <div className="mt-auto pt-[0.75rem] sm:pt-[1rem]">
              <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                <a href="https://www.sapphirebroking.com/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#CDCDCD] transition-all duration-200 ease-in-out">
                  Privacy Policy
                </a>
                <span className="text-black dark:text-[#FFEAEA] font-extrabold">•</span>
                <a href="https://www.sapphirebroking.com/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#CDCDCD] transition-all duration-200 ease-in-out">
                  Terms & Conditions
                </a>
                <span className="text-black dark:text-[#FFEAEA] font-extrabold">•</span>
                <a href="https://www.sapphirebroking.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#CDCDCD] transition-all duration-200 ease-in-out">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-[0.5rem] space-y-1">
          <div className="text-center text-xs text-gray-600 dark:text-gray-500">
            NSE, BSE, MCX & NCDEX – SEBI Registration no.: excg.sebi.regn.number | CDSL – SEBI Registration no.: cdsl.sebi.regn.number
          </div>
          <div className="text-center text-xs text-gray-600 dark:text-gray-500">
            © 2025 Sapphire Broking. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;