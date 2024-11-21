import { ImageStyle, StyleSheet } from 'react-native';

import { colors, componentStyles, size, typography } from '@/themes';

const styles = StyleSheet.create({
  container: {
    ...componentStyles.container,
    paddingVertical: size.m,
  },
  header: {
    ...componentStyles.header,
    paddingTop: 0,
    paddingBottom: size.l,
    flexDirection: 'row',
    gap: size.xs,
  },
  dividerVertical: componentStyles.dividerVertical,
  partyImage: {
    width: 120,
    height: 120,
    borderRadius: 70,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 70,
    borderWidth: 1.5,
    borderColor: colors.white,
  } as ImageStyle,
  name: {
    ...typography.title,
    paddingBottom: size.s,
  },
  descriptionText: {
    ...typography.body,
    fontSize: size.m - 2,
    color: colors.tertiary,
    paddingBottom: size.xs * 0.5,
  },
  sectionHeader: {
    paddingLeft: size.s * 1.5,
  },
  sectionContent: {
    padding: size.s * 1.5,
  },
  sectionBody: typography.body,
  table: {
    backgroundColor: colors.tertiary,
    borderRadius: 8,
    marginTop: size.s,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    padding: size.s,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderText: {
    ...typography.subtitle,
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    padding: size.s,
    borderBottomWidth: 1,
  },
  tableCell: {
    ...typography.body,
    flex: 1,
  },
  seeMoreText: {
    ...typography.caption,
    color: colors.primary,
    marginTop: size.s,
  },
});

export default styles;
