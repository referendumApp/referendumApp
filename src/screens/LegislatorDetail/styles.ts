import { ImageStyle, StyleSheet } from 'react-native';

import { colors, componentStyles, size, typography } from '@/themes';

const styles = StyleSheet.create({
  container: componentStyles.container,
  cardContainer: {
    marginBottom: size.xl,
  },
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
  detailContainer: {
    flex: 1,
  },
  nameContainer: {
    flexShrink: 1,
    paddingBottom: size.s,
  },
  name: {
    ...typography.title,
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
  tableRow: {
    paddingVertical: size.s,
    marginBottom: 0,
    borderTopWidth: 1,
    borderTopColor: colors.darkGray,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  tableCell: componentStyles.boldText,
  tableContent: {
    paddingTop: 0,
    paddingBottom: size.s,
    paddingHorizontal: size.s,
  },
  itemRow: componentStyles.itemRow,
  itemCell: {
    ...typography.small,
    flex: 0.33,
    color: colors.darkGray,
  },
  descCell: {
    ...typography.small,
    flex: 0.45,
    color: colors.darkGray,
  },
  seeMoreText: {
    ...typography.caption,
    color: colors.primary,
    marginTop: size.s,
  },
});

export default styles;
