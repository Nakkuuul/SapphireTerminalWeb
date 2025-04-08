import React from 'react';
import { ArrowUpDown, MoreVertical } from 'lucide-react';

const FixedColumnTable = ({ filteredTrades }: any) => {
  return (
    <div className="flex w-full border rounded-lg">
      {/* Fixed columns */}
      <div className="sticky left-0 z-10">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-left font-medium text-black text-base whitespace-nowrap border-r w-48 bg-[#F4F4F9]">
                <div className="flex items-center justify-between">
                  <span>Date & Time</span>
                  <ArrowUpDown size={16} className="text-gray-500 ml-2" />
                </div>
              </th>
              <th className="p-4 text-left font-medium text-black text-base whitespace-nowrap border-r w-64 bg-[#F4F4F9]">
                <div className="flex items-center justify-between">
                  <span>Security</span>
                  <ArrowUpDown size={16} className="text-gray-500 ml-2" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTrades.map((trade: any, index: number) => (
              <tr key={`fixed-${index}`} className={`border-t ${index === filteredTrades.length - 1 ? '' : 'border-b'}`}>
                <td className="p-4 whitespace-nowrap border-r bg-[#FAFAFA]">
                  <div className="text-sm text-gray-900">{trade.date}, {trade.time}</div>
                </td>
                <td className="p-4 whitespace-nowrap border-r bg-[#FAFAFA]">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{trade.security}</span>
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded ${
                      trade.type === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {trade.type}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Scrollable columns */}
      <div className="overflow-x-auto">
        <table className="border-collapse">
          <thead>
            <tr className="bg-[#F4F4F9]">
              <th className="p-4 text-left font-medium text-black text-base whitespace-nowrap border-r w-40">
                <div className="flex items-center justify-between">
                  <span>Entry Price</span>
                  <ArrowUpDown size={16} className="text-gray-500 ml-2" />
                </div>
              </th>
              <th className="p-4 text-left font-medium text-black text-base whitespace-nowrap border-r w-40">
                <div className="flex items-center justify-between">
                  <span>Exit Price</span>
                  <ArrowUpDown size={16} className="text-gray-500 ml-2" />
                </div>
              </th>
              <th className="p-4 text-left font-medium text-black text-base whitespace-nowrap border-r w-40">
                <div className="flex items-center justify-between">
                  <span>Quantity</span>
                  <ArrowUpDown size={16} className="text-gray-500 ml-2" />
                </div>
              </th>
              <th className="p-4 text-left font-medium text-black text-base whitespace-nowrap border-r w-40">
                <div className="flex items-center justify-between">
                  <span>Duration</span>
                  <ArrowUpDown size={16} className="text-gray-500 ml-2" />
                </div>
              </th>
              <th className="p-4 text-left font-medium text-black text-base whitespace-nowrap w-24">
                <div className="flex items-center justify-between">
                  <span>Net</span>
                  <ArrowUpDown size={16} className="text-gray-500 ml-2" />
                </div>
              </th>
              <th className="p-4 w-16"></th>
            </tr>
          </thead>
          <tbody>
            {filteredTrades.map((trade: any, index: number) => (
              <tr key={`scroll-${index}`} className={`border-t hover:bg-gray-50 ${index === filteredTrades.length - 1 ? '' : 'border-b'}`}>
                <td className="p-4 whitespace-nowrap text-sm text-[#6B7280] border-r">{trade.entryPrice}</td>
                <td className="p-4 whitespace-nowrap text-sm text-[#6B7280] border-r">{trade.exitPrice}</td>
                <td className="p-4 whitespace-nowrap text-sm text-[#6B7280] border-r">{trade.quantity}</td>
                <td className="p-4 whitespace-nowrap text-sm text-[#6B7280] border-r">{trade.duration}</td>
                <td className="p-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${trade.net.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {trade.net}
                  </div>
                </td>
                <td className="p-4 whitespace-nowrap text-center">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FixedColumnTable;