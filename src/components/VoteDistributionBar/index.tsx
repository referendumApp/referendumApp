import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const VoteDistributionBar = ({
  yesVotes = 0,
  noVotes = 0,
}: {
  yesVotes?: number;
  noVotes?: number;
}) => {
  const totalVotes = yesVotes + noVotes;
  const yesPercentage = totalVotes > 0 ? yesVotes / totalVotes : 0;
  const floatingVoteThreshold = 0.15;

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
          {yesPercentage > floatingVoteThreshold && (
            <Text style={styles.percentageText}>{formatPercentage(yesPercentage)}</Text>
          )}
        </View>
        <View style={[styles.noBar, { flex: 1 - yesPercentage }]}>
          {1 - yesPercentage > floatingVoteThreshold && (
            <Text style={styles.percentageText}>{formatPercentage(1 - yesPercentage)}</Text>
          )}
        </View>
      </View>
      {yesPercentage <= floatingVoteThreshold && (
        <View style={[styles.floatingTextContainer, styles.leftFloatingText]}>
          <Text style={styles.floatingText}>{formatPercentage(yesPercentage)}</Text>
        </View>
      )}
      {1 - yesPercentage <= floatingVoteThreshold && (
        <View style={[styles.floatingTextContainer, styles.rightFloatingText]}>
          <Text style={styles.floatingText}>{formatPercentage(1 - yesPercentage)}</Text>
        </View>
      )}
    </View>
  );
};

export default VoteDistributionBar;
