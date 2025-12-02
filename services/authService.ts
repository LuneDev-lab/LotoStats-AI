// Auth service that talks to the local server API (/api/auth/*)
export interface User {
  email: string;
  name?: string;
}

const TOKEN_KEY = 'auth_token';

const apiBase = (typeof window !== 'undefined' && window.location.hostname === 'localhost') ? 'http://localhost:4000' : '';

const apiFetch = (input: RequestInfo, init?: RequestInit) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = Object.assign({}, init?.headers || {}, token ? { Authorization: `Bearer ${token}` } : {});
  return fetch(apiBase + String(input), Object.assign({}, init, { credentials: 'include', headers }));
};

export const login = async (email: string, password: string): Promise<User> => {
  const resp = await fetch(`${apiBase}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data?.error || 'Login falhou');
  if (data.token) localStorage.setItem(TOKEN_KEY, data.token);
  return data.user as User;
};

export const register = async (email: string, password: string, name?: string): Promise<User> => {
  const resp = await fetch(`${apiBase}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data?.error || 'Registro falhou');
  if (data.token) localStorage.setItem(TOKEN_KEY, data.token);
  return data.user as User;
};

export const forgotPassword = async (email: string): Promise<void> => {
  await fetch(`${apiBase}/api/auth/forgot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
};

export const logout = async () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getUser = async (): Promise<User | null> => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;
  try {
    const resp = await fetch(`${apiBase}/api/me`, { headers: { Authorization: `Bearer ${token}` } });
    if (!resp.ok) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
    const data = await resp.json();
    const payload = (data.payload || data) as any;
    return { email: payload.email, name: payload.name } as User;
  } catch (err) {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
};

export const getCachedToken = () => localStorage.getItem(TOKEN_KEY);
