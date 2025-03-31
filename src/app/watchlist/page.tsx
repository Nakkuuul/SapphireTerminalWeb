// TradingViewChart.tsx
'use client'
import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    TradingView: any;
  }
}

const TradingViewChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Ensure the widget is loaded
    if (!window.TradingView || !window.TradingView.widget) {
      console.error("TradingView widget not loaded");
      return;
    }

    // Initialize the widget
    new window.TradingView.widget({
      symbol: "BINANCE:BTCUSDT", // default symbol
      interval: "60",
      container_id: "tradingview_chart",
      library_path: "/charting_library/",
      locale: "en",
      autosize: true,
      theme: "light",
      style: "1",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      studies: ["MACD@tv-basicstudies"],
    });
  }, []);

  return (
    <div
      id="tradingview_chart"
      ref={chartContainerRef}
      style={{ width: "100%", height: "600px" }}
    ></div>
  );
};

export default TradingViewChart;
