// cliente simples para chamar o backend
export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export async function createPreference(email: string) {
  const resp = await fetch(`${API_BASE}/api/create_preference`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  if (!resp.ok) throw new Error('Erro ao criar preferência');
  return resp.json();
}

export async function confirmPayment(query: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  for (const k of Object.keys(query)) {
    const v = (query as any)[k];
    if (v) params.append(k, v);
  }
  const resp = await fetch(`${API_BASE}/api/confirm_payment?${params.toString()}`);
  if (!resp.ok) throw new Error('Erro ao confirmar pagamento');
  return resp.json();
}

export async function getMe(token: string) {
  const resp = await fetch(`${API_BASE}/api/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return resp.json();
}
