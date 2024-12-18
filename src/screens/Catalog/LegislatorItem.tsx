import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { Legislator } from '@/appTypes';
import LegislatorImage from '@/components/LegislatorImage';
import useLegislatorScreenNav from '@/screens/LegislatorDetail/hooks/useLegislatorScreenNav';

import styles from './styles';

const LegislatorItem: React.FC<{ legislator: Legislator }> = React.memo(
  ({ legislator }) => {
    const legislatorNav = useLegislatorScreenNav();

    return (
      <Pressable style={styles.legislatorItem} onPress={() => legislatorNav(legislator)}>
        <LegislatorImage
          party={legislator.party.name}
          svgSize={60}
          svgStyle={styles.svg}
          uri={legislator.imageUrl}
          style={styles.legislatorImage}
        />
        <View style={styles.legislatorInfo}>
          <Text style={styles.legislatorName}>{legislator.name}</Text>
          <Text
            style={
              styles.itemDescription
            }>{`${legislator.party.name} - ${legislator.state.name}`}</Text>
          <Text style={styles.legislatorChamber}>{legislator.role.name}</Text>
        </View>
      </Pressable>
    );
  },
  (prev, next) => prev.legislator.id === next.legislator.id,
);

export default LegislatorItem;
