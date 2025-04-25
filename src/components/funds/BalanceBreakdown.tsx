// components/BalanceBreakdown.tsx
import React from "react";
import { Info } from "lucide-react";

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
  return new Intl.NumberFormat("en-IN").format(value);
};

const BalanceBreakdown: React.FC<BalanceBreakdownProps> = ({
  balanceData,
  profitLossData,
  margins,
  premiums,
  withdrawable,
  totalBalance,
}) => {
  // Convert data to arrays for easier rendering
  const balanceItems = [
    { label: "Cash Balance", value: balanceData.cashBalance },
    { label: "Collateral Balance", value: balanceData.collateralBalance },
    {
      label: "Collateral (Liquid Funds)",
      value: balanceData.collateralLiquidFunds,
    },
  ];

  const profitLossItems = [
    { label: "Realized P&L", value: profitLossData.realizedPL },
    { label: "Unrealized P&L", value: profitLossData.unrealizedPL },
  ];

  const marginItems = [
    { label: "Span Margin", value: margins.spanMargin },
    { label: "Exposure Margin", value: margins.exposureMargin },
    { label: "CNC Amount", value: margins.cncAmount },
    {
      label: "Commodity Additional Margin",
      value: margins.commodityAdditionalMargin,
    },
    {
      label: "Cash Intraday / MTF Margin",
      value: margins.cashIntradayMTFMargin,
    },
    { label: "CORO Margin", value: margins.coroMargin },
  ];

  const premiumItems = [
    { label: "FNO Premium", value: premiums.fnoOptionPremium },
    { label: "Currency Premium", value: premiums.currencyPremium },
    { label: "Commodity Premium", value: premiums.commodityPremium },
    { label: "Total Premium", value: premiums.totalPremium },
  ];

  // Reusable table component
  const renderTable = (items: { label: string; value: number }[]) => (
    <table className="w-full text-sm">
      <tbody>
        {items.map((item, index) => (
          <tr
            key={item.label}
            className={index % 2 === 0 ? "bg-[#F4F4F9]" : ""}
          >
            <td className="py-2 pl-2 text-[#6B7280] text-[14px]">
              {item.label}
            </td>
            <td className="py-2 pr-2 text-[#6B7280] text-right text-[14px]">
              ₹{formatCurrency(item.value)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Reusable section header with amount
  const renderSectionHeader = (
    title: string,
    amount: number,
    isFirst: boolean = false
  ) => (
    <div
      className={`flex items-center mb-4 ${!isFirst ? "border-t pt-4" : ""}`}
    >
      <h2 className="text-base font-medium text-[#1DB954]">
        {title} <Info size={16} className="inline ml-1 text-gray-400" />
      </h2>
      <div className="ml-auto text-base font-medium text-[#1DB954]">
        ₹{formatCurrency(amount)}
      </div>
    </div>
  );

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center mb-3">
        <h2 className="text-green-500 text-base font-medium flex items-center">
          Total Balance <Info size={14} className="ml-1 text-gray-400" />
        </h2>
        <div className="ml-auto text-green-500 font-medium">
          ₹{formatCurrency(totalBalance)}
        </div>
      </div>

      <div className="mb-4">
        <table className="w-full">
          <tbody>
            <tr className="bg-gray-50">
              <td className="py-2 px-3 text-gray-600">Cash Balance</td>
              <td className="py-2 px-3 text-right text-gray-600">
                ₹{formatCurrency(balanceData.cashBalance)}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 text-gray-600">Collateral Balance</td>
              <td className="py-2 px-3 text-right text-gray-600">
                ₹{formatCurrency(balanceData.collateralBalance)}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-2 px-3 text-gray-600">
                Collateral (Liquid Funds)
              </td>
              <td className="py-2 px-3 text-right text-gray-600">
                ₹{formatCurrency(balanceData.collateralLiquidFunds)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {renderSectionHeader("Margin Utilised", balanceData.marginUtilised)}

      <div className="mb-4 pt-2">
        <h3 className="text-sm font-normal mb-2">P&L (Profit & Loss)</h3>
        {renderTable(profitLossItems)}
      </div>

      <div className="mb-4 pt-2">
        <h3 className="text-sm font-normal mb-2">Margin</h3>
        {renderTable(marginItems)}
      </div>

      <div className="mb-4 pt-2">
        <h3 className="text-sm font-normal mb-2">Premiums</h3>
        {renderTable(premiumItems)}
      </div>

      {renderSectionHeader("Withdrawable Balance", withdrawable)}
    </div>
  );
};

export default BalanceBreakdown;
