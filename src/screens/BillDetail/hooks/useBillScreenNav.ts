import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { BillDetail } from '@/appTypes';
import { CatalogStackParamList } from '@/navigation/types';
import { useGetFollowedBillsQuery, useGetBillVotesQuery } from '@/screens/BillDetail/redux/api';

type NavigationProp = NativeStackNavigationProp<CatalogStackParamList, 'Catalog'>;

export default function useBillScreenNav() {
  const navigation = useNavigation<NavigationProp>();

  const { data: followedBills } = useGetFollowedBillsQuery();
  const { data: userBillVotes } = useGetBillVotesQuery({ billId: undefined });

  return useCallback(
    (bill?: BillDetail) => {
      if (!bill) return () => undefined;

      const initialVote = userBillVotes?.find(vote => vote.billId === bill.billId)?.voteChoiceId;
      const initialFollow = followedBills?.some(follow => follow.id === bill.billId);
      navigation.navigate('BillScreen', { bill, initialFollow, initialVote });
    },
    [followedBills, navigation, userBillVotes],
  );
}
