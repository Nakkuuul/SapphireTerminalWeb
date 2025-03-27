import React, { useState } from 'react';
import { X, ChevronLeft, ChevronDown } from 'lucide-react';

// Profile icon for UPI verification
const ProfileIcon = () => (
  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
    <span className="text-xs">S</span>
  </div>
);

// UPI Payment Modal Component
const UpiPaymentModal = ({ isOpen, onClose, onSuccess }: { isOpen: boolean, onClose: () => void, onSuccess?: () => void }) => {
  // State for multi-step flow
  const [step, setStep] = useState(1); // 1: Select app, 2: Enter UPI ID
  const [selectedApp, setSelectedApp] = useState(null);
  const [upiId, setUpiId] = useState('');
  const [upiDomain, setUpiDomain] = useState('ybl');

  // Handle app selection
  const handleAppSelect = (app: any) => {
    setSelectedApp(app);
    if (app === 'phonepe') {
      setStep(2); // Move to PhonePe UPI ID entry
    } else {
      // For other apps we would process differently
      // For this demo, we'll just simulate success
      onSuccess?.();
    }
  };

  // Handle UPI ID submission
  const handleSubmitUpiId = () => {
    // Here you would validate and process the UPI ID
    // For this demo, we'll just simulate success
    onSuccess?.();
  };

  // Handle going back to app selection
  const handleBack = () => {
    setStep(1);
    setSelectedApp(null);
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden"
        style={{ position: 'relative', cursor: 'move' }}
      >
        {/* Step 1: Select UPI App */}
        {step === 1 && (
          <>
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium">Pay by any UPI App</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {/* PhonePe */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="upiApp" 
                    checked={selectedApp === 'phonepe'} 
                    onChange={() => handleAppSelect('phonepe')} 
                    className="text-blue-500"
                  />
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-700 rounded-md flex items-center justify-center text-white">
                      <span className="font-bold text-xs">P</span>
                    </div>
                    <span>PhonePe</span>
                  </div>
                </label>
                
                {/* Google Pay */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="upiApp" 
                    checked={selectedApp === 'googlePay'} 
                    onChange={() => handleAppSelect('googlePay')} 
                    className="text-blue-500"
                  />
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white rounded-full border flex items-center justify-center">
                      <div className="flex">
                        <span className="text-blue-500 text-xs font-bold">G</span>
                        <span className="text-red-500 text-xs font-bold">p</span>
                      </div>
                    </div>
                    <span>Google pay</span>
                  </div>
                </label>
                
                {/* Paytm */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="upiApp" 
                    checked={selectedApp === 'paytm'} 
                    onChange={() => handleAppSelect('paytm')} 
                    className="text-blue-500"
                  />
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                      <span className="text-blue-700 text-xs font-bold">P</span>
                    </div>
                    <span>Paytm UPI</span>
                  </div>
                </label>
                
                {/* Amazon Pay */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="upiApp" 
                    checked={selectedApp === 'amazonPay'} 
                    onChange={() => handleAppSelect('amazonPay')} 
                    className="text-blue-500"
                  />
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-orange-500 text-xs font-bold">A</span>
                    </div>
                    <span>Amazon pay</span>
                  </div>
                </label>
                
                {/* Other UPI */}
                <label className="flex items-center space-x-3 cursor-pointer col-span-2 mt-2">
                  <input 
                    type="radio" 
                    name="upiApp" 
                    checked={selectedApp === 'other'} 
                    onChange={() => handleAppSelect('other')} 
                    className="text-blue-500"
                  />
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                      <span className="text-green-700 text-xs font-bold">U</span>
                    </div>
                    <span>Other UPI</span>
                  </div>
                </label>
              </div>
            </div>
          </>
        )}

        {/* Step 2: Enter UPI ID (PhonePe example) */}
        {step === 2 && (
          <>
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <button onClick={handleBack} className="mr-2">
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-lg font-medium">Pay using Phonepe</h2>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-6">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter UPI ID"
                    className="flex-1 border rounded-l-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                  <span className="flex items-center px-2 bg-gray-100 border-t border-b">@</span>
                  <div className="relative">
                    <select
                      className="appearance-none border rounded-r-md p-2 pr-8 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={upiDomain}
                      onChange={(e) => setUpiDomain(e.target.value)}
                    >
                      <option value="ybl">ybl</option>
                      <option value="oksbi">oksbi</option>
                      <option value="okhdfcbank">okhdfcbank</option>
                      <option value="axl">axl</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* UPI Guidelines Section */}
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <h3 className="text-sm font-medium mb-2">UPI Guidelines</h3>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <span className="mr-1">•</span>
                    <span>As per SEBI guidelines, you must use a bank <span className="font-medium">registered with Angel One</span>.</span>
                    <ProfileIcon />
                  </li>
                  <li className="flex">
                    <span className="mr-1">•</span>
                    <span>For successful payment, please use your <span className="font-medium">BANK OF BARODA</span> Bank account ending in <span className="font-medium">xx6818</span> on the UPI app or enter any UPI ID linked to the same bank account.</span>
                  </li>
                </ul>
              </div>
              
              {/* Payment Button */}
              <button
                className="w-full bg-green-500 text-white py-3 rounded-md font-medium"
                onClick={handleSubmitUpiId}
              >
                Make payment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UpiPaymentModal;