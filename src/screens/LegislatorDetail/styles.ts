import { ImageStyle, StyleSheet } from 'react-native';

import { colors, componentStyles, size, typography } from '@/themes';

const styles = StyleSheet.create({
  container: componentStyles.container,
  tabContainer: componentStyles.tabContainer,
  scrollContainer: {
    paddingTop: size.m,
  },
  header: {
    ...componentStyles.header,
    paddingTop: 0,
    paddingBottom: size.xl,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    gap: size.xs,
  },
  dividerVertical: componentStyles.dividerVertical,
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
  cardContent: {
    padding: 0,
  },
  sectionHeader: {
    paddingLeft: size.s * 1.5,
  },
  sectionContent: {
    padding: size.s * 1.5,
  },
  sectionBody: typography.body,
  test: {
    paddingBottom: 95,
  },
  table: {
    backgroundColor: colors.tertiary,
    borderRadius: 8,
    marginBottom: size.xl,
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
  tableCell: {
    ...componentStyles.boldText,
  },
  tableContent: {
    paddingTop: 0,
    paddingBottom: size.s,
    paddingHorizontal: size.s,
  },
  itemRow: {
    ...componentStyles.centerRow,
    justifyContent: 'space-between',
    paddingVertical: size.s,
    paddingHorizontal: size.s * 1.5,
    borderTopWidth: StyleSheet.hairlineWidth,
    flex: 0.4,
  },
  itemHeader: {
    padding: size.xs,
  },
  itemCell: {
    ...typography.small,
    color: colors.darkGray,
  },
  seeMoreText: {
    ...typography.caption,
    color: colors.primary,
    marginTop: size.s,
  },
});

export default styles;
