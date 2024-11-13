import React, { useCallback } from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import BillScreen from '@/screens/BillDetail';
import CatalogScreen from '@/screens/Catalog';
import FeedScreen from '@/screens/Feed';
import LegislatorScreen from '@/screens/LegislatorDetail';
import LoginScreen from '@/screens/Login';
import SettingsScreen from '@/screens/Settings';
import { RootState } from '@/store';
import { colors } from '@/themes';

import styles from './styles';
import { RootStackParamList, CatalogStackParamList } from './types';

const Tab = createBottomTabNavigator<RootStackParamList>();
const CatalogStack = createStackNavigator<CatalogStackParamList>();

type IconName = keyof typeof Ionicons.glyphMap;

const CatalogStackScreen = React.memo(() => (
  <CatalogStack.Navigator
    detachInactiveScreens={false}
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      gestureResponseDistance: 50,
    }}>
    <CatalogStack.Screen name="Catalog" component={CatalogScreen} />
    <CatalogStack.Screen name="LegislatorScreen" component={LegislatorScreen} />
    <CatalogStack.Screen name="BillScreen" component={BillScreen} />
  </CatalogStack.Navigator>
));

const AppNavigator: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const tabBarIcon = useCallback(
    ({ focused, color, size, name }: { focused: boolean; color: string; size: number; name: string }) => {
      let iconName: IconName | undefined;

      switch (name) {
        case 'Feed':
          iconName = focused ? 'home' : 'home-outline';
          break;
        case 'CatalogStack':
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
        {name === 'CatalogStack' ? 'Catalog' : name}
      </Text>
    );
  }, []);

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

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
      <Tab.Screen name="CatalogStack" component={CatalogStackScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
