import { StyleSheet } from 'react-native';

import { colors, componentStyles, size } from '@/themes';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  accordionItem: {
    backgroundColor: colors.tertiary,
    marginBottom: size.s,
    overflow: 'hidden',
  },
  header: {
    ...componentStyles.centerRow,
    justifyContent: 'space-between',
    padding: size.m,
    backgroundColor: colors.tertiary,
  },
  headerText: componentStyles.semiBoldText,
  content: {
    padding: size.m,
    backgroundColor: colors.tertiary,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.lightGray,
  },
});

export default styles;
