import { Platform, StyleSheet } from 'react-native';

import { colors, componentStyles, size, typography } from '@/themes';

const styles = StyleSheet.create({
  container: {
    ...componentStyles.container,
    paddingVertical: size.m,
  },
  header: {
    backgroundColor: colors.primary,
    height: '30%',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: size.xs,
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
  tagCarouselContainer: {
    ...componentStyles.carouselContainer,
    ...componentStyles.centerRow,
    marginLeft: 0,
    paddingLeft: size.m,
    paddingTop: size.m,
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
  title: { ...typography.largeTitle, paddingBottom: size.s },
  subtitle: typography.subtitle,
  sectionHeader: {
    paddingLeft: size.s * 1.5,
  },
  sectionContent: {
    padding: size.s * 1.5,
  },
  sectionBody: typography.body,
  votingButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: size.s,
  },
  voteButton: {
    color: colors.transparent,
    padding: 0,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0,
        shadowRadius: 0,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  selectedVoteButton: {
    backgroundColor: colors.secondary,
  },
  overviewText: {
    ...typography.small,
    fontFamily: 'Inter-Bold',
    color: colors.darkGray,
  },
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
  voteCountBody: componentStyles.boldText,
});

export default styles;
