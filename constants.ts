import { LotteryGame } from './types';

export const LOTTERY_GAMES: LotteryGame[] = [
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
