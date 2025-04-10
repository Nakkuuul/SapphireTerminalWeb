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
    <div className="border border-[#D1D5DB] dark:border-[#2F2F2F] mb-6">
      <div className="bg-[#F4F4F9] dark:bg-[#121413] border-b-[#D1D5DB] dark:border-b-[#2F2F2F] px-6 py-3">
        <h3 className="text-lg font-normal text-gray-900 dark:text-[#EBEEF5]">Segments</h3>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-4 gap-3">
          {segments.map((segment, index) => (
            <div 
              key={index} 
              className={`px-3 py-2 text-center text-base rounded border ${
                segment.active 
                  ? 'bg-[#D1FADF99] dark:bg-[#D1FADF66] border-primary text-primary dark:text-dark-text' 
                  : 'bg-gray-50 dark:bg-transparent border-gray-200 dark:border-dark-border text-secondary font-medium'
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