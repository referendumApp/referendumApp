import React, { useCallback } from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BillScreen from '@/screens/BillDetail';
import CatalogScreen from '@/screens/Catalog';
import FeedScreen from '@/screens/Feed';
import LegislatorScreen from '@/screens/LegislatorDetail';
import LoginScreen from '@/screens/Login';
import PasswordResetScreen from '@/screens/PasswordReset';
import SettingsScreen from '@/screens/Settings';
import SignUpScreen from '@/screens/SignUp';
import WelcomeScreen from '@/screens/Welcome';
import { RootState } from '@/store';
import { colors } from '@/themes';

import styles from './styles';
import {
  RootStackParamList,
  AuthStackParamList,
  AppStackParamList,
  CatalogStackParamList,
  SettingsStackParamList,
} from './types';


const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<AppStackParamList>();
const CatalogStack = createNativeStackNavigator<CatalogStackParamList>();
const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

type IconName = keyof typeof Ionicons.glyphMap;

const AuthNavigator = React.memo(() => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      gestureResponseDistance: {
        start: 50,
        end: 50,
      },
    }}>
    <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
));

const CatalogStackScreen = React.memo(() => (
  <CatalogStack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      gestureResponseDistance: {
        start: 50,
        end: 50,
      },
    }}>
    <CatalogStack.Screen name="CatalogScreen" component={CatalogScreen} />
    <CatalogStack.Screen name="LegislatorScreen" component={LegislatorScreen} />
    <CatalogStack.Screen name="BillScreen" component={BillScreen} />
  </CatalogStack.Navigator>
));

const SettingsStackScreen = React.memo(() => (
  <SettingsStack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      gestureResponseDistance: {
        start: 50,
        end: 50,
      },
    }}
  >
    <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
    <SettingsStack.Screen name="PasswordResetScreen" component={PasswordResetScreen} />
  </SettingsStack.Navigator>
));

const AppNavigator: React.FC = () => {
  const tabBarIcon = useCallback(
    ({
      focused,
      color,
      size,
      name,
    }: {
      focused: boolean;
      color: string;
      size: number;
      name: string;
    }) => {
      let iconName: IconName | undefined;

      switch (name) {
        case 'Feed':
          iconName = focused ? 'home' : 'home-outline';
          break;
        case 'Catalog':
          iconName = focused ? 'book' : 'book-outline';
          break;
        case 'Settings':
          iconName = focused ? 'settings' : 'settings-outline';
          break;
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    [],
  );

  const tabBarLabel = useCallback(({ color, name }: { color: string; name: string }) => {
    return (
      <Text style={[styles.tabBarLabel, { color }]}>
        {name}
      </Text>
    );
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.tertiary,
        tabBarInActiveTintColor: colors.tertiary,
        tabBarIcon: ({ focused, color, size }) =>
          tabBarIcon({ focused, color, size, name: route.name }),
        tabBarLabel: ({ color }) => tabBarLabel({ color, name: route.name }),
        lazy: true,
        tabBarHideOnKeyboard: true,
        freezeOnBlur: true,
      })}>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Catalog" component={CatalogStackScreen} />
      <Tab.Screen name="Settings" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <RootStack.Navigator>
      {!isLoggedIn ? (
        <RootStack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
      ) : (
        <RootStack.Screen name="App" component={AppNavigator} options={{ headerShown: false }} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
