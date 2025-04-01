// components/TransactionStatusIcon.tsx
import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

type StatusType = 'completed' | 'processing' | 'failed';

interface TransactionStatusIconProps {
  status: StatusType;
}

const TransactionStatusIcon: React.FC<TransactionStatusIconProps> = ({ status }) => {
  // Define icon based on status
  const renderIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'processing':
        return <AlertTriangle size={16} className="text-yellow-600" />;
      case 'failed':
        return <XCircle size={16} className="text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center">
      {renderIcon()}
    </div>
  );
};

export default TransactionStatusIcon;