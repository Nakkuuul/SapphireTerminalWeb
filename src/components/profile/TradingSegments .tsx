import React from 'react';

const TradingSegments = ({ segmentsData = [] }) => {
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
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h3 className="font-medium text-gray-700 mb-4">Segments</h3>
      
      <div className="grid grid-cols-4 gap-2">
        {segments.map((segment, index) => (
          <div 
            key={index} 
            className={`px-3 py-2 text-center text-sm rounded border ${
              segment.active 
                ? 'bg-green-100 border-green-200 text-green-800' 
                : 'bg-gray-50 border-gray-200 text-gray-700'
            }`}
          >
            {segment.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradingSegments;