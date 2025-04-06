import React, { useEffect, useState } from 'react';

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
  const {
    name = "Nakul Pratap Thakur",
    accountId = "AA00000",
    pan = "CRXPT0991H",
    phone = "+91 98903 36989",
    location = "Nagpur, Maharashtra",
    email = "nakul.thakur@sapphirebroking.com"
  } = userData;

  const [profilePic, setProfilePic] = useState<string>("");

  useEffect(() => {
    fetch('https://randomuser.me/api/')
      .then(res => res.json())
      .then(data => {
        setProfilePic(data.results[0].picture.thumbnail);
      });
  }, []);

  return (
    <>
      <div className="bg-[#F4F4F9] border border-[#D1D5DB] p-3 mb-6">
        <div className="flex items-center">
          <div className="bg-gray-100 rounded-lg p-3 mr-4">
            {profilePic ? (
              <img
                src={profilePic}
                alt="User Avatar"
                className="rounded-full w-12 h-12 object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse" />
            )}
          </div>
          <div>
            <h2 className="text-lg text-[#1A1A1A] font-medium">{name}</h2>
            <p className="text-gray-500 text-sm">{accountId}</p>
          </div>
        </div>
      </div>
      <div className='mb-6 border border-[#D1D5DB]'>
        <h3 className="font-normal text-lg text-[#1A1A1A] px-6 py-3 bg-[#F4F4F9] border-b ">Personal Information</h3>

        <div className="grid grid-cols-2 px-6 py-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">PAN</p>
            <p>{pan}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p>{phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p>{location}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p>{email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;
