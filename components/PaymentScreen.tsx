import React, { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Clover, CreditCard, Shield, Check, AlertCircle } from 'lucide-react';

interface PaymentScreenProps {
  onPaymentSuccess: () => void;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ onPaymentSuccess }) => {
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Mercado Pago SDK with placeholder Public Key
    // TODO: Replace with actual public key from environment variable (e.g., process.env.MERCADO_PAGO_PUBLIC_KEY)
    initMercadoPago('TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
  }, []);

  const handlePaymentError = (error: unknown) => {
    console.error('Mercado Pago error:', error);
    setPaymentError('Não foi possível carregar o pagamento. Use o botão de demonstração abaixo.');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-br from-slate-100 to-slate-200">
      {/* Header */}
      <header className="w-full px-4 py-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <Clover className="w-8 h-8 text-emerald-600" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">LotoStats AI</h1>
            <p className="text-xs text-slate-500">Inteligência Artificial & Estatística</p>
          </div>
        </div>
      </header>

      {/* Payment Section */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-emerald-600 text-white p-6 text-center">
              <CreditCard className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Finalizar Acesso</h2>
              <p className="text-emerald-100 mt-2">Desbloqueie todas as funcionalidades</p>
            </div>

            {/* Price */}
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-slate-800 mb-2">
                  R$ 9,90
                </div>
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-medium">
                  <Shield className="w-4 h-4" />
                  Acesso Vitalício
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-slate-600">
                  <Check className="w-5 h-5 text-emerald-500" />
                  <span>Acesso a todas as 10+ loterias</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Check className="w-5 h-5 text-emerald-500" />
                  <span>Análise estatística com IA</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Check className="w-5 h-5 text-emerald-500" />
                  <span>Números quentes e frios</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Check className="w-5 h-5 text-emerald-500" />
                  <span>Gerações ilimitadas</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Check className="w-5 h-5 text-emerald-500" />
                  <span>Sem mensalidades ou assinaturas</span>
                </div>
              </div>

              {/* Mercado Pago Wallet */}
              <div className="mb-4">
                {paymentError && (
                  <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2 text-amber-700 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{paymentError}</span>
                  </div>
                )}
                <Wallet
                  initialization={{ preferenceId: 'PREFERENCE_ID_PLACEHOLDER' }}
                  onError={handlePaymentError}
                />
              </div>

              {/* Demo Button */}
              <div className="border-t border-slate-200 pt-6 mt-6">
                <p className="text-center text-slate-500 text-sm mb-4">
                  Modo de demonstração
                </p>
                <button
                  onClick={onPaymentSuccess}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Simular Pagamento Confirmado (Demo)
                </button>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-6 text-center text-slate-500 text-sm flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            Pagamento seguro via Mercado Pago
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 py-6">
        <div className="max-w-6xl mx-auto text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} LotoStats AI. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default PaymentScreen;
