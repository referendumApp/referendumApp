import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';

import { Legislator } from '@/appTypes';

import styles from './styles';

const LegislatorItem: React.FC<{
  legislator: Legislator;
  onPress: () => void;
}> = React.memo(({ legislator, onPress }) => (
  <TouchableOpacity style={styles.legislatorItem} onPress={onPress}>
    <Image source={{ uri: legislator.imageUrl }} style={styles.legislatorImage} />
    <View style={styles.legislatorInfo}>
      <Text style={styles.legislatorName}>{legislator.name}</Text>
      <Text style={styles.legislatorDetails}>{`${legislator.party} - ${legislator.state}`}</Text>
      <Text style={styles.legislatorChamber}>{legislator.district}</Text>
    </View>
  </TouchableOpacity>
));

export default LegislatorItem;
