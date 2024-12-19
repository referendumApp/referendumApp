import { StyleSheet } from 'react-native';

import { colors, size, typography } from '@/themes';
import { TAB_HEIGHT } from '@/themes/dimensions';

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.primary,
    borderTopWidth: 0,
    elevation: 0,
    height: TAB_HEIGHT,
    paddingTop: size.l,
  },
  tabBarLabel: {
    ...typography.caption,
    fontWeight: 'bold',
  },
});

export default styles;
