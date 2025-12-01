import React, { useState } from 'react';
import LandingPage from './components/LandingPage.tsx';
import AuthScreen from './components/AuthScreen.tsx';
import PaymentScreen from './components/PaymentScreen.tsx';
import LottoGenerator from './components/LottoGenerator.tsx';

// Application states for the onboarding flow
type AppState = 'landing' | 'auth' | 'payment' | 'app';

function App() {
  // Authentication and payment state management
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasPaid, setHasPaid] = useState<boolean>(false);
  const [appState, setAppState] = useState<AppState>('landing');

  // Handle navigation to auth screen
  const handleStartClick = () => {
    setAppState('auth');
  };

  // Handle successful login
  const handleLogin = () => {
    setIsAuthenticated(true);
    // If user hasn't paid, show payment screen
    if (!hasPaid) {
      setAppState('payment');
    } else {
      setAppState('app');
    }
  };

  // Handle successful payment
  const handlePaymentComplete = () => {
    setHasPaid(true);
    setAppState('app');
  };

  // Handle back navigation
  const handleBackToLanding = () => {
    setAppState('landing');
  };

  const handleBackToAuth = () => {
    setAppState('auth');
  };

  // Conditional rendering based on app state
  switch (appState) {
    case 'landing':
      return <LandingPage onStart={handleStartClick} />;
    
    case 'auth':
      return <AuthScreen onLogin={handleLogin} onBack={handleBackToLanding} />;
    
    case 'payment':
      return <PaymentScreen onPaymentComplete={handlePaymentComplete} onBack={handleBackToAuth} />;
    
    case 'app':
      // Only render if authenticated and paid
      if (isAuthenticated && hasPaid) {
        return <LottoGenerator />;
      }
      // Fallback to landing if somehow got here without auth/payment
      return <LandingPage onStart={handleStartClick} />;
    
    default:
      return <LandingPage onStart={handleStartClick} />;
  }
}

export default App;