import React from 'react';
import { Pressable, Text, View } from 'react-native';

import Card from '@/components/Card';

import styles from './styles';

const Voting = React.memo(() => {
  const legislatorVotes: any[] = [];
  const bills: any[] = [];

  return (
    <Card title="Voting" headerStyle={styles.sectionHeader} contentStyle={styles.sectionContent}>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Bill</Text>
          <Text style={styles.tableHeaderText}>Vote</Text>
        </View>
        {legislatorVotes.slice(0, 5).map((vote, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>
              {bills.find(bill => bill.id === vote.billId)?.title || 'Unknown Bill'}
            </Text>
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
  );
});

export default Voting;
