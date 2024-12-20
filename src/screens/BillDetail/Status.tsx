import React from 'react';
import { Text, View } from 'react-native';

import { colors } from '@/themes';

import styles from './styles';

const Status: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColor = () => {
    if (!status) return colors.errorRed;

    switch (status) {
      // To-Do: Get status -> color coding mappings from Ken
      case 'Introduced':
        return colors.successGreen;
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
