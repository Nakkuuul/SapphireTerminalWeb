"use client";

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { X, Check, Settings, Trash2 } from 'lucide-react';

// Order Toast Component with Timer Bar
const OrderToast = ({ 
  orderStatus,
  scripName,
  message,
  orderNumber,
  onClose,
  duration = 2000
}: {
  orderStatus: string;
  scripName: string;
  message: string;
  orderNumber: string;
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

  // Get the appropriate icon and title based on orderStatus
  const getToastConfig = () => {
    const status = orderStatus.toLowerCase();
    
    if (status.includes('placed') || status.includes('success') || status.includes('executed')) {
      return {
        icon: <Check className="h-5 w-5 text-white" />,
        title: 'Order Placed'
      };
    } else if (status.includes('modified') || status.includes('updated') || status.includes('amended')) {
      return {
        icon: <Settings className="h-5 w-5 text-white" />,
        title: 'Order Modified'
      };
    } else if (status.includes('cancelled') || status.includes('canceled') || status.includes('rejected')) {
      return {
        icon: <Trash2 className="h-5 w-5 text-white" />,
        title: 'Order Cancelled'
      };
    } else {
      // Default case for unknown status
      return {
        icon: <Check className="h-5 w-5 text-white" />,
        title: orderStatus // Use the actual status as title
      };
    }
  };

  const { icon, title } = getToastConfig();

  return (
    <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden">
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      
      {/* Content */}
      <div className="p-4">
        {/* Title with icon */}
        <div className="flex items-start mb-3">
          <div className="flex-shrink-0 w-8 h-8 bg-black rounded-full flex items-center justify-center mr-3 mt-0.5">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-black mb-1">{title}</h3>
            <p className="text-gray-700 text-base font-medium">
              {message}
            </p>
          </div>
        </div>
        
        {/* Order Number */}
        <div className="ml-11">
          <p className="text-gray-500 text-sm">
            #{orderNumber}
          </p>
        </div>
      </div>

      {/* Timer Bar - Black bottom bar that decreases */}
      <div className="h-1 bg-gray-200">
        <div 
          className="h-full bg-black transition-all duration-100 ease-linear"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// Function to play notification sound
const playNotificationSound = () => {
  try {
    // Option 1: Local sound file (recommended)
    const audio = new Audio('/sounds/notification.flac');
    
    // Option 2: If you don't have a local file, use Web Audio API beep
    // const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // const oscillator = audioContext.createOscillator();
    // const gainNode = audioContext.createGain();
    // oscillator.connect(gainNode);
    // gainNode.connect(audioContext.destination);
    // oscillator.frequency.value = 800;
    // oscillator.type = 'sine';
    // gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    // gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    // oscillator.start(audioContext.currentTime);
    // oscillator.stop(audioContext.currentTime + 0.1);
    // return;
    
    // Set volume (0.0 to 1.0)
    audio.volume = 0.3;
    
    // Play the sound
    audio.play().catch(error => {
      console.log('Could not play notification sound:', error);
      // Fallback to system beep if available
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        // Alternative: use speech synthesis as audio cue
        const utterance = new SpeechSynthesisUtterance('');
        utterance.volume = 0.1;
        utterance.rate = 10;
        speechSynthesis.speak(utterance);
      }
    });
  } catch (error) {
    console.log('Notification sound not available:', error);
  }
};

// Main function to show order toast based on API response
export const showOrderToast = (apiResponse: {
  orderStatus: string;
  scripName: string;
  message: string;
  orderNumber: string;
}, duration: number = 2000) => {
  const { orderStatus, scripName, message, orderNumber } = apiResponse;

  // Add custom CSS for slide from right animation
  if (typeof document !== 'undefined') {
    const existingStyle = document.getElementById('order-toast-styles');
    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = 'order-toast-styles';
      style.textContent = `
        /* Slide from right animation for order toasts */
        [data-sonner-toaster] [data-sonner-toast] {
          animation: slideInFromRight 0.3s ease-out !important;
        }

        [data-sonner-toaster] [data-sonner-toast][data-removed="true"] {
          animation: slideOutToRight 0.2s ease-in !important;
        }

        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutToRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Play notification sound
  playNotificationSound();

  toast.custom((t) => (
    <OrderToast
      orderStatus={orderStatus}
      scripName={scripName}
      message={message}
      orderNumber={orderNumber}
      onClose={() => toast.dismiss(t)}
      duration={duration}
    />
  ), {
    duration: duration,
    position: 'top-right'
  });
};

// Alternative function with individual parameters (for backward compatibility)
export const showOrderToastDirect = (
  orderStatus: string,
  scripName: string,
  message: string,
  orderNumber: string,
  duration: number = 2000
) => {
  showOrderToast({
    orderStatus,
    scripName,
    message,
    orderNumber
  }, duration);
};

export default OrderToast;