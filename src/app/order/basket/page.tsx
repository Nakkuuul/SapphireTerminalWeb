"use client";
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const BasketDialog = () => {
  const [open, setOpen] = useState(true);
  const [includeExisting, setIncludeExisting] = useState(false);

  const items = [
    {
      type: "Intraday",
      security: "MRF",
      qty: 2,
      price: 2045.63,
      orderType: "BUY",
      margin: 467.8,
    },
    {
      type: "Intraday",
      security: "ITC",
      qty: 2,
      price: 2045.63,
      orderType: "BUY",
      margin: 467.8,
    },
    {
      type: "Intraday",
      security: "WIPRO",
      qty: 2,
      price: 2045.63,
      orderType: "BUY",
      margin: 467.8,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[800px] p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b bg-[#B8DBD94D]">
          <div className="flex items-center gap-2">
            <span className="text-sm">Basket1</span>
            <svg
              className="w-3.5 h-3.5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
            </svg>
          </div>
        </div>

        <div className="p-4">
          {/* Search */}
          <div className="flex justify-end mb-4">
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <Input
                placeholder="Search everything..."
                className="pl-8 h-8 text-sm border-gray-200"
              />
            </div>
          </div>

          {/* Table */}
          <div className="border rounded">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="text-xs font-normal text-gray-600 w-32">
                    Product Type
                  </TableHead>
                  <TableHead className="text-xs font-normal text-gray-600">
                    Security (3/50)
                  </TableHead>
                  <TableHead className="text-xs font-normal text-gray-600 text-center w-20">
                    Qty.
                  </TableHead>
                  <TableHead className="text-xs font-normal text-gray-600 text-right w-24">
                    Price
                  </TableHead>
                  <TableHead className="text-xs font-normal text-gray-600 text-center w-20">
                    Type
                  </TableHead>
                  <TableHead className="text-xs font-normal text-gray-600 text-right w-24">
                    Margin Req
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, i) => (
                  <TableRow key={i} className="hover:bg-gray-50">
                    <TableCell className="text-xs border-r">
                      {item.type}
                    </TableCell>
                    <TableCell className="text-xs font-medium border-r">
                      {item.security}
                    </TableCell>
                    <TableCell className="text-xs text-center border-r">
                      {item.qty}
                    </TableCell>
                    <TableCell className="text-xs text-right border-r">
                      ₹{item.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center border-r">
                      <span className="bg-green-100 text-green-600 text-[10px] px-2 py-0.5 rounded">
                        {item.orderType}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-right">
                      ₹{item.margin.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-start mt-4">
            <div className="space-y-3">
              <div className="flex gap-8">
                <div>
                  <div className="text-xs text-gray-500">Margin Required</div>
                  <div className="text-sm font-medium">₹5,908.00</div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <div className="text-xs text-gray-500">Final Margin</div>
                    <svg
                      className="w-3.5 h-3.5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="text-sm font-medium text-green-500">
                      ₹5,90,478.00
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c-2.5 0-4.8-.95-6.36-2.64M3 12a9 9 0 0 1 9-9m-9 9c0-2.5.95-4.8 2.64-6.36" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="include-positions"
                  checked={includeExisting}
                  onCheckedChange={(checked) => setIncludeExisting(!!checked)}
                  className="w-3.5 h-3.5 rounded-sm border-gray-300"
                />
                <label
                  htmlFor="include-positions"
                  className="text-xs text-gray-600"
                >
                  Include existing positions
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-1.5 text-xs font-medium text-white bg-green-500 rounded hover:bg-green-600"
              >
                Execute
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <BasketDialog />
    </div>
  );
}
