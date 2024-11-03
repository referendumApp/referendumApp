import React from 'react';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation';
import store from './src/store';
import { ThemeProvider } from './src/themes/ThemeProvider';

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
