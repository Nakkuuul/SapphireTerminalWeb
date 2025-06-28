import React from 'react';
import { X } from 'lucide-react';



// Bank Transfer Modal Component
const BankTransferModal = ({ isOpen, onClose, onSuccess }: { isOpen: boolean, onClose: () => void, onSuccess?: () => void }) => {
  // Bank details data
  const bankDetails = [
    {
      name: 'ICICI Bank',
      accountHolder: 'Sapphire Broking',
      accountNumber: '590005004423',
      accountType: 'Current Account',
      bankBranch: 'Civil Lines,Nagpur',
      ifscCode: 'ICIC0000059'
    },
    {
      name: 'HDFC Bank',
      accountHolder: 'Sapphire Broking',
      accountNumber: '590005004423',
      accountType: 'Current Account',
      bankBranch: 'Itwari,Nagpur',
      ifscCode: 'ICIC0000059'
    },
    {
      name: 'Axis Bank',
      accountHolder: 'Sapphire Broking',
      accountNumber: '590005004423',
      accountType: 'Current Account',
      bankBranch: 'Itwari,Nagpur',
      ifscCode: 'ICIC0000059'
    },
    {
      name: 'Yes Bank',
      accountHolder: 'Sapphire Broking',
      accountNumber: '590005004423',
      accountType: 'Current Account',
      bankBranch: 'Itwari,Nagpur',
      ifscCode: 'ICIC0000059'
    }
  ];
  
  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <></>
  );
};

export default BankTransferModal;
