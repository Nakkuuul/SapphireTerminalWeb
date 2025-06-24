"use client";

import React, { useState, FormEvent, useEffect } from "react";
import TroubleLogin from "./trouble/TroubleLogin";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { toast } from "sonner";

interface LoginScreenProps {
  setCurrentStep: (step: number) => void;
  username: string;
  setUsername: (username: string) => void;
  setShowProgressBar?: (show: boolean) => void;
  onNextStep: (nextStep: string, session: any) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
  setCurrentStep,
  username,
  setUsername,
  setShowProgressBar = () => {},
  onNextStep,
}) => {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);
  const [showTroubleLogin, setShowTroubleLogin] = useState<boolean>(false);
  const [nextStep, setNextStep] = useState<string | null>(null);

  // Auto-fill client code from URL parameters on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const clientIdFromUrl = urlParams.get('clientId');
      
      if (clientIdFromUrl && !username) {
        setUsername(clientIdFromUrl.toUpperCase());
      }
    }
  }, [username, setUsername]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setShake(false);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Invalid credentials");
      }

      // Login successful, go to next screen
      console.log("Login successful:", data);
      setCurrentStep(2);
      if (data?.data?.nextStep) {
        if(data.data.nextStep === "2fa"){
          onNextStep(data.data.twoFactorMethod, data.data);
                    onNextStep("set-mpin", data.data); // send full session
          onNextStep(data.data.nextStep, data.data); // send full session

        }else{
          onNextStep(data.data.nextStep, data.data);
        }
        // onNextStep("sms_otp", data.data); // send full session
        // onNextStep("authenticator", data.data); // send full session
      }

    } catch (err: any) {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPassword("");
      
      // Show Sonner toast for error
      toast.error("Login Failed", {
        description: err.message || "Invalid credentials. Please check your client code and password.",
        duration: 4000,
      });
    }
  };

  const handleTroubleLogin = () => {
    setShowTroubleLogin(true);
    setShowProgressBar(false);
  };

  const handleTroubleLoginCancel = () => {
    setShowTroubleLogin(false);
    setShowProgressBar(true);
  };

  if (showTroubleLogin) {
    return <TroubleLogin onCancel={handleTroubleLoginCancel} />;
  }

  // Inline animation styles
  const shakeStyle = shake
    ? {
      animation: "shake 0.5s ease-in-out",
    }
    : {};

  const keyframes = `
    @keyframes shake {
      0% { transform: translateX(0); }
      10% { transform: translateX(-5px); }
 
      30% { transform: translateX(5px); }

      50% { transform: translateX(-5px); }

      70% { transform: translateX(5px); }

      90% { transform: translateX(-5px); }
      100% { transform: translateX(0); }
    }
    
    /* Override browser autofill styles to match your existing backgrounds */
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px white inset !important;
      -webkit-text-fill-color: #111827 !important;
      transition: background-color 5000s ease-in-out 0s;
    }
    
    /* Dark mode autofill override - multiple selectors for better coverage */
    .dark input:-webkit-autofill,
    .dark input:-webkit-autofill:hover,
    .dark input:-webkit-autofill:focus,
    .dark input:-webkit-autofill:active,
    html.dark input:-webkit-autofill,
    html.dark input:-webkit-autofill:hover,
    html.dark input:-webkit-autofill:focus,
    html.dark input:-webkit-autofill:active,
    [data-theme="dark"] input:-webkit-autofill,
    [data-theme="dark"] input:-webkit-autofill:hover,
    [data-theme="dark"] input:-webkit-autofill:focus,
    [data-theme="dark"] input:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px #1E1E1E inset !important;
      -webkit-text-fill-color: white !important;
      transition: background-color 5000s ease-in-out 0s;
    }
    
    /* Media query based dark mode detection */
    @media (prefers-color-scheme: dark) {
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px #1E1E1E inset !important;
        -webkit-text-fill-color: white !important;
      }
    }
  `;

  return (
    <div className="flex-1 flex flex-col justify-center space-y-4">
      {/* Inject the keyframes for the shake animation */}
      <style jsx>{keyframes}</style>

      <div className="text-center mb-7 mt-10 space-y-2">
        <h1 className="text-xl -mt-20 sm:text-3xl font-normal text-black dark:text-white">
          Sapphire Terminal
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          Sign in to manage your investments and trade efficiently
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-200">
            Client Code
          </h3>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setError(false);
              setUsername(e.target.value.toUpperCase());
            }}
            style={shakeStyle}
            className={`w-full p-3 rounded-lg transition-all duration-200 
              bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white text-left
              ${error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-400"
              } border focus:ring-1 focus:ring-opacity-50`}
            placeholder="Enter your client code"
          />
        </div>

        <div className="relative w-full">
          <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-200">
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
              style={shakeStyle}
              className={`w-full p-3 rounded-lg transition-all duration-200 
                bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white text-left
                ${error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-400"
                } border focus:ring-1 focus:ring-opacity-50`}
              placeholder="Enter your password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>
          <button
            type="button"
            onClick={handleTroubleLogin}
            className="absolute right-0 mt-3 text-xs text-blue-400 hover:text-blue-500 transition-colors duration-200"
          >
            Forgot Password?
          </button>
        </div>

        <div className="pt-6 flex flex-col items-center">
          <button
            type="submit"
            disabled={!username || !password}
            className={`w-full py-3 text-white font-semibold text-sm rounded-lg transition-all duration-200 ${!username || !password
              ? "bg-[#1DB954] cursor-not-allowed opacity-70"
              : "bg-[#1DB954] hover:bg-[#00B649]"
              }`}
          >
            Login
          </button>
          <span className="text-center mt-4 -mb-2 text-xs text-gray-600 dark:text-gray-400">
            Don&apos;t have an account with us?{" "}
            <a
              href="https://www.sapphirebroking.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 transition-all duration-200 "
            >
              Create one now!
            </a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;