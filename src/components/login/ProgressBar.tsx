'use client';

import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  isRedirecting: boolean;
  otpCompleted?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentStep, 
  isRedirecting,
  otpCompleted = false
}) => {
  const progressValue = React.useMemo(() => {
    if (isRedirecting || otpCompleted) return 100;
    if (currentStep === 0) return 0;
    if (currentStep === 1) return 50;
    if (currentStep === 2) return 75; // OTP screen but not completed
    return currentStep * 33; // For any other steps
  }, [currentStep, isRedirecting, otpCompleted]);
  
  return (
    <div className="w-full h-2 dark:bg-[#121212] overflow-hidden">
      <motion.div
        className="h-full bg-[#02B42D] origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progressValue / 100 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default ProgressBar;