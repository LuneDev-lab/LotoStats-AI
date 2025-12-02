import React, { useState } from 'react';
import { useEffect } from 'react';
import { login, getUser } from '../services/authService';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const u = await getUser();
      if (u) {
        // already logged in, redirect home
        window.location.href = '/';
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user) {
        // redirect to home
        window.location.href = '/';
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao efetuar login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Entrar</h2>
        <p className="text-sm text-slate-500 mb-6">Acesse sua conta para salvar preferências e histórico.</p>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 px-3 py-2 rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-slate-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-slate-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 text-white px-4 py-2 rounded font-semibold hover:bg-emerald-700 disabled:opacity-60"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
            <a href="/forgot" className="text-sm text-emerald-600 hover:underline">Esqueci minha senha</a>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Ainda não tem conta? <a href="/register" className="text-emerald-600">Cadastre-se</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
