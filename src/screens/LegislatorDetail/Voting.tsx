import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { BillActionVote, LegislatorVotingHistory } from '@/appTypes';
import Accordion from '@/components/Accordion';
import Table from '@/components/Table';
import VoteIcon from '@/components/VoteIcon';
import useBillScreenNav from '@/screens/BillDetail/hooks/useBillScreenNav';
import { getBillDetailsMap } from '@/screens/BillDetail/redux/selectors';

import styles from './styles';

const BillActionItem = ({ action }: { action: BillActionVote }) => {
  return (
    <View style={styles.itemRow}>
      <Text style={styles.itemCell} numberOfLines={0}>
        {action.date}
      </Text>
      <Text style={styles.descCell} numberOfLines={0}>
        {action.actionDescription}
      </Text>
      <VoteIcon voteChoice={action.voteChoiceId} size={20} />
    </View>
  );
};

const Voting: React.FC<{ votingHistory: LegislatorVotingHistory[] }> = ({ votingHistory }) => {
  const billIds = useMemo(() => votingHistory.map(vote => vote.billId), [votingHistory]);
  const billMap = useSelector(state => getBillDetailsMap(state, billIds));
  const billNav = useBillScreenNav();

  const tableContents = useMemo(
    () =>
      votingHistory.map(vote => {
        const content = vote.billActionVotes.map(action => (
          <BillActionItem key={action.billActionId} action={action} />
        ));
        const bill = billMap[vote.billId];

        return {
          key: vote.billId,
          title: vote.identifier,
          onPressTitle: bill ? () => billNav(bill) : undefined,
          content,
        };
      }),
    [billMap, billNav, votingHistory],
  );

  return (
    <Table style={styles.cardContainer} headers={['Bill/Date', 'Action', 'Vote']}>
      {tableContents.length ? (
        <Accordion
          data={tableContents}
          accordionStyles={{
            item: styles.tableRow,
            text: styles.tableCell,
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
