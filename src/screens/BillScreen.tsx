import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { CatalogStackParamList } from '../types/navigation';
import { colors, componentStyles, typography, withOpacity } from '../styles/styles';
import { Carousel } from '../components/Carousel';
import VoteDistributionBar from '../components/VoteDistributionBar';

type BillDetailScreenProps = StackScreenProps<CatalogStackParamList, 'BillScreen'>;

const BillDetailScreen: React.FC<BillDetailScreenProps> = ({ route }) => {
  const { bill } = route.params;
  const navigation = useNavigation();
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
    // Implement voting logic here
    console.log(`Voted ${voteType} on bill ${bill.id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.headerNavBar}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>‹ Back</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleFollow}
        style={isFollowing ? styles.selectedFollowButton : styles.followButton}>
        <Text style={isFollowing ? styles.selectedFollowButtonText : styles.followButtonText}>
          {isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
    <View style={styles.header}>
      <Text style={styles.title}>{`${bill.state}  -  ${bill.identifier}`}</Text>
    </View>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.subtitle}>{bill.title}</Text>
        </View>
        <View style={styles.subHeader}>
            <Text style={styles.headerBody}>{`Body: ${bill.body}`}</Text>
          <Text style={styles.headerBody}>{`Session: ${bill.session}`}</Text>
          <Text style={styles.headerBody}>{`Sponsors: ${bill.sponsorIds}`}</Text>
          <Text style={styles.headerBody}>{`Status: ${bill.status}`}</Text>

            <Carousel
                items={bill.tags.map(tag => ({id: tag, title: tag}))}
                onItemPress={() => {}}
                title="Topics"
                containerStyle={styles.tagCarouselContainer}
                titleStyle={styles.tagCarouselTitle}
                itemStyle={styles.tagCarouselItem}
                textStyle={styles.tagCarouselItemText}
            />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Citizens Opinion</Text>
          <View style={styles.voteCounts}>
            <Text style={styles.voteCountBody}>Yes: {bill.communityYesVotes}</Text>
            <Text style={styles.voteCountBody}>No: {bill.communityNoVotes}</Text>
          </View>
          <VoteDistributionBar yesVotes={bill.communityYesVotes} noVotes={bill.communityNoVotes} />
          <View style={styles.votingButtons}>
            <TouchableOpacity
              style={[styles.voteButton, userVote === 'yes' && styles.selectedVoteButton]}
              onPress={() => handleVote('yes')}>
              <Text style={styles.voteButtonText}>
                {userVote === 'yes' ? 'Voted Yes' : 'Vote Yes'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.voteButton, userVote === 'no' && styles.selectedVoteButton]}
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
          <TouchableOpacity onPress={() => {/* Navigate to full text */}}>
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
            <TouchableOpacity onPress={() => {/* Navigate to full voting record */}}>
              <Text style={styles.seeMoreText}>See full voting record</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comments</Text>
          {comments.length === 0 ? (
            <Text style={styles.sectionBody}>No comments yet. Be the first to comment!</Text>
          ) : (
            comments.slice(0, 3).map((comment, index) => (
              <View key={index} style={styles.commentContainer}>
                <Text style={styles.commentAuthor}>{comment.author}</Text>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            ))
          )}
          <TouchableOpacity onPress={() => {/* Navigate to all comments or add comment */}}>
            <Text style={styles.seeMoreText}>
              {comments.length > 0 ? 'See all comments' : 'Add a comment'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...componentStyles.container,
    backgroundColor: colors.white,
    flex: 1,
  },
  header: {
    ...componentStyles.header,
    paddingTop: 2,
  },
  subHeader: {
    ...componentStyles.subHeader,
    padding: 12,
},
tagCarouselContainer: {
  ...componentStyles.carouselContainer,
  paddingHorizontal: 16,
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: 0,
  paddingLeft: 0,
},
tagCarouselTitle: {
  ...typography.body,
  color: colors.white,
  paddingRight: 8,
},
tagCarouselItem: {
  ...componentStyles.carouselItem,
  backgroundColor: withOpacity(colors.white, 0.95),
  padding: 4,
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
    color: 'white',
  },
  followButton: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  followButtonText: {
    ...typography.body,
    color: 'white',
  },
  selectedFollowButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  selectedFollowButtonText: {
    ...typography.body,
    color: colors.oldGloryRed,
    fontWeight: 'bold',
  },
  title: {...typography.title, paddingBottom: 8},
  subtitle: typography.subtitle,
  headerBody: {
    ...typography.body,
    color: colors.white,
    padding: 2,
},
  section: componentStyles.section,
  sectionTitle: {
    ...typography.subtitle,
    color: colors.oldGloryRed,
    marginBottom: 8,
  },
  sectionBody: typography.body,
  votingButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  voteButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
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
    marginTop: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.oldGloryBlue,
    padding: 8,
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
    padding: 8,
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
    marginTop: 8,
  },
  commentContainer: {
    marginBottom: 8,
  },
  commentAuthor: {
    ...typography.subtitle,
    fontWeight: 'bold',
  },
  commentText: typography.body,
  voteCounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  voteCountBody: {
    ...typography.body,
    fontWeight: 'bold',
  },
});

export default BillDetailScreen;
