import React from 'react';
import { LotteryGame } from '../types.ts';
import { CheckCircle2 } from 'lucide-react';

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
        relative flex flex-col items-start p-5 rounded-xl transition-all duration-300 border-2 text-left h-full
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

export default GameCard;