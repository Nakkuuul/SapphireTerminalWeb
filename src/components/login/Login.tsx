'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from '@/context/ThemeContext';
import LoginScreen from '../login/LoginScreen';
import VerifyScreen from '../login/VerifyScreen';
import OtpScreen from '../login/OtpScreen';
import ProgressBar from "../login/ProgressBar";

const Login = () => {
  const { isDarkMode } = useTheme();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("");
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const [showProgressBar, setShowProgressBar] = useState<boolean>(true);

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

  const screens = [
    <LoginScreen 
      key="login" 
      setCurrentStep={setCurrentStep} 
      username={username} 
      setUsername={setUsername}
      setShowProgressBar={setShowProgressBar}
    />,
    <VerifyScreen key="verify" username={username} setCurrentStep={setCurrentStep} greeting={greeting} />,
    <OtpScreen key="otp" username={username} greeting={greeting} />,
  ];

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center p-3 transition-colors duration-300 ${
      isDarkMode ? "bg-[#121212]" : "bg-white"
    }`}>
      <div className="container max-w-md flex flex-col items-center justify-center gap-3">
        <div className={`w-full h-[500px] sm:h-[520px] md:h-[550px] shadow-xl transition-colors duration-300 flex flex-col overflow-hidden rounded-md ${
          isDarkMode ? "bg-[#1E1E1E]" : "bg-[#FAFAFA]"
        }`}>
          {/* Progress bar positioned at the top of the black box, conditionally shown */}
          {showProgressBar && (
            <ProgressBar currentStep={currentStep} isRedirecting={isRedirecting} />
          )}
          
          <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col overflow-hidden">
            <AnimatePresence mode="wait" initial={false} custom={currentStep}>
              <motion.div
                key={currentStep}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                custom={currentStep}
                className="flex-1 flex flex-col"
              >
                {screens[currentStep]}
              </motion.div>
            </AnimatePresence>

            <div className="mt-auto pt-3 sm:pt-4">
              <div className={`flex flex-wrap justify-center items-center gap-2 text-xs ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                <a href="https://www.sapphirebroking.com/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#CDCDCD] transition-all duration-200 ease-in-out">
                  Privacy Policy
                </a>
                <span className={`${isDarkMode ? "text-[#FFEAEA]" : "text-black"} font-extrabold`}>•</span>
                <a href="https://www.sapphirebroking.com/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#CDCDCD] transition-all duration-200 ease-in-out">
                  Terms & Conditions
                </a>
                <span className={`${isDarkMode ? "text-[#FFEAEA]" : "text-black"} font-extrabold`}>•</span>
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

        <div className="w-full px-2 space-y-1">
          <div className={`text-center text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>
            NSE, BSE, MCX & NCDEX – SEBI Registration no.: excg.sebi.regn.number | CDSL – SEBI Registration no.: cdsl.sebi.regn.number
          </div>
          <div className={`text-center text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>
            © 2025 Sapphire Broking. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;