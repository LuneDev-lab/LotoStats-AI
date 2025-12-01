import React from 'react';
import { Clover, TrendingUp, Sparkles, Shield, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900">
      {/* Hero Section */}
      <header className="w-full max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2">
          <Clover className="w-8 h-8 text-emerald-400" />
          <h1 className="text-xl font-bold text-white tracking-tight">LotoStats AI</h1>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        {/* Main Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-400/20 rounded-full text-emerald-300 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Inteligência Artificial + Estatística
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Gere números da loteria com{' '}
            <span className="text-emerald-400">análise estatística</span>
          </h2>
          
          <p className="text-lg md:text-xl text-emerald-100/80 leading-relaxed max-w-2xl mx-auto">
            Utilizamos inteligência artificial para analisar padrões históricos e sugerir combinações 
            baseadas em dados reais das principais loterias brasileiras.
          </p>

          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-lg rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-400/40 hover:-translate-y-0.5"
          >
            Começar Agora
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          <FeatureCard 
            icon={<TrendingUp className="w-6 h-6" />}
            title="Análise Estatística"
            description="Identificamos números quentes e frios baseados em sorteios históricos."
          />
          <FeatureCard 
            icon={<Sparkles className="w-6 h-6" />}
            title="Powered by AI"
            description="Utilizamos o Google Gemini para análises inteligentes e personalizadas."
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6" />}
            title="Todas as Loterias"
            description="Mega-Sena, Lotofácil, Quina, Lotomania e muito mais."
          />
        </div>

        {/* Pricing Preview */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <p className="text-emerald-300 text-sm font-medium mb-1">Acesso Vitalício</p>
            <p className="text-4xl font-bold text-white">
              R$ 9,90
              <span className="text-lg text-emerald-300/70 font-normal"> / único</span>
            </p>
            <p className="text-emerald-100/60 text-sm mt-2">Pague uma vez, use para sempre</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-emerald-100/40 text-sm">
        &copy; {new Date().getFullYear()} LotoStats AI. Todos os direitos reservados.
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
      <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 mb-4">
        {icon}
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-emerald-100/60 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default LandingPage;
