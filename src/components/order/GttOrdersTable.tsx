"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";

const GttOrdersTable = () => {
  // Sample data matching the image
  const [orders, setOrders] = useState([
    {
      date: "24 Jan 2025",
      security: "MRF",
      action: "BUY",
      qty: "50/50",
      triggerPrice: "2,045.63",
      triggerPercentage: "+2.10%",
      isPositive: true,
      ltp: "467.80",
    },
    {
      date: "24 Jan 2025",
      security: "TATASTEEL",
      action: "SELL",
      qty: "265/265",
      triggerPrice: "-2,045.63",
      triggerPercentage: "-2.10%",
      isPositive: false,
      ltp: "467.80",
    },
    {
      date: "24 Jan 2025",
      security: "ITC",
      action: "BUY",
      qty: "265/265",
      triggerPrice: "-2,045.63",
      triggerPercentage: "-2.10%",
      isPositive: false,
      ltp: "467.80",
    },
    {
      date: "24 Jan 2025",
      security: "MOTILALOSWL",
      action: "SELL",
      qty: "265/265",
      triggerPrice: "2,045.63",
      triggerPercentage: "+2.10%",
      isPositive: true,
      ltp: "467.80",
    },
    {
      date: "24 Jan 2025",
      security: "WIPRO",
      action: "BUY",
      qty: "265/265",
      triggerPrice: "-2,045.63",
      triggerPercentage: "-2.10%",
      isPositive: false,
      ltp: "467.80",
    },
  ]);

  return (
    <div className="bg-white w-full mx-auto">
      <div className="flex justify-between items-center py-4">
        <h2 className="text-base font-medium text-gray-800">GTT Orders</h2>
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
                  <span className="mr-2">Date</span>
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
                  <span className="mr-2">Action</span>
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
                  <span className="mr-2">Trigger Price</span>
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
                  <div className="flex items-center">
                    <span>{order.date}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-900 border-r border-[#D1D5DB]">
                  <div className="flex items-center justify-between">
                    <span>{order.security}</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Image
                        src="/three-dots.svg"
                        width={18}
                        height={18}
                        alt="Three Dots"
                      />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-900 border-r border-[#D1D5DB]">
                  <div className="flex justify-center items-center">
                    <div
                      className={`px-2 py-1 text-xs font-light rounded ${
                        order.action === "BUY"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.action}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-900 border-r border-[#D1D5DB]">
                  <div className="flex justify-center items-center">
                    <span>{order.qty}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs border-r border-[#D1D5DB]">
                  <div className="flex justify-center items-center">
                    <span className={order.isPositive ? "text-green-600" : "text-red-600"}>
                      {order.triggerPrice} <span className="text-xs">{order.triggerPercentage}</span>
                    </span>
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

export default GttOrdersTable;