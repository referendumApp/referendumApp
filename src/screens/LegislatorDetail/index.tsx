import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { CatalogStackParamList } from '@/navigation/types';

import { useFollowLegislatorMutation, useUnfollowLegislatorMutation } from './api';
import styles from './styles';

type LegislatorScreenProps = StackScreenProps<CatalogStackParamList, 'LegislatorScreen'>;

const LegislatorScreen: React.FC<LegislatorScreenProps> = React.memo(({
  route: {
    params: { legislator, initialFollow = false },
  },
}) => {
  const navigation = useNavigation();
  const [isFollowing, setIsFollowing] = useState(initialFollow);

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

  const attendanceScore = null; // votingManager.getLegislatorAttendanceScore(legislator.id);
  const alignmentScore = null; // votingManager.getUserLegislatorAlignmentScore(legislator.id, settingsManager.userId);
  const legislatorVotes: any[] = [];
  const bills: any[] = [];
  const legislatorFundingRecords: any[] = [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerNavBar}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>‹ Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleFollow}
          style={isFollowing ? styles.selectedFollowButton : styles.followButton}>
          <Text style={isFollowing ? styles.selectedFollowButtonText : styles.followButtonText}>
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Image source={{ uri: legislator.imageUrl }} style={styles.image} />
        <Text style={styles.name}>{legislator.name}</Text>
        <Text style={styles.subtitle}>{`${legislator.party.name} - ${legislator.state.name}`}</Text>
        {legislator.district && (
          <Text style={styles.subtitle}>{`${legislator.role.name} - ${legislator.district} District`}</Text>
        )}
      </View>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Referendum Scores</Text>
          <Text style={styles.sectionBody}>Attendance Score: {formatScore(attendanceScore)}</Text>
          <Text style={styles.sectionBody}>Alignment Score: {formatScore(alignmentScore)}</Text>
        </View>

        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Issues</Text>
          {legislator.topIssues?.map((issue, index) => (
            <Text key={index} style={styles.sectionBody}>
              • {issue}
            </Text>
          ))}
        </View> */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact & Social</Text>
          <Text style={styles.sectionBody}>Phone: {legislator.phone}</Text>
          <Text style={styles.sectionBody}>Address: {legislator.address}</Text>
          {legislator.twitter && (
            <Text style={styles.sectionBody}>Twitter: {legislator.twitter}</Text>
          )}
          {legislator.facebook && (
            <Text style={styles.sectionBody}>Facebook: {legislator.facebook}</Text>
          )}
          {legislator.instagram && (
            <Text style={styles.sectionBody}>Instagram: {legislator.instagram}</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voting Record</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Bill</Text>
              <Text style={styles.tableHeaderText}>Vote</Text>
            </View>
            {legislatorVotes.slice(0, 5).map((vote, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>
                  {bills.find(bill => bill.id === vote.billId)?.title || 'Unknown Bill'}
                </Text>
                <Text style={styles.tableCell}>{vote.vote}</Text>
              </View>
            ))}
          </View>
          {legislatorVotes.length > 5 && (
            <TouchableOpacity
              onPress={() => {
                /* Navigate to full voting record */
              }}>
              <Text style={styles.seeMoreText}>See full voting record</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Funding Record</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Source</Text>
              <Text style={styles.tableHeaderText}>Amount</Text>
              <Text style={styles.tableHeaderText}>Cycle</Text>
            </View>
            {legislatorFundingRecords.slice(0, 5).map((record, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{record.source}</Text>
                <Text style={styles.tableCell}>${record.amount.toFixed(2)}</Text>
                <Text style={styles.tableCell}>{record.cycle}</Text>
              </View>
            ))}
          </View>
          {legislatorFundingRecords.length > 5 && (
            <TouchableOpacity
              onPress={() => {
                /* Navigate to full funding record */
              }}>
              <Text style={styles.seeMoreText}>See all funding records</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

const formatScore = (score: number | null): string => {
  return score !== null ? `${score.toFixed(0)}%` : 'N/A';
};

export default LegislatorScreen;
