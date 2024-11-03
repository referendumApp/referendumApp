import { Platform, StyleSheet, TextStyle } from 'react-native';

// Color palette
export enum colors {
  transparent = 'rgba(0, 0, 0, 0.5)',
  oldGloryBlue = 'rgb(0, 40, 104)', // #002868
  oldGloryRed = 'rgb(191, 10, 48)', // #BF0A30
  black = 'rgb(0, 0, 0)', // black
  white = 'rgb(255, 255, 255)', // white
  offWhite = 'rgb(245, 245, 245)', // #F5F5F5
  veryLightGray = 'rgb(238, 238, 238)', // #eee
  lightGray = 'rgb(221, 221, 221)', // #ddd
  mediumGray = 'rgb(208, 208, 208)', // #D0D0D0
  lightMediumGray = 'rgb(153, 153, 153)', // #999
  secondaryMediumGray = 'rgb(102, 102, 102)', // #666
  darkGray = 'rgb(34, 34, 34)', // #222
  yesVoteGreen = 'rgb(102, 184, 90)', // #66B85A
  veryLightBlue = 'rgb(240, 248, 255)', // #F0F8FF
  appleBlue = 'rgb(0, 122, 255)', // #007AFF
}

export const withOpacity = (color: string, opacity: number) => {
  return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
};

// Typography
export const typography: Record<string, TextStyle> = {
  largeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  body: {
    fontSize: 16,
    color: colors.darkGray,
  },
  small: {
    fontSize: 14,
    color: colors.mediumGray,
  },
  caption: {
    fontSize: 12,
    color: colors.mediumGray,
  },
};

// Sizing
export const size = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};

// Shared styles
export const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    backgroundColor: colors.oldGloryBlue,
    padding: size.m,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  headerText: typography.largeTitle,
  subHeader: {
    backgroundColor: colors.oldGloryBlue,
    paddingBottom: size.s,
  },
  input: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: size.s,
    ...typography.body,
  },
  centerRow: {
    flexDirection: 'row',
    alignItems: 'center' as const,
  },
  button: {
    flexDirection: 'row',
    borderRadius: 8,
    justifyContent: 'center' as const,
    backgroundColor: colors.lightGray,
  },
  boldText: {
    ...typography.body,
    fontWeight: 'bold',
  },
  semiBoldText: {
    ...typography.body,
    fontWeight: '500',
  },
  modalTitle: {
    fontSize: size.m * 1.5,
    fontWeight: 'bold',
  },
  placeholderText : {
    color: colors.lightMediumGray,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginHorizontal: size.m,
    marginVertical: size.s,
    padding: size.m,
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: colors.darkGray,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  dividerVertical: {
    height: '100%',
    width: 1,
    backgroundColor: colors.mediumGray,
    marginHorizontal: size.s,
  },
  linkText: {
    ...typography.small,
    color: colors.oldGloryBlue,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  tag: {
    backgroundColor: withOpacity(colors.oldGloryBlue, 0.1),
    borderRadius: 8,
    paddingHorizontal: size.s,
    paddingVertical: size.xs,
    marginRight: size.s,
    marginBottom: size.xs,
  },
  tagText: {
    ...typography.caption,
    color: colors.oldGloryBlue,
  },
  carouselContainer: {
    paddingBottom: size.s,
    paddingLeft: size.s,
    marginLeft: size.s,
  },
  carouselItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: size.s,
    marginRight: size.s,
  },
  section: {
    padding: size.m,
  },
  checkbox: {
    width: size.l,
    height: size.l,
    borderRadius: 6,
    borderWidth: size.xs * 0.5,
    borderColor: colors.mediumGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Button Styles
export const buttonStyles = StyleSheet.create({
  small: {
    ...componentStyles.button,
    padding: size.s,
  },
  medium: {
    ...componentStyles.button,
    padding: size.m,
  },
  large: {
    ...componentStyles.button,
    padding: size.l,
  },
});

// Theme object
export const theme = {
  colors,
  typography,
  size,
  componentStyles,
  buttonStyles,
  withOpacity,
};

// Types
export type Theme = typeof theme;
export type ColorName = keyof typeof colors;
export type TypographyName = keyof typeof typography;
export type Size = keyof typeof size;
