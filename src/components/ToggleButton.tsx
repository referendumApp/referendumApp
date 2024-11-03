import React, { useState, useRef } from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { colors } from '@/themes';

export enum ToggleButtonSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

type IconName = keyof typeof Ionicons.glyphMap;

interface ToggleButtonProps {
  buttonText: string;
  buttonTextStyles?: TextStyle;
  buttonValue?: any;
  iconName?: IconName;
  activeColor?: string;
  inactiveColor?: string;
  size?: ToggleButtonSize;
  isActive?: boolean;
  onToggle: (isActive: boolean, buttonValue: any) => void;
}

const ToggleButton = ({
  buttonText,
  buttonTextStyles,
  buttonValue,
  iconName,
  activeColor = '#007AFF',
  inactiveColor = '#EEEEEE',
  size = ToggleButtonSize.medium,
  isActive = false,
  onToggle,
}: ToggleButtonProps) => {
  const animatedColor = new Animated.Value(isActive ? 1 : 0);

  const handlePress = () => {
    // Animate color change
    Animated.timing(animatedColor, {
      toValue: isActive ? 1 : 0,
      duration: 100,
      useNativeDriver: false, // Required for backgroundColor animation
    }).start();

    // Call callback if provided
    onToggle(isActive, buttonValue);
  };

  // Get size-specific styles
  const getSize = () => {
    switch (size) {
      case ToggleButtonSize.small:
        return { buttonSize: styles.buttonSmall, iconSize: 16 };
      case ToggleButtonSize.large:
        return { buttonSize: styles.buttonLarge, iconSize: 24 };
      default:
        return { buttonSize: styles.buttonMedium, iconSize: 20 };
    }
  };

  const { buttonSize, iconSize } = getSize();

  const contentColor = isActive ? colors.white : colors.black;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            padding: buttonSize.padding,
            minWidth: buttonSize.minWidth,
            backgroundColor: animatedColor.interpolate({
              inputRange: [0, 1],
              outputRange: [inactiveColor, activeColor],
            }),
          },
        ]}>
        {iconName && (
          <Ionicons
            name={iconName}
            size={iconSize}
            style={{ color: contentColor }}
          />
        )}
        <Text
          style={[
            buttonTextStyles,
            {
              fontSize: buttonSize.fontSize,
              color: contentColor,
            },
          ]}>
          {buttonText}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  buttonSmall: {
    padding: 8,
    fontSize: 12,
    minWidth: 60,
  },
  buttonMedium: {
    padding: 16,
    fontSize: 16,
    minWidth: 100,
  },
  buttonLarge: {
    padding: 12,
    fontSize: 20,
    minWidth: 80,
  },
});

export default ToggleButton;
