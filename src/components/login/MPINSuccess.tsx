import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface SuccessPageProps {
  onContinue?: () => void;
  message?: string;
  title?: string;
}

const SuccessPage: React.FC<SuccessPageProps> = ({
  onContinue,
  message = 'your MPIN has been set successfully. You can now use it to securely access your account',
  title = 'MPIN set successfully',
}) => {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/login')
  };

  return (
    <div className="flex-1 flex flex-col justify-center space-y-6 px-4">
      {/* Success Icon/Video */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center rounded-full overflow-hidden ">
          <img
            src="/login/success.svg"
            alt="Success"
            className="w-20 h-20 object-contain"
            aria-label="Success"
          />
        </div>
      </div>

      {/* Success Message */}
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-xs text-gray-600 dark:text-gray-300 text-[0.9rem]">{message}</p>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="w-full py-3 text-white font-semibold text-sm rounded-lg transition-all duration-200 bg-[#00C853] hover:bg-[#00B649] focus:outline-none focus:ring-2 focus:ring-[#00C853] focus:ring-offset-2"
      >
        Continue
      </button>
    </div>
  );
};

export default SuccessPage;
