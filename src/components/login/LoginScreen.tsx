'use client';

import React, { useState, FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import TroubleLogin from "./trouble/TroubleLogin";

interface LoginScreenProps {
  setCurrentStep: (step: number) => void;
  username: string;
  setUsername: (username: string) => void;
  setShowProgressBar?: (show: boolean) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ 
  setCurrentStep, 
  username, 
  setUsername,
  setShowProgressBar = () => {} // Optional prop with default no-op function
}) => {
  const { isDarkMode } = useTheme();
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);
  const [showTroubleLogin, setShowTroubleLogin] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.toLowerCase() === "user" && password === "user") {
      setCurrentStep(1);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }
  };

  const handleTroubleLogin = () => {
    setShowTroubleLogin(true);
    setShowProgressBar(false); // Hide progress bar when entering trouble login flow
  };

  const handleTroubleLoginCancel = () => {
    setShowTroubleLogin(false);
    setShowProgressBar(true); // Show progress bar when returning to main login
  };

  if (showTroubleLogin) {
    return <TroubleLogin onCancel={handleTroubleLoginCancel} />;
  }

  return (
    <div className="flex-1 flex flex-col justify-center space-y-4 px-6">
      <div className="text-center space-y-2">
        <h1
          className={`text-xl -mt-20 sm:text-3xl font-normal ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Sapphire Terminal
        </h1>
        <p
          className={`text-xs sm:text-sm   ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Sign in to manage your investments and trade efficiently
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h3
            className={`text-sm  font-medium mb-3 ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Client Code
          </h3>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setError(false);
              setUsername(e.target.value.toUpperCase());
            }}
            className={`w-full p-3 rounded-lg transition-all duration-200 
              ${shake ? "animate-[shake_0.5s_ease-in-out]" : ""} 
              ${
                isDarkMode
                  ? "bg-[#1E1E1E] text-white"
                  : "bg-white text-gray-900"
              } 
              ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : isDarkMode
                  ? "border-gray-600 focus:border-blue-400 focus:ring-blue-400"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-400"
              } border focus:ring-1 focus:ring-opacity-50`}
            placeholder="Enter your code"
          />
        </div>

        <div className="relative w-full">
          <h3
            className={`text-sm font-medium mb-3 ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Password
          </h3>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setError(false);
                setPassword(e.target.value);
              }}
              className={`w-full p-3 rounded-lg transition-all duration-200 
                ${shake ? "animate-[shake_0.5s_ease-in-out]" : ""} 
                ${
                  isDarkMode
                    ? "bg-[#1E1E1E] text-white"
                    : "bg-white text-gray-900"
                } 
                ${
                  error
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : isDarkMode
                    ? "border-gray-600 focus:border-blue-400 focus:ring-blue-400"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-400"
                } border focus:ring-1 focus:ring-opacity-50`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute inset-y-0 right-0 flex items-center px-3 ${
                isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } transition-colors duration-200`}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button 
            type="button"
            onClick={handleTroubleLogin}
            className="absolute right-0 mt-1 text-xs text-blue-400 hover:text-blue-500 transition-colors duration-200"
          >
            Trouble Logging In?
          </button>
        </div>

        <div className="pt-3 flex flex-col items-center">
          {error && (
            <p className="text-red-500 mb-3 text-sm text-center">
              ⚠️ Invalid username or password
            </p>
          )}
          <button
            type="submit"
            disabled={!username || !password}
            className={`w-full py-3 mt-3 text-white font-semibold text-sm rounded-lg transition-all duration-200 ${
              !username || !password
                ? "bg-[#00A645] cursor-not-allowed opacity-70"
                : "bg-[#00C853] hover:bg-[#00B649]"
            }`}
          >
            Login
          </button>
          <a
            href="https://www.sapphirebroking.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-center  mt-2 text-xs hover:text-gray-500 transition-all duration-200 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Don&apos;t have an account with us? Create one now!
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;