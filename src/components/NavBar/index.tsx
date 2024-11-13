import React from 'react';
import { View, Text, Pressable } from 'react-native';

import styles from './styles';

interface NavBarProps {
  handleBack: () => void;
  handleFollow: () => void;
  isFollowing?: boolean;
}

const NavBar: React.FC<NavBarProps> = React.memo(({ handleBack, handleFollow, isFollowing }) => {
  return (
    <View style={styles.headerNavBar}>
      <Pressable onPress={handleBack}>
        <Text style={styles.backButtonText}>‹ Back</Text>
      </Pressable>
      <Pressable
        onPress={handleFollow}
        style={isFollowing ? styles.selectedFollowButton : styles.followButton}>
        <Text style={isFollowing ? styles.selectedFollowButtonText : styles.followButtonText}>
          {isFollowing ? 'Following' : 'Follow'}
        </Text>
      </Pressable>
    </View>
  );
});

export default NavBar;
