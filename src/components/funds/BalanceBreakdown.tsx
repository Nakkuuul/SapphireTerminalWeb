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
    cncAmount: number;
    commodityAdditionalMargin: number;
    cashIntradayMTFMargin: number;
    coroMargin: number;
  };
  premiums: {
    fnoOptionPremium: number;
    currencyPremium: number;
    commodityPremium: number;
    totalPremium: number;
  };
  withdrawable: number;
  totalBalance: number;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN').format(value);
};

const BalanceBreakdown: React.FC<BalanceBreakdownProps> = ({ 
  balanceData, 
  profitLossData, 
  margins, 
  premiums, 
  withdrawable,
  totalBalance
}) => {
  return (
    <div className="border border-gray-200 rounded-md p-4">
      <div className="flex items-center mb-4">
        <h2 className="text-base font-medium text-[#1DB954]">Total Balance <Info size={16} className="inline ml-1 text-gray-400" /></h2>
        <div className="ml-auto text-base font-medium text-[#1DB954]">₹{formatCurrency(totalBalance)}</div>
      </div>
      
      <div className="mb-4">
        <table className="w-full text-sm">
          <tbody>
            <tr className="bg-[#F4F4F9]">
              <td className="py-2 pl-2 text-[#6B7280] text-sm">Cash Balance</td>
              <td className="py-2 pr-2  text-[#6B7280] text-right text-sm">₹{formatCurrency(balanceData.cashBalance)}</td>
            </tr>
            <tr>
              <td className="py-2 pl-2 text-[#6B7280] text-sm">Collateral Balance</td>
              <td className="py-2 pr-2  text-[#6B7280] text-right text-sm">₹{formatCurrency(balanceData.collateralBalance)}</td>
            </tr>
            <tr className="bg-[#F4F4F9]">
              <td className="py-2 pl-2 text-[#6B7280] text-[14px]">Collateral (Liquid Funds)</td>
              <td className="py-2 pr-2  text-[#6B7280] text-right text-[14px]">₹{formatCurrency(balanceData.collateralLiquidFunds)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center mb-4">
        <h2 className="text-base font-medium text-[#1DB954]">Margin Utilised <Info size={16} className="inline ml-1 text-gray-400" /></h2>
        <div className="ml-auto text-base font-medium text-[#1DB954]">₹{formatCurrency(balanceData.marginUtilised)}</div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-base font-normal mb-2">P&L (Profit & Loss)</h3>
        <table className="w-full text-sm">
          <tbody>
            <tr className="bg-[#F4F4F9]">
              <td className="py-2 pl-2 text-[#6B7280] text-[14px]">Realized P&L</td>
              <td className="py-2 pr-2  text-[#6B7280] text-right text-[14px]">₹{formatCurrency(profitLossData.realizedPL)}</td>
            </tr>
            <tr>
              <td className="py-2 pl-2 text-[#6B7280] text-[14px]">Unrealized P&L</td>
              <td className="py-2 pr-2  text-[#6B7280] text-right text-[14px]">₹{formatCurrency(profitLossData.unrealizedPL)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mb-4">
        <h3 className="text-base font-normal mb-2">Margin</h3>
        <table className="w-full text-sm">
          <tbody>
            <tr className="bg-[#F4F4F9]">
              <td className="py-2 pl-2 text-[#6B7280] text-[14px]">Span Margin</td>
              <td className="py-2 pr-2  text-[#6B7280] text-right text-[14px]">₹{formatCurrency(margins.spanMargin)}</td>
            </tr>
            <tr>
              <td className="py-2 pl-2 text-[#6B7280] text-[14px]">Exposure Margin</td>
              <td className="py-2 pr-2  text-[#6B7280] text-right text-[14px]">₹{formatCurrency(margins.exposureMargin)}</td>
            </tr>
            <tr className="bg-[#F4F4F9]">
              <td className="py-2 pl-2 text-[#6B7280] text-[14px]">CNC Amount</td>
              <td className="py-2 pr-2  text-[#6B7280] text-right text-[14px]">₹{formatCurrency(margins.cncAmount)}</td>
            </tr>
            <tr>
              <td className="py-2 pl-2 text-[#6B7280] text-[14px]">Commodity Additional Margin</td>
              <td className="py-2 pr-2  text-[#6B7280] text-right text-[14px]">₹{formatCurrency(margins.commodityAdditionalMargin)}</td>
            </tr>
            <tr className="bg-[#F4F4F9]">
              <td className="py-2 pl-2 text-[#6B7280] text-[14px]">Cash Intraday / MTF Margin</td>
              <td className="py-2 pr-2  text-[#6B7280] text-right text-[14px]">₹{formatCurrency(margins.cashIntradayMTFMargin)}</td>
            </tr>
            <tr>
              <td className="py-2 pl-2 text-[#6B7280] text-[14px]">CORO Margin</td>
              <td className="py-2 pr-2  text-[#6B7280] text-right text-[14px]">₹{formatCurrency(margins.coroMargin)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mb-4">
        <h3 className="text-base font-normal mb-2">Premiums</h3>
        <table className="w-full text-sm">
          <tbody>
            <tr className="bg-[#F4F4F9]">
              <td className="py-2 pl-2 text-[#6B7280] text-[14px]">FNO Premium</td>
              <td className="py-2 pr-2  text-[#6B7280] text-right text-[14px]">₹{formatCurrency(premiums.fnoOptionPremium)}</td>
            </tr>
            <tr>
              <td className="py-2 pl-2 text-[#6B7280] text-[14px]">Currency Premium</td>
              <td className="py-2 pr-2  text-[#6B7280] text-right text-[14px]">₹{formatCurrency(premiums.currencyPremium)}</td>
            </tr>
            <tr className="bg-[#F4F4F9]">
              <td className="py-2 pl-2 text-[#6B7280] text-[14px]">Commodity Premium</td>
              <td className="py-2 pr-2  text-[#6B7280] text-right text-[14px]">₹{formatCurrency(premiums.commodityPremium)}</td>
            </tr>
            <tr>
              <td className="py-2 pl-2 text-[#6B7280] text-[14px]">Total Premium</td>
              <td className="py-2 pr-2  text-[#6B7280] text-right text-[14px]">₹{formatCurrency(premiums.totalPremium)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center">
        <h2 className="text-base font-medium text-[#1DB954]">Withdrawable Balance <Info size={16} className="inline ml-1 text-gray-400" /></h2>
        <div className="ml-auto text-base font-medium text-[#1DB954]">₹{formatCurrency(withdrawable)}</div>
      </div>
    </div>
  );
};

export default BalanceBreakdown;