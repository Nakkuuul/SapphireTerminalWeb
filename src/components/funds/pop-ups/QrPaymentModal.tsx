import React from 'react';
import { X, Clock } from 'lucide-react';

// UPI app icons/logos - in a real implementation, import actual image files
const UpiIcons = {
  phonepe: (
    <div className="w-6 h-6 bg-purple-700 rounded-md flex items-center justify-center text-white">
      <span className="font-bold text-xs">P</span>
    </div>
  ),
  googlePay: (
    <div className="w-6 h-6 bg-white rounded-full border flex items-center justify-center">
      <div className="flex">
        <span className="text-blue-500 text-xs font-bold">G</span>
        <span className="text-red-500 text-xs font-bold">p</span>
      </div>
    </div>
  ),
  paytm: (
    <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
      <span className="text-blue-700 text-xs font-bold">P</span>
    </div>
  ),
  other: (
    <div className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center">
      <span className="text-green-700 text-xs font-bold">U</span>
    </div>
  )
};

// Profile icon for UPI verification
const ProfileIcon = () => (
  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
    <span className="text-xs">S</span>
  </div>
);

// QR Code payment modal
const QrPaymentModal = ({ isOpen, onClose, onSuccess }: { isOpen: boolean, onClose: () => void, onSuccess?: () => void }) => {
  // State for timer
  const [timeLeft, setTimeLeft] = React.useState('4:48');
  
  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden"
        style={{ position: 'relative'}} // Makes it visually appear movable
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">QR Scan</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="text-sm font-medium mb-4">UPI QR</h3>
          
          <div className="flex flex-col md:flex-row md:space-x-4">
            {/* QR Code */}
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <div className="bg-white border rounded-md p-2 inline-block">
                <img 
                  src="data:image/png;base64,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" 
                  alt="QR Code" 
                  className="w-32 h-32"
                />
              </div>
            </div>
            
            {/* Info and UPI Apps */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <ProfileIcon />
                <div className="flex items-center text-gray-500">
                  <Clock size={16} className="mr-1" />
                  <span>{timeLeft}</span>
                </div>
              </div>
              
              <p className="text-sm mb-4">Scan the QR using any UPI App</p>
              
              <div className="flex space-x-4 mb-4">
                {UpiIcons.phonepe}
                {UpiIcons.googlePay}
                {UpiIcons.paytm}
                {UpiIcons.other}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrPaymentModal;