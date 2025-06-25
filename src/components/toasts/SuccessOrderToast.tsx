"use client";

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Check, X } from 'lucide-react';

// Success Toast Component with Timer Bar
const SuccessToast = ({ 
  title, 
  message, 
  orderId,
  onClose,
  duration = 5000
}: {
  title: string;
  message: string;
  orderId?: string;
  onClose?: () => void;
  duration?: number;
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 100;
        return newTime <= 0 ? 0 : newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const progressPercentage = (timeLeft / duration) * 100;

  return (
    <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      
      {/* Content */}
      <div className="p-4">
        {/* Title with icon */}
        <div className="flex items-start mb-3">
          <div className="flex-shrink-0 w-8 h-8 bg-[#00C852] rounded-full flex items-center justify-center mr-3 mt-0.5">
            <Check className="h-5 w-5 text-[#00C852]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#00C852] mb-1">{title}</h3>
            <p className="text-gray-800 text-base font-medium">
              {message}
            </p>
          </div>
        </div>
        
        {/* Order ID */}
        {orderId && (
          <div className="ml-11">
            <p className="text-gray-600 text-sm">
              #{orderId}
            </p>
          </div>
        )}
      </div>

      {/* Timer Bar - Green bottom bar that decreases */}
      <div className="h-1 bg-gray-200">
        <div 
          className="h-full bg-[#00C852] transition-all duration-100 ease-linear"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// Function to show order placed toast with custom values
export const showOrderPlacedToast = (
  title: string = "Order Placed", 
  message: string = "BUY HDFCBANK is placed successfully", 
  orderId?: string,
  duration: number = 5000
) => {
  toast.custom((t) => (
    <SuccessToast
      title={title}
      message={message}
      orderId={orderId}
      onClose={() => toast.dismiss(t)}
      duration={duration}
    />
  ), {
    duration: duration,
    position: 'top-right'
  });
};

export default SuccessToast;