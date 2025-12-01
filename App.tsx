import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import GameCard from './components/GameCard.tsx';
import ConfigPanel from './components/ConfigPanel.tsx';
import ResultsDisplay from './components/ResultsDisplay.tsx';
import LandingPage from './components/LandingPage.tsx';
import AuthScreen from './components/AuthScreen.tsx';
import PaymentScreen from './components/PaymentScreen.tsx';
import { LOTTERY_GAMES } from './constants.ts';
import { LotteryGame, GeneratedResult, LoadingState, AppView, User } from './types.ts';
import { generateLotteryNumbers } from './services/geminiService.ts';
import { Dna } from 'lucide-react';

// Keys for localStorage persistence
const STORAGE_KEYS = {
  USER: 'lotostats_user',
  HAS_PAID: 'lotostats_has_paid'
};

function App() {
  // Flow state management
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [user, setUser] = useState<User | null>(null);
  const [hasPaid, setHasPaid] = useState<boolean>(false);

  // Main app state
  const [selectedGame, setSelectedGame] = useState<LotteryGame>(LOTTERY_GAMES[0]);
  const [numCount, setNumCount] = useState<number>(LOTTERY_GAMES[0].minPicks);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);

  // Load persisted state on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    const storedHasPaid = localStorage.getItem(STORAGE_KEYS.HAS_PAID);

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        
        if (storedHasPaid === 'true') {
          setHasPaid(true);
          setCurrentView(AppView.APP);
        } else {
          setCurrentView(AppView.PAYMENT);
        }
      } catch {
        // Invalid stored data, stay on landing
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.HAS_PAID);
      }
    }
  }, []);

  // Reset count when game changes
  useEffect(() => {
    setNumCount(selectedGame.minPicks);
    setResult(null);
    setError(null);
    setLoadingState(LoadingState.IDLE);
  }, [selectedGame]);

  // Flow handlers
  const handleGetStarted = () => {
    setCurrentView(AppView.AUTH);
  };

  const handleAuthSuccess = (authenticatedUser: { email: string; name: string }) => {
    const newUser: User = {
      email: authenticatedUser.email,
      name: authenticatedUser.name
    };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    
    // Check if user already paid (could be returning user)
    const storedHasPaid = localStorage.getItem(STORAGE_KEYS.HAS_PAID);
    if (storedHasPaid === 'true') {
      setHasPaid(true);
      setCurrentView(AppView.APP);
    } else {
      setCurrentView(AppView.PAYMENT);
    }
  };

  const handlePaymentSuccess = () => {
    setHasPaid(true);
    localStorage.setItem(STORAGE_KEYS.HAS_PAID, 'true');
    setCurrentView(AppView.APP);
  };

  const handleLogout = () => {
    setUser(null);
    setHasPaid(false);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.HAS_PAID);
    setCurrentView(AppView.LANDING);
    // Reset app state
    setResult(null);
    setError(null);
    setLoadingState(LoadingState.IDLE);
    setSelectedGame(LOTTERY_GAMES[0]);
  };

  const handleBackToLanding = () => {
    setCurrentView(AppView.LANDING);
  };

  const handleBackToAuth = () => {
    setCurrentView(AppView.AUTH);
  };

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

  // Render based on current view
  if (currentView === AppView.LANDING) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (currentView === AppView.AUTH) {
    return (
      <AuthScreen 
        onBack={handleBackToLanding} 
        onAuthSuccess={handleAuthSuccess} 
      />
    );
  }

  if (currentView === AppView.PAYMENT && user && !hasPaid) {
    return (
      <PaymentScreen 
        user={user}
        onBack={handleBackToAuth}
        onPaymentSuccess={handlePaymentSuccess}
        onLogout={handleLogout}
      />
    );
  }

  // Main App View (only accessible after payment)
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header user={user} onLogout={handleLogout} />

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