import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './src/themes/ThemeProvider';

import store from './src/store';
import {Provider} from 'react-redux';
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
