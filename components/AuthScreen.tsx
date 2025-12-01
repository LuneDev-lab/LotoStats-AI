import React, { useState } from 'react';
import { Clover, Mail, Lock, LogIn, UserPlus } from 'lucide-react';

interface AuthScreenProps {
  onLogin: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, any input is accepted as valid to simulate authentication
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-br from-slate-100 to-slate-200">
      {/* Header */}
      <header className="w-full px-4 py-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <Clover className="w-8 h-8 text-emerald-600" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">LotoStats AI</h1>
            <p className="text-xs text-slate-500">Inteligência Artificial & Estatística</p>
          </div>
        </div>
      </header>

      {/* Auth Form */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Tabs */}
            <div className="flex mb-8 bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                  isLogin
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Entrar
                </span>
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                  !isLogin
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Cadastrar
                </span>
              </button>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
            </h2>
            <p className="text-slate-500 mb-6">
              {isLogin
                ? 'Entre com suas credenciais para continuar.'
                : 'Preencha os dados para criar sua conta.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                {isLogin ? 'Entrar' : 'Criar Conta'}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 py-6">
        <div className="max-w-6xl mx-auto text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} LotoStats AI. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default AuthScreen;
