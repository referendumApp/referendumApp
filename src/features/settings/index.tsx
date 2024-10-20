import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {logout} from '@features/auth/duck';
import {colors, componentStyles, typography} from '@styles';

interface NavItemProps {
  title: string;
  onPress: () => void;
}

const NavItem: React.FC<NavItemProps> = ({title, onPress}) => (
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

const styles = StyleSheet.create({
  container: componentStyles.container,
  scrollView: {
    flex: 1,
  },
  header: componentStyles.header,
  headerText: componentStyles.headerText,
  section: {
    backgroundColor: colors.white,
    marginTop: 20,
    paddingVertical: 10,
  },
  sectionHeader: {
    ...typography.subtitle,
    color: colors.oldGloryBlue,
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
    borderBottomColor: colors.mediumGray,
  },
  navItemText: typography.body,
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
  },
  toggleItemText: typography.body,
  logoutButton: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  logoutButtonText: {
    ...typography.subtitle,
    color: colors.oldGloryRed,
  },
});

export default SettingsScreen;
