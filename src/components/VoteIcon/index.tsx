import React from 'react';
import { ColorValue, View, StyleProp, ViewStyle } from 'react-native';

import { VoteChoice, VoteChoiceType } from '@/appTypes';
import Icon, { IconLibrary, IconNames } from '@/components/Icon';
import { colors } from '@/themes';

import styles from './styles';

interface VoteConfigProps {
  containerStyle: StyleProp<ViewStyle>;
  iconFamily: IconLibrary;
  iconName: IconNames<IconLibrary>;
  iconColor: ColorValue | colors;
}

const VoteConfig: Record<VoteChoiceType, VoteConfigProps> = {
  [VoteChoice.YAY]: {
    containerStyle: styles.yesVote,
    iconFamily: 'Octicons',
    iconName: 'thumbsup',
    iconColor: colors.tertiary,
  },
  [VoteChoice.NAY]: {
    containerStyle: styles.noVote,
    iconFamily: 'Octicons',
    iconName: 'thumbsdown',
    iconColor: colors.tertiary,
  },
  [VoteChoice.ABSTAIN]: {
    containerStyle: styles.default,
    iconFamily: 'MaterialCommunityIcons',
    iconName: 'head-question-outline',
    iconColor: colors.darkGray,
  },
  [VoteChoice.ABSENT]: {
    containerStyle: styles.default,
    iconFamily: 'SimpleLineIcons',
    iconName: 'ghost',
    iconColor: colors.darkGray,
  },
};

interface VoteIconProps {
  style?: StyleProp<ViewStyle>;
  voteChoice: VoteChoiceType;
  size: number;
}

const VoteIcon: React.FC<VoteIconProps> = ({ style, voteChoice, size }) => {
  const { containerStyle, iconFamily, iconName, iconColor } = VoteConfig[voteChoice];

  return (
    <View style={[containerStyle, style]}>
      <Icon iconFamily={iconFamily} iconName={iconName} iconSize={size} iconColor={iconColor} />
    </View>
  );
};

export default VoteIcon;
