import { Platform, StyleSheet } from 'react-native';

import { colors, size } from '@/themes';

const styles = StyleSheet.create({
  buttonActive: {
    opacity: 0.8,
  },
  buttonContainer: {
    opacity: 1,
    gap: size.s,
    ...Platform.select({
      android: {
        elevation: 6,
      },
      ios: {
        shadowColor: colors.darkGray,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
    }),
  },
  buttonSmall: {
    padding: size.s,
    minWidth: size.xxl * 1.5,
  },
  buttonMedium: {
    padding: size.m,
    minWidth: size.xxl * 2.5,
  },
  buttonLarge: {
    padding: size.m * 1.5,
    minWidth: size.xxl * 3.5,
  },
  buttonXlarge: {
    padding: size.xl,
    minWidth: size.xxl * 4.5,
  },
  buttonTextSmall: {
    fontSize: size.s * 1.5,
  },
  buttonTextMedium: {
    fontSize: size.m,
  },
  buttonTextLarge: {
    fontSize: size.m * 1.25,
  },
  buttonTextXlarge: {
    fontSize: size.m * 1.5,
  },
});

export default styles;
