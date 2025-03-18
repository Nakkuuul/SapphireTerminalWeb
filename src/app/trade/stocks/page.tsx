'use client'

import Selector from '@/components/gen-components/Selector'
import TradeSelector from '@/components/gen-components/TradeSelector'
import ActiveStocks from '@/components/trade/stocks/ActiveStocks'
import ClosedStocks from '@/components/trade/stocks/ClosedStocks'
import React from 'react'

function stocks() {
  return (
    <>
    {/* <div>trade/stocks page</div> */}
    <Selector />
    <TradeSelector
      activeComponent={<ActiveStocks />} 
      closedComponent={<ClosedStocks />} 
    />
    </>
  )
}

export default stocks