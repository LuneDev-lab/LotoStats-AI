import React from 'react';
import { createPreference } from '../services/api';

type Props = {
  email: string;
  onError?: (e: any) => void;
};

export const CheckoutButton: React.FC<Props> = ({ email, onError }) => {
  const [loading, setLoading] = React.useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const data: any = await createPreference(email);
      // redirect to Mercado Pago checkout (init_point)
      if (data?.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error('init_point não recebido');
      }
    } catch (err) {
      onError?.(err);
      console.error(err);
      alert('Erro ao iniciar checkout');
      setLoading(false);
    }
  };

  return (
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? 'Redirecionando...' : 'Pagar R$9,90 - Acesso Vitalício'}
    </button>
  );
};

export default CheckoutButton;
