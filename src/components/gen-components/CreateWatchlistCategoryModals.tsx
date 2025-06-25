import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateWatchlistCategoryModalsProps {
  showWatchlistModal: boolean;
  setShowWatchlistModal: (open: boolean) => void;
  showCategoryModal: boolean;
  setShowCategoryModal: (open: boolean) => void;
  onCreateCategory?: (name: string) => void;
  onCreateWatchlist?: (name: string) => void;
}

export const CreateWatchlistModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (name: string) => void;
}> = ({ isOpen, onClose, onCreate }) => {
  const [watchlistName, setWatchlistName] = useState('');
  const maxLength = 15;

  const handleCreate = () => {
    if (watchlistName.trim()) {
      onCreate?.(watchlistName);
      setWatchlistName('');
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setWatchlistName(value);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-[280px] left-[26px] w-[328px] z-50">
      <div className="bg-white rounded-lg p-5 w-full mx-0 border-none shadow-none">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-gray-900">Create Watchlist</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        {/* Form */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Enter Watchlist Name
            </label>
            <input
              type="text"
              value={watchlistName}
              onChange={handleInputChange}
              onKeyDown={e => { if (e.key === 'Enter' && watchlistName.trim()) handleCreate(); }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              placeholder="Enter watchlist name..."
              maxLength={maxLength}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {watchlistName.length}/{maxLength}
            </div>
          </div>
          <button
            onClick={handleCreate}
            disabled={!watchlistName.trim()}
            className={`w-full py-3 text-white font-semibold text-sm rounded-lg transition-all duration-200 bg-[#1DB954] hover:bg-[#00B649] disabled:cursor-not-allowed disabled:opacity-70`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export const CreateCategoryModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (name: string) => void;
}> = ({ isOpen, onClose, onCreate }) => {
  const [categoryName, setCategoryName] = useState('');
  const maxLength = 50;

  const handleCreate = () => {
    if (categoryName.trim()) {
      onCreate?.(categoryName);
      setCategoryName('');
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setCategoryName(value);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-[180px] left-[26px] w-[328px] z-50">
      <div className="bg-white rounded-lg p-5 w-full mx-0 border-none shadow-none">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-gray-900">Create Category</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        {/* Form */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Enter Category Name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={handleInputChange}
              onKeyDown={e => { if (e.key === 'Enter' && categoryName.trim()) handleCreate(); }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              placeholder="Enter category name..."
              maxLength={maxLength}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {categoryName.length}/{maxLength}
            </div>
          </div>
          <button
            onClick={handleCreate}
            disabled={!categoryName.trim()}
            className={`w-full py-3 text-white font-semibold text-sm rounded-lg transition-all duration-200 bg-[#1DB954] hover:bg-[#00B649] disabled:cursor-not-allowed disabled:opacity-70`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

const CreateWatchlistCategoryModals: React.FC<CreateWatchlistCategoryModalsProps> = ({
  showWatchlistModal,
  setShowWatchlistModal,
  showCategoryModal,
  setShowCategoryModal,
  onCreateCategory,
  onCreateWatchlist,
}) => {
  return (
    <>
      <CreateWatchlistModal
        isOpen={showWatchlistModal}
        onClose={() => setShowWatchlistModal(false)}
        onCreate={onCreateWatchlist}
      />
      <CreateCategoryModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onCreate={onCreateCategory}
      />
    </>
  );
};

export default CreateWatchlistCategoryModals; 