import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { colors, componentStyles, typography } from '../styles/globalStyles';

// Types
interface Legislator {
  id: string;
  name: string;
  chamber: string;
  party: string;
  state: string;
  imageUrl: string;
  attendanceScore: string;
  alignmentScore: string;
  contactInfo: {
    email: string;
    phone: string;
    office: string;
  };
  socialMedia: {
    twitter: string;
    facebook?: string;
    instagram?: string;
  };
  recentVotingRecord: Array<{
    bill: string;
    vote: string;
  }>;
  fundingRecord: Array<{
    source: string;
    amount: string;
    cycle: string;
  }>;
}

type RootStackParamList = {
  LegislatorScreen: { legislator: Legislator };
};

type LegislatorScreenRouteProp = RouteProp<RootStackParamList, 'LegislatorScreen'>;

interface LegislatorScreenProps {
  route: LegislatorScreenRouteProp;
}

const LegislatorScreen: React.FC<LegislatorScreenProps> = ({ route }) => {
  const { legislator } = route.params;

  const handlePhonePress = () => {
    Linking.openURL(`tel:${legislator.contactInfo.phone}`);
  };

  const handleTwitterPress = () => {
    Linking.openURL(`https://twitter.com/${legislator.socialMedia.twitter}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={{ uri: legislator.imageUrl }} style={styles.image} />
          <Text style={styles.name}>{legislator.name}</Text>
          <Text style={styles.position}>{legislator.chamber}</Text>
          <Text style={styles.partyState}>{`${legislator.party} - ${legislator.state}`}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attendance Score: {legislator.attendanceScore}</Text>
          <Text style={styles.sectionTitle}>Alignment Score: {legislator.alignmentScore}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Issues</Text>
          {/* Add Top Issues content here */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <Text style={styles.contactText}>Email: {legislator.contactInfo.email}</Text>
          <TouchableOpacity onPress={handlePhonePress}>
            <Text style={styles.contactText}>Phone: {legislator.contactInfo.phone}</Text>
          </TouchableOpacity>
          <Text style={styles.contactText}>Office: {legislator.contactInfo.office}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social Media</Text>
          <TouchableOpacity style={styles.socialMediaButton} onPress={handleTwitterPress}>
            <Icon name="twitter" size={24} color={colors.white} />
            <Text style={styles.socialMediaText}>@{legislator.socialMedia.twitter}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Voting Record</Text>
          {legislator.recentVotingRecord.map((record, index) => (
            <View key={index} style={styles.votingRecord}>
              <Text style={styles.billText}>{record.bill}</Text>
              <Text style={styles.voteText}>{record.vote}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Funding Record</Text>
          {legislator.fundingRecord.map((record, index) => (
            <View key={index} style={styles.fundingRecord}>
              <Text style={styles.sourceText}>{record.source}</Text>
              <Text style={styles.amountText}>${record.amount}</Text>
              <Text style={styles.cycleText}>{record.cycle}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...componentStyles.container,
    backgroundColor: colors.oldGloryBlue,
  },
  header: {
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  name: {
    ...typography.title,
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  position: {
    ...typography.subtitle,
    color: colors.white,
    textAlign: 'center',
  },
  partyState: {
    ...typography.body,
    color: colors.white,
    textAlign: 'center',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGray,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contactText: {
    ...typography.body,
    color: colors.white,
    marginBottom: 4,
  },
  socialMediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.oldGloryBlue,
    padding: 8,
    borderRadius: 4,
  },
  socialMediaText: {
    ...typography.body,
    color: colors.white,
    marginLeft: 8,
  },
  votingRecord: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  billText: {
    ...typography.body,
    color: colors.white,
    flex: 3,
  },
  voteText: {
    ...typography.body,
    color: colors.white,
    flex: 1,
    textAlign: 'right',
  },
  fundingRecord: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sourceText: {
    ...typography.body,
    color: colors.white,
    flex: 2,
  },
  amountText: {
    ...typography.body,
    color: colors.white,
    flex: 1,
    textAlign: 'right',
  },
  cycleText: {
    ...typography.body,
    color: colors.white,
    flex: 1,
    textAlign: 'right',
  },
});

export default LegislatorScreen;
