import React from 'react';
import { Text, View } from 'react-native';

import Table from '@/components/Table';

import styles from './styles';

const Funding: React.FC = () => {
  return (
    <Table headers={['Source', 'Amount', 'Cycle']}>
      <View style={styles.sectionContent}>
        <Text style={styles.sectionBody}>Coming Soon...</Text>
      </View>
    </Table>
  );
};

export default Funding;
