import 'react-native-gesture-handler/jestSetup';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
  Feather: 'Feather',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  // Add other icon families you use
}));

jest.mock('expo-font');
jest.mock('expo-splash-screen');

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock Navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
  NavigationContainer: ({ children }) => children,
}));

// Mock Redux
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
  Provider: ({ children }) => children,
}));
