'use client';

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from '@/context/ThemeContext';

interface ProgressBarProps {
  currentStep: number;
  isRedirecting: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, isRedirecting }) => {
  const { isDarkMode } = useTheme();
  const progressValue = React.useMemo(() => {
    if (isRedirecting) return 100;
    if (currentStep === 0) return 33.33;
    if (currentStep === 1) return 66.66;
    return currentStep * 33.33;
  }, [currentStep, isRedirecting]);

  return (
    <div
      className={`w-full h-2 ${
        isDarkMode ? "bg-[#121212]" : "bg-gray-200"
      } overflow-hidden`}
    >
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