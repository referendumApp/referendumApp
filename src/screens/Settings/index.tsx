import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { logout } from '@/screens/Login/duck';

import styles from './styles';

interface NavItemProps {
  title: string;
  onPress: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ title, onPress }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Text style={styles.navItemText}>{title}</Text>
  </TouchableOpacity>
);

const SettingsScreen: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Settings</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Account</Text>
          {/* <NavItem title="Edit Profile" onPress={() => console.log('Edit Profile')} /> */}
          <NavItem
            title="Edit Follow Preferences"
            onPress={() => console.log('Edit Follow Preferences')}
          />
          {/* <NavItem title="Change Password" onPress={() => console.log('Change Password')} /> */}
          {/* <NavItem title="Privacy Settings" onPress={() => console.log('Privacy Settings')} /> */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Support</Text>
          {/* <NavItem title="Help Center" onPress={() => console.log('Help Center')} /> */}
          {/* <NavItem title="About" onPress={() => console.log('About')} /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
