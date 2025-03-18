"use client";

import React from 'react';
import { ArrowUpDown, Filter, Grid, List, MoreVertical } from 'lucide-react';

interface ClosedTrade {
  date: string;
  time: string;
  security: string;
  type: 'BUY' | 'SELL';
  entryPrice: string;
  exitPrice: string;
  quantity: string;
  duration: string;
  net: string;
}

export default function ClosedTradesList() {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('list');
  
  const closedTradesData: ClosedTrade[] = [
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'MRF',
      type: 'BUY',
      entryPrice: '₹2,042.63',
      exitPrice: '₹2,042.63',
      quantity: '₹2,042.63',
      duration: '1 month',
      net: '+1'
    },
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'TATASTEEL',
      type: 'SELL',
      entryPrice: '₹8223.60',
      exitPrice: '₹8223.60',
      quantity: '₹8223.60',
      duration: '2 months',
      net: '-'
    },
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'ITC',
      type: 'BUY',
      entryPrice: '₹92,467.00',
      exitPrice: '₹92,467.00',
      quantity: '₹92,467.00',
      duration: '1 year',
      net: '+↑'
    },
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'MOTILALOSWL',
      type: 'SELL',
      entryPrice: '₹88.50',
      exitPrice: '₹88.50',
      quantity: '₹88.50',
      duration: '6 months',
      net: '-'
    },
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'WIPRO',
      type: 'BUY',
      entryPrice: '₹924.5',
      exitPrice: '₹924.5',
      quantity: '₹924.5',
      duration: '4 year',
      net: '+↑'
    }
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search everything..."
            className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div className="absolute right-3 top-2.5">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="flex items-center ml-4 gap-4">
          <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-lg text-gray-700">
            <Filter size={16} />
            <span className="text-sm">Filter</span>
          </button>
          
          <div className="flex border rounded-lg overflow-hidden">
            <button 
              className={`p-1.5 ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} className="text-gray-700" />
            </button>
            <button 
              className={`p-1.5 ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={16} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Scrollable Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">
                <div className="flex items-center">
                  Date & Time
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">
                <div className="flex items-center">
                  Security
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">
                <div className="flex items-center">
                  Entry Price
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">
                <div className="flex items-center">
                  Exit Price
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">
                <div className="flex items-center">
                  Quantity
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">
                <div className="flex items-center">
                  Duration
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">
                <div className="flex items-center">
                  Net
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {closedTradesData.map((trade, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{trade.date}</div>
                  <div className="text-sm text-gray-500">{trade.time}</div>
                </td>
                <td className="p-3 whitespace-nowrap">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{trade.security}</span>
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded ${
                      trade.type === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {trade.type}
                    </span>
                  </div>
                </td>
                <td className="p-3 whitespace-nowrap text-sm text-gray-900">{trade.entryPrice}</td>
                <td className="p-3 whitespace-nowrap text-sm text-gray-900">{trade.exitPrice}</td>
                <td className="p-3 whitespace-nowrap text-sm text-gray-900">{trade.quantity}</td>
                <td className="p-3 whitespace-nowrap text-sm text-gray-900">{trade.duration}</td>
                <td className="p-3 whitespace-nowrap">
                  <div className={`text-sm font-medium ${
                    trade.net.includes('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {trade.net}
                  </div>
                </td>
                <td className="p-3 whitespace-nowrap">
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
}