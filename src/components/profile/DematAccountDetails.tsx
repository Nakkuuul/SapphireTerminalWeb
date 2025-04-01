import React from 'react';

// Define a type for dematData prop
type DematData = {
  boId?: string;
  dpId?: string;
  participantName?: string;
  depository?: string;
};

const DematAccountDetails = ({ dematData = {} }: { dematData?: DematData }) => {
  // Default values as fallbacks in case data is not provided
  const {
    boId = "1234839294940193",
    dpId = "12348392",
    participantName = "Sapphire Broking",
    depository = "CDSL"
  } = dematData;

  return (
    <div className="border border-[#D1D5DB] mb-6">
      <div className="bg-[#F4F4F9] border-b-[#D1D5DB] p-3">
        <h3 className="text-lg  text-[#1A1A1A]">Demat Account Details</h3>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 gap-y-6">
          <div>
            <p className="text-sm text-gray-500">Demat Account (BO) ID</p>
            <p className="font-medium">{boId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">DP ID</p>
            <p className="font-medium">{dpId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Depository Participant (DP)</p>
            <p className="font-medium">{participantName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Depository</p>
            <p className="font-medium">{depository}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DematAccountDetails;