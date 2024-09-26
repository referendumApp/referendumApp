import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/styles';

const VoteDistributionBar = ({ yesVotes, noVotes }: { yesVotes: number; noVotes: number }) => {
  const totalVotes = yesVotes + noVotes;
  const yesPercentage = totalVotes > 0 ? yesVotes / totalVotes : 0;
  const floatingVoteThreshhold = 0.15;

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
          {yesPercentage > floatingVoteThreshhold && (
            <Text style={styles.percentageText}>{formatPercentage(yesPercentage)}</Text>
          )}
        </View>
        <View style={[styles.noBar, { flex: 1 - yesPercentage }]}>
          {(1 - yesPercentage) > floatingVoteThreshhold && (
            <Text style={styles.percentageText}>{formatPercentage(1 - yesPercentage)}</Text>
          )}
        </View>
      </View>
      {yesPercentage <= floatingVoteThreshhold && (
        <View style={[styles.floatingTextContainer, styles.leftFloatingText]}>
          <Text style={styles.floatingText}>{formatPercentage(yesPercentage)}</Text>
        </View>
      )}
      {(1 - yesPercentage) <= floatingVoteThreshhold && (
        <View style={[styles.floatingTextContainer, styles.rightFloatingText]}>
          <Text style={styles.floatingText}>{formatPercentage(1 - yesPercentage)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
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
  },
  floatingTextContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  floatingText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  leftFloatingText: {
    left: 2,
  },
  rightFloatingText: {
    right: 2,
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
