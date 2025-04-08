import ClosedFuture from "@/components/FuturesPage/option/ClosedFuture";
import Selector from "@/components/trade/Selector";
import TradeSelector from "@/components/trade/TradeSelector";
import ActiveOption from "@/components/trade/options/ActiveOption";
import React from "react";

function futures() {
  return (
    <>
      <Selector />
      <TradeSelector
        activeComponent={<ActiveOption />}
        closedComponent={<ClosedFuture  />}
      />
    </>
  );
}

export default futures;
