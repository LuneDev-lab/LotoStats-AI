import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import GameCard from './components/GameCard.tsx';
import ConfigPanel from './components/ConfigPanel.tsx';
import ResultsDisplay from './components/ResultsDisplay.tsx';
import { LOTTERY_GAMES } from './constants.ts';
import { LotteryGame, GeneratedResult, LoadingState } from './types.ts';
import { generateLotteryNumbers } from './services/geminiService.ts';
import { Dna } from 'lucide-react';

function App() {
  const [selectedGame, setSelectedGame] = useState<LotteryGame>(LOTTERY_GAMES[0]);
  const [numCount, setNumCount] = useState<number>(LOTTERY_GAMES[0].minPicks);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);

  // Reset count when game changes
  useEffect(() => {
    setNumCount(selectedGame.minPicks);
    setResult(null);
    setError(null);
    setLoadingState(LoadingState.IDLE);
  }, [selectedGame]);

  const handleGenerate = async () => {
    setLoadingState(LoadingState.LOADING);
    setError(null);
    
    try {
      const data = await generateLotteryNumbers(selectedGame.name, numCount);
      setResult(data);
      setLoadingState(LoadingState.SUCCESS);
      
      // Smooth scroll to results
      setTimeout(() => {
        const resultElement = document.getElementById('results-section');
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao conectar com a IA. Por favor, verifique se a chave de API está configurada corretamente.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />

      <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-12">
        
        {/* Intro */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Escolha seus números com base em <span className="text-emerald-600">estatísticas reais</span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Este gerador utiliza análise estatística de sorteios passados para sugerir números com maior frequência de ocorrência. Embora nenhum sistema garanta ganhos, este é um método baseado em dados. Selecione a loteria desejada e comece!
          </p>
        </section>

        {/* Game Selector */}
        <section>
           <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="bg-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
            Escolha seu Jogo
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {LOTTERY_GAMES.map((game) => (
              <GameCard 
                key={game.id} 
                game={game} 
                isSelected={selectedGame.id === game.id}
                onSelect={setSelectedGame}
              />
            ))}
          </div>
        </section>

        {/* Config */}
        <ConfigPanel 
          game={selectedGame}
          numCount={numCount}
          setNumCount={setNumCount}
          onGenerate={handleGenerate}
          loadingState={loadingState}
        />

        {/* Error Message */}
        {loadingState === LoadingState.ERROR && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative text-center">
            {error}
          </div>
        )}

        {/* Results */}
        {(loadingState === LoadingState.SUCCESS && result) && (
          <section id="results-section">
             <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
              Análise e Resultados
            </h3>
            <ResultsDisplay result={result} game={selectedGame} />
          </section>
        )}
        
        {/* Placeholder if no result yet */}
        {loadingState === LoadingState.IDLE && (
          <div className="flex flex-col items-center justify-center py-12 text-slate-300">
            <Dna className="w-16 h-16 mb-4 opacity-50" />
            <p>Selecione um jogo e gere sua combinação</p>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

export default App;