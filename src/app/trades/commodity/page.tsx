import TradeSelector from "@/components/trade/TradeSelector";
import ActiveCommodity from "@/components/trade/commodity/ActiveCommodity";
import ClosedCommodityList from "@/components/trade/commodity/ClosedCommodity";
import React from "react";

function commodity() {
  return (
    <>
      <TradeSelector
        activeComponent={<ActiveCommodity />}
        closedComponent={<ClosedCommodityList />}
      />
    </>
  );
}

export default commodity;
