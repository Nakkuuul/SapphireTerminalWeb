
'use client';

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from '@/context/ThemeContext';
import LoginScreen from '../login/LoginScreen';
import VerifyScreen from '../login/VerifyScreen';
import OtpScreen from '../login/OtpScreen';
import ProgressBar from "../login/ProgressBar";

const Login = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("");
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

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
    <LoginScreen key="login" setCurrentStep={setCurrentStep} username={username} setUsername={setUsername} />,
    <VerifyScreen key="verify" username={username} setCurrentStep={setCurrentStep} greeting={greeting} />,
    <OtpScreen key="otp" username={username} greeting={greeting} />,
  ];

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 transition-colors duration-300 ${
      isDarkMode ? "bg-[#121212]" : "bg-gradient-to-br from-gray-100 to-white"
    }`}>
      <div className="w-full max-w-md lg:max-w-xl mt-8 sm:mt-11">
        <ProgressBar currentStep={currentStep} isRedirecting={isRedirecting} />
      </div>
      
      <div className="scale-90 container mx-auto max-w-2xl flex flex-col items-center justify-center gap-4 sm:gap-6">
        <div className={`w-full max-w-md lg:max-w-xl min-h-[550px] sm:min-h-[600px] md:min-h-[650px] p-6 sm:p-8 md:p-10 shadow-2xl transition-colors duration-300 flex flex-col ${
          isDarkMode ? "bg-[#1E1E1E]" : "bg-white"
        }`}>
          <div className="flex-1 flex flex-col">
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

            <div className="mt-auto pt-6 sm:pt-8 md:pt-10">
              <div className={`flex flex-wrap justify-center items-center gap-3 sm:gap-6 md:gap-8 text-sm sm:text-base ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                <a href="https://www.sapphirebroking.com/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#CDCDCD] hover:scale-110 transform transition-all duration-200 ease-in-out">
                  Privacy Policy
                </a>
                <span className={`${isDarkMode ? "text-[#FFEAEA]" : "text-black"} font-extrabold`}>•</span>
                <a href="https://www.sapphirebroking.com/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#CDCDCD] hover:scale-110 transform transition-all duration-200 ease-in-out">
                  Terms & Conditions
                </a>
                <span className={`${isDarkMode ? "text-[#FFEAEA]" : "text-black"} font-extrabold`}>•</span>
                <a href="https://www.sapphirebroking.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#CDCDCD] hover:scale-110 transform transition-all duration-200 ease-in-out">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md lg:max-w-xl px-4 space-y-2 sm:space-y-3">
          <div className={`text-center text-xs sm:text-sm md:text-base ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>
            NSE, BSE, MCX & NCDEX – SEBI Registration no.: excg.sebi.regn.number | CDSL – SEBI Registration no.: cdsl.sebi.regn.number
          </div>
          <div className={`text-center text-xs sm:text-sm ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>
            © 2025 Sapphire Broking. All Rights Reserved.
          </div>
        </div>
      </div>

      <button
        onClick={toggleTheme}
        className={`fixed right-4 sm:right-6 bottom-4 sm:bottom-6 p-2 sm:p-3 rounded-full transition-all duration-300 ${
          isDarkMode ? "text-yellow-400 hover:bg-gray-800" : "text-gray-900 hover:bg-gray-100"
        }`}
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
  );
};

export default Login;