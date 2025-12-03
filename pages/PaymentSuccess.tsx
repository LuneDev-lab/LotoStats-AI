import React from 'react';
import { confirmPayment } from '../services/api';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function verify() {
      try {
        // Mercado Pago usually returns "collection_id" (payment id) and "preference_id"
        const collection_id = searchParams.get('collection_id') || undefined;
        const preference_id = searchParams.get('preference_id') || undefined;
        const merchant_order_id = searchParams.get('merchant_order_id') || undefined;

        const res: any = await confirmPayment({ collection_id, preference_id, merchant_order_id });
        if (res.success && res.token) {
          // Save token (localStorage) and redirect to app (ex: /dashboard or generator)
          localStorage.setItem('loto_token', res.token);
          alert('Pagamento confirmado! Acesso liberado.');
          navigate('/'); // ou rota onde fica o gerador
        } else {
          alert('Pagamento ainda não confirmado. Tente novamente em alguns segundos.');
          // opcional: navegar para página de pendente
          navigate('/');
        }
      } catch (err) {
        console.error(err);
        alert('Erro ao confirmar pagamento');
        navigate('/');
      } finally {
        setLoading(false);
      }
    }
    verify();
  }, []);

  return <div>{loading ? 'Confirmando pagamento...' : 'Pronto!'}</div>;
};

export default PaymentSuccess;
