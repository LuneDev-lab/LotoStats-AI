import React, { useEffect, useState } from 'react';
import { Clover } from 'lucide-react';
import { getUser, logout } from '../services/authService';

const Header: React.FC = () => {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const u = await getUser();
        setUser(u);
      } catch {
        setUser(null);
      }
    })();
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    // redirect to home
    window.location.href = '/';
  };

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

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-emerald-100">Olá, {user.name || user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-emerald-700 px-3 py-1 rounded-md font-semibold hover:bg-emerald-50"
              >
                Sair
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="bg-white text-emerald-700 px-3 py-1 rounded-md font-semibold hover:bg-emerald-50"
            >
              Entrar
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;