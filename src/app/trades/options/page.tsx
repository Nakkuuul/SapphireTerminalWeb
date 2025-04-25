import TradeSelector from "@/components/trade/TradeSelector";
import ActiveOption from "@/components/trade/options/ActiveOptions";
import ClosedOption from "@/components/trade/options/ClosedOptions";
import React from "react";

function option() {
  return (
    <>
      <TradeSelector
        activeComponent={<ActiveOption />}
        closedComponent={<ClosedOption />}
      />
    </>
  );
}

export default option;
