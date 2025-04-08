import React from 'react';
import { X } from 'lucide-react';
import SearchInput from './SearchInput';
import Filter from './Filter';
import ViewToggle from './ViewToggle';

interface SearchFilterControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filterType: 'BUY' | 'SELL' | '';
  setFilterType: (type: 'BUY' | 'SELL' | '') => void;
  filterDuration: string;
  setFilterDuration: (duration: string) => void;
  uniqueDurations: string[];
  resetFilters: () => void;
  getActiveFiltersCount: () => number;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

const SearchFilterControls: React.FC<SearchFilterControlsProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearchChange,
  showFilters,
  setShowFilters,
  filterType,
  setFilterType,
  filterDuration,
  setFilterDuration,
  uniqueDurations,
  resetFilters,
  getActiveFiltersCount,
  viewMode,
  setViewMode
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          {/* Search Component */}
          <div className="w-[280px]">
            <SearchInput 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
              handleSearchChange={handleSearchChange}
            />
          </div>
          
          {/* Filter Component - Positioned right next to search */}
          <div className="ml-2">
            <Filter 
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              filterType={filterType}
              setFilterType={setFilterType}
              filterDuration={filterDuration}
              setFilterDuration={setFilterDuration}
              uniqueDurations={uniqueDurations}
              resetFilters={resetFilters}
              getActiveFiltersCount={getActiveFiltersCount}
            />
          </div>
        </div>
        
        {/* View Toggle - Stays on the right */}
        <div>
          <ViewToggle
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </div>
      </div>
      
      {/* Active Filters Display */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex items-center bg-blue-50 px-4 py-2 rounded-md mb-4">
          <span className="text-sm text-gray-700">Filtered by: </span>
          {filterType && (
            <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {filterType}
              <button onClick={() => setFilterType('')} className="ml-1 text-blue-500 hover:text-blue-700">
                <X size={14} />
              </button>
            </span>
          )}
          {filterDuration && (
            <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {filterDuration}
              <button onClick={() => setFilterDuration('')} className="ml-1 text-blue-500 hover:text-blue-700">
                <X size={14} />
              </button>
            </span>
          )}
          <button 
            onClick={resetFilters}
            className="ml-auto text-xs text-blue-600 hover:text-blue-800"
          >
            Clear All
          </button>
        </div>
      )}
    </>
  );
};

export default SearchFilterControls;