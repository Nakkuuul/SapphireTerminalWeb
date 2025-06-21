'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface MPinSetupProps {
  username: string;
  greeting: string;
  setOtpCompleted: (completed: boolean) => void;
  sessionId: string;
  onNextStep: (nextStep: string, session: any) => void;
}

const MPinSetup: React.FC<MPinSetupProps> = ({
  username,
  greeting,
  setOtpCompleted,
  sessionId,
  onNextStep
}) => {
  const [mpin, setMpin] = useState<string>('');
  const [confirmMpin, setConfirmMpin] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showMpin, setShowMpin] = useState<boolean>(false);
  const [showConfirmMpin, setShowConfirmMpin] = useState<boolean>(false);

  const handleMpinChange = (value: string) => {
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setMpin(value);
      setError('');
    }
  };

  const handleConfirmMpinChange = (value: string) => {
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setConfirmMpin(value);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mpin.length !== 4) {
      setError('MPIN must be 4 digits');
      return;
    }

    if (mpin !== confirmMpin) {
      setError('MPIN does not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login/setup-mpin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId,
          mpin: mpin,
          confirm_mpin: confirmMpin,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to setup MPIN');
      }

      // MPIN setup successful
      setOtpCompleted(true);
      if (data?.data?.nextStep) {
        onNextStep(data.data.nextStep, data.data);
      }
      
    } catch (err: any) {
      setError(err.message || 'Failed to setup MPIN');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center space-y-6 px-6">
      <div className="text-center mb-8 space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {greeting}, {username}!
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Set up your 4-digit MPIN for secure access
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-200">
            Enter New MPIN
          </label>
          <div className="relative">
            <input
              type={showMpin ? "text" : "password"}
              value={mpin}
              onChange={(e) => handleMpinChange(e.target.value)}
              className="w-full p-4 text-center text-2xl tracking-widest rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-200"
              placeholder="••••"
              maxLength={4}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowMpin(!showMpin)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
            >
              {showMpin ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-200">
            Confirm MPIN
          </label>
          <div className="relative">
            <input
              type={showConfirmMpin ? "text" : "password"}
              value={confirmMpin}
              onChange={(e) => handleConfirmMpinChange(e.target.value)}
              className="w-full p-4 text-center text-2xl tracking-widest rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-200"
              placeholder="••••"
              maxLength={4}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmMpin(!showConfirmMpin)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
            >
              {showConfirmMpin ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || mpin.length !== 4 || confirmMpin.length !== 4}
          className={`w-full py-3 text-white font-semibold rounded-lg transition-all duration-200 ${
            isLoading || mpin.length !== 4 || confirmMpin.length !== 4
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#00C853] hover:bg-[#00B649]'
          }`}
        >
          {isLoading ? 'Setting up...' : 'Setup MPIN'}
        </button>
      </form>

      <div className="text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Your MPIN will be used for secure transactions and login
        </p>
      </div>
    </div>
  );
};

export default MPinSetup;