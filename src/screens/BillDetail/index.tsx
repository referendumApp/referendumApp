import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { VoteChoice, VoteChoiceType } from '@/appTypes';
import Card from '@/components/Card';
import Carousel from '@/components/Carousel';
import NavBar from '@/components/NavBar';
import ToggleButton, { ToggleButtonSize } from '@/components/ToggleButton';
import VoteDistributionBar from '@/components/VoteDistributionBar';
import { CatalogStackParamList } from '@/navigation/types';
import { colors } from '@/themes';

import {
  useCastBillVoteMutation,
  useUncastBillVoteMutation,
  useFollowBillMutation,
  useUnfollowBillMutation,
} from './api';
import styles from './styles';

type BillDetailScreenProps = StackScreenProps<CatalogStackParamList, 'BillScreen'>;

const BillDetailScreen: React.FC<BillDetailScreenProps> = ({
  route: {
    params: { bill, initialFollow = false, initialVote },
  },
}) => {
  const navigation = useNavigation();

  const [isFollowing, setIsFollowing] = useState(initialFollow);
  const [comments, setComments] = useState<any[]>([]);
  const [legislatorVotes, setLegislatorVotes] = useState<any[]>([]);
  const [userVote, setUserVote] = useState<VoteChoiceType | undefined>(initialVote);

  const [followBill] = useFollowBillMutation();
  const [unfollowBill] = useUnfollowBillMutation();
  const [castBillVote] = useCastBillVoteMutation();
  const [uncastBillVote] = useUncastBillVoteMutation();

  useEffect(() => {
    setComments([]);
    setLegislatorVotes([]);
  }, [bill.id]);

  const handleBack = () => navigation.goBack();

  const handleFollow = useCallback(async () => {
    !isFollowing ? await followBill({ billId: bill.id }) : await unfollowBill({ billId: bill.id });

    setIsFollowing(!isFollowing);
  }, [bill.id, followBill, unfollowBill, isFollowing]);

  const handleVote = useCallback(
    async (isActive: boolean, buttonValue: VoteChoiceType) => {
      if (isActive) {
        await uncastBillVote({ billId: bill.id });
        setUserVote(undefined);
      } else {
        await castBillVote({ billId: bill.id, voteChoice: buttonValue });
        setUserVote(buttonValue);
      }
    },
    [bill.id, castBillVote, uncastBillVote],
  );

  const { yesActive, yesIcon, noActive, noIcon } = useMemo(() => {
    switch (userVote) {
      case VoteChoice.YES:
        return {
          yesActive: true,
          yesIcon: 'thumb-up',
          noActive: false,
          noIcon: 'thumb-down-outline',
        };
      case VoteChoice.NO:
        return {
          yesActive: false,
          yesIcon: 'thumb-up-outline',
          noActive: true,
          noIcon: 'thumb-down',
        };
      default:
        return {
          yesActive: false,
          yesIcon: 'thumb-up-outline',
          noActive: false,
          noIcon: 'thumb-down-outline',
        };
    }
  }, [userVote]);

  return (
    <SafeAreaView style={styles.container}>
      <NavBar handleBack={handleBack} handleFollow={handleFollow} isFollowing={isFollowing} />
      <View style={styles.header}>
        <Text style={styles.title}>{`${bill.state.name}  -  ${bill.identifier}`}</Text>
        <Text style={styles.subtitle}>{bill.title}</Text>
      </View>
      <Carousel
        items={bill.tags?.map(tag => ({ id: tag, title: tag })) ?? []}
        onItemPress={() => {}}
        title="Related: "
        containerStyle={styles.tagCarouselContainer}
        titleStyle={styles.tagCarouselText}
        itemStyle={styles.tagCarouselItem}
        itemSelectedStyle={styles.tagCarouselSelectedItem}
        textStyle={styles.tagCarouselItemText}
        textSelectedStyle={styles.tagCarouselSelectedItemText}
      />

      <ScrollView>
        <Card
          title="Overview"
          headerStyle={styles.sectionHeader}
          contentStyle={styles.sectionContent}>
          <View style={styles.descriptionHeader}>
            <Text style={styles.overviewText}>Body: </Text>
            <Text style={styles.overviewText}>Sponsors: </Text>
            <Text style={styles.overviewText}>Session: </Text>
          </View>
          <View style={styles.statusHeader}>
            <Text style={styles.overviewText}>Status: </Text>
          </View>
        </Card>
        <Card
          title="Citizens Opinion"
          headerStyle={styles.sectionHeader}
          contentStyle={styles.sectionContent}>
          <View style={styles.voteCounts}>
            <Text style={styles.voteCountBody}>Yes: {bill.communityYesVotes ?? 0}</Text>
            <Text style={styles.voteCountBody}>No: {bill.communityNoVotes ?? 0}</Text>
          </View>
          <VoteDistributionBar yesVotes={bill.communityYesVotes} noVotes={bill.communityNoVotes} />
          <View style={styles.votingButtons}>
            <ToggleButton
              iconFamily="MaterialCommunityIcons"
              iconName={yesIcon}
              buttonValue={VoteChoice.YES}
              isActive={yesActive}
              activeContentColor={colors.successGreen}
              size={ToggleButtonSize.xlarge}
              onToggle={(isActive, buttonValue) => handleVote(isActive, buttonValue)}
            />
            <ToggleButton
              iconFamily="MaterialCommunityIcons"
              iconName={noIcon}
              buttonValue={VoteChoice.NO}
              isActive={noActive}
              activeContentColor={colors.errorRed}
              size={ToggleButtonSize.xlarge}
              onToggle={(isActive, buttonValue) => handleVote(isActive, buttonValue)}
            />
          </View>
        </Card>

        <Card
          title="Citizens Briefing"
          headerStyle={styles.sectionHeader}
          contentStyle={styles.sectionContent}>
          <Text style={styles.sectionBody}>{bill.briefing}</Text>
          <Pressable
            onPress={() => {
              /* Navigate to full text */
            }}>
            <Text style={styles.seeMoreText}>See full text</Text>
          </Pressable>
        </Card>

        <Card
          title="Voting Record"
          headerStyle={styles.sectionHeader}
          contentStyle={styles.sectionContent}>
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
            <Pressable
              onPress={() => {
                /* Navigate to full voting record */
              }}>
              <Text style={styles.seeMoreText}>See full voting record</Text>
            </Pressable>
          )}
        </Card>

        <Card
          title="Comments"
          headerStyle={styles.sectionHeader}
          contentStyle={styles.sectionContent}>
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
          <Pressable
            onPress={() => {
              /* Navigate to all comments or add comment */
            }}>
            <Text style={styles.seeMoreText}>
              {comments.length > 0 ? 'See all comments' : 'Add a comment'}
            </Text>
          </Pressable>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillDetailScreen;
