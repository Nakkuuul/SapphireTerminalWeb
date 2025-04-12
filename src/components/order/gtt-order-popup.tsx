"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { X, ArrowRight } from "lucide-react";
import React, { useState } from "react";

export function GttOrderPopup() {
  const [isSell, setIsSell] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Place GTT Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 rounded-lg">
        <DialogHeader className="flex bg-[#F4F4F9] flex-row items-start justify-between p-3">
          <div className="flex-1">
            <DialogTitle className="text-base font-medium flex items-center gap-1.5">
              Reliance Industries Ltd.
              <span className="text-[11px] font-normal text-muted-foreground bg-[#B8D8D9]/30 px-1 rounded">
                NSE
              </span>
            </DialogTitle>
            <DialogDescription className="mt-0.5 text-sm">
              1,687.45
              <span className="text-red-500 text-xs"> -19.10 (-2.70%)</span>
            </DialogDescription>
          </div>

          {/* BUY/SELL Toggle */}
          <div className="flex mr-8 items-center gap-1">
            <Button
              variant={isSell ? "ghost" : "default"}
              onClick={() => setIsSell(false)}
              className={`h-7 px-3 rounded-md ${
                !isSell
                  ? "bg-[#00C853] hover:bg-[#00B84D] text-white"
                  : "text-[#00C853]/40 hover:text-[#00B84D] bg-[#00B84D]/10 hover:bg-[#00B84D]/30"
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
        </DialogHeader>

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
                <div className="absolute -bottom-8 right-30 flex items-center gap-1">
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

        <DialogFooter className="flex !justify-start gap-2 border-t p-3 mt-4">
          <Button
            variant="secondary"
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
