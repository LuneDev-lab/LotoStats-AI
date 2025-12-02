import React, { useState, useEffect } from 'react';
import AuthGate from './components/AuthGate';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { 
  Clover, 
  CheckCircle2, 
  Wand2, 
  Loader2, 
  TrendingUp, 
  TrendingDown, 
  Info, 
  AlertTriangle, 
  Dna,
  X
} from 'lucide-react';

// --- TYPES ---
interface LotteryGame {
  id: string;
  name: string;
  color: string;
  contrastColor: string;
  minPicks: number;
  maxPicks: number;
  totalNumbers: number;
  description: string;
  isFixed?: boolean;
}

interface GeneratedResult {
  generatedNumbers: string[];
  reasoning: string;
  hotNumbers: string[];
  coldNumbers: string[];
}

enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

// --- CONSTANTS ---
const LOTTERY_GAMES: LotteryGame[] = [
  {
    id: 'mega-sena',
    name: 'Mega-Sena',
    color: 'bg-emerald-600',
    contrastColor: 'text-white',
    minPicks: 6,
    maxPicks: 15,
    totalNumbers: 60,
    description: 'A maior loteria do Brasil. Escolha de 6 a 15 números.'
  },
  {
    id: 'lotofacil',
    name: 'Lotofácil',
    color: 'bg-fuchsia-600',
    contrastColor: 'text-white',
    minPicks: 15,
    maxPicks: 20,
    totalNumbers: 25,
    description: 'Mais fácil de ganhar. Escolha entre 15 e 20 números.'
  },
  {
    id: 'quina',
    name: 'Quina',
    color: 'bg-blue-700',
    contrastColor: 'text-white',
    minPicks: 5,
    maxPicks: 15,
    totalNumbers: 80,
    description: 'Sorteios diários. Marque de 5 a 15 números.'
  },
  {
    id: 'lotomania',
    name: 'Lotomania',
    color: 'bg-orange-500',
    contrastColor: 'text-white',
    minPicks: 50,
    maxPicks: 50,
    totalNumbers: 100,
    description: 'Escolha 50 números para tentar a sorte.',
    isFixed: true
  },
  {
    id: 'timemania',
    name: 'Timemania',
    color: 'bg-yellow-400',
    contrastColor: 'text-yellow-900',
    minPicks: 10,
    maxPicks: 10,
    totalNumbers: 80,
    description: 'Escolha 10 números e um Time do Coração.',
    isFixed: true
  },
  {
    id: 'dupla-sena',
    name: 'Dupla Sena',
    color: 'bg-red-700',
    contrastColor: 'text-white',
    minPicks: 6,
    maxPicks: 15,
    totalNumbers: 50,
    description: 'Duas chances de ganhar com o mesmo jogo.'
  },
  {
    id: 'dia-de-sorte',
    name: 'Dia de Sorte',
    color: 'bg-amber-600',
    contrastColor: 'text-white',
    minPicks: 7,
    maxPicks: 15,
    totalNumbers: 31,
    description: 'Seus dias de sorte + 1 Mês de Sorte.'
  },
  {
    id: 'super-sete',
    name: 'Super Sete',
    color: 'bg-lime-300',
    contrastColor: 'text-lime-900',
    minPicks: 7,
    maxPicks: 7,
    totalNumbers: 9,
    description: '7 colunas com números de 0 a 9.',
    isFixed: true
  },
  {
    id: 'loteria-federal',
    name: 'Loteria Federal',
    color: 'bg-blue-500',
    contrastColor: 'text-white',
    minPicks: 5,
    maxPicks: 5,
    totalNumbers: 99999,
    description: 'Bilhetes com 5 algarismos.',
    isFixed: true
  },
  {
    id: 'loteca',
    name: 'Loteca',
    color: 'bg-red-500',
    contrastColor: 'text-white',
    minPicks: 14,
    maxPicks: 14,
    totalNumbers: 3,
    description: 'Palpites para 14 jogos de futebol.',
    isFixed: true
  }
];

