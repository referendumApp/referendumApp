import { StyleSheet, TextStyle } from 'react-native';

// Color palette
export const colors = {
  oldGloryBlue: 'rgb(0, 40, 104)',    // #002868
  oldGloryRed: 'rgb(191, 10, 48)',    // #BF0A30
  white: 'rgb(255, 255, 255)',        // white
  lightGray: 'rgb(240, 240, 240)',    // #F0F0F0
  mediumGray: 'rgb(208, 208, 208)',   // #D0D0D0
  darkGray: 'rgb(34, 34, 34)',        // #222
  yesVoteGreen: 'rgb(102, 184, 90)', // #66B85A
};

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

// Spacing
export const spacing = {
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
    padding: spacing.m,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  headerText: typography.largeTitle,
  subHeader: {
    backgroundColor: colors.oldGloryBlue,
    paddingBottom: spacing.s,
  },
  input: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: spacing.s,
    ...typography.body,
  },
  button: {
    borderRadius: 8,
    padding: spacing.m,
    alignItems: 'center' as const,
    backgroundColor: colors.oldGloryRed,
  },
  buttonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginHorizontal: spacing.m,
    marginVertical: spacing.s,
    padding: spacing.m,
    elevation: 3,
    shadowColor: colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dividerVertical: {
    height: '100%',
    width: 1,
    backgroundColor: colors.mediumGray,
    marginHorizontal: spacing.s,
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
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xs,
    marginRight: spacing.s,
    marginBottom: spacing.xs,
  },
  tagText: {
    ...typography.caption,
    color: colors.oldGloryBlue,
  },
  carouselContainer: {
    paddingBottom: spacing.s,
    paddingLeft: spacing.s,
    marginLeft: spacing.s,
  },
  carouselItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.s,
    marginRight: spacing.s,
  },
  section: {
    padding: spacing.m,
  },
});

// Theme object
export const theme = {
  colors,
  typography,
  spacing,
  componentStyles,
  withOpacity,
};

// Types
export type Theme = typeof theme;
export type ColorName = keyof typeof colors;
export type TypographyName = keyof typeof typography;
export type SpacingName = keyof typeof spacing;
