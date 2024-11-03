import { Platform, StyleSheet } from 'react-native';

import { colors, size } from '@/themes';

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: size.s,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  buttonSmall: {
    padding: size.s,
    fontSize: size.s * 1.5,
    minWidth: size.xxl * 1.5,
  },
  buttonMedium: {
    padding: size.m,
    fontSize: size.m * 1.5,
    minWidth: size.xxl * 2.5,
  },
  buttonLarge: {
    padding: size.l,
    fontSize: size.l * 1.5,
    minWidth: size.xxl * 3.5,
  },
});

export default styles;
