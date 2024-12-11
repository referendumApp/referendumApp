import React from 'react';
import { Text, View } from 'react-native';

import { Legislator } from '@/appTypes';
import Card from '@/components/Card';

import styles from './styles';

const formatScore = (score: number | null): string => {
  return score !== null ? `${score.toFixed(0)}%` : 'N/A';
};

const Snapshot: React.FC<{ legislator: Legislator }> = ({ legislator }) => {
  const attendanceScore = null; // votingManager.getLegislatorAttendanceScore(legislator.id);
  const alignmentScore = null; // votingManager.getUserLegislatorAlignmentScore(legislator.id, settingsManager.userId);

  return (
    <View style={styles.cardContainer}>
      <Card
        title="Referendum Scores"
        headerStyle={styles.sectionHeader}
        contentStyle={styles.sectionContent}>
        <Text style={styles.sectionBody}>Attendance Score: {formatScore(attendanceScore)}</Text>
        <Text style={styles.sectionBody}>Alignment Score: {formatScore(alignmentScore)}</Text>
      </Card>

      <Card
        title="Top Issues"
        headerStyle={styles.sectionHeader}
        contentStyle={styles.sectionContent}>
        <Text style={styles.sectionBody}>Coming Soon...</Text>
      </Card>

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
    </View>
  );
};

export default Snapshot;
