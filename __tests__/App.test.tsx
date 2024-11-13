import { render } from '@testing-library/react-native';

import App from '../App';

jest.mock('expo-font', () => ({
  useFonts: () => [true],
}));

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

describe('App', () => {
  it('renders correctly', () => {
    render(<App />);
  });
});
