import React, { useState } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Implement your login logic here
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Implement your login logic here
    setIsLoggedIn(false);
  };

  const handleSignUp = () => {
    // Navigate to sign up screen or show sign up modal
    console.log('Navigate to sign up');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} onSignUp={handleSignUp} />;
  }
  return (
    <MainScreen onLogout={handleLogout} />
  );
};

export default App;
