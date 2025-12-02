import React, { useEffect, useState } from 'react';
import App from '../App';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import { getUser } from '../services/authService';

const AuthGate: React.FC = () => {
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const u = await getUser();
        setUser(u);
      } catch (err) {
        setUser(null);
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  const path = window.location.pathname;

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-500">Verificando autenticação...</div>
      </div>
    );
  }

  // Routes that are public
  if (path === '/login') return <Login />;
  if (path === '/register') return <Register />;
  if (path === '/forgot') return <ForgotPassword />;

  // All other routes require auth
  if (!user) {
    window.location.href = '/login';
    return null;
  }

  return <App />;
};

export default AuthGate;
