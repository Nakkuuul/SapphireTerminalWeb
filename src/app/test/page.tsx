"use client";

import React from 'react';
import { showOrderToast, showOrderToastDirect } from '@/components/toasts/OrderToast';
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
        message: "SELL RELIANCE quantity updated to 100",
        orderNumber: "16637388882827738"
      },
      cancelled: {
        orderStatus: "cancelled",
        scripName: "TATASTEEL",
        message: "BUY TATASTEEL order cancelled by user",
        orderNumber: "16637388882827739"
      },
      executed: {
        orderStatus: "executed",
        scripName: "WIPRO",
        message: "SELL WIPRO order executed successfully",
        orderNumber: "16637388882827740"
      },
      rejected: {
        orderStatus: "rejected", 
        scripName: "INFY",
        message: "BUY INFY order rejected due to insufficient funds",
        orderNumber: "16637388882827741"
      },
      custom: {
        orderStatus: "pending",
        scripName: "AAPL",
        message: "Order is pending approval",
        orderNumber: "16637388882827742"
      }
    };
    
    showOrderToast(apiResponses[type as keyof typeof apiResponses]);
  };

  return (
    <div className="p-8">
      {/* No need for custom CSS here - it's handled in OrderToast component */}
      <Toaster 
        position="top-right"
        richColors
        style={{ zIndex: 9999 }}
      />

      <h1 className="text-2xl font-bold mb-8">OrderToast - With Sound & Right Slide Animation</h1>
      
      <div className="space-y-4">
        <h2 className="text-lg font-semibold mb-4">API Response Simulation:</h2>
        
        <button
          onClick={() => handleApiResponse('placed')}
          className="w-full px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
        >
          🔊 Order Placed (Check Icon + Sound)
        </button>

        <button
          onClick={() => handleApiResponse('executed')}
          className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          🔊 Order Executed (Check Icon + Sound)
        </button>

        <button
          onClick={() => handleApiResponse('modified')}
          className="w-full px-6 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
        >
          🔊 Order Modified (Settings Icon + Sound)
        </button>

        <button
          onClick={() => handleApiResponse('cancelled')}
          className="w-full px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
        >
          🔊 Order Cancelled (Trash Icon + Sound)
        </button>

        <button
          onClick={() => handleApiResponse('rejected')}
          className="w-full px-6 py-4 bg-red-800 text-white rounded-lg hover:bg-red-900 transition-colors font-semibold"
        >
          🔊 Order Rejected (Trash Icon + Sound)
        </button>

        <button
          onClick={() => handleApiResponse('custom')}
          className="w-full px-6 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
        >
          🔊 Custom Status (Default Icon + Sound)
        </button>

        <hr className="my-6" />
        
        <h2 className="text-lg font-semibold mb-4">Direct Function Usage:</h2>

        <button
          onClick={() => showOrderToastDirect(
            "placed",
            "TSLA", 
            "BUY TESLA order placed successfully",
            "TSLA123456789"
          )}
          className="w-full px-6 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
        >
          🔊 Direct Function Call (With Sound)
        </button>

        <div className="mt-8 p-4 bg-gray-50 border border-gray-300 rounded-lg">
          <h3 className="font-semibold text-black mb-2">New Features Added:</h3>
          
          <ul className="text-sm text-gray-700 space-y-2 mb-4">
            <li>✅ <strong>Slide from Right:</strong> Toasts now slide in from the right side</li>
            <li>✅ <strong>Sound Notification:</strong> Plays a subtle notification sound</li>
            <li>✅ <strong>Self-contained Styling:</strong> All CSS is handled within OrderToast component</li>
            <li>✅ <strong>No External CSS Required:</strong> Just import and use!</li>
          </ul>

          <div className="mb-4">
            <h4 className="font-medium mb-2">Usage (unchanged):</h4>
            <code className="text-xs bg-white p-3 rounded border block">
{`import { showOrderToast } from '@/components/toasts/OrderToast';

// After API call
const response = await fetch('/api/orders');
const result = await response.json();

// Show toast with sound and animation
showOrderToast(result);`}
            </code>
          </div>

          <div>
            <h4 className="font-medium mb-2">Sound Info:</h4>
            <p className="text-sm text-gray-600">
              • Uses browser's built-in notification sound<br/>
              • Volume set to 30% to be non-intrusive<br/>
              • Gracefully handles cases where sound can't play<br/>
              • You can replace with custom sound file if needed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderToastTestPage;