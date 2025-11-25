import React from 'react';
import { LotteryGame, LoadingState } from '../types.ts';
import { Wand2, Loader2 } from 'lucide-react';

interface ConfigPanelProps {
  game: LotteryGame;
  numCount: number;
  setNumCount: (n: number) => void;
  onGenerate: () => void;
  loadingState: LoadingState;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ 
  game, 
  numCount, 
  setNumCount, 
  onGenerate,
  loadingState
}) => {
  const isLoading = loadingState === LoadingState.LOADING;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mt-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Painel de Configuração</h2>
          <p className="text-slate-600 mb-6">
            Escolha o jogo, defina quantos números você deseja gerar e clique em 'Gerar Números'. O sistema levará em consideração as tendências estatísticas de cada loteria.
          </p>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Quantidade de Números: <span className="text-emerald-600 text-lg font-bold ml-2">{numCount}</span>
            </label>
            
            {game.isFixed ? (
              <p className="text-sm text-slate-500 italic">
                A {game.name} possui uma quantidade fixa de números/palpites.
              </p>
            ) : (
              <input 
                type="range"
                min={game.minPicks}
                max={game.maxPicks}
                value={numCount}
                onChange={(e) => setNumCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 hover:accent-emerald-500 transition-all"
              />
            )}
            
            {!game.isFixed && (
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>Min: {game.minPicks}</span>
                <span>Max: {game.maxPicks}</span>
              </div>
            )}
          </div>
        </div>

        <div className="md:w-auto w-full">
           <button
            onClick={onGenerate}
            disabled={isLoading}
            className={`
              w-full md:w-64 py-4 px-6 rounded-xl font-bold text-lg shadow-md flex items-center justify-center gap-3 transition-all
              ${isLoading 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg active:scale-95'
              }
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Analisando Dados...
              </>
            ) : (
              <>
                <Wand2 className="w-6 h-6" />
                Gerar Números
              </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
};

export default ConfigPanel;