import React, { useCallback, useState } from 'react';
import { View, Text } from 'react-native';

import { BillDetail, VoteChoice, VoteChoiceType } from '@/appTypes';
import Card from '@/components/Card';
import ToggleButton, { ToggleButtonSize } from '@/components/ToggleButton';
import { colors } from '@/themes';

import {
  useGetUserBillVotesQuery,
  useCastBillVoteMutation,
  useUncastBillVoteMutation,
} from './api';
import styles from './styles';

interface OverviewProps {
  bill: BillDetail;
  initialVote?: VoteChoiceType;
}

const formatPercentage = (value?: number) => {
  if (value == null) return;
  return `${(value * 100).toFixed(1)}%`;
};

const Overview = React.memo(({ bill, initialVote }: OverviewProps) => {
  const [userVote, setUserVote] = useState<VoteChoiceType | undefined>(initialVote);

  const { data: userVotes } = useGetUserBillVotesQuery(
    { billId: bill.billId },
    {
      skip: !userVote,
    },
  );
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

  return (
    <>
      <Card
        title="Citizens Opinion"
        headerStyle={styles.sectionHeader}
        contentStyle={styles.sectionContent}>
        <View style={styles.votingContainer}>
          <ToggleButton
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
              {formatPercentage(userVotes?.yay)}
            </Text>
          </View>
          <View style={styles.votingTextContainer}>
            <Text style={styles.voteBody}>Oppose</Text>
            <Text style={[styles.voteCount, !userVote && styles.noDisplay]}>
              {formatPercentage(userVotes?.nay)}
            </Text>
          </View>
        </View>
        <Text style={styles.voteText}>{userVote ? 'You voted!' : 'Vote to see results'}</Text>
      </Card>

      <Card
        title="Citizens Briefing"
        style={styles.briefingContainer}
        headerStyle={styles.sectionHeader}
        contentStyle={styles.sectionContent}>
        <Text style={styles.billTitle}>{bill.title}</Text>
        <Text style={styles.sectionBody}>{bill.briefing}</Text>
      </Card>
    </>
  );
});

export default Overview;
