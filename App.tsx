import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { ThemeProvider } from './src/styles/ThemeProvider';

import store from './src/app-state/store';
import AppNavigator from './src/navigation';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
