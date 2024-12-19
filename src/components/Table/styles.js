import { StyleSheet } from 'react-native';

import { colors, componentStyles, typography, size } from '@/themes';

const styles = StyleSheet.create({
  content: {
    padding: 0,
  },
  table: {
    backgroundColor: colors.tertiary,
    borderRadius: 8,
  },
  tableHeader: {
    ...componentStyles.centerRow,
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: size.s,
    paddingHorizontal: size.m,
  },
  tableHeaderText: {
    ...typography.title,
    fontSize: size.m + 2,
  },
  tableRow: {
    paddingVertical: size.s,
    marginBottom: 0,
    borderTopWidth: 1,
    borderTopColor: colors.darkGray,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  seeMoreContainer: {
    alignItems: 'center',
    paddingBottom: size.s,
  },
  seeMoreText: {
    ...typography.caption,
    color: colors.primary,
    marginTop: size.s,
  },
});

export default styles;
