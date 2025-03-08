'use client'

import Selector from '@/components/gen-components/Selector'
import TradeSelector from '@/components/gen-components/TradeSelector'
import ActiveStocks from '@/components/StocksPage/ActiveStocks'
import ClosedStocks from '@/components/StocksPage/ClosedStocks'
import React from 'react'

function stocks() {
  return (
    <>
    <div>trade/stocks page</div>
    <h1>heheheh</h1>
    <Selector />
    <TradeSelector
      activeComponent={<ActiveStocks />} 
      closedComponent={<ClosedStocks />} 
    />
    </>
  )
}

export default stocks