"use client";
import React, { useState, useRef, useEffect } from "react";
import BasketDialogPopup from "@/components/order/BasketDialogPopup";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreVertical, Move, Plus, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

// Define proper types for the basket items
interface BasketItem {
  id: string;
  name: string;
  date: string;
  items: string;
}

// Define the BasketNameInput component
interface BasketNameInputProps {
  show: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
}

// Draggable basket name input component
const BasketNameInput: React.FC<BasketNameInputProps> = ({ show, onClose, onConfirm }) => {
  const [basketName, setBasketName] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  // Center the dialog when first opened
  useEffect(() => {
    if (show && dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      setPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: (window.innerHeight - rect.height) / 2
      });
    }
  }, [show]);
  
  // Handle mouse events for dragging
  const startDrag = (e: React.MouseEvent) => {
    if (dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);
  
  const handleConfirm = () => {
    if (basketName.trim()) {
      onConfirm(basketName);
      setBasketName("");
    }
  };
  
  if (!show) return null;
  
  return (
    <div 
      ref={dialogRef}
      className="fixed z-50 bg-white rounded-lg shadow-xl w-[400px]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'auto'
      }}
    >
      {/* Header with grab handle */}
      <div 
        className="flex items-center justify-between p-4 border-b cursor-grab bg-[#F4F4F9] rounded-t-lg"
        onMouseDown={startDrag}
      >
        <div className="flex items-center">
          <h2 className="text-lg font-medium">Create New Basket</h2>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={28} />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="mb-6">
          <label htmlFor="basket-name" className="text-base mb-2 block">
            Enter Basket Name
          </label>
          <Input
            id="basket-name"
            value={basketName}
            onChange={(e) => setBasketName(e.target.value)}
            className="h-12 text-base"
            placeholder=""
          />
        </div>

        <Button
          onClick={handleConfirm}
          className="w-full h-12 bg-[#00C852] hover:bg-[#00B84D] text-white text-base"
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default function Page() {
  const [showDialog, setShowDialog] = useState(false);
  const [showBasketNameInput, setShowBasketNameInput] = useState(false);
  const [selectedBasket, setSelectedBasket] = useState<BasketItem | null>(null);

  // Sample data for the baskets with proper typing
  const baskets: BasketItem[] = [
    { id: "234566", name: "Stocks", date: "24 Jan 2025", items: "467.80" },
    { id: "244566", name: "Mutual Funds", date: "24 Jan 2025", items: "467.80" },
    { id: "454567", name: "Stock 2", date: "24 Jan 2025", items: "467.80" },
  ];

  const handleBasketClick = (basket: BasketItem) => {
    setSelectedBasket(basket);
    setShowDialog(true);
  };
  
  const handleBasketNameConfirm = (name: string) => {
    // Generate a random ID for the new basket
    const newId = Math.floor(Math.random() * 1000000).toString();
    const currentDate = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    
    setSelectedBasket({ 
      id: newId, 
      name, 
      date: currentDate, 
      items: "0.00" 
    });
    
    setShowBasketNameInput(false);
    setShowDialog(true);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-white">
        <div className="py-4 flex justify-between items-center">
          <button 
            className="flex items-center bg-[#F4F4F9] text-xs text-[#1A1A1A] px-3 py-[10px] rounded"
            onClick={() => {
              setShowBasketNameInput(true);
            }}
          >
        <Plus size={18} className="mr-2" /> Basket Order
          </button>
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
                    <span className="mr-2 text-[#1A1A1A] text-sm font-[400]">Date</span>
                    <ArrowUpDown size={16}/>
                  </div>
                </th>
                <th className="px-4 py-4 whitespace-nowrap border-r border-[#D1D5DB]">
                  <div className="flex justify-between items-center">
                    <span className="mr-2 text-[#1A1A1A] text-sm font-[400]">Basket ID</span>
                    <ArrowUpDown size={16}/>
                  </div>
                </th>
                <th className="px-4 py-4 whitespace-nowrap border-r border-[#D1D5DB]">
                  <div className="flex justify-between items-center">
                    <span className="mr-2 text-[#1A1A1A] text-sm font-[400]">Basket Name</span>
                    <ArrowUpDown size={16}/>
                  </div>
                </th>
                <th className="px-4 py-4 whitespace-nowrap">
                  <div className="flex justify-between items-center">
                    <span className="mr-2 text-[#1A1A1A] text-sm font-[400]">Items</span>
                    <ArrowUpDown size={16}/>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {baskets.map((basket, index) => (
                <tr
                  key={basket.id}
                  className={`border-t border-[#D1D5DB] hover:bg-gray-50 cursor-pointer ${
                    index === baskets.length - 1 ? "rounded-b-md overflow-hidden" : ""
                  }`}
                  onClick={() => handleBasketClick(basket)}
                >
                  <td className="px-4 py-3 text-sm text-[#515C7A] border-r border-[#D1D5DB]">
                    <div className="flex items-center">
                      <span>{basket.date}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#515C7A] border-r border-[#D1D5DB]">
                    <div className="flex items-center justify-between">
                      <span>{basket.id}</span>
                      <button className="text-[#515C7A] hover:text-gray-600">
                        <MoreVertical size={16}/>
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#515C7A] border-r border-[#D1D5DB]">
                    <div className="flex items-center justify-between">
                      <span>{basket.name}</span>
                      <button className="text-[#515C7A] hover:text-gray-600">
                        <MoreVertical size={16}/>
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#515C7A] text-right">
                    <div className="flex justify-end items-center">
                      <span>₹{basket.items}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Basket Name Input Dialog (Draggable) */}
      <BasketNameInput 
        show={showBasketNameInput}
        onClose={() => setShowBasketNameInput(false)}
        onConfirm={handleBasketNameConfirm}
      />

      {/* Basket Dialog (Draggable - updated in BasketDialogPopup component) */}
      {showDialog && selectedBasket && (
        <BasketDialogPopup 
          open={showDialog} 
          setOpen={setShowDialog} 
          basketName={selectedBasket.name} 
        />
      )}
    </div>
  );
}