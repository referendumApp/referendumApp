import React from 'react';
import { ColorValue, View, StyleProp, ViewStyle } from 'react-native';

import Button, { IconSize } from '@/components/Button';
import { colors } from '@/themes';

import styles from './styles';

interface BackButtonProps {
  style?: StyleProp<ViewStyle>;
  iconColor?: ColorValue | colors;
  handleBack: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({
  style,
  iconColor = colors.tertiary,
  handleBack,
}) => {
  return (
    <Button
      style={style}
      iconFamily="Ionicons"
      iconName="chevron-back"
      iconSize={IconSize.xlarge}
      contentColor={iconColor}
      onPress={handleBack}
    />
  );
};

interface NavBarProps {
  handleBack: () => void;
  handleFollow: () => void;
  isFollowing?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ handleBack, handleFollow, isFollowing }) => {
  const buttonProps = isFollowing
    ? { iconName: 'star-sharp', contentColor: colors.gold }
    : { iconName: 'star-outline', contentColor: colors.tertiary };

  return (
    <View style={styles.headerNavBar}>
      <BackButton handleBack={handleBack} />
      <Button
        {...buttonProps}
        iconFamily="Ionicons"
        iconSize={IconSize.xlarge}
        onPress={handleFollow}
      />
    </View>
  );
};

export default NavBar;
