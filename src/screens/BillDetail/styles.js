import { StyleSheet } from 'react-native';

import { colors, componentStyles, size, typography, withOpacity } from '@/themes';

const styles = StyleSheet.create({
    backGroundContainer: {
      ...componentStyles.container,
      backgroundColor: colors.oldGloryBlue,
    },
    container: {
      ...componentStyles.container,
      backgroundColor: colors.white,
      flex: 1,
    },
    header: {
      ...componentStyles.header,
      paddingTop: size.xs,
    },
    subHeader: {
      ...componentStyles.subHeader,
      padding: size.m,
    },
    tagCarouselContainer: {
      ...componentStyles.carouselContainer,
      ...componentStyles.centerRow,
      paddingHorizontal: size.m,
      marginLeft: 0,
      paddingLeft: 0,
    },
    tagCarouselTitle: {
      ...typography.body,
      color: colors.white,
      paddingRight: size.s,
    },
    tagCarouselItem: {
      ...componentStyles.carouselItem,
      backgroundColor: withOpacity(colors.white, 0.95),
      padding: size.xs,
    },
    tagCarouselItemText: {
      ...typography.body,
      color: colors.oldGloryRed,
    },
    tagCarouselSelectedItemText: {
      ...typography.body,
      color: colors.oldGloryRed,
    },
    headerNavBar: {
      ...componentStyles.header,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 0,
    },
    backButton: {},
    backButtonText: {
      ...typography.body,
      color: colors.white,
    },
    followButton: componentStyles.followButton,
    followButtonText: componentStyles.followButtonText,
    selectedFollowButton: componentStyles.selectedFollowButton,
    selectedFollowButtonText: componentStyles.selectedFollowButtonText,
    title: { ...typography.title, paddingBottom: size.s },
    subtitle: typography.subtitle,
    headerBody: {
      ...typography.body,
      color: colors.white,
      padding: size.xs,
    },
    section: componentStyles.section,
    sectionTitle: {
      ...typography.subtitle,
      color: colors.oldGloryRed,
      marginBottom: size.s,
    },
    sectionBody: typography.body,
    votingButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: size.s,
    },
    voteButton: {
      flex: 1,
      padding: size.m,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: size.xs,
      backgroundColor: colors.lightGray,
    },
    selectedVoteButton: {
      backgroundColor: colors.oldGloryRed,
    },
    voteButtonText: {
      ...typography.body,
      fontWeight: 'bold',
    },
    table: {
      backgroundColor: colors.white,
      borderRadius: 8,
      marginTop: size.s,
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: colors.oldGloryBlue,
      padding: size.s,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    tableHeaderText: {
      ...typography.subtitle,
      color: colors.white,
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
      color: colors.oldGloryBlue,
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
      justifyContent: 'space-between',
      marginBottom: size.s,
    },
    voteCountBody: {
      ...typography.body,
      fontWeight: 'bold',
    },
  });

export default styles;
