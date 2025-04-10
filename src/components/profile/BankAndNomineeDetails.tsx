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
      documentId: 'ADKPT8301N',
      relation: 'Father',
      sharePercentage: 50
    },
    {
      name: 'Pratap Chandrashekant Thakur',
      documentId: 'ADKPT8301N',
      relation: 'Father',
      sharePercentage: 50
    }
  ];

  // Use provided data or default
  const banks = bankData.length > 0 ? bankData : defaultBankData;
  const nominees = nomineeData.length > 0 ? nomineeData : defaultNomineeData;

  return (
    <>
      {/* Bank Details Section */}
      <div className="border ]  dark:border-[#2F2F2F] mb-6">
        <div className="bg-gray-100 dark:bg-[#121413]  dark:border-[#2F2F2F] px-6 py-3">
          <h3 className="text-lg font-normal text-gray-900 dark:text-[#EBEEF5]">Bank Details</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 ">
            {banks.map((bank, index) => (
              <div key={index} className=" rounded border-[0.5px] w-[309px] h-[160px] p-0" style={{ borderRadius: '2px' }}>
                <div className="flex items-center justify-between pt-[18px] px-[21px]">
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
                
                <div className="px-[21px] pb-[18px] pt-[12px]">
                  <div className="mb-2 w-full justify-between flex">
                    <p className="text-base text-[#6B7280] inline">A/c Number: </p>
                    <p className="text-base text-[#1A1A1A] font-medium inline">{bank.accountNumber}</p>
                  </div>
                  <div className="mb-2 w-full justify-between flex">
                    <p className="text-base text-[#6B7280] inline">IFSC Code: </p>
                    <p className="text-base text-[#1A1A1A] font-medium inline">{bank.ifscCode}</p>
                  </div>
                  <div className="w-full justify-between flex">
                    <p className="text-base text-[#6B7280] inline">Branch: </p>
                    <p className="text-base text-[#1A1A1A] font-medium inline">{bank.branch}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Nominee Details Section */}
      <div className="border border-[#D1D5DB] dark:border-[#2F2F2F] mb-6">
        <div className="bg-gray-100  dark:bg-[#121413]    px-6 py-3">
          <h3 className="text-lg font-normal text-[#1A1A1A] dark:text-[#EBEEF5]">Nominee details</h3>
        </div>
        
        <div className="p-6">
          {nominees.map((nominee, index) => (
            <div key={index}>
              <h4 className="text-lg font-normal mb-3 text-[#1A1A1A] dark:text-[#EBEEF5] ">Nominee details {index + 1}</h4>
              <div className="grid grid-cols-2 gap-x-4">
                <div className="mb-3">
                  <p className="text-base text-[#7D7D7D]">Nominee Name</p>
                  <p className="text-base  dark:text-[#EBEEF5] ">{nominee.name}</p>
                </div>
                <div className="mb-3">
                  <p className="text-base text-[#7D7D7D]">Document ID</p>
                  <p className="text-base dark:text-[#EBEEF5]">{nominee.documentId}</p>
                </div>
                <div className="mb-3">
                  <p className="text-base text-[#7D7D7D]">Relation</p>
                  <p className="text- dark:text-[#EBEEF5]">{nominee.relation}</p>
                </div>
                <div className="mb-3">
                  <p className="text-base text-[#7D7D7D]">% Share</p>
                  <p className="text- dark:text-[#EBEEF5]">{nominee.sharePercentage}%</p>
                </div>
              </div>
              {index < nominees.length - 1 && (
                <div className="border-b my-4 dark:border-[#6B7280] "></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer Section */}
      <div className="text-base text-[#6B7280] text-center pb-4">
        <p>© 2025 Sapphire Broking. All rights reserved.</p>
        <p className="">SEBI Registered Stock Broker | Member: NSE, BSE, MCX, NCDEX</p>
        <p className="">Registered Office: [Address], Nagpur, Maharashtra, India</p>
        <p className="">Email: support@sapphirebroking.com | Phone: +91 XXXXXXXXXX</p>
        
        <div className="flex justify-center ">
          <span className="text-base px-2">Privacy Policy</span>
          <span className="text-base px-2">Terms & Conditions</span>
          <span className="text-base px-2">RMS Policy</span>
        </div>
        <div>
          <p>Investments in securities markets are subject to market risks. Read all scheme-related documents carefully before investing.
          All disputes subject to Nagpur jurisdiction.</p>
        </div>
        <div className="flex justify-center gap-3 mt-4">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
          </svg>
          
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.247 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.04 0 2.67.01 2.986.058 4.04.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.987-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.048-1.37-.058-4.04-.058zm0 3.063a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666zm6.538-8.469a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"/>
          </svg>
          
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.72 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.869 9.869 0 01-1.516-5.26c0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"/>
          </svg>
          
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 008.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
          </svg>
        </div>
      </div>
    </>
  );
};

export default BankAndNomineeDetails;