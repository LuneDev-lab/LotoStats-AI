import React, { useState } from 'react';
import { Clover, Mail, Lock, ArrowLeft } from 'lucide-react';

interface AuthScreenProps {
  onLogin: () => void;
  onBack: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in a real implementation this would authenticate with a backend
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="bg-emerald-900 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clover className="w-8 h-8 text-emerald-400" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">LotoStats AI</h1>
              <p className="text-xs text-emerald-300">Inteligência Artificial & Estatística</p>
            </div>
          </div>
        </div>
      </header>

      {/* Auth Form */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Acesse sua conta</h2>
              <p className="text-slate-600 mt-2">
                Entre ou crie uma conta para continuar
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 text-white font-bold rounded-lg shadow-md hover:bg-emerald-700 hover:shadow-lg transition-all active:scale-95"
              >
                Entrar / Cadastrar
              </button>
            </form>

            <p className="text-xs text-slate-500 text-center mt-6">
              Ao continuar, você concorda com nossos termos de uso e política de privacidade.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} LotoStats AI. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AuthScreen;
