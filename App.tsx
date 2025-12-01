import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage.tsx';
import AuthScreen from './components/AuthScreen.tsx';
import PaymentScreen from './components/PaymentScreen.tsx';
import LottoGenerator from './components/LottoGenerator.tsx';

// User type for localStorage persistence
interface User {
  email: string;
  name: string;
}

// App flow states
type AppState = 'landing' | 'auth' | 'payment' | 'generator';

/**
 * App Flow:
 * 1. Landing Page - Marketing summary, CTA to proceed
 * 2. Auth Screen - Login/Registration (mocked, stored in localStorage)
 * 3. Payment Screen - Mercado Pago checkout (R$ 9,90)
 * 4. Lotto Generator - Main app functionality (unlocked after payment)
 * 
 * TODO: In production, user and payment status should be verified against
 * a real backend database, not localStorage.
 */

function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [hasPaid, setHasPaid] = useState(false);

  // Check localStorage for existing session on mount
  useEffect(() => {
    // TODO: Replace localStorage checks with real backend API calls
    // to verify user session and payment status
    const storedUser = localStorage.getItem('lotostats_user');
    const storedHasPaid = localStorage.getItem('lotostats_hasPaid');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      if (storedHasPaid === 'true') {
        setHasPaid(true);
        setAppState('generator');
      } else {
        setAppState('payment');
      }
    }
  }, []);

  // Handle proceeding from landing page to auth
  const handleProceedToAuth = () => {
    setAppState('auth');
  };

  // Handle user login/registration
  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    // TODO: Check payment status from backend database
    const storedHasPaid = localStorage.getItem('lotostats_hasPaid');
    if (storedHasPaid === 'true') {
      setHasPaid(true);
      setAppState('generator');
    } else {
      setAppState('payment');
    }
  };

  // Handle successful payment
  const handlePaymentSuccess = () => {
    // TODO: This should be triggered by a webhook from Mercado Pago
    // The webhook should update the user's hasPaid status in your database
    // Frontend should then fetch/verify this status from your backend
    setHasPaid(true);
    setAppState('generator');
  };

  // Handle logout
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('lotostats_user');
    localStorage.removeItem('lotostats_hasPaid');
    // Reset state
    setUser(null);
    setHasPaid(false);
    setAppState('landing');
  };

  // Render based on current app state
  switch (appState) {
    case 'landing':
      return <LandingPage onProceed={handleProceedToAuth} />;
    
    case 'auth':
      return <AuthScreen onLogin={handleLogin} />;
    
    case 'payment':
      if (!user) {
        // Safety check - shouldn't happen
        setAppState('auth');
        return null;
      }
      return (
        <PaymentScreen 
          user={user}
          onPaymentSuccess={handlePaymentSuccess}
          onLogout={handleLogout}
        />
      );
    
    case 'generator':
      return <LottoGenerator onLogout={handleLogout} />;
    
    default:
      return <LandingPage onProceed={handleProceedToAuth} />;
  }
}

export default App;