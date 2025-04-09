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
                  <div className="text-sm font-medium text-[#6B7280]">{trade.date} <span className='font-normal'> {trade.time} </span></div>
                </td>
                <td className="p-4 whitespace-nowrap border-r bg-[#FAFAFA]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">{trade.security}</span>
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
              <th className="px-4 text-left font-medium text-black text-base whitespace-nowrap border-r w-40">
                <div className="flex items-center justify-between">
                  <span>Entry Price</span>
                  <ArrowUpDown size={16} className="text-gray-500 ml-2" />
                </div>
              </th>
              <th className="px-4 text-left font-medium text-black text-base whitespace-nowrap border-r w-40">
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
              <th className="px-4 text-left font-medium text-black text-base whitespace-nowrap border-r w-40">
                <div className="flex items-center justify-between">
                  <span>Duration</span>
                  <ArrowUpDown size={16} className="text-gray-500 ml-2" />
                </div>
              </th>
              <th className="p-4 text-left font-medium text-black text-base whitespace-nowrap border-r w-40">
                <div className="flex items-center justify-between">
                  <span>Net G/L</span>
                  <ArrowUpDown size={16} className="text-gray-500 ml-2" />
                </div>
              </th>
              <th className="px-4 text-left font-medium text-black text-base whitespace-nowrap border-r w-40">
                <div className="flex items-center justify-between">
                  <span>Margin</span>
                  <ArrowUpDown size={16} className="text-gray-500 ml-2" />
                </div>
              </th>
              <th className="px-4 text-left font-medium text-black text-base whitespace-nowrap border-r w-40">
                <div className="flex items-center justify-between">
                  <span>Posted by</span>
                  <ArrowUpDown size={16} className="text-gray-500 ml-2" />
                </div>
              </th>
              <th className="px-4 text-left font-medium text-black text-base whitespace-nowrap border-r w-40">
                <div className="flex items-center justify-between">
                  <span>Status</span>
                  <ArrowUpDown size={16} className="text-gray-500 ml-2" />
                </div>
              </th>
              
            </tr>
          </thead>
          <tbody>
            {filteredTrades.map((trade: any, index: number) => (
              <tr key={`scroll-${index}`} className={`border-t hover:bg-gray-50 ${index === filteredTrades.length - 1 ? '' : 'border-b'}`}>
                <td className="p-4 whitespace-nowrap text-sm text-[#6B7280] border-r">{trade.entryPrice}</td>
                <td className="p-4 whitespace-nowrap text-sm text-[#6B7280] border-r">{trade.exitPrice}</td>
                <td className="p-4 whitespace-nowrap text-sm text-[#6B7280] border-r">{trade.quantity}</td>
                <td className="p-4 whitespace-nowrap text-sm text-[#6B7280] border-r">{trade.duration}</td>
                <td className="p-4 whitespace-nowrap text-sm border-r">
                  <div className={`text-sm font-medium ${trade.netGL?.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                    {trade.net || '—'}
                  </div>
                </td>
                <td className="p-4 whitespace-nowrap text-sm text-[#6B7280] border-r">{trade.marginReq || '—'}</td>
                <td className="p-4 whitespace-nowrap text-sm text-[#6B7280] border-r">{trade.postedBy || '[posted.by]'}</td>
                <td className="p-4 whitespace-nowrap text-sm border-r">
                  <div className={`inline-block px-2 py-1 text-xs rounded ${
                    trade.status === 'Target Hit' ? 'bg-green-100 text-green-800' : 
                    trade.status === 'Stoploss Hit' ? 'bg-red-100 text-red-800' : 
                    trade.status === 'Target Miss' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {trade.status || '—'}
                  </div>
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