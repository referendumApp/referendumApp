import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

import {
  mockBills,
  mockBillBriefing,
  mockBillText,
  mockBillVotes,
  mockBillVotingHistory,
  mockBillUserVotes,
  mockFollowedBills,
  mockLegislators,
  mockLegislatorFollows,
  mockLegislatorVotingHistory,
  mockLogin,
  mockSignUp,
} from './jest.constants';

jest.mock('expo-constants', () => ({
  Constants: { expoConfig: {} },
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
  Feather: 'Feather',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  // Add other icon families you use
}));

// Mock custom Expo Icon component wrapper
jest.mock('@/components/Icon', () => {
  const React = jest.requireActual('react');
  const { Text } = jest.requireActual('react-native');

  return function MockIcon({ iconFamily, iconName, iconSize, iconColor, style }) {
    const color = iconColor ? iconColor : style?.color;

    return <Text testID={`${iconFamily}-${iconName}-${color}`}>{iconSize}</Text>;
  };
});

jest.mock('expo-font', () => ({
  useFonts: () => [true, null],
}));

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
  setOptions: jest.fn(),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  SafeAreaView: ({ children }) => children,
}));

// Mock Navigation
export const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
      goBack: jest.fn(),
    }),
    NavigationContainer: ({ children }) => children,
  };
});

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  }),
}));

// Mock stack navigator
jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  }),
}));

// Mock Redux
// jest.mock('react-redux', () => ({
//   useSelector: jest.fn(),
//   useDispatch: () => jest.fn(),
//   useStore: () => jest.fn(),
//   Provider: ({ children }) => children,
// }));

// Mock redux-devtools-expo-dev-plugin
jest.mock('redux-devtools-expo-dev-plugin', () => {
  return {
    __esModule: true,
    default: () => next => next,
  };
});

jest.mock('@/screens/SignUp/redux/api', () => ({
  useSignUpUserMutation: () => [mockSignUp, { isLoading: false }],
}));

jest.mock('@/screens/Login/redux/api', () => ({
  useGetUserSessionMutation: () => [mockLogin, { isLoading: false }],
}));

jest.mock('@/screens/BillDetail/redux/api', () => ({
  useGetBillDetailsQuery: mockBills,
  useGetFollowedBillsQuery: mockFollowedBills,
  useGetBillVotesQuery: mockBillVotes,
  useGetBillBriefingQuery: mockBillBriefing,
  useGetBillTextQuery: mockBillText,
  useGetBillVotingHistoryQuery: mockBillVotingHistory,
  useGetUserBillVotesQuery: mockBillUserVotes,
  useCastBillVoteMutation: jest
    .fn()
    .mockImplementation(() => [jest.fn().mockResolvedValue(), { isLoading: false }]),
  useUncastBillVoteMutation: jest
    .fn()
    .mockImplementation(() => [jest.fn().mockResolvedValue(), { isLoading: false }]),
  useFollowBillMutation: jest
    .fn()
    .mockImplementation(() => [jest.fn().mockResolvedValue(), { isLoading: false }]),
  useUnfollowBillMutation: jest
    .fn()
    .mockImplementation(() => [jest.fn().mockResolvedValue(), { isLoading: false }]),
}));

jest.mock('@/screens/LegislatorDetail/redux/api', () => ({
  useGetLegislatorsQuery: mockLegislators,
  useGetFollowedLegislatorsQuery: mockLegislatorFollows,
  useGetLegislatorVotingHistoryQuery: mockLegislatorVotingHistory,
  useFollowLegislatorMutation: jest
    .fn()
    .mockImplementation(() => [jest.fn().mockResolvedValue(), { isLoading: false }]),
  useUnfollowLegislatorMutation: jest
    .fn()
    .mockImplementation(() => [jest.fn().mockResolvedValue(), { isLoading: false }]),
}));
