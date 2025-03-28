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
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h3 className="font-medium text-gray-700 py-2 border-b mb-4">Demat Account Details</h3>
      
      <div className="grid grid-cols-2 gap-4">
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
  );
};

export default DematAccountDetails;
