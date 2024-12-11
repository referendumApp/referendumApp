import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Legislator } from '@/appTypes';
import { CatalogStackParamList } from '@/navigation/types';
import { useGetFollowedLegislatorsQuery } from '@/screens/LegislatorDetail/redux/api';

type NavigationProp = NativeStackNavigationProp<CatalogStackParamList, 'Catalog'>;

export default function useLegislatorScreenNav() {
  const navigation = useNavigation<NavigationProp>();

  const { data: followedLegislators } = useGetFollowedLegislatorsQuery();

  return useCallback(
    (legislator?: Legislator) => {
      if (!legislator) return () => undefined;

      const initialFollow = followedLegislators?.some(follow => follow.id === legislator.id);
      navigation.navigate('LegislatorScreen', { legislator, initialFollow });
    },
    [followedLegislators, navigation],
  );
}
