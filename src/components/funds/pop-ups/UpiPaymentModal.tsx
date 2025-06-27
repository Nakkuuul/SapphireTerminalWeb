import React, { useState, useEffect } from 'react';
import { X, ChevronLeft } from 'lucide-react';

interface UpiPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  amount?: number;
}

const UpiPaymentModal: React.FC<UpiPaymentModalProps> = ({ isOpen, onClose = () => {}, amount = 855, onSuccess }) => {
  const [timeLeft, setTimeLeft] = useState<{ minutes: number; seconds: number }>({ minutes: 3, seconds: 18 });
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isOpen) return;
    setTimeLeft({ minutes: 3, seconds: 18 });
    setProgress(100);
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          clearInterval(timer);
          return { minutes: 0, seconds: 0 };
        }
      });
      setProgress(prev => Math.max(0, prev - (100 / (3 * 60 + 18))));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (minutes: number, seconds: number) => {
    return (
      <>
        <span className="text-black">{minutes.toString().padStart(2, '0')}</span>
        <span className="text-[#6b7280]"> min </span>
        <span className="text-black">{seconds.toString().padStart(2, '0')}</span>
        <span className="text-[#6b7280]"> sec</span>
      </>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999999]">
      <div className="max-w-md w-full mx-auto bg-[#FAFAFA] rounded-[6px] border border-gray-200 overflow-hidden shadow-lg">
        {/* Title Row with Back and Close */}
        <div className="w-full flex items-center justify-between mb-2 px-2 pt-4">
          <button onClick={onClose} className="p-1 mr-2 text-gray-500 hover:text-gray-700">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="flex-1 text-lg font-medium text-gray-900 text-left">UPI Payment</h2>
          <button onClick={onClose} className="p-1 ml-2 text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6 pt-4 flex flex-col items-center">
          {/* Amount */}
          <div className="w-full mb-8">
            <div className="text-[#6b7280] text-sm mb-1 text-regular">
              Payable amount: <span className="text-black text-medium ">₹ {amount}.00</span>
            </div>
          </div>

          {/* Progress Circle (replace with SandTimer.webm) */}
          <div className="relative mb-8 flex items-center justify-center">
            <video
              src="/funds/SandTimer.webm"
              width="128"
              height="128"
              autoPlay
              loop
              muted
              playsInline
              className="rounded-full object-contain"
            />
          </div>

          {/* Timer */}
          <div className="text-center mb-6">
            <div className="text-[#6b7280] text-sm mb-1 text-regular">
              Payment request will expire in{' '}
              <span className="text-black text-medium">
                {formatTime(timeLeft.minutes, timeLeft.seconds)}
              </span>
            </div>
          </div>

          {/* Warning Message */}
          <div className="w-full mb-6">
            <div className="bg-[#fef8e5] border border-[#ffe37f] rounded-lg p-3">
              <p className="text-[#6b7280] text-sm text-regular">
                A payment request has been sent to your registered UPI ID. Please complete the transaction to proceed.
              </p>
            </div>
          </div>

          {/* Cancel Button */}
          <button 
            onClick={onClose}
            className="w-full bg-[#1db954] text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Cancel Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpiPaymentModal;
