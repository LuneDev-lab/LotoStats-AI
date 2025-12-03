import React from 'react';
import { Clover } from 'lucide-react';

interface HeaderProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn = false, onLogout }) => {
  return (
    <header className="bg-emerald-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clover className="w-8 h-8 text-emerald-400" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">Gerador Lotérico</h1>
            <p className="text-xs text-emerald-300">Inteligência Artificial & Estatística</p>
          </div>
        </div>

        <div>
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="text-sm bg-emerald-700 hover:bg-emerald-600 px-3 py-1 rounded-md"
            >
              Sair
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;