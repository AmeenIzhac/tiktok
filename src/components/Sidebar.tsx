import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [vocabList, setVocabList] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Process vocab list
    console.log('Vocab list:', vocabList);
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-20 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div 
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Add Vocabulary</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label 
                htmlFor="vocabList" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Paste your vocabulary list
              </label>
              <textarea
                id="vocabList"
                value={vocabList}
                onChange={(e) => setVocabList(e.target.value)}
                placeholder="Don't worry about formatting it correctly"
                className="w-full h-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create Flashcards
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Sidebar;