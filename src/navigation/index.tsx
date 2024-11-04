import React, { useCallback } from 'react';
import { Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '@/screens/auth';
import BillScreen from '@/screens/bill';
import CatalogScreen from '@/screens/catalog';
import FeedScreen from '@/screens/feed';
import LegislatorScreen from '@/screens/legislator';
import SettingsScreen from '@/screens/settings';
import { RootState } from '@/store';
import { Theme } from '@/themes';
import { useTheme } from '@/themes/ThemeProvider';

import { RootStackParamList, CatalogStackParamList } from './types';

const Tab = createBottomTabNavigator<RootStackParamList>();
const CatalogStack = createStackNavigator<CatalogStackParamList>();

const TabBarIcon = React.memo(({ name, color }: { name: string; color: string }) => {
  return <Icon name={name} size={24} color={color} />;
});

const TabBarLabel = React.memo(({ label, color }: { label: string; color: string }) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  return <Text style={[styles.tabBarLabel, { color }]}>{label}</Text>;
});

const CatalogStackScreen = () => (
  <CatalogStack.Navigator screenOptions={{ headerShown: false }}>
    <CatalogStack.Screen name="Catalog" component={CatalogScreen} />
    <CatalogStack.Screen name="LegislatorScreen" component={LegislatorScreen} />
    <CatalogStack.Screen name="BillScreen" component={BillScreen} />
  </CatalogStack.Navigator>
);

const AppNavigator: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const theme = useTheme();
  const styles = createStyles(theme);

  const tabBarIcon = useCallback(({ color, name }: { color: string; name: string }) => {
    let iconName: string;
    switch (name) {
      case 'Feed':
        iconName = 'home';
        break;
      case 'CatalogStack':
        iconName = 'list';
        break;
      case 'Settings':
        iconName = 'settings';
        break;
      default:
        iconName = 'circle';
    }
    return <TabBarIcon name={iconName} color={color} />;
  }, []);

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
        tabBarActiveTintColor: theme.colors.oldGloryRed,
        tabBarInactiveTintColor: theme.colors.white,
        tabBarIcon: ({ color }) => tabBarIcon({ color, name: route.name }),
        tabBarLabel: ({ color }) => tabBarLabel({ color, name: route.name }),
      })}>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="CatalogStack" component={CatalogStackScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    tabBar: {
      backgroundColor: theme.colors.oldGloryBlue,
      borderTopWidth: 0,
      elevation: 0,
      height: 60,
      paddingBottom: theme.size.xs,
    },
    tabBarLabel: {
      fontSize: theme.typography.caption.fontSize,
      fontWeight: 'bold',
    },
  });

export default AppNavigator;
