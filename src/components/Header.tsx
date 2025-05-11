import React from 'react';
import { Instagram, Menu } from 'lucide-react';

interface HeaderProps {
  onOpenSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSidebar }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white border-b">
      <div className="px-4 py-2 flex items-center justify-between">
        <button 
          onClick={onOpenSidebar}
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors text-sm"
        >
          <Menu className="h-5 w-5" />
          <span>Paste your vocab list</span>
        </button>
        <div className="flex items-center text-black">
          <Instagram className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-semibold">Reels</h1>
        </div>
        <div className="w-32" /> {/* Spacer for symmetry, adjusted width */}
      </div>
    </header>
  );
};

export default Header;