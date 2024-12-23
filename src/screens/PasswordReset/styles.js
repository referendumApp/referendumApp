import { StyleSheet } from 'react-native';

import { buttonStyles, colors, componentStyles, size, typography } from '@/themes';

const styles = StyleSheet.create({
  container: {
    ...componentStyles.container,
    backgroundColor: colors.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: size.l,
  },
  title: {
    ...typography.title,
    textAlign: 'center',
    color: colors.darkGray,
  },
  body: {
    ...typography.body,
    textAlign: 'center',
    color: colors.darkGray,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
  },
  input: {
    ...componentStyles.input,
    marginBottom: size.m,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.errorRed,
  },
  backButton: {
    padding: size.m,
  },
  buttonContainer: {
    gap: size.l,
    alignItems: 'center',
    width: '100%',
    marginBottom: '20%',
  },
  successButtonContainer: {
    flex: 1,
    gap: size.l,
    alignItems: 'center',
    width: '100%',
    marginBottom: '20%',
  },
  disabledButton: {
    backgroundColor: colors.lightMediumGray,
  },
  button: {
    ...buttonStyles.medium,
    width: '85%',
    backgroundColor: colors.primary,
  },
  buttonText: {
    ...componentStyles.semiBoldText,
    color: colors.tertiary,
  },
  errorMsg: {
    ...typography.body,
    color: colors.errorRed,
  },
  noDisplay: {
    opacity: 0,
  },
});

export default styles;
