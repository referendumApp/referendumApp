import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, Pressable } from 'react-native';

import { Bill, VoteChoice, VoteChoiceType } from '@/appTypes';
import Card from '@/components/Card';
import ToggleButton, { ToggleButtonSize } from '@/components/ToggleButton';
import VoteDistributionBar from '@/components/VoteDistributionBar';
import { colors } from '@/themes';

import { useCastBillVoteMutation, useUncastBillVoteMutation } from './api';
import styles from './styles';

interface OverviewProps {
  bill: Bill;
  initialVote?: VoteChoiceType;
}

const Overview = React.memo(({ bill, initialVote }: OverviewProps) => {
  const [userVote, setUserVote] = useState<VoteChoiceType | undefined>(initialVote);

  const [castBillVote] = useCastBillVoteMutation();
  const [uncastBillVote] = useUncastBillVoteMutation();

  const handleVote = useCallback(
    async (isActive: boolean, buttonValue: VoteChoiceType) => {
      if (isActive) {
        await uncastBillVote({ billId: bill.id });
        setUserVote(undefined);
      } else {
        await castBillVote({ billId: bill.id, voteChoiceId: buttonValue });
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
    <>
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
    </>
  );
});

export default Overview;
