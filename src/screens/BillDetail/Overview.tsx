import React, { useCallback, useState } from 'react';
import { View, Text, Pressable } from 'react-native';

import { Bill, VoteChoice, VoteChoiceType } from '@/appTypes';
import Card from '@/components/Card';
import ToggleButton, { ToggleButtonSize } from '@/components/ToggleButton';
import { colors } from '@/themes';

import { useCastBillVoteMutation, useUncastBillVoteMutation } from './api';
import styles from './styles';

interface OverviewProps {
  bill: Bill;
  initialVote?: VoteChoiceType;
}

// const formatPercentage = (value: number) => {
//   return `${(value * 100).toFixed(1)}%`;
// };

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
        <View style={styles.votingContainer}>
          <ToggleButton
            style={styles.voteButton}
            iconFamily="Octicons"
            iconName="thumbsup"
            buttonValue={VoteChoice.YES}
            isActive={userVote === VoteChoice.YES}
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
            buttonValue={VoteChoice.NO}
            isActive={userVote === VoteChoice.NO}
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
            {/* <Text style={[styles.voteCount, !userVote && styles.noDisplay]}>
              {formatPercentage(0.475)}
            </Text> */}
          </View>
          <View style={styles.votingTextContainer}>
            <Text style={styles.voteBody}>Oppose</Text>
            {/* <Text style={[styles.voteCount, !userVote && styles.noDisplay]}>
              {formatPercentage(0.525)}
            </Text> */}
          </View>
        </View>
        <Text style={styles.voteText}>{userVote ? 'You voted!' : 'Vote to see results'}</Text>
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
