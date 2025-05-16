"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { X, ArrowRight, Plus, Move } from "lucide-react";

export function DraggableGttOrderFlow() {
  const [basketName, setBasketName] = useState("");
  const [isSell, setIsSell] = useState(false);
  const [showBasketDialog, setShowBasketDialog] = useState(false);
  const [showGttDialog, setShowGttDialog] = useState(false);
  
  // For dragging
  const basketDialogRef = useRef<HTMLDivElement>(null);
  const gttDialogRef = useRef<HTMLDivElement>(null);
  
  const [basketPosition, setBasketPosition] = useState({ x: 0, y: 0 });
  const [gttPosition, setGttPosition] = useState({ x: 0, y: 0 });
  const [isDraggingBasket, setIsDraggingBasket] = useState(false);
  const [isDraggingGtt, setIsDraggingGtt] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
// Center the dialogs when first opened
useEffect(() => {
    if (showBasketDialog && basketDialogRef.current) {
      const rect = basketDialogRef.current.getBoundingClientRect();
      setBasketPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: (window.innerHeight - rect.height) / 2
      });
    }
  }, [showBasketDialog]);
  
  useEffect(() => {
    if (showGttDialog && gttDialogRef.current) {
      const rect = gttDialogRef.current.getBoundingClientRect();
      setGttPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: (window.innerHeight - rect.height) / 2
      });
    }
  }, [showGttDialog]);
  
  // Handle mouse events for dragging
  const startDragBasket = (e: React.MouseEvent) => {
    if (basketDialogRef.current) {
      const rect = basketDialogRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDraggingBasket(true);
    }
  };
  
  const startDragGtt = (e: React.MouseEvent) => {
    if (gttDialogRef.current) {
      const rect = gttDialogRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDraggingGtt(true);
    }
  };
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingBasket) {
        setBasketPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      } else if (isDraggingGtt) {
        setGttPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };
    
    const handleMouseUp = () => {
      setIsDraggingBasket(false);
      setIsDraggingGtt(false);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingBasket, isDraggingGtt, dragOffset]);
  const handleBasketCreation = () => {
    if (basketName.trim() !== "") {
      setShowBasketDialog(false);
      setShowGttDialog(true);
    }
  };

  const handleGttCancel = () => {
    setShowGttDialog(false);
    setBasketName("");
  };

  const handleBasketCancel = () => {
    setShowBasketDialog(false);
    setBasketName("");
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        className="flex items-center bg-[#F4F4F9] text-xs text-[#1A1A1A] px-3 py-[10px] rounded"
        onClick={() => setShowBasketDialog(true)}
      >
        <Plus size={18} className="mr-2" /> New GTT Order
      </button>

      {/* Create New Basket Dialog (Draggable) */}
      {showBasketDialog && (
        <div 
          ref={basketDialogRef}
          className="fixed z-50 bg-white rounded-lg shadow-xl w-[400px]"
          style={{
            left: `${basketPosition.x}px`,
            top: `${basketPosition.y}px`,
            cursor: isDraggingBasket ? 'grabbing' : 'auto'
          }}
        >
          {/* Header with grab handle */}
          <div 
            className="flex items-center justify-between p-4 border-b cursor-grab bg-gray-50 rounded-t-lg"
            onMouseDown={startDragBasket}
          >
            <div className="flex items-center">
              <h2 className="text-lg font-medium">Create New Basket</h2>
            </div>
            <button 
              onClick={handleBasketCancel} 
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="mb-6">
              <Label htmlFor="basket-name" className="text-base mb-2 block">
                Enter Basket Name
              </Label>
              <Input
                id="basket-name"
                value={basketName}
                onChange={(e) => setBasketName(e.target.value)}
                className="h-12 text-base"
                placeholder=""
              />
            </div>

            <Button
              onClick={handleBasketCreation}
              className="w-full h-12 bg-[#00C852] hover:bg-[#00B84D] text-white text-base"
            >
              Create
            </Button>
          </div>
        </div>
      )}

      {/* GTT Order Dialog (Draggable) */}
      {showGttDialog && (
        <div 
          ref={gttDialogRef}
          className="fixed z-50 bg-white rounded-lg shadow-xl w-[600px]"
          style={{
            left: `${gttPosition.x}px`,
            top: `${gttPosition.y}px`,
            cursor: isDraggingGtt ? 'grabbing' : 'auto'
          }}
        >
          {/* Header with drag handle */}
          <div 
            className="flex bg-[#F4F4F9] flex-row items-start justify-between p-3 cursor-grab rounded-t-lg"
            onMouseDown={startDragGtt}
          >
            <div className="flex-1">
              <div className="flex items-center">
                <div className="text-base font-medium flex items-center gap-1.5">
                  Reliance Industries Ltd.
                  <span className="text-[11px] font-normal text-muted-foreground bg-[#B8D8D9]/30 px-1 rounded">
                    NSE
                  </span>
                </div>
              </div>
              <p className="mt-0.5 text-sm ml-6">
                1,687.45
                <span className="text-red-500 text-xs"> -19.10 (-2.70%)</span>
              </p>
            </div>

            {/* BUY/SELL Toggle */}
            <div className="flex mr-8 items-center gap-1">
              <Button
                variant={isSell ? "ghost" : "default"}
                onClick={() => setIsSell(false)}
                className={`h-7 px-3 rounded-md ${
                  !isSell
                    ? "bg-[#00C853] hover:bg-[#00B84D] text-white"
                    : "text-[#00C853]/60 hover:text-[#00B84D] bg-[#00B84D]/20 hover:bg-[#00B84D]/30"
                }`}
              >
                BUY
              </Button>
              <Switch
                checked={isSell}
                onCheckedChange={setIsSell}
                className="data-[state=checked]:bg-[#FF3B30] mx-1 data-[state=unchecked]:bg-[#00C853]"
              />
              <Button
                onClick={() => setIsSell(true)}
                className={`h-7 px-3 rounded-md ${
                  isSell
                    ? "bg-[#FF3B30] hover:bg-[#E63529] text-white"
                    : "text-[#FF3B30]/40 hover:text-[#E63529] bg-[#FF3B30]/10 hover:bg-[#FF3B30]/30"
                }`}
              >
                SELL
              </Button>
            </div>
            
            <button 
              onClick={handleGttCancel} 
              className="text-gray-400 hover:text-gray-600 ml-2"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-3 pt-2 pb-3">
            {/* Trigger Type */}
            <div className="flex items-center gap-3 mb-[18px]">
              <Label className="text-sm text-gray-600">Trigger Type :</Label>
              <RadioGroup
                defaultValue="single"
                className="flex items-center gap-4"
              >
                <div className="flex items-center gap-1.5">
                  <RadioGroupItem
                    value="single"
                    id="single"
                    className="h-4 w-4"
                  />
                  <Label htmlFor="single" className="text-sm font-normal">
                    Single
                  </Label>
                </div>
                <div className="flex items-center gap-1.5">
                  <RadioGroupItem value="ocd" id="ocd" className="h-4 w-4" />
                  <Label htmlFor="ocd" className="text-sm font-normal">
                    OCD
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Basket Info Display */}
            <div className="mb-4 text-sm border border-gray-100 bg-gray-50 p-2 rounded-md">
              <span className="font-medium">Basket:</span> {basketName}
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-[1.2fr,auto,1fr,1.2fr] items-end gap-3">
              {/* Trigger Price */}
              <div>
                <Label htmlFor="trigger-price" className="text-sm mb-1.5 block">
                  Trigger Price
                </Label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <Input
                    id="trigger-price"
                    type="number"
                    defaultValue="0"
                    className="pl-5 h-9 border-gray-200"
                  />
                </div>
              </div>

              {/* Places Order Arrow */}
              <div className="flex items-center text-xs text-gray-500 mb-[9px] whitespace-nowrap">
                Places Order
                <ArrowRight className="h-3 w-3 ml-0.5 stroke-[1.5]" />
              </div>

              {/* Quantity */}
              <div>
                <Label htmlFor="quantity" className="text-sm mb-1.5 block">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  defaultValue="0"
                  className="h-9 border-gray-200"
                />
              </div>

              {/* Price */}
              <div>
                <Label htmlFor="price" className="text-sm mb-1.5 block">
                  Price
                </Label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <Input
                    id="price"
                    type="number"
                    defaultValue="0"
                    className="pl-5 h-9 border-gray-200"
                  />
                  <div className="absolute -bottom-8 right-0 flex items-center gap-1">
                    <input
                      type="text"
                      value="5"
                      className="w-8 h-6 text-center text-xs border border-gray-200 rounded"
                    />
                    <span className="text-xs text-gray-500">% of LTP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 border-t p-3 mt-4">
            <Button
              variant="secondary"
              onClick={handleGttCancel}
              className="h-8 px-6 hover:bg-gray-100 border-none text-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-8 px-6 bg-[#00C852] hover:bg-[#00B84D] text-white"
            >
              Place
            </Button>
          </div>
        </div>
      )}
    </>
  );
}