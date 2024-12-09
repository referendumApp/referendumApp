import { StyleSheet } from 'react-native';

import { buttonStyles, colors, componentStyles, size, typography } from '@/themes';

const styles = StyleSheet.create({
  container: {
    ...componentStyles.container,
    backgroundColor: colors.white,
  },
  content: {
    flex: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: size.l,
  },
  title: {
    ...typography.title,
    textAlign: 'center',
    color: colors.darkGray,
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
  },
  backButton: {
    padding: size.m,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  loginButton: {
    ...buttonStyles.medium,
    width: '85%',
    backgroundColor: colors.primary,
  },
  loginButtonText: {
    ...componentStyles.semiBoldText,
    color: colors.tertiary,
  },
  dividerHorizontal: componentStyles.dividerHorizontal,
});

export default styles;
