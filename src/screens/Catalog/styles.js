import { Platform, StyleSheet } from 'react-native';

import { colors, componentStyles, size, typography, withOpacity } from '@/themes';

export const BILL_ITEM_HEIGHT = 158;
export const LEGISLATOR_ITEM_HEIGHT = 96;

const styles = StyleSheet.create({
  container: componentStyles.container,
  button: {
    backgroundColor: colors.primary,
    padding: size.xs * 0.5,
  },
  buttonContainer: {
    ...componentStyles.centerRow,
    gap: size.xs,
    marginLeft: size.xs * 1.5,
  },
  header: componentStyles.header,
  headerText: componentStyles.headerText,
  overlay: componentStyles.overlay,
  subHeader: componentStyles.subHeader,
  searchBarContainer: {
    ...componentStyles.centerRow,
    gap: size.xs,
    paddingHorizontal: size.m,
    paddingBottom: size.s * 1.5,
  },
  tabContainer: componentStyles.tabContainer,
  tabButton: {
    flex: 1,
    paddingVertical: size.s * 1.5,
    alignItems: 'center',
  },
  tabButtonSelected: {
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
  },
  tabButtonText: componentStyles.semiBoldText,
  tabButtonTextSelected: {
    ...typography.body,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  catalogList: {
    paddingTop: size.m,
  },
  billItem: {
    ...componentStyles.item,
    ...Platform.select({
      android: {
        paddingHorizontal: size.m,
        paddingVertical: size.s,
      },
    }),
    height: BILL_ITEM_HEIGHT,
  },
  billTitleLine: {
    flexDirection: 'row',
    marginBottom: size.s,
  },
  legislatorItem: {
    ...componentStyles.item,
    height: LEGISLATOR_ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: size.s * 1.5,
    paddingHorizontal: size.m,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  svg: {
    marginRight: size.m,
  },
  legislatorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: size.m,
  },
  legislatorInfo: {
    flex: 1,
  },
  legislatorName: {
    ...typography.subtitle,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  legislatorChamber: {
    ...typography.small,
    color: colors.darkGray,
  },
  itemTitle: {
    ...typography.subtitle,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  itemDescription: typography.body,
  dividerVertical: componentStyles.dividerVertical,
  statusDate: {
    ...typography.date,
    marginBottom: size.s * 1.5,
  },
  tagCarouselContainer: {
    ...componentStyles.carouselContainer,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
    paddingLeft: 0,
  },
  tagCarouselTitle: {
    ...typography.body,
    fontWeight: 'bold',
    paddingRight: size.s,
    color: colors.primary,
  },
  tagCarouselItem: {
    ...componentStyles.carouselItem,
    backgroundColor: withOpacity(colors.primary, 0.1),
    paddingVertical: size.xs,
    paddingHorizontal: size.s,
  },
  tagCarouselItemText: {
    ...typography.small,
    color: colors.primary,
  },
});

export default styles;
