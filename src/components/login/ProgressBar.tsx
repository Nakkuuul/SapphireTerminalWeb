
// src/components/login/ProgressBar.tsx
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
    if (currentStep === 0) return 0;
    return 50;
  }, [currentStep, isRedirecting]);

  return (
    <div
      className={`w-full h-1 ${
        isDarkMode ? "bg-[#121212]" : "bg-white"
      } overflow-hidden rounded-full`}
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