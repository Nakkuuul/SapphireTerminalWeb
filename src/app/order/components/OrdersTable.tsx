"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";

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
    <div className="bg-white w-full mx-auto shadow-sm">
      <div className="flex justify-between items-center py-4">
        <h2 className="text-base font-medium text-gray-800">5 Queued Orders</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search everything..."
            className="pl-4 pr-11 py-2 border border-[#D1D5DB] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Search size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-[#D1D5DB]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#F4F4F9] text-xs font-medium text-gray-600 border-b border-[#D1D5DB]">
              <th className="px-4 py-4 whitespace-nowrap border-r border-[#D1D5DB]">
                <div className="flex justify-between items-center">
                  <span className="mr-2">Time</span>
                  <Image
                    src="/sort-icon.svg"
                    alt="Sort Icon"
                    width={16}
                    height={16}
                  />
                </div>
              </th>
              <th className="px-4 py-4 whitespace-nowrap border-r border-[#D1D5DB]">
                <div className="flex justify-between items-center">
                  <span className="mr-2">Action</span>
                  <Image
                    src="/sort-icon.svg"
                    alt="Sort Icon"
                    width={16}
                    height={16}
                  />
                </div>
              </th>
              <th className="px-2 py-4 whitespace-nowrap border-r border-[#D1D5DB]">
                <div className="flex justify-between items-center">
                  <span className="mr-2">Exch.</span>
                  <Image
                    src="/sort-icon.svg"
                    alt="Sort Icon"
                    width={16}
                    height={16}
                  />
                </div>
              </th>
              <th className="px-5 py-4 whitespace-nowrap border-r border-[#D1D5DB]">
                <div className="flex justify-between items-center">
                  <span className="mr-2">Security</span>
                  <Image
                    src="/sort-icon.svg"
                    alt="Sort Icon"
                    width={16}
                    height={16}
                  />
                </div>
              </th>
              <th className="px-4 py-4 whitespace-nowrap border-r border-[#D1D5DB]">
                <div className="flex justify-between items-center">
                  <span className="mr-2">Qty.</span>
                  <Image
                    src="/sort-icon.svg"
                    alt="Sort Icon"
                    width={16}
                    height={16}
                  />
                </div>
              </th>
              <th className="px-4 py-4 whitespace-nowrap border-r border-[#D1D5DB]">
                <div className="flex justify-between items-center">
                  <span className="mr-2">Avg. Price</span>
                  <Image
                    src="/sort-icon.svg"
                    alt="Sort Icon"
                    width={16}
                    height={16}
                  />
                </div>
              </th>
              <th className="px-4 py-4 whitespace-nowrap">
                <div className="flex justify-between items-center">
                  <span className="mr-2">LTP</span>
                  <Image
                    src="/sort-icon.svg"
                    alt="Sort Icon"
                    width={16}
                    height={16}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className={`border-t border-[#D1D5DB] hover:bg-gray-50 ${
                  index === orders.length - 1
                    ? "rounded-b-md overflow-hidden"
                    : ""
                }`}
              >
                <td className="px-4 py-3 text-xs text-gray-900 border-r border-[#D1D5DB]">
                  <div className="flex justify-center items-center">
                    <span>{order.time}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-900 border-r border-[#D1D5DB]">
                  <div className="flex justify-center items-center">
                    <span>{order.action}</span>
                  </div>
                </td>
                <td className="px-2 py-3 text-xs text-gray-900 border-r border-[#D1D5DB]">
                  <div className="flex bg-[#F4F4F9] rounded w-fit px-2 py-1 mx-auto justify-center items-center">
                    <span>{order.exch}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-xs text-gray-900 border-r border-[#D1D5DB]">
                  <div className="flex items-center justify-between">
                    <span>{order.security}</span>
                    <div className="flex items-center">
                      <div
                        className={`px-2 py-1 text-xs font-light rounded ${
                          order.type === "BUY"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.type}
                      </div>
                      <button className="ml-2 text-gray-400 hover:text-gray-600">
                        <Image
                          src="/three-dots.svg"
                          width={18}
                          height={18}
                          alt="Three Dots"
                        />
                      </button>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-900 border-r border-[#D1D5DB]">
                  <div className="flex justify-center items-center">
                    <span>{order.qty}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-900 border-r border-[#D1D5DB]">
                  <div className="flex justify-center items-center">
                    <span>{order.avgPrice}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-900">
                  <div className="flex justify-center items-center">
                    <span>{order.ltp}</span>
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

export default OrdersTable;
