'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginScreen from '../login/LoginScreen';
import OtpScreen from './Auth2FA';
import ProgressBar from "../login/ProgressBar";
import Text2FA from "../login/Text2FA";
import MPin from "../login/MPin";
import ForgotMPin from "../login/ForgotMPin";

const Login = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("");
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const [showProgressBar, setShowProgressBar] = useState<boolean>(true);
  const [otpCompleted, setOtpCompleted] = useState<boolean>(false);

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
    <OtpScreen key="otp" username={username} greeting={greeting} setOtpCompleted={setOtpCompleted} />,
    // <Text2FA key="otp" username={username} greeting={greeting} setOtpCompleted={setOtpCompleted} />,
    <MPin key="otp" username={username} greeting={greeting} setOtpCompleted={setOtpCompleted} />,
    <ForgotMPin key="otp" username={username} greeting={greeting} setOtpCompleted={setOtpCompleted} onCancel={() => setCurrentStep(0)} />,
  ];

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center p-[0.75rem] transition-colors duration-300 bg-[#FFFFF] dark:bg-[#121212]">
      <div className="container max-w-md flex flex-col items-center justify-center gap-3">
        <div className="w-full h-[31.25rem] sm:h-[32.5rem] md:h-[34.375rem] shadow-xl transition-colors duration-300 flex flex-col overflow-hidden rounded-md bg-[#FAFAFA] dark:bg-[#1E1E1E]">
          {/* Progress bar positioned at the top of the black box, conditionally shown */}
          {showProgressBar && (
            <ProgressBar currentStep={currentStep} isRedirecting={isRedirecting} otpCompleted={otpCompleted} />
          )}
          
          <div className="p-[1rem] sm:p-[1.25rem] md:p-[1.5rem] flex-1 flex flex-col overflow-hidden">

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