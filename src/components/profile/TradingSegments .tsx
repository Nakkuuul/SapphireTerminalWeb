import React from 'react';

type Segment = {
  name: string;
  active: boolean;
};

type SegmentsProps = {
  segmentsData?: Segment[];
};

const TradingSegments = ({ segmentsData = [] }: SegmentsProps) => {
  // Default data if no props provided
  const defaultSegments = [
    { name: 'NSE-EQUITY', active: false },
    { name: 'BSE-EQUITY', active: false },
    { name: 'MUTUAL FUNDS', active: false },
    { name: 'NSE-F&O', active: false },
    { name: 'BSE-F&O', active: true },
    { name: 'NSE-CURRENCY', active: false },
    { name: 'BSE-CURRENCY', active: false },
    { name: 'NSE-COMMODITY', active: false },
    { name: 'BSE-COMMODITY', active: false },
    { name: 'MCX-COMMODITY', active: true },
    { name: 'NCDEX-COMMODITY', active: false }
  ];

  // Use provided data or default
  const segments = segmentsData.length > 0 ? segmentsData : defaultSegments;

  return (
    <div className="border border-[#D1D5DB] mb-6">
      <div className="bg-[#F4F4F9] border-b-[#D1D5DB]  p-4">
        <h3 className="text-lg font-normal text-gray-900">Segments</h3>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-4 gap-3">
          {segments.map((segment, index) => (
            <div 
              key={index} 
              className={`px-3 py-2 text-center text-sm rounded border ${
                segment.active 
                  ? 'bg-green-100 border-green-200 text-green-800' 
                  : 'bg-gray-50 border-gray-200 text-[#6B7280] font-medium'
              }`}
            >
              {segment.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradingSegments;