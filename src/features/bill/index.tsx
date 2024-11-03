import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import Carousel from '@/components/Carousel';
import VoteDistributionBar from '@/components/VoteDistributionBar';
import { CatalogStackParamList } from '@/navigation/types';
import { Theme } from '@/themes';
import { useTheme } from '@/themes/ThemeProvider';

type BillDetailScreenProps = StackScreenProps<
  CatalogStackParamList,
  'BillScreen'
>;

const BillDetailScreen: React.FC<BillDetailScreenProps> = ({ route }) => {
  const { bill } = route.params;
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = createStyles(theme);

  const [isFollowing, setIsFollowing] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [userVote, getUserVote] = useState<string | undefined>(undefined);
  const [legislatorVotes, setLegislatorVotes] = useState<any[]>([]);

  useEffect(() => {
    setComments([]);
    setLegislatorVotes([]);
    getUserVote(undefined);
  }, [bill.id]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleVote = (voteType: 'yes' | 'no') => {
    console.log(`Voted ${voteType} on bill ${bill.id}`);
  };

  return (
    <SafeAreaView style={styles.backGroundContainer}>
      <View style={styles.headerNavBar}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>‹ Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleFollow}
          style={
            isFollowing ? styles.selectedFollowButton : styles.followButton
          }>
          <Text
            style={
              isFollowing
                ? styles.selectedFollowButtonText
                : styles.followButtonText
            }>
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text
          style={styles.title}>{`${bill.state}  -  ${bill.identifier}`}</Text>
      </View>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.subtitle}>{bill.title}</Text>
        </View>
        <View style={styles.subHeader}>
          <Text style={styles.headerBody}>{`Body: ${bill.body}`}</Text>
          <Text style={styles.headerBody}>{`Session: ${bill.session}`}</Text>
          <Text
            style={styles.headerBody}>{`Sponsors: ${bill.sponsorIds}`}</Text>
          <Text style={styles.headerBody}>{`Status: ${bill.status}`}</Text>

          <Carousel
            items={bill.tags.map(tag => ({ id: tag, title: tag }))}
            onItemPress={() => {}}
            title="Topics"
            containerStyle={styles.tagCarouselContainer}
            titleStyle={styles.tagCarouselTitle}
            itemStyle={styles.tagCarouselItem}
            textStyle={styles.tagCarouselItemText}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Citizens Opinion</Text>
            <View style={styles.voteCounts}>
              <Text style={styles.voteCountBody}>
                Yes: {bill.communityYesVotes}
              </Text>
              <Text style={styles.voteCountBody}>
                No: {bill.communityNoVotes}
              </Text>
            </View>
            <VoteDistributionBar
              yesVotes={bill.communityYesVotes}
              noVotes={bill.communityNoVotes}
            />
            <View style={styles.votingButtons}>
              <TouchableOpacity
                style={[
                  styles.voteButton,
                  userVote === 'yes' && styles.selectedVoteButton,
                ]}
                onPress={() => handleVote('yes')}>
                <Text style={styles.voteButtonText}>
                  {userVote === 'yes' ? 'Voted Yes' : 'Vote Yes'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.voteButton,
                  userVote === 'no' && styles.selectedVoteButton,
                ]}
                onPress={() => handleVote('no')}>
                <Text style={styles.voteButtonText}>
                  {userVote === 'no' ? 'Voted No' : 'Vote No'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Citizens Briefing</Text>
            <Text style={styles.sectionBody}>{bill.briefing}</Text>
            <TouchableOpacity
              onPress={() => {
                /* Navigate to full text */
              }}>
              <Text style={styles.seeMoreText}>See full text</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Voting Record</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Legislator</Text>
                <Text style={styles.tableHeaderText}>Vote</Text>
              </View>
              {legislatorVotes.slice(0, 5).map((vote, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{vote.legislatorName}</Text>
                  <Text style={styles.tableCell}>{vote.vote}</Text>
                </View>
              ))}
            </View>
            {legislatorVotes.length > 5 && (
              <TouchableOpacity
                onPress={() => {
                  /* Navigate to full voting record */
                }}>
                <Text style={styles.seeMoreText}>See full voting record</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Comments</Text>
            {comments.length === 0 ? (
              <Text style={styles.sectionBody}>
                No comments yet. Be the first to comment!
              </Text>
            ) : (
              comments.slice(0, 3).map((comment, index) => (
                <View key={index} style={styles.commentContainer}>
                  <Text style={styles.commentAuthor}>{comment.author}</Text>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              ))
            )}
            <TouchableOpacity
              onPress={() => {
                /* Navigate to all comments or add comment */
              }}>
              <Text style={styles.seeMoreText}>
                {comments.length > 0 ? 'See all comments' : 'Add a comment'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    backGroundContainer: {
      ...theme.componentStyles.container,
      backgroundColor: theme.colors.oldGloryBlue,
    },
    container: {
      ...theme.componentStyles.container,
      backgroundColor: theme.colors.white,
      flex: 1,
    },
    header: {
      ...theme.componentStyles.header,
      paddingTop: theme.size.xs,
    },
    subHeader: {
      ...theme.componentStyles.subHeader,
      padding: theme.size.m,
    },
    tagCarouselContainer: {
      ...theme.componentStyles.carouselContainer,
      paddingHorizontal: theme.size.m,
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 0,
      paddingLeft: 0,
    },
    tagCarouselTitle: {
      ...theme.typography.body,
      color: theme.colors.white,
      paddingRight: theme.size.s,
    },
    tagCarouselItem: {
      ...theme.componentStyles.carouselItem,
      backgroundColor: theme.withOpacity(theme.colors.white, 0.95),
      padding: theme.size.xs,
    },
    tagCarouselItemText: {
      ...theme.typography.body,
      color: theme.colors.oldGloryRed,
    },
    tagCarouselSelectedItemText: {
      ...theme.typography.body,
      color: theme.colors.oldGloryRed,
    },
    headerNavBar: {
      ...theme.componentStyles.header,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 0,
    },
    backButton: {},
    backButtonText: {
      ...theme.typography.body,
      color: theme.colors.white,
    },
    followButton: {
      borderColor: theme.colors.white,
      borderWidth: 1,
      borderRadius: 20,
      paddingVertical: theme.size.xs,
      paddingHorizontal: theme.size.m,
    },
    followButtonText: {
      ...theme.typography.body,
      color: theme.colors.white,
    },
    selectedFollowButton: {
      backgroundColor: theme.colors.white,
      borderWidth: 1,
      borderRadius: 20,
      paddingVertical: theme.size.xs,
      paddingHorizontal: theme.size.m,
    },
    selectedFollowButtonText: {
      ...theme.typography.body,
      color: theme.colors.oldGloryRed,
      fontWeight: 'bold',
    },
    title: { ...theme.typography.title, paddingBottom: theme.size.s },
    subtitle: theme.typography.subtitle,
    headerBody: {
      ...theme.typography.body,
      color: theme.colors.white,
      padding: theme.size.xs,
    },
    section: theme.componentStyles.section,
    sectionTitle: {
      ...theme.typography.subtitle,
      color: theme.colors.oldGloryRed,
      marginBottom: theme.size.s,
    },
    sectionBody: theme.typography.body,
    votingButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: theme.size.s,
    },
    voteButton: {
      flex: 1,
      padding: theme.size.m,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: theme.size.xs,
      backgroundColor: theme.colors.lightGray,
    },
    selectedVoteButton: {
      backgroundColor: theme.colors.oldGloryRed,
    },
    voteButtonText: {
      ...theme.typography.body,
      fontWeight: 'bold',
    },
    table: {
      backgroundColor: theme.colors.white,
      borderRadius: 8,
      marginTop: theme.size.s,
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: theme.colors.oldGloryBlue,
      padding: theme.size.s,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    tableHeaderText: {
      ...theme.typography.subtitle,
      color: theme.colors.white,
      flex: 1,
    },
    tableRow: {
      flexDirection: 'row',
      padding: theme.size.s,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.lightGray,
    },
    tableCell: {
      ...theme.typography.body,
      flex: 1,
    },
    seeMoreText: {
      ...theme.typography.caption,
      color: theme.colors.oldGloryBlue,
      marginTop: theme.size.s,
    },
    commentContainer: {
      marginBottom: theme.size.s,
    },
    commentAuthor: {
      ...theme.typography.subtitle,
      fontWeight: 'bold',
    },
    commentText: theme.typography.body,
    voteCounts: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.size.s,
    },
    voteCountBody: {
      ...theme.typography.body,
      fontWeight: 'bold',
    },
  });

export default BillDetailScreen;
