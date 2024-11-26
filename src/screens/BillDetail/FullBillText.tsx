import React from 'react';
import { Text, View } from 'react-native';

// import { useGetBillTextQuery } from './api';
import styles from './styles';

const FullBillText = React.memo(() => {
  // const { data } = useGetBillTextQuery();

  return (
    <View>
      <Text style={styles.sectionBody}>Coming Soon</Text>
    </View>
  );
});

export default FullBillText;
