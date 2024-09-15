import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

interface NavItemProps {
  title: string;
  onPress: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ title, onPress }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Text style={styles.navItemText}>{title}</Text>
  </TouchableOpacity>
);

interface MainScreenProps {
  onLogout: () => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ onLogout }) => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleLogout = () => {
    onLogout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Settings</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Account</Text>
          <NavItem title="Edit Profile" onPress={() => console.log('Edit Profile')} />
          <NavItem title="Edit Follow Preferences" onPress={() => console.log('Edit Follow Preferences')} />
          <NavItem title="Change Password" onPress={() => console.log('Change Password')} />
          <NavItem title="Privacy Settings" onPress={() => console.log('Privacy Settings')} />
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Notifications</Text>
          <View style={styles.toggleItem}>
            <Text style={styles.toggleItemText}>Push Notifications</Text>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: '#767577', true: '#002868' }}
              thumbColor="#f4f3f4"
            />
          </View>
          <View style={styles.toggleItem}>
            <Text style={styles.toggleItemText}>Email Notifications</Text>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ false: '#767577', true: '#002868' }}
              thumbColor="#f4f3f4"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Support</Text>
          <NavItem title="Help Center" onPress={() => console.log('Help Center')} />
          <NavItem title="About" onPress={() => console.log('About')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#002868',
    padding: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingVertical: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#002868',
    marginLeft: 15,
    marginBottom: 10,
  },
  navItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  navItemText: {
    fontSize: 16,
  },
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  toggleItemText: {
    fontSize: 16,
  },
  logoutButton: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#BF0A30',
    fontWeight: 'bold',
  },
});

export default MainScreen;
