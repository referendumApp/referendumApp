import { StyleSheet } from 'react-native';

import { componentStyles, size, typography } from '@/themes';

const styles = StyleSheet.create({
  searchInputContainer: {
    ...componentStyles.input,
    ...componentStyles.centerRow,
    flex: 1,
  },
  searchInput: {
    ...typography.body,
    flex: 1,
  },
  searchIcon: {
    marginRight: size.s,
  },
});

export default styles;
