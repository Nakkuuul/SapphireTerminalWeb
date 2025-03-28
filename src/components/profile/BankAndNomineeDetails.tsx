import React from 'react';

const BankAndNomineeDetails = ({ bankData = [], nomineeData = [] }) => {
  // Default bank data if no props provided
  const defaultBankData = [
    {
      bank: 'ICICI BANK',
      accountNumber: '7888832882',
      ifscCode: 'ICIC0000EVA',
      branch: 'Manewada',
      isPrimary: true
    },
    {
      bank: 'AXIS BANK',
      accountNumber: '7888832882',
      ifscCode: 'Axis Bank',
      branch: 'Manewada',
      isPrimary: false
    }
  ];

  // Default nominee data if no props provided
  const defaultNomineeData = [
    {
      name: 'Pratap Chandrashekant Thakur',
      documentId: 'ADKPTB301N',
      relation: 'Father',
      sharePercentage: 50
    },
    {
      name: 'Pratap Chandrashekant Thakur',
      documentId: 'ADKPTB301N',
      relation: 'Father',
      sharePercentage: 50
    }
  ];

  // Use provided data or default
  const banks = bankData.length > 0 ? bankData : defaultBankData;
  const nominees = nomineeData.length > 0 ? nomineeData : defaultNomineeData;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h3 className="font-medium text-gray-700 py-2 border-b mb-4">Bank Details</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {banks.map((bank, index) => (
          <div key={index} className={`border rounded-lg p-4 ${bank.isPrimary ? 'border-orange-300' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between mb-3">
              {bank.bank === 'ICICI BANK' && (
                <div className="flex items-center text-orange-500">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-2">
                    <span className="text-xs">I</span>
                  </div>
                  <span className="font-medium">{bank.bank}</span>
                </div>
              )}
              {bank.bank === 'AXIS BANK' && (
                <div className="flex items-center text-purple-700">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                    <span className="text-xs">A</span>
                  </div>
                  <span className="font-medium">{bank.bank}</span>
                </div>
              )}
              {bank.isPrimary && (
                <span className="text-xs font-medium text-orange-500">Primary</span>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-gray-500">A/c Number</p>
                <p className="text-sm font-medium">{bank.accountNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">IFS Code</p>
                <p className="text-sm font-medium">{bank.ifscCode}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-gray-500">Branch</p>
                <p className="text-sm font-medium">{bank.branch}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <h3 className="font-medium text-gray-700 py-2 border-b mb-4">Nominee details</h3>
      
      {nominees.map((nominee, index) => (
        <div key={index} className="mb-4">
          <h4 className="text-sm font-medium mb-2">Nominee details {index + 1}</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Nominee Name</p>
              <p className="text-sm font-medium">{nominee.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Document ID</p>
              <p className="text-sm font-medium">{nominee.documentId}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Relation</p>
              <p className="text-sm font-medium">{nominee.relation}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">% Share</p>
              <p className="text-sm font-medium">{nominee.sharePercentage}%</p>
            </div>
          </div>
        </div>
      ))}
      
      <div className="text-xs text-gray-500 text-center mt-8 border-t pt-4">
        <p>© 2025 Sapphire Broking. All rights reserved.</p>
        <p className="mt-1">SEBI Registered Stock Broker | Member: NSE, BSE, MCX, NCDEX</p>
        <p className="mt-1">Registered Office: [Address], Nagpur, Maharashtra, India</p>
        <p className="mt-1">Email: support@sapphirebroking.com | Phone: +91 XXXXXXXXXX</p>
        <div className="flex justify-center gap-4 mt-2">
          <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
          <span>RMS Policy</span>
        </div>
        <div className="flex justify-center gap-2 mt-2">
          <span>X</span>
          <span>In</span>
          <span>Ig</span>
          <span>Wa</span>
          <span>Fb</span>
        </div>
      </div>
    </div>
  );
};

export default BankAndNomineeDetails;