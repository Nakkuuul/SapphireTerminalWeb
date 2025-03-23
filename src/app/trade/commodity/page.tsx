import Selector from '@/components/trade/Selector'
import TradeSelector from '@/components/trade/TradeSelector'
import ActiveOption from '@/components/trade/option/ActiveOption'
import ClosedOption from '@/components/trade/option/ClosedOption'
import React from 'react'

function option() {
  return (
    <>
    <Selector />
    <TradeSelector
      activeComponent={<ActiveOption />} 
      closedComponent={<ClosedOption />} 
    />
    </>
  )
}

export default option