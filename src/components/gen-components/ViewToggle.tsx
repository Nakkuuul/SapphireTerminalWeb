import React from 'react';
import { List, LayoutGrid } from 'lucide-react';

interface ViewToggleProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex border rounded-lg overflow-hidden h-[42px]">
      <button 
        className={`px-4 flex items-center justify-center h-full ${viewMode === 'grid' ? 'bg-[#F6F6F6] text-[#28A745]' : 'text-[#212529]'}`}
        onClick={() => setViewMode('grid')}
      >
        <LayoutGrid size={20} />
      </button>
      <button 
        className={`px-4 flex items-center justify-center h-full ${viewMode === 'list' ? 'bg-[#F6F6F6] text-[#28A745]' : 'text-[#212529]'}`}
        onClick={() => setViewMode('list')}
      >
        <List size={20} />
      </button>
    </div>
  );
};

export default ViewToggle;