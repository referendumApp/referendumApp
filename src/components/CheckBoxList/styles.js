import { StyleSheet } from 'react-native';

import { colors, componentStyles, size, typography } from '@/themes';

const styles = StyleSheet.create({
  checkboxContainer: componentStyles.centerRow,
  checkbox: componentStyles.checkbox,
  checked: {
    backgroundColor: colors.appleBlue,
    borderColor: colors.appleBlue,
  },
  optionItem: {
    paddingVertical: size.s * 1.5,
  },
  optionText: {
    ...typography.body,
    marginLeft: size.s * 1.5,
  },
});

export default styles;