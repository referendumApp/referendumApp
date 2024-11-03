import React from 'react';
import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { buttonStyles, colors } from '@/themes';

export enum ButtonTextSize {
  small = 16,
  medium = 20,
  large = 24,
}

export enum IconSize {
  small = 12,
  medium = 16,
  large = 20,
}

type IconName = keyof typeof Ionicons.glyphMap;

interface ButtonProps {
  style?: ViewStyle;
  buttonText?: string;
  buttonTextSize?: ButtonTextSize;
  buttonTextStyles?: TextStyle;
  contentColor?: colors;
  iconName?: IconName;
  iconSize?: IconSize;
  onPress: () => void;
}

const Button = ({
  style,
  buttonText,
  buttonTextSize = ButtonTextSize.medium,
  buttonTextStyles,
  contentColor = colors.darkGray,
  iconName,
  iconSize = IconSize.medium,
  onPress,
}: ButtonProps) => {
  return (
    <TouchableOpacity style={[buttonStyles.small, style]} onPress={onPress}>
      {iconName && <Ionicons name={iconName} size={iconSize} color={contentColor} />}
      {buttonText && (
        <Text
          style={[
            buttonTextStyles,
            {
              fontSize: buttonTextSize,
              color: contentColor,
            },
          ]}>
          {buttonText}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
