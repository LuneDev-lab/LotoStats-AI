import React from 'react';
import { Clover, Sparkles, TrendingUp, Shield } from 'lucide-react';

interface LandingPageProps {
  onAccessClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAccessClick }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900">
      {/* Header */}
      <header className="w-full px-4 py-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <Clover className="w-8 h-8 text-emerald-400" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">LotoStats AI</h1>
            <p className="text-xs text-emerald-300">Inteligência Artificial & Estatística</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-700/50 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Powered by AI
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Números de Loteria
              <br />
              <span className="text-emerald-400">Baseados em Estatísticas</span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              O LotoStats AI utiliza inteligência artificial para analisar padrões estatísticos de sorteios passados 
              e gerar combinações otimizadas para você. Mega-Sena, Lotofácil, Quina e muito mais!
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left">
              <TrendingUp className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Análise Estatística</h3>
              <p className="text-slate-300 text-sm">
                Algoritmos de IA analisam históricos de sorteios para identificar números quentes e frios.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left">
              <Sparkles className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">10+ Loterias</h3>
              <p className="text-slate-300 text-sm">
                Suporte para Mega-Sena, Lotofácil, Quina, Lotomania, Timemania, Dupla Sena e mais.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left">
              <Shield className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Acesso Vitalício</h3>
              <p className="text-slate-300 text-sm">
                Pague uma única vez e tenha acesso ilimitado a todas as funcionalidades para sempre.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-12">
            <button
              onClick={onAccessClick}
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Acessar Agora
            </button>
            <p className="text-slate-400 text-sm mt-4">
              Acesso imediato • Pagamento único • Sem assinatura
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 py-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} LotoStats AI. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
