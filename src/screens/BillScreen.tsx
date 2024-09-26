import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { CatalogStackParamList } from '../types/navigation';
import {colors, componentStyles, typography} from '../styles/styles';

type BillScreenProps = StackScreenProps<CatalogStackParamList, 'BillScreen'>;

const BillScreen: React.FC<BillScreenProps> = ({route}) => {
  const {bill} = route.params;
  const navigation = useNavigation();
  const [isFollowing, setIsFollowing] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerNavBar}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>‹ Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFollow}
            style={
              isFollowing ? styles.selectedFollowButton : styles.followButton
            }>
            <Text
              style={
                isFollowing
                  ? styles.selectedFollowButtonText
                  : styles.followButtonText
              }>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>{bill.title}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...componentStyles.container,
    backgroundColor: colors.white,
    flex: 1,
  },
  header: componentStyles.header,
  headerNavBar: {
    ...componentStyles.header,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 0,
  },
  backButton: {},
  backButtonText: {
    ...typography.body,
    color: 'white',
  },
  followButton: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  followButtonText: {
    ...typography.body,
    color: 'white',
  },
  selectedFollowButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  selectedFollowButtonText: {
    ...typography.body,
    color: colors.oldGloryRed,
    fontWeight: 'bold',
  },
  title: typography.title,
});

export default BillScreen;
