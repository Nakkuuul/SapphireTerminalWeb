import React from 'react';
import { Info } from 'lucide-react';

const BrokeragePlan = ({ brokerageData = [] }) => {
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
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h3 className="font-medium text-gray-700 mb-4">Brokerage Plan</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left text-sm font-medium text-gray-700">Security</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">Plan type</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">Brokerage</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">Minimum Brokerage</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">
                <div className="flex items-center">
                  Additional Charges
                  <Info size={16} className="ml-1 text-gray-400" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {brokerageRows.map((row, index) => (
              <tr key={index} className="bg-white">
                <td className="p-3 text-sm text-gray-700">{row.security}</td>
                <td className="p-3 text-sm text-gray-700">{row.planType}</td>
                <td className="p-3 text-sm text-gray-700">{row.brokerage}</td>
                <td className="p-3 text-sm text-gray-700">{row.minimumBrokerage}</td>
                <td className="p-3 text-sm text-gray-700">{row.additionalCharges}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrokeragePlan;