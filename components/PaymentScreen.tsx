import React, { useState, useEffect } from 'react';
import { Clover, ArrowLeft, Check, Shield, CreditCard, Loader2 } from 'lucide-react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

interface PaymentScreenProps {
  user: { email: string; name: string };
  onBack: () => void;
  onPaymentSuccess: () => void;
  onLogout: () => void;
}

// NOTE: The PUBLIC_KEY should be configured via environment variables in production.
// This placeholder demonstrates where the key should be used.
// In production, set VITE_MERCADO_PAGO_PUBLIC_KEY in your environment.
const MERCADO_PAGO_PUBLIC_KEY = import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY || 'TEST-PLACEHOLDER-KEY';

const PaymentScreen: React.FC<PaymentScreenProps> = ({ user, onBack, onPaymentSuccess, onLogout }) => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mpInitialized, setMpInitialized] = useState(false);

  useEffect(() => {
    // Initialize Mercado Pago SDK
    try {
      initMercadoPago(MERCADO_PAGO_PUBLIC_KEY, {
        locale: 'pt-BR'
      });
      setMpInitialized(true);
    } catch (err) {
      console.error('Failed to initialize Mercado Pago:', err);
      setError('Erro ao inicializar o gateway de pagamento.');
    }
  }, []);

  useEffect(() => {
    // Fetch preference ID from backend
    const createPreference = async () => {
      setIsLoading(true);
      setError(null);

      try {
        /*
         * NOTE: In a production environment, you would make a request to your backend here.
         * The backend should create a payment preference using the Mercado Pago SDK and return the preference ID.
         * 
         * Example backend call:
         * 
         * const response = await fetch('/api/create-preference', {
         *   method: 'POST',
         *   headers: { 'Content-Type': 'application/json' },
         *   body: JSON.stringify({
         *     title: 'LotoStats AI - Acesso Vitalício',
         *     price: 9.90,
         *     quantity: 1,
         *     buyer_email: user.email
         *   })
         * });
         * 
         * const { preferenceId } = await response.json();
         * setPreferenceId(preferenceId);
         * 
         * Backend implementation example (Node.js with Mercado Pago SDK):
         * 
         * const mercadopago = require('mercadopago');
         * mercadopago.configure({ access_token: 'YOUR_ACCESS_TOKEN' });
         * 
         * const preference = {
         *   items: [{
         *     title: 'LotoStats AI - Acesso Vitalício',
         *     unit_price: 9.90,
         *     quantity: 1,
         *   }],
         *   payer: { email: req.body.buyer_email },
         *   back_urls: {
         *     success: 'https://yourdomain.com/payment/success',
         *     failure: 'https://yourdomain.com/payment/failure',
         *     pending: 'https://yourdomain.com/payment/pending'
         *   },
         *   auto_return: 'approved'
         * };
         * 
         * const response = await mercadopago.preferences.create(preference);
         * res.json({ preferenceId: response.body.id });
         */

        // Simulating backend call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // MOCK: In demo mode, we'll use a placeholder preference ID
        // This will show the Wallet component but won't actually process payments
        // Replace this with real backend integration for production
        const mockPreferenceId = 'demo-preference-' + crypto.randomUUID();
        setPreferenceId(mockPreferenceId);

      } catch (err) {
        console.error('Error creating preference:', err);
        setError('Erro ao criar preferência de pagamento. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    if (mpInitialized) {
      createPreference();
    }
  }, [mpInitialized, user.email]);

  // Demo mode: Allow simulating payment success
  const handleDemoPayment = () => {
    // In demo mode, simulate successful payment
    onPaymentSuccess();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900">
      {/* Header */}
      <header className="w-full max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clover className="w-8 h-8 text-emerald-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">LotoStats AI</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-200 text-sm hidden sm:block">
              Olá, {user.name}
            </span>
            <button 
              onClick={onLogout}
              className="text-emerald-300 hover:text-white text-sm transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Payment Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Back button */}
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-emerald-300 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          {/* Payment Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-xl">
            {/* Card Header */}
            <div className="bg-emerald-500/20 p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Acesso Vitalício</h2>
                  <p className="text-emerald-200/80 text-sm mt-1">Pague uma vez, use para sempre</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-white">R$ 9,90</p>
                  <p className="text-emerald-200/60 text-xs">Pagamento único</p>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="p-6 border-b border-white/10">
              <h3 className="text-emerald-200 text-sm font-medium mb-4">O que está incluído:</h3>
              <ul className="space-y-3">
                <FeatureItem text="Acesso ilimitado ao gerador de números" />
                <FeatureItem text="Todas as loterias brasileiras (Mega-Sena, Lotofácil, Quina...)" />
                <FeatureItem text="Análise estatística com IA" />
                <FeatureItem text="Números quentes e frios atualizados" />
                <FeatureItem text="Sem mensalidades ou cobranças recorrentes" />
              </ul>
            </div>

            {/* Payment Section */}
            <div className="p-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mb-4" />
                  <p className="text-emerald-200/60 text-sm">Preparando pagamento...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-300 mb-4">{error}</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="text-emerald-400 hover:text-emerald-300 underline text-sm"
                  >
                    Tentar novamente
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Mercado Pago Wallet Button */}
                  {preferenceId && (
                    <div className="mercadopago-wallet-container">
                      <Wallet 
                        initialization={{ preferenceId }}
                        customization={{
                          texts: {
                            action: 'pay',
                            valueProp: 'security_details'
                          }
                        }}
                        onReady={() => console.log('Wallet ready')}
                        onError={(error) => {
                          console.error('Wallet error:', error);
                          // In demo mode, we expect errors since we don't have a real preference
                        }}
                        onSubmit={() => console.log('Payment submitted')}
                      />
                    </div>
                  )}

                  {/* Demo Mode Button */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-emerald-100/40 text-xs text-center mb-3">
                      Modo demonstração - clique abaixo para simular pagamento
                    </p>
                    <button
                      onClick={handleDemoPayment}
                      className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
                    >
                      <CreditCard className="w-5 h-5" />
                      Simular Pagamento (Demo)
                    </button>
                  </div>
                </div>
              )}

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 mt-6 text-emerald-200/40 text-xs">
                <Shield className="w-4 h-4" />
                <span>Pagamento seguro via Mercado Pago</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const FeatureItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-center gap-3 text-emerald-100/80 text-sm">
    <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
      <Check className="w-3 h-3 text-emerald-400" />
    </div>
    {text}
  </li>
);

export default PaymentScreen;
