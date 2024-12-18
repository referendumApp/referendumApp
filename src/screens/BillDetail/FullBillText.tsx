import React from 'react';
import { Text, View } from 'react-native';

import { useGetBillTextQuery } from './redux/api';
import styles from './styles';

const FullBillText: React.FC<{ billVersionId: number }> = ({ billVersionId }) => {
  const { data } = useGetBillTextQuery({ billVersionId });

  return (
    <View style={styles.sectionContent}>
      <Text style={styles.wip}>Work In Progress...</Text>
      <Text style={styles.sectionBody}>{data?.text}</Text>
    </View>
  );
};

export default FullBillText;
