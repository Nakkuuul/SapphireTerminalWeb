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

  const brokerageRows = brokerageData.length > 0 ? brokerageData : defaultBrokerageData;

  return (
    <div className="border border-[#D1D5DB] dark:border-[#2F2F2F] mb-6">
      <div className="bg-[#F4F4F9] dark:bg-[#121413] border-b border-[#D1D5DB] dark:border-[#2F2F2F] px-6 py-3">
        <h3 className="text-lg font-normal text-[#1A1A1A] dark:text-[#EBEEF5]">Brokerage Plan</h3>
      </div>

      <div className="overflow-x-auto p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["Security", "Plan type", "Brokerage", "Minimum Brokerage", "Additional Charges"].map((heading, i) => (
                <th
                  key={i}
                  className="p-3 text-left text-base font-medium text-gray-900 dark:text-[#EBEEF5] border bg-[#B8DBD94D] dark:bg-[#121413] border-[#D1D5DB] dark:border-[#2F2F2F]"
                >
                  {heading === "Additional Charges" ? (
                    <div className="flex items-center">
                      {heading}
                      <Info size={16} className="ml-1 text-gray-400 dark:text-[#C9CACC]" />
                    </div>
                  ) : (
                    heading
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {brokerageRows.map((row, index) => (
              <tr key={index}>
                <td className="p-3 text-sm font-medium text-gray-500 dark:text-[#C9CACC] border border-[#D1D5DB] dark:border-[#2F2F2F]">{row.security}</td>
                <td className="p-3 text-sm font-medium text-gray-500 dark:text-[#C9CACC] border border-[#D1D5DB] dark:border-[#2F2F2F]">{row.planType}</td>
                <td className="p-3 text-sm font-medium text-gray-500 dark:text-[#C9CACC] border border-[#D1D5DB] dark:border-[#2F2F2F]">{row.brokerage}</td>
                <td className="p-3 text-sm font-medium text-gray-500 dark:text-[#C9CACC] border border-[#D1D5DB] dark:border-[#2F2F2F]">{row.minimumBrokerage}</td>
                <td className="p-3 text-sm font-medium text-gray-500 dark:text-[#C9CACC] border border-[#D1D5DB] dark:border-[#2F2F2F] flex items-center">
                  {row.additionalCharges}
                  <Info size={16} className="ml-1 text-gray-400 dark:text-[#C9CACC]" />
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
