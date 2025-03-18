'use client';

import React, { useState } from "react";
import PanVerification from "./PanVerification";
import OtpVerification from "./OtpVerification";
import ResetPassword from "./ResetPassword";
import { motion, AnimatePresence } from "framer-motion";

interface TroubleLoginProps {
  onCancel: () => void;
}

const TroubleLogin: React.FC<TroubleLoginProps> = ({ onCancel }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [panNumber, setPanNumber] = useState<string>("");

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

  const screens = [
    <PanVerification 
      key="pan" 
      panNumber={panNumber} 
      setPanNumber={setPanNumber} 
      setCurrentStep={setCurrentStep}
      onCancel={onCancel}
    />,
    <OtpVerification 
      key="otp" 
      setCurrentStep={setCurrentStep}
      onCancel={onCancel} 
    />,
    <ResetPassword 
      key="reset" 
      panNumber={panNumber}
      onComplete={onCancel} 
      onCancel={onCancel}
    />,
  ];

  return (
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
    </div>
  );
};

export default TroubleLogin;