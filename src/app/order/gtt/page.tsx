"use client";
import React from "react";
import { Search } from "lucide-react";
import OrderSelector from "../../../components/order/OrderSelector";
import GttOrdersTable from "@/components/order/GttOrdersTable";
import { GttOrderPopup } from "@/components/order/gtt-order-popup";

export default function GttPage() {
  return (
    <div className="w-full">
      
      <div className="flex justify-between items-center py-4 px-4">
      <GttOrderPopup />
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
      
      <GttOrdersTable />
    </div>
  );
}
