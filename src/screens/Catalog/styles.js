import { StyleSheet } from 'react-native';

import { colors, componentStyles, size, typography, withOpacity } from '@/themes';

export const ITEM_HEIGHT = 96;

const styles = StyleSheet.create({
  container: componentStyles.container,
  button: {
    backgroundColor: colors.oldGloryBlue,
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
  },
  tabButton: {
    flex: 1,
    paddingVertical: size.s * 1.5,
    alignItems: 'center',
  },
  tabButtonSelected: {
    borderBottomWidth: 2,
    borderBottomColor: colors.oldGloryRed,
  },
  tabButtonText: componentStyles.semiBoldText,
  tabButtonTextSelected: {
    color: colors.oldGloryRed,
    fontWeight: 'bold',
  },
  catalogList: {
    paddingVertical: size.m,
  },
  billItem: {
    ...componentStyles.card,
    height: ITEM_HEIGHT,
},
  billTitleLine: {
    flexDirection: 'row',
    marginBottom: size.s,
  },
  legislatorItem: {
    ...componentStyles.card,
    height: ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: size.s * 1.5,
    paddingHorizontal: size.m,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
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
    color: colors.oldGloryRed,
    fontWeight: 'bold',
  },
  legislatorDetails: typography.body,
  legislatorChamber: {
    ...typography.small,
    color: colors.darkGray,
  },
  itemTitle: {
    ...typography.subtitle,
    color: colors.oldGloryRed,
    fontWeight: 'bold',
  },
  itemDescription: {
    ...typography.body,
    marginBottom: size.s * 1.5,
  },
  dividerVertical: componentStyles.dividerVertical,
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
    color: colors.oldGloryBlue,
  },
  tagCarouselItem: {
    ...componentStyles.carouselItem,
    backgroundColor: withOpacity(colors.oldGloryBlue, 0.1),
    paddingVertical: size.xs,
    paddingHorizontal: size.s,
  },
  tagCarouselItemText: {
    ...typography.small,
    color: colors.oldGloryBlue,
  },
});

export default styles;
