import React from 'react';

interface PerformanceData {
  todaysLow: number;
  todaysHigh: number;
  todaysCurrentPosition?: number; // Current position for today's range
  weekLow52: number;
  weekHigh52: number;
  weekCurrentPosition52?: number; // Current position for 52-week range
  open: number;
  high: number;
  low: number;
  prevClosed: number;
  volume: number;
  upperCircuit: number;
  lowerCircuit: number;
  marketCap: string;
}

interface PerformanceProps {
  data?: PerformanceData;
}

const Performance: React.FC<PerformanceProps> = ({
  data = {
    todaysLow: 1467.0,
    todaysHigh: 1467.0,
    todaysCurrentPosition: 0.1, // 10% from left
    weekLow52: 1467.0,
    weekHigh52: 1467.0,
    weekCurrentPosition52: 0.5, // 50% from left
    open: 1467.0,
    high: 1597.0,
    low: 1397.0,
    prevClosed: 1467.0,
    volume: 1467.0,
    upperCircuit: 1467.0,
    lowerCircuit: 1467.0,
    marketCap: '17,61,535 Cr',
  },
}) => {
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const RangeIndicator: React.FC<{
    low: number;
    high: number;
    position?: number;
    label: string;
  }> = ({ low, high, position = 0.5, label }) => (
    <div className="mb-2.5 mt-2.5">
      <div className="flex justify-between text-gray-500 text-[12px] mb-1">
        <span>{label === 'today' ? "Today's Low" : '52 Week Low'}</span>
        <span>{label === 'today' ? "Today's High" : '52 Week High'}</span>
      </div>
      <div className="flex justify-between text-gray-900 font-medium text-[12px] mb-1">
        <span>{formatNumber(low)}</span>
        <span>{formatNumber(high)}</span>
      </div>
      <div className="relative h-4">
        <div className="w-full h-[3px] bg-green-500 rounded-full" />
        <div
          className="absolute top-1 transform -translate-x-1/2"
          style={{ left: `${position * 100}%` }}
        >
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg pt-4 pb-4 font-sans">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-[14px] font-medium text-gray-900">Performance</h2>
        <div className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center">
          <span className="text-xs text-gray-600">i</span>
        </div>
      </div>

      {/* Range Indicators */}
      <RangeIndicator
        low={data.todaysLow}
        high={data.todaysHigh}
        position={data.todaysCurrentPosition}
        label="today"
      />

      <RangeIndicator
        low={data.weekLow52}
        high={data.weekHigh52}
        position={data.weekCurrentPosition52}
        label="52week"
      />

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-4 gap-1">
        {/* Row 1 */}
        <div>
          <div className="text-gray-500 text-[12px] mb-1">Open</div>
          <div className="text-gray-900 font-medium text-[12px]">{formatNumber(data.open)}</div>
        </div>
        <div>
          <div className="text-gray-500 text-[12px] mb-1">High</div>
          <div className="text-gray-900 font-medium text-[12px]">{formatNumber(data.high)}</div>
        </div>
        <div>
          <div className="text-gray-500 text-[12px] mb-1">Low</div>
          <div className="text-gray-900 font-medium text-[12px]">{formatNumber(data.low)}</div>
        </div>
        <div>
          <div className="text-gray-500 text-[12px] mb-1">Prev. Closed</div>
          <div className="text-gray-900 font-medium text-[12px]">{formatNumber(data.prevClosed)}</div>
        </div>

        {/* Row 2 */}
        <div className='mt-1'>
          <div className="text-gray-500 text-[12px] mb-1">Volume</div>
          <div className="text-gray-900 font-medium text-[12px]">{formatNumber(data.volume)}</div>
        </div>
        <div className='mt-1'>
          <div className="text-gray-500 text-[12px] mb-1">Upper Circuit</div>
          <div className="text-gray-900 font-medium text-[12px]">{formatNumber(data.upperCircuit)}</div>
        </div>
        <div className='mt-1'>
          <div className="text-gray-500 text-[12px] mb-1">Lower Circuit</div>
          <div className="text-gray-900 font-medium text-[12px]">{formatNumber(data.lowerCircuit)}</div>
        </div>
        <div className='mt-1'>
          <div className="text-gray-500 text-[12px] mb-1">Market Cap</div>
          <div className="text-gray-900 font-medium text-[12px]">{data.marketCap}</div>
        </div>
      </div>
    </div>
  );
};

export default Performance;