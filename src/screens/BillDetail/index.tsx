import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// import Carousel from '@/components/Carousel';
import NavBar from '@/components/NavBar';
import TabButton from '@/components/TabButton';
import { CatalogStackParamList } from '@/navigation/types';

import FullBillText from './FullBillText';
import Overview from './Overview';
import {
  useFollowBillMutation,
  useUnfollowBillMutation,
  useGetBillVotingHistoryQuery,
} from './redux/api';
import styles from './styles';
import { TabType } from './types';
import Voting from './Voting';

type BillDetailScreenProps = NativeStackScreenProps<CatalogStackParamList, 'BillScreen'>;

const BillDetailScreen: React.FC<BillDetailScreenProps> = ({
  route: {
    params: { bill, initialFollow = false, initialVote },
  },
}) => {
  const navigation = useNavigation();

  const [selectedTab, setSelectedTab] = useState<TabType>('overview');
  const [isFollowing, setIsFollowing] = useState(initialFollow);

  const [followBill] = useFollowBillMutation();
  const [unfollowBill] = useUnfollowBillMutation();
  const { data: votingHistory } = useGetBillVotingHistoryQuery({ billId: bill.billId });

  const handleBack = () => navigation.goBack();

  const handleFollow = useCallback(async () => {
    !isFollowing
      ? await followBill({ billId: bill.billId })
      : await unfollowBill({ billId: bill.billId });

    setIsFollowing(!isFollowing);
  }, [bill.billId, followBill, unfollowBill, isFollowing]);

  return (
    <SafeAreaView style={styles.container}>
      <NavBar handleBack={handleBack} handleFollow={handleFollow} isFollowing={isFollowing} />
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text
            style={styles.title}
            adjustsFontSizeToFit={true}
            numberOfLines={1}>{`${bill.stateName}  -  ${bill.identifier}`}</Text>
        </View>
        {/* <Carousel
          items={bill.tags?.map(tag => ({ id: tag, title: tag })) ?? []}
          onItemPress={() => {}}
          title="Related: "
          containerStyle={styles.tagCarouselContainer}
          titleStyle={styles.tagCarouselText}
          itemStyle={styles.tagCarouselItem}
          itemSelectedStyle={styles.tagCarouselSelectedItem}
          textStyle={styles.tagCarouselItemText}
          textSelectedStyle={styles.tagCarouselSelectedItemText}
        /> */}
      </View>

      <View style={styles.tabContainer}>
        <TabButton
          title="Overview"
          isSelected={selectedTab === 'overview'}
          onPress={() => setSelectedTab('overview')}
        />
        <TabButton
          title="Voting"
          isSelected={selectedTab === 'voting'}
          onPress={() => setSelectedTab('voting')}
        />
        <TabButton
          title="Full Text"
          isSelected={selectedTab === 'fullText'}
          onPress={() => setSelectedTab('fullText')}
        />
      </View>

      <ScrollView style={styles.scrollContainer}>
        {selectedTab === 'overview' && <Overview bill={bill} initialVote={initialVote} />}
        {selectedTab === 'voting' && <Voting votingHistory={votingHistory?.votes ?? []} />}
        {selectedTab === 'fullText' && <FullBillText billVersionId={bill.currentVersionId} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillDetailScreen;
