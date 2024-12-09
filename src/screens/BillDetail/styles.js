import { StyleSheet } from 'react-native';

import { colors, componentStyles, size, typography } from '@/themes';

const styles = StyleSheet.create({
  container: {
    ...componentStyles.container,
    paddingVertical: size.m,
  },
  header: {
    backgroundColor: colors.primary,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: size.xxl,
  },
  titleContainer: {
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: size.xs,
    paddingHorizontal: size.m,
  },
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
  title: { ...typography.largeTitle, paddingBottom: size.s },
  subtitle: typography.subtitle,
  sectionHeader: {
    paddingLeft: size.s * 1.5,
  },
  briefingContainer: {
    marginBottom: size.xl,
  },
  sectionContent: {
    padding: size.s * 1.5,
  },
  billTitle: componentStyles.boldText,
  sectionBody: typography.body,
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
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    padding: size.s,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderText: {
    ...typography.subtitle,
    color: colors.tertiary,
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    padding: size.s,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
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
  commentContainer: {
    marginBottom: size.s,
  },
  commentAuthor: {
    ...typography.subtitle,
    fontWeight: 'bold',
  },
  commentText: typography.body,
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
