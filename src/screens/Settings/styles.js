import { StyleSheet } from 'react-native';

import { colors, componentStyles, typography } from '@/themes';

const styles = StyleSheet.create({
  container: componentStyles.container,
  scrollView: {
    flex: 1,
  },
  header: componentStyles.header,
  headerText: componentStyles.headerText,
  section: {
    backgroundColor: colors.tertiary,
    marginTop: 20,
    paddingVertical: 10,
  },
  sectionHeader: {
    ...typography.subtitle,
    color: colors.primary,
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
    color: colors.secondary,
  },
});

export default styles;
