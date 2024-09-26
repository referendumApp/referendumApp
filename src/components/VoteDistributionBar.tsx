import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from '../styles/styles';

const VoteDistributionBar = ({ yesVotes, noVotes }: { yesVotes: number, noVotes: number }) => {
  const totalVotes = yesVotes + noVotes;
  const yesPercentage = totalVotes > 0 ? yesVotes / totalVotes : 0;

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  if (totalVotes === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyBar}>
          <Text style={styles.emptyText}>No votes yet</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <View style={[styles.yesBar, { flex: yesPercentage }]}>
          <Text style={styles.percentageText}>{formatPercentage(yesPercentage)}</Text>
        </View>
        <View style={[styles.noBar, { flex: 1 - yesPercentage }]}>
          <Text style={styles.percentageText}>{formatPercentage(1 - yesPercentage)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  bar: {
    flexDirection: 'row',
    height: '100%',
  },
  yesBar: {
    backgroundColor: '#4CAF50', // Replace with your app's green color
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  noBar: {
    backgroundColor: colors.oldGloryRed,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  percentageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    paddingHorizontal: 4,
    flexDirection: 'row',
  },
  emptyBar: {
    backgroundColor: '#E0E0E0',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default VoteDistributionBar;