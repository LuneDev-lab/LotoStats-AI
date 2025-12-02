import React, { useState } from 'react';
import { forgotPassword } from '../services/authService';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err: any) {
      setError(err.message || 'Erro ao processar');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Esqueci minha senha</h2>
        <p className="text-sm text-slate-500 mb-6">Informe seu email e enviaremos um link para redefinir (mock).</p>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 px-3 py-2 rounded">{error}</div>
        )}

        {sent ? (
          <div className="text-sm text-emerald-700">Se a conta existir, um e-mail de recuperação foi enviado (mock).</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-emerald-600 text-white px-4 py-2 rounded font-semibold hover:bg-emerald-700"
              >
                Enviar
              </button>
              <a href="/login" className="text-sm text-emerald-600 hover:underline">Voltar ao login</a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
