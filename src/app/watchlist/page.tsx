//@ts-nocheck
"use client"
import React, { useEffect } from "react";

// Declare global TradingView type
declare global {
  interface Window {
    TradingView: any;
  }
}

function Watchlist() {
  useEffect(() => {
    // Initialize TradingView widget after component mounts
    const widget = new window.TradingView.widget({
      container: "chartContainer",
      locale: "en",
      library_path: "charting_library/",
      datafeed: new Datafeeds.UDFCompatibleDatafeed(
        "https://demo-feed-data.tradingview.com"
      ),
      symbol: "AAPL",
      interval: "1D",
       height: window.innerHeight - 60,
       width: "100%",
      debug: true,
    });
  }, []);

  return (
    <div className="px-2">
       <div className="w-full " id="chartContainer"></div>
       {/* <div className="w-screen h-screen bg-green-50"></div> */}
    </div>
  );
}

export default Watchlist;
