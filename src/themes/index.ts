import { Platform, StyleSheet, TextStyle } from 'react-native';

// Color palette
export enum colors {
  primary = 'rgb(10, 30, 63)', // #0A1E3F
  secondary = 'rgb(163, 29, 40)', // #A31D28
  tertiary = 'rgb(240, 240, 240)', // #F0F0F0
  transparent = 'rgba(0, 0, 0, 0.5)',
  semiTransparent = 'rgba(0, 0, 0, 0.8)',
  black = 'rgb(0, 0, 0)', // black
  white = 'rgb(255, 255, 255)', // white
  veryLightGray = 'rgb(238, 238, 238)', // #eee
  lightGray = 'rgb(221, 221, 221)', // #ddd
  mediumGray = 'rgb(208, 208, 208)', // #D0D0D0
  lightMediumGray = 'rgb(153, 153, 153)', // #999
  secondaryMediumGray = 'rgb(102, 102, 102)', // #666
  darkGray = 'rgb(34, 34, 34)', // #222
  yesVoteGreen = 'rgb(102, 184, 90)', // #66B85A
  veryLightBlue = 'rgb(240, 248, 255)', // #F0F8FF
  successGreen = 'rgb(37, 142, 79)', // #258E4F
  errorRed = 'rgb(155, 3, 0)', // #EB5757
  linkBlue = 'rgb(53, 149, 250)', // #3595FA
  gold = 'rgb(255, 215, 0)', // #FFD700
}

export const withOpacity = (color: string, opacity: number) => {
  return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
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

// Typography
export const typography: Record<string, TextStyle> = {
  largeTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: size.xl,
    color: colors.tertiary,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: size.l,
    color: colors.tertiary,
  },
  subtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: size.m + 2,
    color: colors.tertiary,
  },
  body: {
    fontFamily: 'OpenSans-Regular',
    fontSize: size.m,
    color: colors.darkGray,
  },
  small: {
    fontFamily: 'OpenSans-Regular',
    fontSize: size.m - 2,
    color: colors.mediumGray,
  },
  link: {
    fontFamily: 'Inter-Regular',
    fontSize: size.m - 2,
    color: colors.linkBlue,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: size.m - 2,
    color: colors.darkGray,
  },
  caption: {
    fontFamily: 'OpenSans-Regular',
    fontSize: size.s * 1.5,
    color: colors.mediumGray,
  },
};

// Shared styles
export const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.tertiary,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
  },
  header: {
    backgroundColor: colors.primary,
    padding: size.m,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  headerText: typography.largeTitle,
  subHeader: {
    backgroundColor: colors.primary,
    paddingBottom: size.s,
  },
  input: {
    width: '100%',
    backgroundColor: colors.tertiary,
    borderRadius: 8,
    padding: size.s,
    paddingLeft: size.s * 1.5,
    ...typography.body,
  },
  centerRow: {
    flexDirection: 'row',
    alignItems: 'center' as const,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center' as const,
    backgroundColor: colors.lightGray,
  },
  boldText: {
    ...typography.body,
    fontFamily: 'Inter-Bold',
  },
  semiBoldText: {
    ...typography.body,
    fontFamily: 'Inter-Medium',
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: size.m * 1.5,
  },
  placeholderText: {
    fontFamily: 'OpenSans-Regular',
    color: colors.lightMediumGray,
  },
  card: {
    backgroundColor: colors.tertiary,
    borderRadius: 12,
    marginHorizontal: size.m,
    marginVertical: size.s,
    padding: size.m,
    ...Platform.select({
      android: {
        elevation: 16,
      },
      ios: {
        shadowColor: colors.darkGray,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
      },
    }),
  },
  item: {
    backgroundColor: colors.tertiary,
    borderRadius: 12,
    marginHorizontal: size.m,
    marginBottom: size.l,
    padding: size.m,
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
  dividerHorizontal: {
    alignSelf: 'center',
    height: 1,
    width: '85%',
    backgroundColor: colors.mediumGray,
    marginVertical: size.l,
  },
  dividerVertical: {
    height: '100%',
    width: 1,
    backgroundColor: colors.mediumGray,
    marginHorizontal: size.s,
  },
  linkText: {
    ...typography.link,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  tag: {
    backgroundColor: withOpacity(colors.primary, 0.1),
    borderRadius: 8,
    paddingHorizontal: size.s,
    paddingVertical: size.xs,
    marginRight: size.s,
    marginBottom: size.xs,
  },
  tagText: {
    ...typography.caption,
    color: colors.primary,
  },
  carouselContainer: {
    paddingBottom: size.s,
    paddingLeft: size.s,
    marginLeft: size.s,
  },
  carouselItem: {
    backgroundColor: colors.tertiary,
    borderRadius: 12,
    padding: size.s,
    marginRight: size.s,
  },
  tagCarouselItem: {
    backgroundColor: colors.primary,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.tertiary,
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
  followButton: {
    borderColor: colors.tertiary,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: size.xs,
    paddingHorizontal: size.m,
  },
  followButtonText: {
    ...typography.body,
    color: colors.tertiary,
  },
  selectedFollowButton: {
    backgroundColor: colors.tertiary,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: size.xs,
    paddingHorizontal: size.m,
  },
  selectedFollowButtonText: {
    ...typography.body,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
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
    padding: size.s * 1.5,
  },
  large: {
    ...componentStyles.button,
    padding: size.m,
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
