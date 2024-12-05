import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

import { BillActionVote, LegislatorVote, VoteChoice } from '@/appTypes';
import Accordion from '@/components/Accordion';
import Card from '@/components/Card';
import Icon from '@/components/Icon';
import { colors } from '@/themes';

import styles from './styles';

const TableItem = ({ action }: { action: BillActionVote }) => {
  return (
    <View style={styles.itemRow}>
      <Text style={styles.itemCell} numberOfLines={0}>
        {action.date}
      </Text>
      <View style={[styles.yesVote, action.voteChoiceId !== VoteChoice.YES && styles.noDisplay]}>
        <Icon iconFamily="Octicons" iconName="thumbsup" iconSize={20} iconColor={colors.tertiary} />
      </View>
      <View style={[styles.noVote, action.voteChoiceId !== VoteChoice.NO && styles.noDisplay]}>
        <Icon
          iconFamily="Octicons"
          iconName="thumbsdown"
          iconSize={20}
          iconColor={colors.tertiary}
        />
      </View>
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
        <Text style={styles.billHeaderText}>Bill/Date</Text>
        <Text style={styles.tableHeaderText}>For</Text>
        <Text style={styles.tableHeaderText}>Against</Text>
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
