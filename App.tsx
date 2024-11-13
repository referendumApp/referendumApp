import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-spash-screen';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation';
import store from './src/store';

// SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
  const [loaded, error] = useFonts({
    'OpenSans-Regular': require('./src/assets/fonts/OpenSans-Regular.ttf'),
    'Inter-Regular': require('./src/assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./src/assets/fonts/Inter-Medium.ttf'),
    'Inter-Bold': require('./src/assets/fonts/InterDisplay-Bold.ttf'),
  });

  // useEffect(() => {
  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
