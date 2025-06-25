import ClosedFutures from "@/components/trade/futures/ClosedFutures";
import ActiveFutures from "@/components/trade/futures/ActiveFutures";
import TradeSelector from "@/components/trade/TradeSelector";

function futures() {
  return (
    <>
      <TradeSelector
        activeComponent={<ActiveFutures />}
        closedComponent={<ClosedFutures />}
      />
    </>
  );
}

export default futures;
