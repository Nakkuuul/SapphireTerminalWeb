"use client";

import React from 'react';
import { showOrderToast } from '@/components/toasts/OrderToast';
import { Toaster } from 'sonner';

function OrderToastTestPage() {
  
  // Simulate different API responses
  const handleApiResponse = (type: string) => {
    const apiResponses = {
      placed: {
        orderStatus: "placed",
        scripName: "HDFCBANK",
        message: "BUY HDFCBANK is placed successfully",
        orderNumber: "16637388882827737"
      },
      modified: {
        orderStatus: "modified",
        scripName: "RELIANCE", 
        message: "SELL RELIANCE quantity updated to 100 shares and price modified to ₹2,500",
        orderNumber: "16637388882827738"
      },
      cancelled: {
        orderStatus: "cancelled",
        scripName: "TATASTEEL",
        message: "BUY TATASTEEL order cancelled by user",
        orderNumber: "16637388882827739"
      }
    };
    
    showOrderToast(apiResponses[type as keyof typeof apiResponses]);
  };

  return (
    <div className="p-8">
      <Toaster 
        position="top-right"
        richColors
        style={{ zIndex: 9999 }}
      />

      <h1 className="text-2xl font-bold mb-8">OrderToast - Fixed Width with Dynamic Height</h1>
      
      <div className="space-y-4">
        <h2 className="text-lg font-semibold mb-4">Test Different Message Lengths:</h2>
        
        <button
          onClick={() => handleApiResponse('placed')}
          className="w-full px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
        >
          🔊 Order Placed (Short Message)
        </button>

        <button
          onClick={() => handleApiResponse('modified')}
          className="w-full px-6 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
        >
          🔊 Order Modified (Long Message)
        </button>

        <button
          onClick={() => handleApiResponse('cancelled')}
          className="w-full px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
        >
          🔊 Order Cancelled (Medium Message)
        </button>

        <div className="mt-8 p-4 bg-gray-50 border border-gray-300 rounded-lg">
          <h3 className="font-semibold text-black mb-2">Toast Properties:</h3>
          
          <ul className="text-sm text-gray-700 space-y-2 mb-4">
            <li>✅ <strong>Fixed Width:</strong> 320px (w-80) for all toasts</li>
            <li>✅ <strong>Dynamic Height:</strong> Adjusts based on message length</li>
            <li>✅ <strong>Text Wrapping:</strong> Long messages wrap properly</li>
            <li>✅ <strong>Consistent Layout:</strong> Same spacing and alignment</li>
            <li>✅ <strong>Sound Notification:</strong> Plays with each toast</li>
            <li>✅ <strong>Slide Animation:</strong> From right side</li>
          </ul>

          <div className="mb-4">
            <h4 className="font-medium mb-2">Usage:</h4>
            <code className="text-xs bg-white p-3 rounded border block">
{`showOrderToast({
  orderStatus: "placed",
  scripName: "HDFCBANK",
  message: "Your message here - can be short or very long",
  orderNumber: "123456789"
});`}
            </code>
          </div>

          <div>
            <h4 className="font-medium mb-2">Features:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>Check icon</strong> - Order Placed/Success/Executed</li>
              <li>• <strong>Settings icon</strong> - Order Modified/Updated</li>
              <li>• <strong>Trash icon</strong> - Order Cancelled/Rejected</li>
              <li>• <strong>2-second timer</strong> with visual progress bar</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderToastTestPage;