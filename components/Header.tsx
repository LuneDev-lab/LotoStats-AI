import React from 'react';
import { Clover, LogOut } from 'lucide-react';
import { User } from '../types.ts';

interface HeaderProps {
  user?: User | null;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
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
        
        {user && onLogout && (
          <div className="flex items-center gap-4">
            <span className="text-emerald-200 text-sm hidden sm:block">
              Olá, {user.name}
            </span>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-emerald-300 hover:text-white transition-colors text-sm"
              title="Sair"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;