import React from 'react';
import { Info } from 'lucide-react';

type BrokerageRow = {
  security: string;
  planType: string;
  brokerage: string;
  minimumBrokerage: string;
  additionalCharges: string;
};

type BrokeragePlanProps = {
  brokerageData?: BrokerageRow[];
};

const BrokeragePlan = ({ brokerageData = [] }: BrokeragePlanProps) => {
  // Default data if no props provided
  const defaultBrokerageData = [
    {
      security: 'Equity Delivery',
      planType: 'Fixed',
      brokerage: '₹20 per trade OR 0.05% (whichever is lower)',
      minimumBrokerage: '₹2.5/trade',
      additionalCharges: 'STT,ETC,GST,Stamp Duty, SEBI Charges'
    },
    {
      security: 'Equity Intraday',
      planType: 'Fixed',
      brokerage: '₹20 per trade OR 0.05% (whichever is lower)',
      minimumBrokerage: '₹2.5/trade',
      additionalCharges: 'STT,ETC,GST,Stamp Duty, SEBI Charges'
    },
    {
      security: 'Equity Future',
      planType: 'Fixed',
      brokerage: '₹20 per trade OR 0.05% (whichever is lower)',
      minimumBrokerage: '₹2.5/trade',
      additionalCharges: 'STT,ETC,GST,Stamp Duty, SEBI Charges'
    },
    {
      security: 'Equity Options',
      planType: 'Fixed',
      brokerage: 'Flat ₹20 per trade',
      minimumBrokerage: '-',
      additionalCharges: 'STT,ETC,GST,Stamp Duty, SEBI Charges'
    },
    {
      security: 'Currency Future',
      planType: 'Fixed',
      brokerage: '₹20 per trade OR 0.05% (whichever is lower)',
      minimumBrokerage: '₹2.5/trade',
      additionalCharges: 'STT,ETC,GST,Stamp Duty, SEBI Charges'
    },
    {
      security: 'Currency Options',
      planType: 'Fixed',
      brokerage: 'Flat ₹20 per trade',
      minimumBrokerage: '-',
      additionalCharges: 'STT,ETC,GST,Stamp Duty, SEBI Charges'
    },
    {
      security: 'Commodity Futures',
      planType: 'Fixed',
      brokerage: '₹20 per trade OR 0.05% (whichever is lower)',
      minimumBrokerage: '₹2.5/trade',
      additionalCharges: 'STT,ETC,GST,Stamp Duty, SEBI Charges'
    },
    {
      security: 'Commodity Options',
      planType: 'Fixed',
      brokerage: '₹20 per trade OR 0.05% (whichever is lower)',
      minimumBrokerage: '-',
      additionalCharges: 'STT,ETC,GST,Stamp Duty, SEBI Charges'
    }
  ];

  // Use provided data or default
  const brokerageRows = brokerageData.length > 0 ? brokerageData : defaultBrokerageData;

  return (
    <div className="border border-[#D1D5DB] mb-6">
      <div className="bg-[#F4F4F9] border-b-[#D1D5DB] px-6 py-3">
        <h3 className="text-lg font-normal text-[#1A1A1A]">Brokerage Plan</h3>
      </div>
      
      <div className="overflow-x-auto p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-3 text-left text-base font-medium text-gray-900 border bg-[#B8DBD94D]">Security</th>
              <th className="p-3 text-left text-base font-medium text-gray-900 border bg-[#B8DBD94D]">Plan type</th>
              <th className="p-3 text-left text-base font-medium text-gray-900 border bg-[#B8DBD94D]">Brokerage</th>
              <th className="p-3 text-left text-base font-medium text-gray-900 border bg-[#B8DBD94D]">Minimum Brokerage</th>
              <th className="p-3 text-left text-base font-medium text-gray-900 border bg-[#B8DBD94D]">
                <div className="flex items-center">
                  Additional Charges
                  <Info size={16} className="ml-1 text-gray-400" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {brokerageRows.map((row, index) => (
              <tr key={index}>
                <td className="p-3 text-sm font-medium text-gray-500 border">{row.security}</td>
                <td className="p-3 text-sm font-medium text-gray-500 border">{row.planType}</td>
                <td className="p-3 text-sm font-medium text-gray-500 border">{row.brokerage}</td>
                <td className="p-3 text-sm font-medium text-gray-500 border">{row.minimumBrokerage}</td>
                <td className="p-3 text-sm font-medium text-gray-500 border flex items-center">
                  {row.additionalCharges}
                  <Info size={16} className="ml-1 text-gray-400" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrokeragePlan;