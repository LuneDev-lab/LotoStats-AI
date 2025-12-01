import React from 'react';
import { Clover, CheckCircle, CreditCard, ArrowLeft } from 'lucide-react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

/*
 * IMPORTANT: Mercado Pago Configuration
 * --------------------------------------
 * Replace 'YOUR_PUBLIC_KEY' with your actual Mercado Pago public key.
 * In production, this should come from environment variables:
 *   - Set VITE_MP_PUBLIC_KEY in your .env file
 *   - Or configure it in your deployment environment
 * 
 * To get your public key:
 *   1. Go to https://www.mercadopago.com.br/developers
 *   2. Navigate to Your integrations > Application credentials
 *   3. Copy your Public Key (not the Access Token)
 */
const MP_PUBLIC_KEY = import.meta.env.VITE_MP_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
initMercadoPago(MP_PUBLIC_KEY, { locale: 'pt-BR' });

interface PaymentScreenProps {
  onPaymentComplete: () => void;
  onBack: () => void;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ onPaymentComplete, onBack }) => {
  /*
   * IMPORTANT: Backend Integration Required
   * ----------------------------------------
   * The preferenceId below is a placeholder. In a real implementation:
   * 
   * 1. Your backend should create a payment preference using the Mercado Pago API:
   *    POST https://api.mercadopago.com/checkout/preferences
   * 
   * 2. The backend returns a preferenceId which should be passed to this component.
   * 
   * 3. Replace the placeholder string below with the actual preferenceId from your backend.
   * 
   * Example backend code (Node.js):
   *    const mercadopago = require('mercadopago');
   *    mercadopago.configure({ access_token: 'YOUR_ACCESS_TOKEN' });
   *    const preference = await mercadopago.preferences.create({
   *      items: [{ title: 'Acesso Vitalício LotoStats AI', quantity: 1, unit_price: 9.90 }],
   *      back_urls: { success: '...', failure: '...', pending: '...' }
   *    });
   *    // Return preference.body.id to the frontend
   */
  const preferenceId = 'PLACEHOLDER_PREFERENCE_ID_FROM_BACKEND';

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-emerald-50 to-white">
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
        </div>
      </header>

      {/* Payment Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
            {/* Price Display */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Acesso Vitalício</h2>
              <p className="text-4xl font-bold text-emerald-600 mt-4">R$ 9,90</p>
              <p className="text-slate-500 text-sm mt-2">Pagamento único, acesso para sempre</p>
            </div>

            {/* Features included */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-slate-700">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>Gerador de números com IA ilimitado</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>Análise estatística completa</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>Todas as loterias da Caixa</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>Atualizações futuras inclusas</span>
              </div>
            </div>

            {/* Mercado Pago Wallet */}
            <div className="mb-6">
              <Wallet 
                initialization={{ preferenceId }} 
                customization={{ texts: { valueProp: 'smart_option' } }}
              />
            </div>

            {/* Simulate Payment Button (Debug Only) */}
            <div className="border-t border-slate-200 pt-6 mt-6">
              <p className="text-xs text-slate-400 text-center mb-3">
                [Apenas para desenvolvimento/teste]
              </p>
              <button
                onClick={onPaymentComplete}
                className="w-full py-3 bg-slate-100 text-slate-600 font-medium rounded-lg hover:bg-slate-200 transition-all border border-slate-200"
              >
                Simular Pagamento Concluído
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-500 text-center mt-6">
            Pagamento seguro processado pelo Mercado Pago
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} LotoStats AI. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PaymentScreen;
