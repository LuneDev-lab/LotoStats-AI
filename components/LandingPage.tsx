import React from 'react';
import { Clover, Sparkles, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onProceed: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onProceed }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-emerald-50">
      {/* Header */}
      <header className="bg-emerald-900 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-2">
          <Clover className="w-8 h-8 text-emerald-400" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">LotoStats AI</h1>
            <p className="text-xs text-emerald-300">Inteligência Artificial & Estatística</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Gere números de loteria com 
              <span className="text-emerald-600"> Inteligência Artificial</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Análise estatística avançada de sorteios passados para sugerir combinações otimizadas. 
              Acesso vitalício por apenas <strong className="text-emerald-600">R$ 9,90</strong>.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">IA Avançada</h3>
              <p className="text-sm text-slate-600">
                Utiliza modelos de IA para analisar padrões estatísticos históricos de todas as loterias.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Números Quentes & Frios</h3>
              <p className="text-sm text-slate-600">
                Identificação de números frequentes e atrasados baseada em dados reais de sorteios.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Acesso Vitalício</h3>
              <p className="text-sm text-slate-600">
                Pague uma vez e tenha acesso para sempre. Sem mensalidades ou cobranças recorrentes.
              </p>
            </div>
          </div>

          {/* Supported Lotteries */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 max-w-2xl mx-auto">
            <h3 className="font-bold text-slate-800 mb-4">Loterias Suportadas</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {['Mega-Sena', 'Lotofácil', 'Quina', 'Lotomania', 'Timemania', 'Dupla Sena', 'Dia de Sorte', 'Super Sete'].map((lottery) => (
                <span 
                  key={lottery}
                  className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                >
                  {lottery}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-8">
            <button
              onClick={onProceed}
              className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-sm text-slate-500 mt-4">
              Pagamento único de R$ 9,90 via Mercado Pago
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} LotoStats AI. Todos os direitos reservados.</p>
          <p className="text-xs mt-2 text-slate-500">
            Este é um produto de entretenimento. Loterias são jogos de azar e nenhum sistema pode garantir ganhos.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
