"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";

const OrdersTable = () => {
  // Sample data matching the image
  const [orders, setOrders] = useState([
    {
      time: "12:30:45",
      action: "Intraday",
      exch: "NSE",
      security: "MRF",
      type: "BUY",
      qty: "50/50",
      avgPrice: "2,042.63",
      ltp: "467.80",
    },
    {
      time: "12:30:45",
      action: "Delivery",
      exch: "BSE",
      security: "TATASTEEL",
      type: "SELL",
      qty: "255/265",
      avgPrice: "8223.60",
      ltp: "467.80",
    },
    {
      time: "12:30:45",
      action: "Intraday",
      exch: "BSE",
      security: "ITC",
      type: "BUY",
      qty: "255/265",
      avgPrice: "92,467.00",
      ltp: "467.80",
    },
    {
      time: "12:30:45",
      action: "Intraday",
      exch: "MCX",
      security: "MOTILALOSWL",
      type: "SELL",
      qty: "255/255",
      avgPrice: "88.50",
      ltp: "467.80",
    },
    {
      time: "12:30:45",
      action: "Intraday",
      exch: "NCDEX",
      security: "WIPRO",
      type: "BUY",
      qty: "255/265",
      avgPrice: "324.5",
      ltp: "467.80",
    },
  ]);

  return (
    <div className="bg-white rounded-md w-full mx-auto border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-base font-medium text-gray-800">5 Queued Orders</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search everything..."
            className="pl-3 pr-10 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Search size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-xs font-medium text-gray-600 border-b border-gray-200">
              <th className="px-4 py-2 whitespace-nowrap">
                Time <span className="text-gray-400">↕</span>
              </th>
              <th className="px-4 py-2 whitespace-nowrap">
                Action <span className="text-gray-400">↕</span>
              </th>
              <th className="px-4 py-2 whitespace-nowrap">
                Exch. <span className="text-gray-400">↕</span>
              </th>
              <th className="px-4 py-2 whitespace-nowrap">
                Security <span className="text-gray-400">↕</span>
              </th>
              <th className="px-4 py-2 whitespace-nowrap"></th>
              <th className="px-4 py-2 whitespace-nowrap">
                Qty. <span className="text-gray-400">↕</span>
              </th>
              <th className="px-4 py-2 whitespace-nowrap">
                Avg. Price <span className="text-gray-400">↕</span>
              </th>
              <th className="px-4 py-2 whitespace-nowrap">
                LTP <span className="text-gray-400">↕</span>
              </th>
              <th className="px-4 py-2 whitespace-nowrap"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-xs text-gray-900">
                  {order.time}
                </td>
                <td className="px-4 py-3 text-xs text-gray-900">
                  {order.action}
                </td>
                <td className="px-4 py-3 text-xs text-gray-900">
                  {order.exch}
                </td>
                <td className="px-4 py-3 text-xs text-gray-900">
                  {order.security}
                </td>
                <td className="py-3 pr-1">
                  <div
                    className={`px-2 py-1 text-xs font-medium rounded text-center ${
                      order.type === "BUY"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.type}
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-900">{order.qty}</td>
                <td className="px-4 py-3 text-xs text-gray-900">
                  {order.avgPrice}
                </td>
                <td className="px-4 py-3 text-xs text-gray-900">{order.ltp}</td>
                <td className="px-4 py-3 text-xs">
                  <button className="text-gray-400 hover:text-gray-600">
                    <span className="font-bold">⋮</span>
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

export default OrdersTable;