// --- SERVICE ---
const generateLotteryNumbers = async (
  gameName: string,
  quantity: number,
  apiKey: string
): Promise<GeneratedResult> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  const prompt = `
    Atue como um estatístico especialista em loterias brasileiras (Caixa Econômica Federal).
    
    Tarefa: Gerar um palpite para o jogo "${gameName}" com exatamente ${quantity} escolhas.
    
    Contexto: Analise (simule) os dados históricos dos últimos 10 anos deste jogo específico. Identifique padrões de "números quentes" (que saem muito) e "números frios" (atrasados). 
    
    Regras Específicas:
    - Para "Dia de Sorte", inclua o Mês de Sorte como o último item do array.
    - Para "Loteca", gere uma sequência de 14 palpites entre "Coluna 1", "Empate" ou "Coluna 2".
    - Para "Super Sete", gere 7 números, um para cada coluna (0-9).
    - Para os demais (Mega, Quina, etc), gere números inteiros numéricos (ex: "05", "42") dentro do range do jogo.
    
    Saída JSON Obrigatória:
    {
      "generatedNumbers": ["01", "02", ...],
      "reasoning": "Texto explicativo curto...",
      "hotNumbers": ["10", "20", ...],
      "coldNumbers": ["30", "40", ...]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    // Clean up potential code blocks if the model returns them despite mimeType
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText) as GeneratedResult;
  } catch (error) {
    console.error("Error generating numbers:", error);
    throw error;
  }
};

// --- COMPONENTS ---

const Header: React.FC = () => {
  return (
    <header className="bg-emerald-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clover className="w-8 h-8 text-emerald-400" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">Gerador Lotérico</h1>
            <p className="text-xs text-emerald-300">Inteligência Artificial & Estatística</p>
          </div>
        </div>
      </div>
    </header>
  );
};

interface GameCardProps {
  game: LotteryGame;
  isSelected: boolean;
  onSelect: (game: LotteryGame) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, isSelected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(game)}
      className={`
        relative flex flex-col items-start p-5 rounded-xl transition-all duration-300 border-2 text-left h-full w-full
        ${isSelected 
          ? `border-${game.color.replace('bg-', '')} ring-2 ring-offset-2 ring-${game.color.replace('bg-', '')} bg-white shadow-lg transform -translate-y-1` 
          : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md'
        }
      `}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 text-emerald-600">
          <CheckCircle2 className="w-6 h-6" />
        </div>
      )}
      
      <span 
        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${game.color} ${game.contrastColor}`}
      >
        {game.name}
      </span>
      
      <h3 className="text-slate-800 font-bold text-lg mb-1">{game.name}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">
        {game.description}
      </p>
    </button>
  );
};

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
            Escolha o jogo, defina quantos números você deseja gerar e clique em 'Gerar Números'.
          </p>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Quantidade de Números: <span className="text-emerald-600 text-lg font-bold ml-2">{numCount}</span>
            </label>
            
            {game.isFixed ? (
              <p className="text-sm text-slate-500 italic">
                A {game.name} possui uma quantidade fixa.
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
                Analisando...
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
             Baseado em estatísticas
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
            <h4 className="font-bold">Números Quentes</h4>
          </div>
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
            <h4 className="font-bold">Números Frios</h4>
          </div>
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

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <h5 className="text-white font-bold text-lg mb-1">LotoStats AI</h5>
            <p className="text-sm">Estatística aplicada a sorte.</p>
          </div>
          <div className="text-sm text-right">
            &copy; {new Date().getFullYear()} Todos os direitos reservados.
          </div>
        </div>
        
        <div className="pt-8 flex items-start gap-3 max-w-3xl mx-auto bg-slate-800/50 p-6 rounded-xl border border-slate-800">
          <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
          <p className="text-xs md:text-sm leading-relaxed text-slate-300">
            <strong>Aviso Legal:</strong> Este gerador é apenas uma ferramenta educacional. Loterias são jogos de azar e nenhum sistema pode garantir resultados. Jogue responsavelmente.
          </p>
        </div>
      </div>
    </footer>
  );
};



// --- APP ---

function App() {
  const [selectedGame, setSelectedGame] = useState<LotteryGame>(LOTTERY_GAMES[0]);
  const [numCount, setNumCount] = useState<number>(LOTTERY_GAMES[0].minPicks);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);
  
  // API Key handling
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    // Primeiro tenta obter do ambiente (arquivo .env)
    const envKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (envKey) {
      setApiKey(envKey);
      return;
    }
    
    // Se não houver no ambiente, tenta obter do localStorage
    const storedKey = localStorage.getItem('GEMINI_API_KEY');
    if (storedKey) setApiKey(storedKey);
  }, []);

  // Reset count when game changes
  useEffect(() => {
    setNumCount(selectedGame.minPicks);
    setResult(null);
    setError(null);
    setLoadingState(LoadingState.IDLE);
  }, [selectedGame]);

  const handleGenerate = async () => {
    if (!apiKey) {
      setError("API Key não encontrada. Verifique a configuração do ambiente.");
      setLoadingState(LoadingState.ERROR);
      return;
    }

    setLoadingState(LoadingState.LOADING);
    setError(null);
    
    try {
      const data = await generateLotteryNumbers(selectedGame.name, numCount, apiKey);
      setResult(data);
      setLoadingState(LoadingState.SUCCESS);
      
      setTimeout(() => {
        const resultElement = document.getElementById('results-section');
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (err: any) {
      console.error(err);
      const msg = err.message || '';
      if (msg.includes('API Key') || msg.includes('403') || msg.includes('401')) {
         setError("Erro de autenticação. Verifique sua chave de API.");
      } else {
         setError("Ocorreu um erro ao conectar com a IA. Tente novamente em instantes.");
      }
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
            Este gerador utiliza IA para simular análises estatísticas. Selecione a loteria desejada e comece!
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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <AuthGate />
  </React.StrictMode>
);