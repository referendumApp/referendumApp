import React from 'react';
import { Pressable, Text, View } from 'react-native';

import Card from '@/components/Card';

import styles from './styles';

const Funding = React.memo(() => {
  const legislatorFundingRecords: any[] = [];

  return (
    <Card style={styles.table} contentStyle={styles.cardContent}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Source</Text>
        <Text style={styles.tableHeaderText}>Amount</Text>
        <Text style={styles.tableHeaderText}>Cycle</Text>
      </View>
      {legislatorFundingRecords.slice(0, 5).map((record, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.tableCell}>{record.source}</Text>
          <Text style={styles.tableCell}>${record.amount.toFixed(2)}</Text>
          <Text style={styles.tableCell}>{record.cycle}</Text>
        </View>
      ))}
      {legislatorFundingRecords.length > 5 && (
        <Pressable
          onPress={() => {
            /* Navigate to full funding record */
          }}>
          <Text style={styles.seeMoreText}>See all funding records</Text>
        </Pressable>
      )}
    </Card>
  );
});

export default Funding;
