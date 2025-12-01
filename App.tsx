import React, { useState } from 'react';
import LandingPage from './components/LandingPage.tsx';
import AuthScreen from './components/AuthScreen.tsx';
import PaymentScreen from './components/PaymentScreen.tsx';
import LottoGenerator from './components/LottoGenerator.tsx';

type AppScreen = 'landing' | 'auth' | 'payment' | 'generator';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasPaid, setHasPaid] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');

  const handleAccessClick = () => {
    setCurrentScreen('auth');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    // After login, check if user has paid
    if (!hasPaid) {
      setCurrentScreen('payment');
    } else {
      setCurrentScreen('generator');
    }
  };

  const handlePaymentSuccess = () => {
    setHasPaid(true);
    setCurrentScreen('generator');
  };

  // Conditional rendering based on authentication and payment status
  // Scenario 1: User is NOT authenticated -> Show LandingPage (switching to AuthScreen on interaction)
  if (!isAuthenticated) {
    if (currentScreen === 'auth') {
      return <AuthScreen onLogin={handleLogin} />;
    }
    return <LandingPage onAccessClick={handleAccessClick} />;
  }

  // Scenario 2: User IS authenticated but !hasPaid -> Show PaymentScreen
  if (isAuthenticated && !hasPaid) {
    return <PaymentScreen onPaymentSuccess={handlePaymentSuccess} />;
  }

  // Scenario 3: User IS authenticated AND hasPaid -> Show LottoGenerator
  return <LottoGenerator />;
}

export default App;