import React from 'react';
import { Image, View, Text, Pressable } from 'react-native';

import { Legislator } from '@/appTypes';

import styles from './styles';

const LegislatorItem: React.FC<{
  legislator: Legislator;
  onPress: (legislator: Legislator) => void;
}> = React.memo(
  ({ legislator, onPress }) => {
    return (
      <Pressable style={styles.legislatorItem} onPress={() => onPress(legislator)}>
        <Image source={{ uri: legislator.imageUrl }} style={styles.legislatorImage} />
        <View style={styles.legislatorInfo}>
          <Text style={styles.legislatorName}>{legislator.name}</Text>
          <Text
            style={
              styles.legislatorDetails
            }>{`${legislator.party.name} - ${legislator.state.name}`}</Text>
          <Text style={styles.legislatorChamber}>{legislator.role.name}</Text>
        </View>
      </Pressable>
    );
  },
  (prev, next) => prev.legislator === next.legislator && prev.onPress === next.onPress,
);

export default LegislatorItem;
