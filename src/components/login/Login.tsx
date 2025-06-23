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

  const [activeScreen, setActiveScreen] = useState<"login" | "2fa" | "mpin" | "set_mpin" | "forgot_mpin">("login");
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

    switch (nextStep) {
      case "2fa":
        setActiveScreen("2fa");
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
    setActiveScreen("mpin");
    setCurrentStep(4);
  };

  const handleShowForgotMPin = () => {
    setActiveScreen("forgot_mpin");
    setCurrentStep(0); // added 0 instead 
  };

  const slideVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const transition = {
    type: "spring",
    stiffness: 400,
    damping: 30,
  };

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return "Good Morning";
      if (hour < 17) return "Good Afternoon";
      return "Good Evening";
    };
    setGreeting(getGreeting());
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
    case "2fa":
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
        <div className="w-full h-[31.25rem] sm:h-[32.5rem] md:h-[34.375rem] shadow-xl transition-colors duration-300 flex flex-col overflow-hidden rounded-md bg-[#FAFAFA] dark:bg-[#1E1E1E]">
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