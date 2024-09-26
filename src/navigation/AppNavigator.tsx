import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import LoginScreen from '../screens/LoginScreen';
import FeedScreen from '../screens/FeedScreen';
import CatalogScreen from '../screens/CatalogScreen';
import LegislatorScreen from '../screens/LegislatorScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { colors } from '../styles/styles';
import { Legislator } from '../types/types';

type RootStackParamList = {
  Feed: undefined;
  CatalogStack: undefined;
  Settings: undefined;
};

type CatalogStackParamList = {
  Catalog: undefined;
  LegislatorScreen: { legislator: Legislator };
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const CatalogStack = createStackNavigator<CatalogStackParamList>();

const TabBarIcon = ({ name, color }: { name: string; color: string }) => (
  <Icon name={name} size={24} color={color} />
);

const TabBarLabel = ({ label, color }: { label: string; color: string }) => (
  <Text style={[styles.tabBarLabel, { color }]}>{label}</Text>
);

const CatalogStackScreen = () => (
  <CatalogStack.Navigator screenOptions={{ headerShown: false }}>
    <CatalogStack.Screen name="Catalog" component={CatalogScreen} />
    <CatalogStack.Screen name="LegislatorScreen" component={LegislatorScreen} />
  </CatalogStack.Navigator>
);

const AppNavigator: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

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

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.oldGloryBlue,
    borderTopWidth: 0,
    elevation: 0,
    height: 60,
    paddingBottom: 5,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default AppNavigator;
