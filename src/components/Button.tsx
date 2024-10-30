import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

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
  color?: colors;
  iconName?: IconName;
  iconSize?: IconSize;
  onPress: () => void;
}

const Button = ({
  style,
  buttonText,
  buttonTextSize = ButtonTextSize.medium,
  buttonTextStyles,
  color = colors.darkGray,
  iconName,
  iconSize = IconSize.medium,
  onPress,
}: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {iconName && <Ionicons name={iconName} size={iconSize} color={color} />}
      {buttonText && (
        <Text
          style={[
            buttonTextStyles,
            {
              fontSize: buttonTextSize,
              color: color,
            },
          ]}>
          {buttonText}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: buttonStyles.buttonSmall,
});

export default Button;
