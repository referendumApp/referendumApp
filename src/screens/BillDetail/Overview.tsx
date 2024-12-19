import React, { useCallback, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSelector } from 'react-redux';

import { BillDetail, SponsorDetail, VoteChoice, VoteChoiceType } from '@/appTypes';
import Card from '@/components/Card';
import Table from '@/components/Table';
import ToggleButton, { ToggleButtonSize } from '@/components/ToggleButton';
import useLegislatorScreenNav from '@/screens/LegislatorDetail/hooks/useLegislatorScreenNav';
import { getLegislatorById } from '@/screens/LegislatorDetail/redux/selectors';
import { colors } from '@/themes';

import {
  useGetBillBriefingQuery,
  useGetUserBillVotesQuery,
  useCastBillVoteMutation,
  useUncastBillVoteMutation,
} from './redux/api';
import styles from './styles';

const formatPercentage = (value?: number) => {
  if (value == null) return;
  return `${(value * 100).toFixed(1)}%`;
};

const SponsorItems = ({ sponsor }: { sponsor: SponsorDetail }) => {
  const legislator = useSelector(getLegislatorById(sponsor.legislatorId));
  const legislatorNav = useLegislatorScreenNav();

  return (
    <View style={styles.overviewRow}>
      <Pressable style={styles.tableButton} onPress={() => legislatorNav(legislator)}>
        <Text style={[styles.tableCell, legislator && styles.linkCell]} numberOfLines={0}>
          {sponsor.legislatorName}
        </Text>
      </Pressable>
      <Text style={styles.tableCell} numberOfLines={0}>
        {sponsor.type}
      </Text>
    </View>
  );
};

interface OverviewProps {
  bill: BillDetail;
  initialVote?: VoteChoiceType;
}

const Overview: React.FC<OverviewProps> = ({ bill, initialVote }) => {
  const [userVote, setUserVote] = useState<VoteChoiceType | undefined>(initialVote);

  const { data: userVotes } = useGetUserBillVotesQuery(
    { billId: bill.billId },
    {
      skip: !userVote,
    },
  );
  const { data: briefing } = useGetBillBriefingQuery({ billVersionId: bill.currentVersionId });
  const [castBillVote] = useCastBillVoteMutation();
  const [uncastBillVote] = useUncastBillVoteMutation();

  const handleVote = useCallback(
    async (isActive: boolean, buttonValue: VoteChoiceType) => {
      if (isActive) {
        await uncastBillVote({ billId: bill.billId });
        setUserVote(undefined);
      } else {
        await castBillVote({ billId: bill.billId, voteChoiceId: buttonValue });
        setUserVote(buttonValue);
      }
    },
    [bill.billId, castBillVote, uncastBillVote],
  );

  const sponsorRows = bill.sponsors
    .slice(0, 3)
    .map(sponsor => <SponsorItems key={sponsor.legislatorId} sponsor={sponsor} />);

  const expandedRows = bill.sponsors
    .slice(4)
    .map(sponsor => <SponsorItems key={sponsor.legislatorId} sponsor={sponsor} />);

  return (
    <View style={styles.cardContainer}>
      <Card
        title="Citizens Opinion"
        headerStyle={styles.sectionHeader}
        contentStyle={styles.sectionContent}>
        <View style={styles.votingContainer}>
          <ToggleButton
            testID="yayButton"
            style={styles.voteButton}
            iconFamily="Octicons"
            iconName="thumbsup"
            buttonValue={VoteChoice.YAY}
            isActive={userVote === VoteChoice.YAY}
            activeButtonColor={colors.successGreen}
            inactiveButtonColor={colors.darkGray}
            inactiveContentColor={colors.tertiary}
            size={ToggleButtonSize.xlarge}
            onToggle={(isActive, buttonValue) => handleVote(isActive, buttonValue)}
          />
          <ToggleButton
            testID="nayButton"
            style={styles.voteButton}
            iconFamily="Octicons"
            iconName="thumbsdown"
            buttonValue={VoteChoice.NAY}
            isActive={userVote === VoteChoice.NAY}
            activeButtonColor={colors.errorRed}
            inactiveButtonColor={colors.darkGray}
            inactiveContentColor={colors.tertiary}
            size={ToggleButtonSize.xlarge}
            onToggle={(isActive, buttonValue) => handleVote(isActive, buttonValue)}
          />
        </View>
        <View style={styles.votingContainer}>
          <View style={styles.votingTextContainer}>
            <Text style={styles.voteBody}>Support</Text>
            <Text style={[styles.voteCount, !userVote && styles.noDisplay]}>
              {formatPercentage(userVotes?.yayPercent)}
            </Text>
          </View>
          <View style={styles.votingTextContainer}>
            <Text style={styles.voteBody}>Oppose</Text>
            <Text style={[styles.voteCount, !userVote && styles.noDisplay]}>
              {formatPercentage(userVotes?.nayPercent)}
            </Text>
          </View>
        </View>
        <Text style={styles.voteText}>{userVote ? 'You voted!' : 'Vote to see results'}</Text>
      </Card>

      <Card
        title="Citizens Briefing"
        headerStyle={styles.sectionHeader}
        contentStyle={styles.sectionContent}>
        <Text style={styles.billTitle}>{bill.title}</Text>
        <Text style={styles.sectionBody}>{briefing?.briefing ?? 'Coming Soon...'}</Text>
      </Card>

      <Table
        expandable={expandedRows.length > 0}
        expandedRows={expandedRows}
        headers={['Sponsor Name', 'Sponsor Type']}
        headerStyle={styles.tableHeader}
        textStyle={styles.tableHeaderText}>
        {sponsorRows}
      </Table>

      <Card
        title="Comments"
        headerStyle={styles.sectionHeader}
        contentStyle={styles.sectionContent}>
        <Text style={styles.sectionBody}>Coming Soon...</Text>
        {/* {comments.length === 0 ? (
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
            onPress={() => {}}>
            <Text style={styles.seeMoreText}>
              {comments.length > 0 ? 'See all comments' : 'Add a comment'}
            </Text>
          </Pressable> */}
      </Card>
    </View>
  );
};

export default Overview;
