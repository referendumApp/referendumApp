import { StyleSheet } from 'react-native';

import { colors, componentStyles, size } from '@/themes';

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    paddingVertical: size.s * 1.5,
    alignItems: 'center',
  },
  tabButtonSelected: {
    borderBottomWidth: size.xs * 0.5,
    borderBottomColor: colors.secondary,
  },
  tabButtonText: componentStyles.semiBoldText,
  tabButtonTextSelected: {
    ...componentStyles.boldText,
    color: colors.secondary,
  },
});

export default styles;
