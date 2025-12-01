export interface LotteryGame {
  id: string;
  name: string;
  color: string;
  contrastColor: string;
  minPicks: number;
  maxPicks: number;
  totalNumbers: number;
  description: string;
  isFixed?: boolean; // If true, user cannot change amount of numbers (e.g., Lotomania often fixed at 50, or simplified to 50)
}

export interface GeneratedResult {
  generatedNumbers: string[];
  reasoning: string;
  hotNumbers: string[];
  coldNumbers: string[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

// App flow view states
export enum AppView {
  LANDING = 'landing',
  AUTH = 'auth',
  PAYMENT = 'payment',
  APP = 'app'
}

// User type for authentication
export interface User {
  email: string;
  name: string;
}