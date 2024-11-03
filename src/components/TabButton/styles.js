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
    borderBottomColor: colors.oldGloryRed,
  },
  tabButtonText: componentStyles.semiBoldText,
  tabButtonTextSelected: {
    color: colors.oldGloryRed,
    fontWeight: 'bold',
  },
});

export default styles;
