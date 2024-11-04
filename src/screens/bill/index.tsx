import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import Button, { ButtonTextSize } from '@/components/Button';
import Carousel from '@/components/Carousel';
import VoteDistributionBar from '@/components/VoteDistributionBar';
import { CatalogStackParamList } from '@/navigation/types';
import { VoteChoice, VoteChoiceType } from '@/screens/constants';

import {
  useGetBillVotesQuery,
  useCastBillVoteMutation,
  useFollowBillMutation,
  useUnfollowBillMutation,
} from './api';
import styles from './styles';

type BillDetailScreenProps = StackScreenProps<CatalogStackParamList, 'BillScreen'>;

const BillDetailScreen: React.FC<BillDetailScreenProps> = ({
  route: {
    params: { bill, initialFollow = false },
  },
}) => {
  const navigation = useNavigation();

  const [isFollowing, setIsFollowing] = useState(initialFollow);
  const [comments, setComments] = useState<any[]>([]);
  const [legislatorVotes, setLegislatorVotes] = useState<any[]>([]);

  const [followBill] = useFollowBillMutation();
  const [unfollowBill] = useUnfollowBillMutation();
  const [castBillVote] = useCastBillVoteMutation();
  const { userVote } = useGetBillVotesQuery(
    { billId: bill.id },
    {
      selectFromResult: ({ data }) => ({
        userVote: data?.find(vote => vote.billId === bill.id)?.voteChoice,
      }),
    },
  );

  useEffect(() => {
    setComments([]);
    setLegislatorVotes([]);
  }, [bill.id]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleFollow = async () => {
    !isFollowing ? await followBill({ billId: bill.id }) : await unfollowBill({ billId: bill.id });

    setIsFollowing(!isFollowing);
  };

  const handleVote = async (voteChoice: VoteChoiceType) => {
    if (voteChoice !== userVote) {
      await castBillVote({ billId: bill.id, voteChoice });
    }
  };

  return (
    <SafeAreaView style={styles.backGroundContainer}>
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
        <Text style={styles.title}>{`${bill.state.name}  -  ${bill.identifier}`}</Text>
      </View>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.subtitle}>{bill.title}</Text>
        </View>
        <View style={styles.subHeader}>
          <Text style={[styles.subtitle, styles.tagCarouselTitle]}>Description</Text>
          <Text style={styles.headerBody}>{`${bill.description}`}</Text>
          {bill.tags && (
            <Carousel
              items={bill.tags?.map(tag => ({ id: tag, title: tag })) ?? []}
              onItemPress={() => {}}
              title="Topics"
              containerStyle={styles.tagCarouselContainer}
              titleStyle={styles.tagCarouselTitle}
              itemStyle={styles.tagCarouselItem}
              textStyle={styles.tagCarouselItemText}
            />
          )}
        </View>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Citizens Opinion</Text>
            <View style={styles.voteCounts}>
              <Text style={styles.voteCountBody}>Yes: {bill.communityYesVotes ?? 0}</Text>
              <Text style={styles.voteCountBody}>No: {bill.communityNoVotes ?? 0}</Text>
            </View>
            <VoteDistributionBar
              yesVotes={bill.communityYesVotes}
              noVotes={bill.communityNoVotes}
            />
            <View style={styles.votingButtons}>
              <Button
                style={[
                  styles.voteButton,
                  userVote === VoteChoice.YES && styles.selectedVoteButton,
                ]}
                buttonText={userVote === VoteChoice.YES ? 'Voted Yes' : 'Vote Yes'}
                buttonTextStyles={styles.voteButtonText}
                buttonTextSize={ButtonTextSize.small}
                onPress={() => handleVote(VoteChoice.YES)}
              />
              <Button
                style={[styles.voteButton, userVote === VoteChoice.NO && styles.selectedVoteButton]}
                buttonText={userVote === VoteChoice.NO ? 'Voted No' : 'Vote No'}
                buttonTextStyles={styles.voteButtonText}
                buttonTextSize={ButtonTextSize.small}
                onPress={() => handleVote(VoteChoice.NO)}
              />
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
              <Text style={styles.sectionBody}>No comments yet. Be the first to comment!</Text>
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

export default BillDetailScreen;
