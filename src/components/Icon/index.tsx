import React from 'react';
import { ColorValue, StyleProp, TextStyle } from 'react-native';

import * as Icons from '@expo/vector-icons';

export type IconLibrary = keyof typeof Icons;
export type IconNames<T extends IconLibrary> = keyof typeof Icons[T]['glyphMap'];

export interface IconProps {
  iconFamily: IconLibrary;
  iconName?: IconNames<IconLibrary>;
  iconSize?: number;
  iconColor?: ColorValue;
  style?: StyleProp<TextStyle>;
}

const Icon = ({ iconFamily, iconName, iconSize, iconColor, style }: IconProps) => {
  const IconComponent = Icons[iconFamily];

  return <IconComponent name={iconName} size={iconSize} color={iconColor} style={style} />;
};

export default Icon;
