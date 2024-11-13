import { StyleSheet } from 'react-native';

import { buttonStyles, colors, componentStyles, size, typography } from '@/themes';

const styles = StyleSheet.create({
  container: {
    ...componentStyles.container,
    backgroundColor: colors.primary,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: size.xl,
  },
  logo: {
    backgroundColor: colors.tertiary,
    borderRadius: 9999,
    padding: size.s * 1.5,
    marginBottom: size.xl,
  },
  title: {
    ...typography.title,
    marginBottom: size.s,
  },
  subtitle: {
    ...typography.subtitle,
    textAlign: 'center',
    marginBottom: size.xl,
  },
  input: {
    ...componentStyles.input,
    width: '80%',
    marginBottom: size.m,
  },
  loginButton: {
    ...buttonStyles.medium,
    width: '80%',
    backgroundColor: colors.secondary,
  },
  loginButtonText: {
    ...componentStyles.boldText,
    color: colors.tertiary,
  },
  signUpButton: {
    marginTop: size.m,
  },
  signUpButtonText: {
    ...componentStyles.boldText,
    color: colors.tertiary,
  },
  placeholderTextColor: colors.mediumGray,
});

export default styles;
