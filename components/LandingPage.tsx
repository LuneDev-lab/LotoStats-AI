import React from 'react';
import { Clover, Sparkles, TrendingUp, Shield } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
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

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Gerador de números de loteria com{' '}
              <span className="text-emerald-600">IA</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              Utilize inteligência artificial para gerar palpites baseados em análises 
              estatísticas de sorteios passados. Uma ferramenta moderna para jogadores inteligentes.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">IA Avançada</h3>
              <p className="text-slate-600 text-sm">
                Powered by Google Gemini para análises estatísticas inteligentes
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Análise Estatística</h3>
              <p className="text-slate-600 text-sm">
                Identifica números quentes e frios com base em dados históricos
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Acesso Vitalício</h3>
              <p className="text-slate-600 text-sm">
                Pague uma vez e tenha acesso ilimitado para sempre
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-12">
            <button
              onClick={onStart}
              className="px-8 py-4 bg-emerald-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Acessar Agora
            </button>
            <p className="text-slate-500 text-sm mt-4">
              Acesso vitalício por apenas R$ 9,90
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} LotoStats AI. Todos os direitos reservados.
          </p>
          <p className="text-xs mt-2 text-slate-500">
            Jogue com responsabilidade. Loterias são jogos de azar.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
