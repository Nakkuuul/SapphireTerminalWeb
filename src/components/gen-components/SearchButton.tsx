import { Search } from 'lucide-react'
import React from 'react'

function SearchButton() {
  return (
    <div className="relative">
    <input
      type="text"
      placeholder="Search everything..."
      className="border rounded-md pl-3 text-[#686868]  py-3 text-sm w-44"
    />
    <button
      className="absolute right-1 top-1/2 transform -translate-y-1/2"
      style={{ padding: '8px' }}
    >
      <Search className="w-4 h-4 text-gray-500" />
    </button>
  </div>
  )
}

export default SearchButton