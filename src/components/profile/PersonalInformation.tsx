import React from 'react';

// Define a type for userData prop
type UserData = {
  name?: string;
  accountId?: string;
  pan?: string;
  phone?: string;
  location?: string;
  email?: string;
};

const PersonalInformation = ({ userData = {} }: { userData?: UserData }) => {
  // Default values as fallbacks in case data is not provided
  const {
    name = "Nakul Pratap Thakur",
    accountId = "AA00000",
    pan = "CRXPT0991H",
    phone = "+91 98903 36989",
    location = "Nagpur, Maharashtra",
    email = "nakul.thakur@sapphirebroking.com"
  } = userData;

  return (
    <>
    <div className="bg-[#F4F4F9] border border-[#D1D5DB] p-3 mb-6">
      <div className="flex items-center">
        <div className="bg-gray-100 rounded-lg p-3 mr-4">
          <span className="text-3xl">👨</span>
        </div>
        <div>
          <h2 className="text-lg font-medium">{name}</h2>
          <p className="text-gray-500 text-sm">{accountId}</p>
        </div>
      </div>
    </div>
    <div className='mb-6 border border-[#D1D5DB]'>
    <h3 className="font-normal text-lg text-[#1A1A1A] py-4 px-3 bg-[#F4F4F9] border-b mb-4">Personal Information</h3>
      
      <div className="grid grid-cols-2 px-3 py-3 gap-4">
        <div>
          <p className="text-sm text-gray-500">PAN</p>
          <p className="font-medium">{pan}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">{phone}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Location</p>
          <p className="font-medium">{location}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{email}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default PersonalInformation;
