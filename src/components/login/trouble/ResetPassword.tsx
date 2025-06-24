'use client';

import React, { useState } from "react";
import { ChevronLeft, Eye, EyeOff, Check } from "lucide-react";

interface ResetPasswordProps {
  panNumber: string;
  requestId: string; 
  onComplete: () => void;
  onCancel: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({  
  requestId, 
  onComplete, 
  onCancel 
}) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    newPassword?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const [isResetting, setIsResetting] = useState<boolean>(false);

  
  const requirements = [
    { 
      id: 'length', 
      text: 'At least 8 characters', 
      met: newPassword.length >= 8 
    },
    { 
      id: 'uppercase', 
      text: 'At least one uppercase letter', 
      met: /[A-Z]/.test(newPassword) 
    },
    { 
      id: 'lowercase', 
      text: 'At least one lowercase letter', 
      met: /[a-z]/.test(newPassword) 
    },
    { 
      id: 'number', 
      text: 'At least one number', 
      met: /\d/.test(newPassword) 
    },
    { 
      id: 'special', 
      text: 'At least one special character', 
      met: /[^A-Za-z0-9]/.test(newPassword) 
    },
  ];

  const validatePassword = () => {
    const newErrors: {
      newPassword?: string;
      confirmPassword?: string;
      general?: string;
    } = {};

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    const requirementsMet = requirements.every(req => req.met);
    if (!requirementsMet) {
      newErrors.newPassword = "Password doesn't meet all requirements";
    }

    return newErrors;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validatePassword();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsResetting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login/forgot-password/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to reset password");
      }

      onComplete();
    } catch (error: any) {
      setErrors({ general: error.message || "Something went wrong" });
      setIsResetting(false);
    }
  };



  return (
    <div className="flex-1 flex flex-col space-y-4 px-1">
      <div className="flex items-center mb-2 -ml-6">
        <button 
          onClick={onCancel}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <ChevronLeft size={20} className="text-gray-800 dark:text-white" />
        </button>
        <h2 className="text-lg font-medium ml-2 text-gray-800 dark:text-white">
          Reset Password
        </h2>
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-300">
        Please create a new password for your account.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`w-full p-2 pr-10 rounded-lg border bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-opacity-50 ${
                errors.newPassword ? "border-red-500 focus:border-red-500" : ""
              }`}
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-2 pr-10 rounded-lg border bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-opacity-50 ${
                errors.confirmPassword ? "border-red-500 focus:border-red-500" : ""
              }`}
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="text-xs space-y-1 text-gray-600 dark:text-gray-300">
          <p className="font-medium">Password requirements:</p>
          <ul className="space-y-1">
            {requirements.map((req) => (
              <li key={req.id} className="flex items-center">
                <span className={`mr-1 ${req.met ? "text-green-500" : "text-gray-400 dark:text-gray-500"}`}>
                  {req.met ? <Check size={12} /> : "•"}
                </span>
                <span className={req.met ? "font-medium" : ""}>{req.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {errors.general && (
          <p className="text-red-500 text-xs">{errors.general}</p>
        )}

        <button
          type="submit"
          disabled={isResetting || !newPassword || !confirmPassword}
          className={`w-full p-2 text-white font-semibold text-sm rounded-lg transition-all duration-200 ${
            isResetting || !newPassword || !confirmPassword
              ? "bg-[#00A645] cursor-not-allowed opacity-70"
              : "bg-[#00C853] hover:bg-[#00B649]"
          }`}
        >
          {isResetting ? "Resetting Password..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;