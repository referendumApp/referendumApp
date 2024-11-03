import { StyleSheet } from 'react-native';

import { colors, componentStyles, size } from '@/themes';

const styles = StyleSheet.create({
  searchInputContainer: {
    ...componentStyles.input,
    ...componentStyles.centerRow,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    color: colors.darkGray,
    fontSize: size.m,
  },
  searchIcon: {
    marginRight: size.s,
  },
});

export default styles;
