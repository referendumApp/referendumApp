import { StyleSheet } from 'react-native';

import { colors, componentStyles, spacing, typography, withOpacity } from '@/themes';

const styles = StyleSheet.create({
  container: componentStyles.container,
  button: {
    backgroundColor: colors.oldGloryBlue,
    padding: spacing.xs * 0.5,
  },
  buttonContainer: {
    ...componentStyles.rowContainer,
    marginLeft: spacing.xs * 1.5,
  },
  header: componentStyles.header,
  headerText: componentStyles.headerText,
  subHeader: componentStyles.subHeader,
  searchBarContainer: {
    ...componentStyles.rowContainer,
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.s * 1.5,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
  },
  tabButton: {
    flex: 1,
    paddingVertical: spacing.s * 1.5,
    alignItems: 'center',
  },
  tabButtonSelected: {
    borderBottomWidth: 2,
    borderBottomColor: colors.oldGloryRed,
  },
  tabButtonText: componentStyles.semiBoldButtonText,
  tabButtonTextSelected: {
    color: colors.oldGloryRed,
    fontWeight: 'bold',
  },
  catalogList: {
    paddingVertical: spacing.m,
  },
  billItem: componentStyles.card,
  billTitleLine: {
    flexDirection: 'row',
    marginBottom: spacing.s,
  },
  legislatorItem: {
    ...componentStyles.card,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.s * 1.5,
    paddingHorizontal: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  legislatorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: spacing.m,
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
    marginBottom: spacing.s * 1.5,
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
    paddingRight: spacing.s,
    color: colors.oldGloryBlue,
  },
  tagCarouselItem: {
    ...componentStyles.carouselItem,
    backgroundColor: withOpacity(colors.oldGloryBlue, 0.1),
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.s,
  },
  tagCarouselItemText: {
    ...typography.small,
    color: colors.oldGloryBlue,
  },
});

export default styles;
