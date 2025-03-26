// components/BalanceChart.tsx
import React from 'react';

interface BalanceChartProps {
  data: {
    totalBalance: number;
    marginUtilized: number;
    marginUtilizedPercentage?: number;
  };
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value);
};

const BalanceChart: React.FC<BalanceChartProps> = ({ data }) => {
  // Calculate the rotation for the gauge based on margin utilization percentage
  // Default to -60 degrees if the percentage is not provided or is 0
  const rotationDegree = data.marginUtilizedPercentage 
    ? -60 + (data.marginUtilizedPercentage * 180 / 100)
    : -60;

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Total Balance Breakup</h2>
      
      <div className="relative bg-gray-50 rounded-md p-6 flex flex-col items-center">
        <div className="w-48 h-24 overflow-hidden relative">
          <div className="w-48 h-48 bg-gray-200 rounded-full absolute -bottom-24"></div>
          <div 
            className="w-48 h-48 border-[16px] border-transparent border-t-[#1DB954] rounded-full absolute -bottom-24"
            style={{ transform: `rotate(${rotationDegree}deg)` }}
          ></div>
        </div>
        
        <div className="mt-4 text-center">
          <div className="text-sm text-[#6B7280]">Margin Utilized</div>
          <div className="text-xl font-semibold">₹{formatCurrency(data.marginUtilized)}</div>
        </div>
        
        <div className="mt-4 w-full">
          <div className="flex justify-between text-sm">
            <div>• Total Balance</div>
            <div className="font-medium">₹{formatCurrency(data.totalBalance)}</div>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <div>• Margin Utilized</div>
            <div className="font-medium">₹{formatCurrency(data.marginUtilized)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceChart;