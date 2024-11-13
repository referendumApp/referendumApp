import React, { useState } from 'react';
import { View, Text, Image, ImageStyle, ScrollView, Pressable, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import Card from '@/components/Card';
import NavBar from '@/components/NavBar';
import { CatalogStackParamList } from '@/navigation/types';

import { useFollowLegislatorMutation, useUnfollowLegislatorMutation } from './api';
import styles from './styles';

type LegislatorScreenProps = StackScreenProps<CatalogStackParamList, 'LegislatorScreen'>;

const LegislatorScreen: React.FC<LegislatorScreenProps> = React.memo(
  ({
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
        <NavBar handleBack={handleBack} handleFollow={handleFollow} isFollowing={isFollowing} />
        <View style={styles.header}>
          <Image source={{ uri: legislator.imageUrl }} style={styles.image as ImageStyle} />
          <View style={styles.dividerVertical} />
          <View>
            <Text style={styles.name}>{legislator.name}</Text>
            <Text style={styles.descriptionText}>Branch: {legislator.role.name}</Text>
            <Text style={styles.descriptionText}>Party: {legislator.party.name}</Text>
            <Text style={styles.descriptionText}>State: {legislator.state.name}</Text>
            <Text style={styles.descriptionText}>District: {legislator.district}</Text>
          </View>
        </View>
        <ScrollView>
          <Card
            title="Referendum Scores"
            headerStyle={styles.sectionHeader}
            contentStyle={styles.sectionContent}>
            <Text style={styles.sectionBody}>Attendance Score: {formatScore(attendanceScore)}</Text>
            <Text style={styles.sectionBody}>Alignment Score: {formatScore(alignmentScore)}</Text>
          </Card>

          {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Issues</Text>
          {legislator.topIssues?.map((issue, index) => (
            <Text key={index} style={styles.sectionBody}>
              • {issue}
            </Text>
          ))}
        </View> */}

          <Card
            title="Contact & Social"
            headerStyle={styles.sectionHeader}
            contentStyle={styles.sectionContent}>
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
          </Card>

          <Card
            title="Voting Record"
            headerStyle={styles.sectionHeader}
            contentStyle={styles.sectionContent}>
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
              <Pressable
                onPress={() => {
                  /* Navigate to full voting record */
                }}>
                <Text style={styles.seeMoreText}>See full voting record</Text>
              </Pressable>
            )}
          </Card>

          <Card
            title="Funding Record"
            headerStyle={styles.sectionHeader}
            contentStyle={styles.sectionContent}>
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
              <Pressable
                onPress={() => {
                  /* Navigate to full funding record */
                }}>
                <Text style={styles.seeMoreText}>See all funding records</Text>
              </Pressable>
            )}
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  },
);

const formatScore = (score: number | null): string => {
  return score !== null ? `${score.toFixed(0)}%` : 'N/A';
};

export default LegislatorScreen;
