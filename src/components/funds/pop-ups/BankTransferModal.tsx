import React from 'react';
import { X } from 'lucide-react';

// Profile icon for bank verification
const ProfileIcon = () => (
  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
    <span className="text-xs">S</span>
  </div>
);

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 overflow-hidden"
        style={{ position: 'relative'}} // Makes it visually appear movable
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Bank Transfer</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2"></th>
                  {bankDetails.map((bank, index) => (
                    <th key={index} className="border p-2 font-medium text-center">
                      {bank.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 text-gray-600">Account Holder</td>
                  {bankDetails.map((bank, index) => (
                    <td key={index} className="border p-2 text-center">
                      <div className="flex items-center justify-center">
                        {bank.accountHolder}
                        {index === 1 && <ProfileIcon />}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-gray-600">Account Number</td>
                  {bankDetails.map((bank, index) => (
                    <td key={index} className="border p-2 text-center">
                      {bank.accountNumber}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-gray-600">Account Type</td>
                  {bankDetails.map((bank, index) => (
                    <td key={index} className="border p-2 text-center">
                      {bank.accountType}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-gray-600">Bank Branch</td>
                  {bankDetails.map((bank, index) => (
                    <td key={index} className="border p-2 text-center">
                      {bank.bankBranch}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 text-gray-600">IFCE Code</td>
                  {bankDetails.map((bank, index) => (
                    <td key={index} className="border p-2 text-center">
                      {bank.ifscCode}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankTransferModal;