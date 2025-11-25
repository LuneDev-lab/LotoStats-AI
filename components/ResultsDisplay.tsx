import React from 'react';
import { GeneratedResult, LotteryGame } from '../types';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

interface ResultsDisplayProps {
  result: GeneratedResult;
  game: LotteryGame;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, game }) => {
  return (
    <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Main Numbers */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
        <div className={`p-4 ${game.color} flex justify-between items-center`}>
          <h3 className={`font-bold text-lg ${game.contrastColor}`}>Palpite Gerado</h3>
          <span className={`text-xs opacity-80 ${game.contrastColor} bg-black/20 px-2 py-1 rounded`}>
             Baseado em 10 anos de histórico
          </span>
        </div>
        
        <div className="p-8">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {result.generatedNumbers.map((num, idx) => (
              <div 
                key={idx}
                className={`
                  flex items-center justify-center rounded-full font-bold shadow-sm border-2 border-slate-100
                  ${game.id === 'loteca' || num.length > 3 
                    ? 'w-auto px-4 h-12 text-sm bg-slate-50 text-slate-800' 
                    : 'w-12 h-12 md:w-16 md:h-16 text-xl md:text-2xl bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800'
                  }
                `}
              >
                {num}
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900 text-sm md:text-base flex items-start gap-3">
            <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p>{result.reasoning}</p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hot Numbers */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-4 text-orange-600">
            <TrendingUp className="w-5 h-5" />
            <h4 className="font-bold">Números Quentes (Mais frequentes)</h4>
          </div>
          <p className="text-slate-600 text-sm mb-3">
            Baseado em análise dos últimos 10 anos, estes números têm aparecido com maior frequência nos sorteios.
          </p>
          <div className="flex flex-wrap gap-2">
            {result.hotNumbers.map((num, i) => (
              <span key={i} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                {num}
              </span>
            ))}
          </div>
        </div>

        {/* Cold Numbers */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-4 text-blue-600">
            <TrendingDown className="w-5 h-5" />
            <h4 className="font-bold">Números Frios (Menos frequentes)</h4>
          </div>
          <p className="text-slate-600 text-sm mb-3">
            Números que estão "atrasados" estatisticamente ou aparecem com pouca frequência recentemente.
          </p>
          <div className="flex flex-wrap gap-2">
            {result.coldNumbers.map((num, i) => (
              <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                {num}
              </span>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ResultsDisplay;