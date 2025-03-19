import Selector from '@/components/gen-components/Selector'
import TradeSelector from '@/components/gen-components/TradeSelector'
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