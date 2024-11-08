import React, { useCallback } from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import BillScreen from '@/screens/BillDetail';
import CatalogScreen from '@/screens/Catalog';
import FeedScreen from '@/screens/feed';
import LegislatorScreen from '@/screens/legislator';
import LoginScreen from '@/screens/Login';
import SettingsScreen from '@/screens/settings';
import { RootState } from '@/store';
import { colors } from '@/themes';

import styles from './styles';
import { RootStackParamList, CatalogStackParamList } from './types';

const Tab = createBottomTabNavigator<RootStackParamList>();
const CatalogStack = createStackNavigator<CatalogStackParamList>();

const TabBarIcon = React.memo(({ name, color }: { name: string; color: string }) => {
  return <Icon name={name} size={24} color={color} />;
});

const TabBarLabel = React.memo(({ label, color }: { label: string; color: string }) => {
  return <Text style={[styles.tabBarLabel, { color }]}>{label}</Text>;
});

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

  const getIconName = useCallback((name: string): string => {
    const iconMap: Record<string, string> = {
      Feed: 'home',
      CatalogStack: 'list',
      Settings: 'settings',
    };
    return iconMap[name] ?? 'circle';
  }, []);

  const tabBarIcon = useCallback(
    ({ color, name }: { color: string; name: string }) => {
      return <TabBarIcon name={getIconName(name)} color={color} />;
    },
    [getIconName],
  );

  const tabBarLabel = useCallback(({ color, name }: { color: string; name: string }) => {
    return <TabBarLabel label={name === 'CatalogStack' ? 'Catalog' : name} color={color} />;
  }, []);

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.oldGloryRed,
        tabBarInactiveTintColor: colors.white,
        tabBarIcon: ({ color }) => tabBarIcon({ color, name: route.name }),
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
