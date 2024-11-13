import 'react-native-gesture-handler/jestSetup';

jest.mock('expo-font');
jest.mock('expo-splash-screen');

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
