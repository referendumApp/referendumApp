import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

import { BillActionVote, LegislatorVote } from '@/appTypes';
import Accordion from '@/components/Accordion';
import Card from '@/components/Card';
import VoteIcon from '@/components/VoteIcon';

import styles from './styles';

const TableItem = ({ action }: { action: BillActionVote }) => {
  return (
    <View style={styles.itemRow}>
      <Text style={styles.itemCell} numberOfLines={0}>
        {action.date}
      </Text>
      <Text style={styles.itemCell} numberOfLines={0}>
        {action.actionDescription}
      </Text>
      <VoteIcon voteChoice={action.voteChoiceId} size={20} />
    </View>
  );
};

const Voting = React.memo(({ votingHistory }: { votingHistory: LegislatorVote[] }) => {
  const tableContents = useMemo(
    () =>
      votingHistory.map(vote => {
        const content = vote.billActionVotes.map(action => (
          <TableItem key={action.billActionId} action={action} />
        ));
        return { key: vote.billId, title: vote.identifier, content };
      }),
    [votingHistory],
  );

  return (
    <Card style={styles.table} contentStyle={styles.cardContent}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Bill/Date</Text>
        <Text style={styles.tableHeaderText}>Action</Text>
        <Text style={styles.tableHeaderText}>Vote</Text>
      </View>
      <Accordion
        data={tableContents}
        accordionStyles={{
          item: styles.tableRow,
          text: styles.tableCell,
          content: styles.tableContent,
        }}
      />
    </Card>
  );
});

export default Voting;
