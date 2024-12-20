import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

import { LegislatorVoteDetail, LegislatorVote } from '@/appTypes';
import Accordion from '@/components/Accordion';
import Table from '@/components/Table';
import VoteIcon from '@/components/VoteIcon';

import styles from './styles';

const LegislatorItem = ({
  testID,
  legislatorVote,
}: {
  testID: string;
  legislatorVote: LegislatorVote;
}) => {
  return (
    <View testID={testID} style={styles.itemRow}>
      <Text style={styles.itemCell} numberOfLines={0}>
        {legislatorVote.legislatorName}
      </Text>
      <Text style={styles.descCell} numberOfLines={0}>
        {legislatorVote.partyName}
      </Text>
      <VoteIcon voteChoice={legislatorVote.voteChoiceId} size={20} />
    </View>
  );
};

const Voting: React.FC<{ votingHistory: LegislatorVoteDetail[] }> = ({ votingHistory }) => {
  const tableContents = useMemo(
    () =>
      votingHistory.map(vote => {
        const content = vote.legislatorVotes.map(legislatorVote => (
          <LegislatorItem
            key={legislatorVote.legislatorId}
            testID={`legislator-item-${legislatorVote.legislatorId}`}
            legislatorVote={legislatorVote}
          />
        ));

        return {
          key: vote.billActionId,
          title: vote.actionDescription,
          content,
        };
      }),
    [votingHistory],
  );

  return (
    <Table style={styles.cardContainer} headers={['Action/Name', 'Party', 'Vote']}>
      {tableContents.length ? (
        <Accordion
          data={tableContents}
          accordionStyles={{
            item: styles.tableRow,
            text: styles.tableText,
            content: styles.tableContent,
          }}
        />
      ) : (
        <View style={styles.sectionContent}>
          <Text style={styles.sectionBody}>No votes found</Text>
        </View>
      )}
    </Table>
  );
};

export default Voting;
