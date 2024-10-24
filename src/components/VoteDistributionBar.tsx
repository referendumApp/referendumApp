import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Theme } from '@/themes';
import { useTheme } from '@/themes/ThemeProvider';

const VoteDistributionBar = ({
  yesVotes,
  noVotes,
}: {
  yesVotes: number;
  noVotes: number;
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

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
            <Text style={styles.percentageText}>
              {formatPercentage(yesPercentage)}
            </Text>
          )}
        </View>
        <View style={[styles.noBar, { flex: 1 - yesPercentage }]}>
          {1 - yesPercentage > floatingVoteThreshold && (
            <Text style={styles.percentageText}>
              {formatPercentage(1 - yesPercentage)}
            </Text>
          )}
        </View>
      </View>
      {yesPercentage <= floatingVoteThreshold && (
        <View style={[styles.floatingTextContainer, styles.leftFloatingText]}>
          <Text style={styles.floatingText}>
            {formatPercentage(yesPercentage)}
          </Text>
        </View>
      )}
      {1 - yesPercentage <= floatingVoteThreshold && (
        <View style={[styles.floatingTextContainer, styles.rightFloatingText]}>
          <Text style={styles.floatingText}>
            {formatPercentage(1 - yesPercentage)}
          </Text>
        </View>
      )}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
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
      backgroundColor: theme.colors.yesVoteGreen,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    noBar: {
      backgroundColor: theme.colors.oldGloryRed,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    percentageText: {
      color: theme.colors.white,
      fontWeight: 'bold',
      fontSize: theme.typography.caption.fontSize,
      paddingHorizontal: theme.spacing.xs,
    },
    floatingTextContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      justifyContent: 'center',
    },
    floatingText: {
      color: theme.colors.white,
      fontWeight: 'bold',
      fontSize: theme.typography.caption.fontSize,
    },
    leftFloatingText: {
      left: theme.spacing.xs,
    },
    rightFloatingText: {
      right: theme.spacing.xs,
    },
    emptyBar: {
      backgroundColor: theme.colors.lightGray,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      color: theme.colors.mediumGray,
      fontWeight: 'bold',
      fontSize: theme.typography.caption.fontSize,
    },
  });

export default VoteDistributionBar;
