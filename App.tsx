import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';
import FeedScreen from './src/screens/FeedScreen';
import CatalogScreen from './src/screens/CatalogScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // TODO - real user logins
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
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
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
    headerShown: false // This will hide the header for all tabs
  }}>
        <Tab.Screen name="Feed" component={FeedScreen}  />
        <Tab.Screen name="Catalog" component={CatalogScreen} />
        <Tab.Screen 
          name="Settings" 
          children={()=><MainScreen onLogout={handleLogout} />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
