import {StyleSheet, TextStyle} from 'react-native';

// Color palette
const colors = {
  oldGloryBlue: 'rgb(0, 40, 104)',  // #002868
  oldGloryRed: 'rgb(191, 10, 48)',  // #BF0A30
  white: 'rgb(255, 255, 255)',      // white
  lightGray: 'rgb(240, 240, 240)',  // #F0F0F0
  mediumGray: 'rgb(208, 208, 208)', // #D0D0D0
  darkGray: 'rgb(34, 34, 34)',      // #222
};

const withOpacity = (color: string, opacity: number) => {
  return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
};

// Typography
const typography: Record<string, TextStyle> = {
  largeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
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
    color: 'gray',
  },
};

// Shared styles
const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    backgroundColor: colors.oldGloryBlue,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: typography.largeTitle,
  subHeader: {
    backgroundColor: colors.oldGloryBlue,
    paddingBottom: 8,
  },
  input: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 8,
  },
  button: {
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dividerVertical: {
    height: '100%',
    width: 1,
    backgroundColor: '#CCCCCC', // or any color you prefer
    marginHorizontal: 10, // adjust as needed
  },
  linkText: {
    color: colors.oldGloryBlue,
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: 'semibold',
  },
  tag: {
    backgroundColor: 'rgba(0, 0, 139, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    color: colors.oldGloryBlue,
    fontSize: 12,
  },
  carouselContainer: {
    paddingBottom: 8,
    paddingLeft: 8,
    marginLeft: 8,
  },
  carouselItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 6,
    marginRight: 8,
  },
  section: {
    padding: 16,
  }
});

export {colors, typography, componentStyles, withOpacity};
