import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '@app-state/store';
import { Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '@styles/ThemeProvider';
import { Theme } from '@styles';

import LoginScreen from '@features/login';
import FeedScreen from '@features/feed';
import CatalogScreen from '@features/catalog';
import BillScreen from '@features/bill';
import LegislatorScreen from '@features/legislator';
import SettingsScreen from '@features/settings';
import { RootStackParamList, CatalogStackParamList } from './types';

const Tab = createBottomTabNavigator<RootStackParamList>();
const CatalogStack = createStackNavigator<CatalogStackParamList>();

const TabBarIcon = ({ name, color }: { name: string; color: string }) => (
  <Icon name={name} size={24} color={color} />
);

const TabBarLabel = ({ label, color }: { label: string; color: string }) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  return <Text style={[styles.tabBarLabel, { color }]}>{label}</Text>;
};

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
        tabBarIcon: ({ color }) => {
          let iconName: string;
          switch (route.name) {
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
        },
        tabBarLabel: ({ color }) => (
          <TabBarLabel label={route.name === 'CatalogStack' ? 'Catalog' : route.name} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="CatalogStack" component={CatalogStackScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const createStyles = (theme: Theme) => StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.oldGloryBlue,
    borderTopWidth: 0,
    elevation: 0,
    height: 60,
    paddingBottom: theme.spacing.xs,
  },
  tabBarLabel: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: 'bold',
  },
});

export default AppNavigator;
