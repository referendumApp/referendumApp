import React from 'react';
import { ColorValue, View, Text, Pressable, StyleProp, ViewStyle } from 'react-native';

import Icon from '@/components/Icon';
import { colors } from '@/themes';

import styles from './styles';

interface BackButtonProps {
  style?: StyleProp<ViewStyle>;
  iconColor?: ColorValue;
  handleBack: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({
  style,
  iconColor = colors.tertiary,
  handleBack,
}) => {
  return (
    <Pressable style={style} onPress={handleBack}>
      <Icon iconFamily="Ionicons" iconName="chevron-back" iconSize={24} iconColor={iconColor} />
    </Pressable>
  );
};

interface NavBarProps {
  handleBack: () => void;
  handleFollow: () => void;
  isFollowing?: boolean;
}

const NavBar: React.FC<NavBarProps> = React.memo(({ handleBack, handleFollow, isFollowing }) => {
  return (
    <View style={styles.headerNavBar}>
      <BackButton handleBack={handleBack} />
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
