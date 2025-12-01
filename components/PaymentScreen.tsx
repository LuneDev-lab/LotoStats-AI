import React, { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Clover, CreditCard, ShieldCheck, CheckCircle, Loader2 } from 'lucide-react';

interface PaymentScreenProps {
  user: { email: string; name: string };
  onPaymentSuccess: () => void;
  onLogout: () => void;
}

// TODO: Replace this placeholder with your actual Mercado Pago PUBLIC KEY
// This should be a public key (TEST or PROD) obtained from your Mercado Pago dashboard
// The public key is safe to expose in the frontend
const MERCADO_PAGO_PUBLIC_KEY = 'TEST-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX';

// TODO: This preferenceId should be obtained from your backend
// Your backend should create a preference using the Mercado Pago SDK
// and return the preferenceId to the frontend
// NEVER expose your ACCESS_TOKEN in the frontend
const PLACEHOLDER_PREFERENCE_ID = 'PREFERENCE_ID_FROM_BACKEND';

const PaymentScreen: React.FC<PaymentScreenProps> = ({ user, onPaymentSuccess, onLogout }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Mercado Pago SDK
    // TODO: Replace with your actual PUBLIC KEY
    try {
      initMercadoPago(MERCADO_PAGO_PUBLIC_KEY, {
        locale: 'pt-BR'
      });
      setIsInitialized(true);
    } catch (err) {
      console.error('Error initializing Mercado Pago:', err);
      setError('Erro ao inicializar o sistema de pagamento.');
    }
  }, []);

  useEffect(() => {
    // TODO: Replace this with a real backend call to create a Mercado Pago preference
    // Example backend endpoint: POST /api/create-preference
    // The backend should:
    // 1. Receive the user info (email, etc.)
    // 2. Create a preference using Mercado Pago SDK with ACCESS_TOKEN
    // 3. Return the preferenceId to the frontend
    //
    // Example backend code (Node.js):
    // const mercadopago = require('mercadopago');
    // mercadopago.configure({ access_token: process.env.MP_ACCESS_TOKEN });
    // const preference = await mercadopago.preferences.create({
    //   items: [{ title: 'LotoStats AI - Acesso Vitalício', unit_price: 9.90, quantity: 1 }],
    //   payer: { email: user.email },
    //   back_urls: { success: '...', failure: '...', pending: '...' },
    //   auto_return: 'approved'
    // });
    // return preference.body.id;
    
    const fetchPreferenceId = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/create-preference', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ userEmail: user.email, userName: user.name })
        // });
        // const data = await response.json();
        // setPreferenceId(data.preferenceId);
        
        // Placeholder: simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPreferenceId(PLACEHOLDER_PREFERENCE_ID);
      } catch (err) {
        console.error('Error fetching preference:', err);
        setError('Erro ao preparar o pagamento. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreferenceId();
  }, [user.email, user.name]);

  const handleSimulatePayment = () => {
    // TODO: Remove this in production
    // This is only for testing purposes
    // In production, payment confirmation should come from Mercado Pago webhook
    // The webhook should:
    // 1. Receive payment notification from Mercado Pago
    // 2. Verify the payment status
    // 3. Update the user's hasPaid status in the database
    // 4. Frontend should then check this status
    
    localStorage.setItem('lotostats_hasPaid', 'true');
    onPaymentSuccess();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-emerald-50">
      {/* Header */}
      <header className="bg-emerald-900 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clover className="w-8 h-8 text-emerald-400" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">LotoStats AI</h1>
              <p className="text-xs text-emerald-300">Inteligência Artificial & Estatística</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-emerald-300">Olá, {user.name}</span>
            <button
              onClick={onLogout}
              className="text-sm text-emerald-300 hover:text-white transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-emerald-600 text-white p-6 text-center">
              <CreditCard className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Finalizar Compra</h2>
              <p className="text-emerald-100 mt-2">Acesso vitalício ao LotoStats AI</p>
            </div>

            {/* Price Card */}
            <div className="p-6 space-y-6">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-700 font-medium">LotoStats AI</span>
                  <span className="text-2xl font-bold text-emerald-600">R$ 9,90</span>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Acesso vitalício</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Todas as loterias brasileiras</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Análise estatística com IA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Sem mensalidades</span>
                  </div>
                </div>
              </div>

              {/* Mercado Pago Wallet */}
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
                    <span className="ml-2 text-slate-600">Carregando pagamento...</span>
                  </div>
                ) : error ? (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
                    {error}
                  </div>
                ) : (
                  isInitialized && preferenceId && (
                    <div>
                      {/* 
                        TODO: The Wallet component will only work with a valid preferenceId
                        obtained from your backend. For now, it will show an error or not render.
                      */}
                      <Wallet 
                        initialization={{ preferenceId }}
                        customization={{ texts: { valueProp: 'smart_option' } }}
                        onReady={() => console.log('Wallet ready')}
                        onError={(error) => console.error('Wallet error:', error)}
                      />
                    </div>
                  )
                )}

                {/* Simulate Payment Button - FOR TESTING ONLY */}
                <div className="border-t border-slate-200 pt-4 mt-4">
                  <p className="text-xs text-slate-500 text-center mb-3">
                    ⚠️ Para testes apenas (remover em produção):
                  </p>
                  <button
                    onClick={handleSimulatePayment}
                    className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                  >
                    Simular Pagamento Aprovado
                  </button>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500 pt-4 border-t border-slate-200">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span>Pagamento seguro via Mercado Pago</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} LotoStats AI. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default PaymentScreen;
