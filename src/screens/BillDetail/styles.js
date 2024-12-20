import { StyleSheet } from 'react-native';

import { colors, componentStyles, size, typography } from '@/themes';

const styles = StyleSheet.create({
  container: {
    ...componentStyles.container,
    paddingVertical: size.m,
  },
  cardContainer: {
    marginBottom: size.xl,
  },

  // Bill Detail Header
  header: {
    backgroundColor: colors.primary,
    paddingBottom: size.xxl,
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: size.xs,
    paddingHorizontal: size.m,
  },
  title: {
    ...typography.title,
    paddingBottom: size.s,
    flex: 2,
  },
  verticalLine: {
    ...componentStyles.dividerVertical,
  },
  billMetadataContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  billMetadata: {
    ...typography.body,
    color: colors.veryLightGray,
  },

  /* To-Do: Insert Status Label and Status Bar CSS Here*/

  subHeader: {
    ...componentStyles.subHeader,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: size.l * 1.5,
  },
  descriptionHeader: {
    ...componentStyles.centerRow,
    justifyContent: 'space-between',
    paddingBottom: size.l,
  },
  statusHeader: {
    ...componentStyles.centerRow,
    justifyContent: 'center',
  },
  scrollContainer: {
    paddingTop: size.m,
  },
  tabContainer: componentStyles.tabContainer,
  tagCarouselContainer: {
    ...componentStyles.carouselContainer,
    ...componentStyles.centerRow,
    marginLeft: 0,
    paddingLeft: size.m,
    paddingTop: size.m * 1.5,
  },
  tagCarouselTitle: {
    ...typography.body,
    color: colors.tertiary,
    paddingRight: size.s,
  },
  tagCarouselText: {
    ...typography.small,
    fontFamily: 'Inter-Bold',
    color: colors.tertiary,
  },
  tagCarouselItem: componentStyles.tagCarouselItem,
  tagCarouselSelectedItem: {
    backgroundColor: colors.tertiary,
  },
  tagCarouselItemText: {
    ...componentStyles.boldText,
    color: colors.tertiary,
  },
  tagCarouselSelectedItemText: {
    ...componentStyles.boldText,
    color: colors.primary,
  },
  wip: {
    ...typography.subtitle,
    color: colors.darkGray,
    paddingBottom: size.m,
  },
  subtitle: typography.subtitle,
  sectionHeader: {
    paddingLeft: size.s * 1.5,
  },
  sectionContent: {
    padding: size.s * 1.5,
  },
  billTitle: {
    ...componentStyles.boldText,
    paddingBottom: size.m,
  },
  sectionBody: {
    ...typography.body,
    fontSize: size.m - 2,
  },
  votingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: size.m,
  },
  voteButton: {
    opacity: 1,
    minWidth: 'auto',
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  votingTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: size.xl,
  },
  overviewRow: {
    ...componentStyles.itemRow,
    paddingVertical: size.s * 1.5,
    paddingLeft: 0,
    paddingRight: 0,
  },
  overviewCell: {
    ...typography.small,
    padding: size.s,
    color: colors.darkGray,
    flex: 0.5,
    textAlign: 'center',
  },
  overviewText: {
    ...typography.small,
    fontFamily: 'Inter-Bold',
    color: colors.darkGray,
  },
  table: {
    backgroundColor: colors.tertiary,
    borderRadius: 8,
    marginBottom: size.xl,
  },
  tableRow: {
    paddingVertical: size.s,
    marginBottom: 0,
    borderTopWidth: 1,
    borderTopColor: colors.darkGray,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  tableText: {
    ...componentStyles.boldText,
    fontSize: size.m - 2,
    flex: 0.5,
  },
  tableCell: {
    ...componentStyles.boldText,
    fontSize: size.m - 2,
    textAlign: 'center',
    flex: 0.5,
  },
  tableContent: {
    paddingTop: 0,
    paddingBottom: size.s,
    paddingHorizontal: size.s,
  },
  itemRow: componentStyles.itemRow,
  itemCell: {
    ...typography.small,
    flex: 0.55,
    color: colors.darkGray,
  },
  descCell: {
    ...typography.small,
    flex: 0.4,
    color: colors.darkGray,
  },
  tableHeader: {
    paddingHorizontal: 0,
    justifyContent: 'space-evenly',
  },
  tableHeaderText: {
    flex: 0.5,
    textAlign: 'center',
  },
  tableButton: {
    flex: 0.5,
    alignItems: 'center',
  },
  linkCell: {
    color: colors.linkBlue,
    textDecorationLine: 'underline',
  },
  commentContainer: {
    marginBottom: size.s,
  },
  commentAuthor: {
    ...typography.subtitle,
    fontWeight: 'bold',
  },
  voteCounts: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: size.s,
    marginBottom: size.m * 1.5,
  },
  voteBody: componentStyles.boldText,
  voteCount: {
    ...typography.body,
    paddingTop: size.xs,
  },
  voteText: {
    ...typography.body,
    textAlign: 'center',
    paddingTop: size.s,
  },
  noDisplay: {
    opacity: 0,
  },
});

export default styles;
