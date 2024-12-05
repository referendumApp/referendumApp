import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

// import { BillVotingHistory } from '@/appTypes';
import Card from '@/components/Card';

import styles from './styles';

// const Voting = React.memo(
//   ({ billId, votingHistory }: { billId: number; votingHistory?: BillVotingHistory }) => {
const Voting = React.memo(({ billId }: { billId: number }) => {
  const [legislatorVotes, setLegislatorVotes] = useState<any[]>([]);

  useEffect(() => {
    setLegislatorVotes([]);
  }, [billId]);

  return (
    <Card
      title="Voting"
      style={styles.table}
      headerStyle={styles.sectionHeader}
      contentStyle={styles.sectionContent}>
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
      {legislatorVotes.length > 5 && (
        <Pressable
          onPress={() => {
            /* Navigate to full voting record */
          }}>
          <Text style={styles.seeMoreText}>See full voting record</Text>
        </Pressable>
      )}
    </Card>
  );
});

export default Voting;
