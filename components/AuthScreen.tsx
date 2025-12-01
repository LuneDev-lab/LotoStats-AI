import React, { useState } from 'react';
import { Clover, Mail, Lock, User, ArrowLeft, Loader2 } from 'lucide-react';

interface AuthScreenProps {
  onBack: () => void;
  onAuthSuccess: (user: { email: string; name: string }) => void;
}

type AuthMode = 'login' | 'register';

const AuthScreen: React.FC<AuthScreenProps> = ({ onBack, onAuthSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      setIsLoading(false);
      return;
    }

    if (mode === 'register' && !name) {
      setError('Por favor, informe seu nome.');
      setIsLoading(false);
      return;
    }

    // Email validation - supplementary check alongside HTML5 type="email" validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, informe um e-mail válido.');
      setIsLoading(false);
      return;
    }

    // Password validation
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      setIsLoading(false);
      return;
    }

    // NOTE: This is a mock authentication flow.
    // In a real application, you would call your authentication backend here.
    // For example: await api.login(email, password) or await api.register(email, password, name)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock success - in production, validate credentials with backend
    const userName = mode === 'register' ? name : email.split('@')[0];
    onAuthSuccess({ email, name: userName });
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900">
      {/* Header */}
      <header className="w-full max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clover className="w-8 h-8 text-emerald-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">LotoStats AI</h1>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-emerald-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
        </div>
      </header>

      {/* Auth Form */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
            {/* Tabs */}
            <div className="flex mb-8 bg-white/5 rounded-lg p-1">
              <button
                onClick={() => { setMode('login'); setError(null); }}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  mode === 'login' 
                    ? 'bg-emerald-500 text-white shadow' 
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                Entrar
              </button>
              <button
                onClick={() => { setMode('register'); setError(null); }}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  mode === 'register' 
                    ? 'bg-emerald-500 text-white shadow' 
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                Cadastrar
              </button>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              {mode === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta'}
            </h2>
            <p className="text-emerald-100/60 mb-6">
              {mode === 'login' 
                ? 'Entre com suas credenciais para continuar.'
                : 'Preencha os dados para se cadastrar.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-emerald-200 text-sm font-medium mb-2">Nome</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-300/50" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-emerald-200/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-emerald-200 text-sm font-medium mb-2">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-300/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-emerald-200/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-emerald-200 text-sm font-medium mb-2">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-300/50" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-emerald-200/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                  isLoading 
                    ? 'bg-emerald-600/50 cursor-not-allowed' 
                    : 'bg-emerald-500 hover:bg-emerald-400 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/40'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processando...
                  </>
                ) : (
                  mode === 'login' ? 'Entrar' : 'Cadastrar'
                )}
              </button>
            </form>

            {/* Demo notice */}
            <p className="mt-6 text-center text-emerald-100/40 text-xs">
              Nota: Esta é uma versão de demonstração. O login é simulado.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthScreen;
