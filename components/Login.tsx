import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email) {
      setError('Por favor, informe o e-mail.');
      return false;
    }
    if (!password) {
      setError('Por favor, informe a senha.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Simulação de autenticação. Em produção, chame sua API.
      await new Promise((res) => setTimeout(res, 600));
      // Salva um token simples no localStorage
      localStorage.setItem('auth_token', 'fake-token');
      onLogin();
    } catch (err) {
      setError('Erro ao autenticar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-white">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Entrar</h2>
        <p className="text-sm text-slate-500 mb-6">Acesse sua conta para continuar.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              placeholder="seu@exemplo.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="text-sm text-red-600">{error}</div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            <button
              type="button"
              className="text-sm text-slate-500 hover:underline"
              onClick={() => {
                // Continuar como convidado
                localStorage.setItem('auth_token', 'guest-token');
                onLogin();
              }}
            >
              Continuar como convidado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
