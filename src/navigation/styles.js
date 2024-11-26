import { StyleSheet } from 'react-native';

import { colors, size, typography } from '@/themes';

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.primary,
    borderTopWidth: 0,
    elevation: 0,
    height: 95,
    paddingTop: size.m,
  },
  tabBarLabel: {
    ...typography.caption,
    fontWeight: 'bold',
  },
});

export default styles;
