import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import LegislatorImage from '@/components/LegislatorImage';
import NavBar from '@/components/NavBar';
import TabButton from '@/components/TabButton';
import { CatalogStackParamList } from '@/navigation/types';
import { colors } from '@/themes';

import {
  useGetLegislatorVotingHistoryQuery,
  useFollowLegislatorMutation,
  useUnfollowLegislatorMutation,
} from './api';
import Funding from './Funding';
import Snapshot from './Snapshot';
import styles from './styles';
import { TabType } from './types';
import Voting from './Voting';

type LegislatorScreenProps = NativeStackScreenProps<CatalogStackParamList, 'LegislatorScreen'>;

const LegislatorScreen: React.FC<LegislatorScreenProps> = React.memo(
  ({
    route: {
      params: { legislator, initialFollow = false },
    },
  }) => {
    const navigation = useNavigation();

    const [selectedTab, setSelectedTab] = useState<TabType>('snapshot');
    const [isFollowing, setIsFollowing] = useState(initialFollow);

    const { data: votingHistory } = useGetLegislatorVotingHistoryQuery({
      legislatorId: legislator.id,
    });
    const [followLegislator] = useFollowLegislatorMutation();
    const [unfollowLegislator] = useUnfollowLegislatorMutation();
    const handleBack = () => {
      navigation.goBack();
    };

    const handleFollow = async () => {
      !isFollowing
        ? await followLegislator({ legislatorId: legislator.id })
        : await unfollowLegislator({ legislatorId: legislator.id });

      setIsFollowing(!isFollowing);
    };

    return (
      <SafeAreaView style={styles.container}>
        <NavBar handleBack={handleBack} handleFollow={handleFollow} isFollowing={isFollowing} />
        <View style={styles.header}>
          <LegislatorImage
            party={legislator.party.name}
            svgBackgroundColor={colors.white}
            svgSize={120}
            uri={legislator.imageUrl}
            style={styles.image}
          />
          <View style={styles.dividerVertical} />
          <View>
            <Text style={styles.name}>{legislator.name}</Text>
            <Text style={styles.descriptionText}>Branch: {legislator.role.name}</Text>
            <Text style={styles.descriptionText}>Party: {legislator.party.name}</Text>
            <Text style={styles.descriptionText}>State: {legislator.state.name}</Text>
            <Text style={styles.descriptionText}>District: {legislator.district}</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TabButton
            title="Snapshot"
            isSelected={selectedTab === 'snapshot'}
            onPress={() => setSelectedTab('snapshot')}
          />
          <TabButton
            title="Voting"
            isSelected={selectedTab === 'voting'}
            onPress={() => setSelectedTab('voting')}
          />
          <TabButton
            title="Funding"
            isSelected={selectedTab === 'funding'}
            onPress={() => setSelectedTab('funding')}
          />
        </View>

        <ScrollView style={styles.scrollContainer}>
          {selectedTab === 'snapshot' && <Snapshot legislator={legislator} />}
          {selectedTab === 'voting' && <Voting votingHistory={votingHistory ?? []} />}
          {selectedTab === 'funding' && <Funding />}
        </ScrollView>
      </SafeAreaView>
    );
  },
);

export default LegislatorScreen;
