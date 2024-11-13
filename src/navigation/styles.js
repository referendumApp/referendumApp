import { StyleSheet } from 'react-native';

import { colors, size, typography } from '@/themes';

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.primary,
    borderTopWidth: 0,
    elevation: 0,
    height: 80,
    paddingTop: size.m,
    paddingBottom: size.m,
  },
  tabBarLabel: {
    ...typography.caption,
    fontWeight: 'bold',
  },
});

export default styles;
