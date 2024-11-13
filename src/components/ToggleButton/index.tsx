import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

import Button from '@/components/Button';
import { IconLibrary, IconProps } from '@/components/Icon';
import { colors } from '@/themes';

import styles from './styles';

export enum ToggleButtonSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
  xlarge= 'xlarge',
}

interface ToggleButtonProps extends Omit<IconProps, 'iconFamily'> {
  style?: StyleProp<TextStyle>;
  buttonText?: string;
  buttonTextStyles?: TextStyle;
  buttonValue?: any;
  activeButtonColor?: string;
  inactiveButtonColor?: string;
  activeContentColor?: string;
  inactiveContentColor?: string;
  size?: ToggleButtonSize;
  isActive?: boolean;
  iconFamily?: IconLibrary;
  onToggle: (isActive: boolean, buttonValue: any) => void;
}

const ToggleButton = ({
  style,
  buttonText,
  buttonTextStyles,
  buttonValue,
  iconFamily,
  iconName,
  activeButtonColor = colors.appleBlue,
  inactiveButtonColor = colors.veryLightGray,
  activeContentColor = colors.tertiary,
  inactiveContentColor = colors.black,
  size = ToggleButtonSize.medium,
  isActive = false,
  onToggle,
}: ToggleButtonProps) => {
  const handlePress = () => {
    onToggle(isActive, buttonValue);
  };

  // Get size-specific styles
  const getSize = () => {
    switch (size) {
      case ToggleButtonSize.small:
        return { buttonSize: styles.buttonSmall, textSize: styles.buttonTextSmall, iconSize: 16 };
      case ToggleButtonSize.large:
        return { buttonSize: styles.buttonLarge, textSize: styles.buttonTextLarge, iconSize: 24 };
      case ToggleButtonSize.xlarge:
        return { buttonSize: styles.buttonXlarge, textSize: styles.buttonTextXlarge, iconSize: 32 };
      default:
        return { buttonSize: styles.buttonMedium, textSize: styles.buttonTextMedium, iconSize: 20 };
    }
  };

  const { buttonSize, textSize, iconSize } = getSize();

  const buttonStyle =
    !buttonText && iconFamily
      ? styles.buttonIcon
      : {
          ...styles.buttonContainer,
          ...buttonSize,
          backgroundColor: isActive ? activeButtonColor : inactiveButtonColor,
        };

  const contentColor = isActive ? activeContentColor : inactiveContentColor;

  return (
    <Button
      style={[buttonStyle, isActive && styles.buttonActive, style]}
      buttonText={buttonText}
      buttonTextSize={textSize.fontSize}
      buttonTextStyles={[
        buttonTextStyles,
        {
          color: contentColor,
        },
      ]}
      iconFamily={iconFamily}
      iconName={iconName}
      iconSize={iconSize}
      iconStyle={{ color: contentColor }}
      hitSlop={buttonStyle.padding}
      onPress={handlePress}
    />
  );
};

export default ToggleButton;
