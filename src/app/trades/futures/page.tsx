import ClosedFutures from "@/components/trade/futures/ClosedFutures";
import ActiveFutures from "@/components/trade/futures/ActiveFutures";
import Selector from "@/components/trade/Selector";
import TradeSelector from "@/components/trade/TradeSelector";

function futures() {
  return (
    <>
      <Selector />
      <TradeSelector
        activeComponent={<ActiveFutures />}
        closedComponent={<ClosedFutures  />}
      />
    </>
  );
}

export default futures;
