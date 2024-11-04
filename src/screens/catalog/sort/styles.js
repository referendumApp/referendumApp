import { StyleSheet } from 'react-native';

import { colors, componentStyles, size } from '@/themes';

const styles = StyleSheet.create({
  optionsContainer: {
    padding: size.m,
  },
  optionItem: {
    paddingVertical: size.s * 1.5,
  },
  radioContainer: componentStyles.centerRow,
  radio: {
    ...componentStyles.checkbox,
    borderRadius: 12,
  },
  radioSelected: {
    borderColor: colors.appleBlue,
  },
  radioInner: {
    width: size.s * 1.5,
    height: size.s * 1.5,
    borderRadius: 6,
    backgroundColor: colors.appleBlue,
  },
  optionText: {
    marginLeft: size.s * 1.5,
    fontSize: size.m,
  },
});

export default styles;
