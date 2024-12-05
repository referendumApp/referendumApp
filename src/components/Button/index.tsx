import React from 'react';
import { ColorValue, Insets, Pressable, Text, TextStyle, StyleProp, ViewStyle } from 'react-native';

import Icon, { IconLibrary, IconProps } from '@/components/Icon';
import { buttonStyles, colors } from '@/themes';

export enum ButtonTextSize {
  small = 16,
  medium = 20,
  large = 24,
  xlarge = 28,
}

export enum IconSize {
  small = 12,
  medium = 16,
  large = 20,
  xlarge = 24,
}

interface ButtonProps extends Omit<IconProps, 'iconFamily'> {
  style?: StyleProp<ViewStyle>;
  buttonText?: string;
  buttonTextSize?: ButtonTextSize;
  buttonTextStyles?: StyleProp<TextStyle>;
  contentColor?: ColorValue | colors;
  iconFamily?: IconLibrary;
  iconStyle?: StyleProp<TextStyle>;
  hitSlop?: null | Insets | number;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({
  style,
  buttonText,
  buttonTextSize,
  buttonTextStyles,
  contentColor,
  iconFamily,
  iconName,
  iconSize,
  iconStyle,
  hitSlop,
  onPress,
}) => {
  return (
    <Pressable
      style={iconFamily && !buttonText ? style : [buttonStyles.small, style]}
      onPress={onPress}
      hitSlop={hitSlop}>
      {iconFamily && (
        <Icon
          iconFamily={iconFamily}
          iconName={iconName}
          iconSize={iconSize}
          iconColor={contentColor}
          style={iconStyle}
        />
      )}
      {buttonText && (
        <Text
          style={[
            buttonTextStyles,
            buttonTextSize && { fontSize: buttonTextSize },
            contentColor && { color: contentColor },
          ]}>
          {buttonText}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;
