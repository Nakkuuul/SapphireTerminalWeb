'use client'
import React, { useState, useEffect } from 'react';
import PersonalInformation from '@/components/profile/PersonalInformation';
import DematAccountDetails from '@/components/profile/DematAccountDetails';
import TradingSegments from '@/components/profile/TradingSegments ';
import BrokeragePlan from '@/components/profile/BrokeragePlan';
import BankAndNomineeDetails from '@/components/profile/BankAndNomineeDetails';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    userData: {},
    dematData: {},
    segmentsData: [],
    brokerageData: [],
    bankData: [],
    nomineeData: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This function would fetch data from your backend API
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, this would be replaced with actual API calls
        // Example:
        // const response = await fetch('/api/profile');
        // const data = await response.json();
        
        // Using mock data for now
        // In production, replace this with actual API call
        
        // Simulating API delay
        setTimeout(() => {
          // This is where you'd set the data from your API
          setProfileData({
            userData: {
              name: "Nakul Pratap Thakur",
              accountId: "AA00000",
              pan: "CRXPT0991H",
              phone: "+91 98903 36989",
              location: "Nagpur, Maharashtra",
              email: "nakul.thakur@sapphirebroking.com"
            },
            dematData: {
              boId: "1234839294940193",
              dpId: "12348392",
              participantName: "Sapphire Broking",
              depository: "CDSL"
            },
            // Other data would be populated here from your API
            segmentsData: [],
            brokerageData: [],
            bankData: [],
            nomineeData: []
          });
          setLoading(false);
        }, 500);
      } catch (err:any) {
        setError(err);
        setLoading(false);
        console.error('Error fetching profile data:', err);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading profile data...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <PersonalInformation userData={profileData.userData} />
      <DematAccountDetails dematData={profileData.dematData} />
      <TradingSegments segmentsData={profileData.segmentsData} />
      <BrokeragePlan brokerageData={profileData.brokerageData} />
      <BankAndNomineeDetails 
        bankData={profileData.bankData} 
        nomineeData={profileData.nomineeData} 
      />
    </div>
  );
};

export default ProfilePage;