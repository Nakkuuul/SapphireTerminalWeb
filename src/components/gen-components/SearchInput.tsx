import React from 'react';
import { X } from 'lucide-react';

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  searchQuery, 
  setSearchQuery,
  handleSearchChange
}) => {
  return (
    <div className="relative w-full ">
      <input
        type="text"
        placeholder="Search everything..."
        className="w-full h-14 pl-4 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        {searchQuery ? (
          <button 
            onClick={() => setSearchQuery('')}
            className="h-full w-5 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        ) : (
          <svg className="h-full w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default SearchInput;