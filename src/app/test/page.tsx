'use client'
import OrderPopup from '@/components/gen-components/OrderPopup';
import React, { useState } from 'react';
// In your component:

// Render popup



const page = () => {
    const [showPopup, setShowPopup] = useState(false);
const stockData = {
  name: "Reliance Industries Ltd.",
  price: 1687.45,
  change: -19.10,
  changePercent: -2.70,
  exchange: "NSE"
};

  return (
    <>
        <div>hii</div>
        <button onClick={() => setShowPopup(true)}>Show Popup</button>
        <OrderPopup 
          open={showPopup}
          setOpen={setShowPopup}
          stock={stockData}
        />
    </>
  )
}

export default page