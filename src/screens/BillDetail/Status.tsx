import React from 'react';
import { Text, View } from 'react-native';

import { colors } from '@/themes';

import styles from './styles';

const Status: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Introduced':
      case 'Prefiled':
      case 'Draft':
      case 'Refer':
        return colors.yellow;
      case 'Passed':
      case 'Engrossed':
      case 'Override':
      case 'Chaptered':
      case 'Enrolled':
        return colors.successGreen;
      case 'Report Pass':
        return colors.yesVoteGreen;
      case 'Report DNP':
        return colors.orange;
      case 'Failed':
      case 'Vetoed':
        colors.errorRed;
      default:
        return colors.errorRed;
    }
  };

  return (
    <View style={styles.statusContainer}>
      <Text style={styles.statusLabel}>Status: </Text>
      <Text style={[styles.statusText, { color: getStatusColor() }]}>{`${status}`}</Text>
      {/* <Text style={styles.subtitle}>(Status Bar Coming Soon...) </Text> */}
    </View>
  );
};

export default Status;
