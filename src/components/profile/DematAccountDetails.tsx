import React from 'react';

type DematData = {
  boId?: string;
  dpId?: string;
  participantName?: string;
  depository?: string;
};

const DematAccountDetails = ({ dematData = {} }: { dematData?: DematData }) => {
  const {
    boId = "1234839294940193",
    dpId = "12348392",
    participantName = "Sapphire Broking",
    depository = "CDSL"
  } = dematData;

  return (
    <div className="border border-[#D1D5DB] dark:border-[#2F2F2F] mb-6">
      <div className="bg-[#F4F4F9] dark:bg-[#121413] border-b-[#D1D5DB] dark:border-b-[#2F2F2F] px-6 py-3">
        <h3 className="text-lg text-[#1A1A1A] dark:text-[#EBEEF5]">Demat Account Details</h3>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 gap-y-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-[#C9CACC]">Demat Account (BO) ID</p>
            <p>{boId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-[#C9CACC]">DP ID</p>
            <p>{dpId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-[#C9CACC]">Depository Participant (DP)</p>
            <p>{participantName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-[#C9CACC]">Depository</p>
            <p>{depository}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DematAccountDetails;
