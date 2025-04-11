import React from 'react';
import { ArrowUpDown, MoreVertical } from 'lucide-react';

const FixedColumnTable = ({ filteredTrades }: any) => {
  return (
    <div className="flex w-full border rounded-lg dark:border-[#2F2F2F]">
      {/* Fixed columns */}
      <div className="sticky left-0 z-10">
        <table className="border-collapse">
          <thead>
            <tr style={{ height: '54px' }}>
              <th className="p-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] w-48 bg-[#F4F4F9] dark:bg-dark-insidecard">
                <div className="flex items-center justify-between">
                  <span>Date & Time</span>
                  <ArrowUpDown size={16} className="text-gray-500 dark:text-dark-lighttext ml-2" />
                </div>
              </th>
              <th className="p-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] w-64 bg-[#F4F4F9] dark:bg-dark-insidecard">
                <div className="flex items-center justify-between">
                  <span>Security</span>
                  <ArrowUpDown size={16} className="text-gray-500 dark:text-dark-lighttext ml-2" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTrades.map((trade: any, index: number) => (
              <tr
                key={`fixed-${index}`}
                className={`border-t border-gray-200 dark:border-[#2F2F2F] ${index === filteredTrades.length - 1 ? '' : 'border-b'} bg-white dark:bg-dark-cardbg hover:bg-gray-100 dark:hover:bg-[#1E1E1E]`}
                style={{ height: '50px' }}
              >
                <td className="p-4 whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] text-sm text-[#6B7280] dark:text-dark-graytext">
                  <div className="text-sm font-medium">{trade.date} <span className="font-normal">{trade.time}</span></div>
                </td>
                <td className="p-4 whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] text-sm text-[#6B7280] dark:text-dark-graytext">
                  <div className="flex items-center justify-between">
                    <span>{trade.security}</span>
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded ${
                      trade.type === 'BUY' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
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
            <tr className="bg-[#F4F4F9] dark:bg-dark-insidecard" style={{ height: '54px' }}>
              <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] w-40">
                <div className="flex items-center justify-between">
                  <span>Entry Price</span>
                  <ArrowUpDown size={16} className="text-gray-500 dark:text-dark-lighttext ml-2" />
                </div>
              </th>
              <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] w-40">
                <div className="flex items-center justify-between">
                  <span>Exit Price</span>
                  <ArrowUpDown size={16} className="text-gray-500 dark:text-dark-lighttext ml-2" />
                </div>
              </th>
              <th className="p-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] w-40">
                <div className="flex items-center justify-between">
                  <span>Quantity</span>
                  <ArrowUpDown size={16} className="text-gray-500 dark:text-dark-lighttext ml-2" />
                </div>
              </th>
              <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] w-40">
                <div className="flex items-center justify-between">
                  <span>Duration</span>
                  <ArrowUpDown size={16} className="text-gray-500 dark:text-dark-lighttext ml-2" />
                </div>
              </th>
              <th className="p-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] w-40">
                <div className="flex items-center justify-between">
                  <span>Net G/L</span>
                  <ArrowUpDown size={16} className="text-gray-500 dark:text-dark-lighttext ml-2" />
                </div>
              </th>
              <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] w-40">
                <div className="flex items-center justify-between">
                  <span>Margin</span>
                  <ArrowUpDown size={16} className="text-gray-500 dark:text-dark-lighttext ml-2" />
                </div>
              </th>
              <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] w-40">
                <div className="flex items-center justify-between">
                  <span>Posted by</span>
                  <ArrowUpDown size={16} className="text-gray-500 dark:text-dark-lighttext ml-2" />
                </div>
              </th>
              <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] w-40">
                <div className="flex items-center justify-between">
                  <span>Status</span>
                  <ArrowUpDown size={16} className="text-gray-500 dark:text-dark-lighttext ml-2" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTrades.map((trade: any, index: number) => (
              <tr
                key={`scroll-${index}`}
                className={`border-t border-gray-200 dark:border-[#2F2F2F] hover:bg-gray-50 dark:hover:bg-[#1E1E1E] ${index === filteredTrades.length - 1 ? '' : 'border-b'} bg-white dark:bg-dark-cardbg`}
                style={{ height: '50px' }}
              >
                <td className="p-4 whitespace-nowrap text-sm text-[#6B7280] dark:text-dark-graytext border-r border-gray-200 dark:border-[#2F2F2F]">{trade.entryPrice}</td>
                <td className="p-4 whitespace-nowrap text-sm text-[#6B7280] dark:text-dark-graytext border-r border-gray-200 dark:border-[#2F2F2F]">{trade.exitPrice}</td>
                <td className="p-4 whitespace-nowrap text-sm text-[#6B7280] dark:text-dark-graytext border-r border-gray-200 dark:border-[#2F2F2F]">{trade.quantity}</td>
                <td className="p-4 whitespace-nowrap text-sm text-[#6B7280] dark:text-dark-graytext border-r border-gray-200 dark:border-[#2F2F2F]">{trade.duration}</td>
                <td className="p-4 whitespace-nowrap text-sm border-r border-gray-200 dark:border-[#2F2F2F]">
                  <div className={`text-sm font-medium ${trade.netGL?.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                    {trade.net || '—'}
                  </div>
                </td>
                <td className="p-4 whitespace-nowrap text-sm text-[#6B7280] dark:text-dark-graytext border-r border-gray-200 dark:border-[#2F2F2F]">{trade.marginReq || '—'}</td>
                <td className="p-4 whitespace-nowrap text-sm text-[#6B7280] dark:text-dark-graytext border-r border-gray-200 dark:border-[#2F2F2F]">{trade.postedBy || '[posted.by]'}</td>
                <td className="p-4 whitespace-nowrap text-sm border-r border-gray-200 dark:border-[#2F2F2F]">
                  <div className={`inline-block px-2 py-1 text-xs rounded ${
                    trade.status === 'Target Hit' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                    trade.status === 'Stoploss Hit' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : 
                    trade.status === 'Target Miss' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : 
                    'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
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