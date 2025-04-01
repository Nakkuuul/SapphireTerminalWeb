// components/TransactionStatusBadge.tsx
import React from 'react';

type StatusType = 'completed' | 'processing' | 'failed';

interface TransactionStatusBadgeProps {
  status: StatusType;
}

const TransactionStatusBadge: React.FC<TransactionStatusBadgeProps> = ({ status }) => {
  // Define styles based on status
  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-green-100',
          text: 'text-green-600',
          label: 'Txn Completed'
        };
      case 'processing':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-600',
          label: 'Partially Processed'
        };
      case 'failed':
        return {
          bg: 'bg-red-100',
          text: 'text-red-600',
          label: 'Txn Failed'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          label: 'Unknown Status'
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <div className={`${styles.bg} ${styles.text} px-2 py-1 text-xs rounded-sm`}>
      {styles.label}
    </div>
  );
};

export default TransactionStatusBadge;