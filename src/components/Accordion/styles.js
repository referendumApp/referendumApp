import { StyleSheet } from 'react-native';

import { colors, componentStyles, size } from '@/themes';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  accordionItem: {
    backgroundColor: colors.white,
    borderRadius: size.s,
    marginBottom: size.s,
    overflow: 'hidden',
  },
  header: {
    ...componentStyles.centerRow,
    justifyContent: 'space-between',
    padding: size.m,
    backgroundColor: colors.white,
  },
  headerText: componentStyles.semiBoldText,
  content: {
    padding: size.m,
    backgroundColor: colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.lightGray,
  },
});

export default styles;
