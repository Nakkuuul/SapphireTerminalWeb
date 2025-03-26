// components/BalanceBreakdown.tsx
import React from 'react';
import { Info } from 'lucide-react';

interface BalanceBreakdownProps {
  balanceData: {
    cashBalance: number;
    collateralBalance: number;
    collateralLiquidFunds: number;
    marginUtilised: number;
  };
  profitLossData: {
    realizedPL: number;
    unrealizedPL: number;
  };
  margins: {
    spanMargin: number;
    exposureMargin: number;
    spanAddOn: number;
    commodityAdditionalMargin: number;
    cashIntradayMISMargin: number;
    coroMargin: number;
  };
  premiums: {
    optionPremium: number;
    currencyPremium: number;
    commodityPremium: number;
    totalPremium: number;
  };
  withdrawable: number;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value);
};

const BalanceBreakdown: React.FC<BalanceBreakdownProps> = ({ 
  balanceData, 
  profitLossData, 
  margins, 
  premiums, 
  withdrawable 
}) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-medium">Total Balance</h2>
        <Info size={16} className="ml-2 text-gray-400" />
      </div>
      
      <div className="bg-gray-50 rounded-md p-4 mb-4">
        <table className="w-full">
          <tbody className="text-sm">
            <tr>
              <td className="py-2 text-[#6B7280]">Cash Balance</td>
              <td className="py-2 text-right">₹{formatCurrency(balanceData.cashBalance)}</td>
            </tr>
            <tr>
              <td className="py-2 text-[#6B7280]">Collateral Balance</td>
              <td className="py-2 text-right">₹{formatCurrency(balanceData.collateralBalance)}</td>
            </tr>
            <tr>
              <td className="py-2 text-[#6B7280]">Collateral (Liquid Funds)</td>
              <td className="py-2 text-right">₹{formatCurrency(balanceData.collateralLiquidFunds)}</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="py-2 font-medium text-[#1DB954]">Margin Utilised</td>
              <td className="py-2 text-right font-medium text-[#1DB954]">₹{formatCurrency(balanceData.marginUtilised)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mb-4">
        <h3 className="text-md font-medium mb-2">P&L (Profit & Loss)</h3>
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td className="py-1 text-[#6B7280]">Realized P&L</td>
              <td className="py-1 text-right">₹{formatCurrency(profitLossData.realizedPL)}</td>
            </tr>
            <tr>
              <td className="py-1 text-[#6B7280]">Unrealized P&L</td>
              <td className="py-1 text-right">₹{formatCurrency(profitLossData.unrealizedPL)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mb-4">
        <h3 className="text-md font-medium mb-2">Margin</h3>
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td className="py-1 text-[#6B7280]">Span Margin</td>
              <td className="py-1 text-right">₹{formatCurrency(margins.spanMargin)}</td>
            </tr>
            <tr>
              <td className="py-1 text-[#6B7280]">Exposure Margin</td>
              <td className="py-1 text-right">₹{formatCurrency(margins.exposureMargin)}</td>
            </tr>
            <tr>
              <td className="py-1 text-[#6B7280]">SPAN Add-on</td>
              <td className="py-1 text-right">₹{formatCurrency(margins.spanAddOn)}</td>
            </tr>
            <tr>
              <td className="py-1 text-[#6B7280]">Commodity Additional Margin</td>
              <td className="py-1 text-right">₹{formatCurrency(margins.commodityAdditionalMargin)}</td>
            </tr>
            <tr>
              <td className="py-1 text-[#6B7280]">Cash Intraday / MIS Margin</td>
              <td className="py-1 text-right">₹{formatCurrency(margins.cashIntradayMISMargin)}</td>
            </tr>
            <tr>
              <td className="py-1 text-[#6B7280]">CORO Margin</td>
              <td className="py-1 text-right">₹{formatCurrency(margins.coroMargin)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mb-4">
        <h3 className="text-md font-medium mb-2">Premiums</h3>
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td className="py-1 text-[#6B7280]">Option Premium</td>
              <td className="py-1 text-right">₹{formatCurrency(premiums.optionPremium)}</td>
            </tr>
            <tr>
              <td className="py-1 text-[#6B7280]">Currency Premium</td>
              <td className="py-1 text-right">₹{formatCurrency(premiums.currencyPremium)}</td>
            </tr>
            <tr>
              <td className="py-1 text-[#6B7280]">Commodity Premium</td>
              <td className="py-1 text-right">₹{formatCurrency(premiums.commodityPremium)}</td>
            </tr>
            <tr>
              <td className="py-1 text-[#6B7280]">Total Premium</td>
              <td className="py-1 text-right">₹{formatCurrency(premiums.totalPremium)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center">
        <h2 className="text-[#1DB954] font-medium">Withdrawable Balance</h2>
        <Info size={16} className="ml-2 text-gray-400" />
        <div className="ml-auto text-[#1DB954] font-medium">₹{formatCurrency(withdrawable)}</div>
      </div>
    </div>
  );
};

export default BalanceBreakdown;