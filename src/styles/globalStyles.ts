import {StyleSheet, TextStyle} from 'react-native';

// Color palette
const colors = {
  oldGloryBlue: '#002868',
  oldGloryRed: '#BF0A30',
  white: 'white',
  lightGray: '#F0F0F0',
  mediumGray: '#E0E0E0',
  darkGray: '#222',
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
  input: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  button: {
    borderRadius: 8,
    padding: 15,
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
});

export {colors, typography, componentStyles};
