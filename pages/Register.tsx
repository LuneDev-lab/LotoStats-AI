import React, { useState } from 'react';
import { register } from '../services/authService';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(email, password, name || undefined);
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Erro ao registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Criar conta</h2>
        <p className="text-sm text-slate-500 mb-6">Cadastre-se para salvar preferências.</p>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 px-3 py-2 rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nome (opcional)</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-200 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-slate-200 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-slate-200 rounded px-3 py-2"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 text-white px-4 py-2 rounded font-semibold hover:bg-emerald-700 disabled:opacity-60"
            >
              {loading ? 'Cadastrando...' : 'Criar conta'}
            </button>
            <a href="/login" className="text-sm text-emerald-600 hover:underline">Já tenho conta</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
