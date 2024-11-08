import { StyleSheet } from 'react-native';

import { colors, size, typography } from '@/themes';

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.oldGloryBlue,
    borderTopWidth: 0,
    elevation: 0,
    height: 60,
    paddingBottom: size.xs,
  },
  tabBarLabel: {
    fontSize: typography.caption.fontSize,
    fontWeight: 'bold',
  },
});

export default styles;
