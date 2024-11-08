import React, { useCallback } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Legislator } from '@/appTypes';
import { CatalogStackParamList } from '@/navigation/types';
// import { useGetFollowedLegislatorsQuery } from '@/screens/legislator/api';

import styles from './styles';

type NavigationProp = StackNavigationProp<CatalogStackParamList, 'Catalog'>;

// interface LegislatorItemProps {
//   legislator: Legislator;
//   onPress: (legislator: Legislator) => void;
// }

// class LegislatorItem extends React.PureComponent<LegislatorItemProps> {
//   render() {
//     const { legislator, onPress } = this.props;
//
//     return (
//       <TouchableOpacity style={styles.legislatorItem} onPress={() => onPress(legislator)}>
//         <Image source={{ uri: legislator.imageUrl }} style={styles.legislatorImage} />
//         <View style={styles.legislatorInfo}>
//           <Text style={styles.legislatorName}>{legislator.name}</Text>
//           <Text
//             style={
//               styles.legislatorDetails
//             }>{`${legislator.party.name} - ${legislator.state.name}`}</Text>
//           <Text style={styles.legislatorChamber}>{legislator.role.name}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   }
// }

// const LegislatorItem: React.FC<{
//   legislator: Legislator;
// }> = React.memo(({ legislator }) => {
//   return (
//     <View style={styles.legislatorItem}>
//       <View style={styles.legislatorInfo}>
//         <Text style={styles.legislatorName}>{legislator.name}</Text>
//       </View>
//     </View>
//   );
// });

const LegislatorItem: React.FC<{
  legislator: Legislator;
  onPress: (legislator: Legislator) => void;
}> = React.memo(
  ({ legislator, onPress }) => {
    const handlePress = useCallback(() => {
      onPress(legislator);
    }, [legislator, onPress]);

    return (
      <TouchableOpacity style={styles.legislatorItem} onPress={handlePress}>
        <Image source={{ uri: legislator.imageUrl }} style={styles.legislatorImage} />
        <View style={styles.legislatorInfo}>
          <Text style={styles.legislatorName}>{legislator.name}</Text>
          <Text
            style={
              styles.legislatorDetails
            }>{`${legislator.party.name} - ${legislator.state.name}`}</Text>
          <Text style={styles.legislatorChamber}>{legislator.role.name}</Text>
        </View>
      </TouchableOpacity>
    );
  },
  (prev, next) => prev.legislator === next.legislator && prev.onPress === next.onPress,
);

export default LegislatorItem;
