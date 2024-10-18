import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from './src/styles/ThemeProvider';

import store from './src/app-state/store';
import AppNavigator from './src/navigation';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
