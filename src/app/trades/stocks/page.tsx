'use client'

import Selector from '@/components/trade/Selector'
import TradeSelector from '@/components/trade/TradeSelector'
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