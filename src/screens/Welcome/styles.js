import { StyleSheet } from 'react-native';

import { buttonStyles, colors, componentStyles, size, typography } from '@/themes';

const styles = StyleSheet.create({
  container: {
    ...componentStyles.container,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: '10%',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...componentStyles.boldText,
    marginBottom: size.m,
    color: colors.secondary,
  },
  subtitle: {
    ...typography.largeTitle,
    textAlign: 'center',
    marginBottom: size.xl,
    color: colors.darkGray,
  },
  buttonContainer: {
    gap: size.l,
    marginTop: 'auto',
    alignItems: 'center',
    width: '100%',
    marginBottom: '25%',
  },
  loginButton: {
    ...buttonStyles.medium,
    width: '85%',
    backgroundColor: colors.tertiary,
  },
  loginButtonText: componentStyles.semiBoldText,
  signUpButton: {
    ...buttonStyles.medium,
    width: '85%',
    backgroundColor: colors.primary,
  },
  signUpButtonText: {
    ...componentStyles.semiBoldText,
    color: colors.lightGray,
  },
});

export default styles;
