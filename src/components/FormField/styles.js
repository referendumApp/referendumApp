import { StyleSheet } from 'react-native';

import { colors, componentStyles, size } from '@/themes';

const styles = StyleSheet.create({
  tooltip: {
    alignItems: 'flex-start',
    width: '95%',
  },
  input: {
    ...componentStyles.input,
    marginBottom: size.m,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.errorRed,
  },
});

export default styles;
