import React, { useCallback } from 'react';
import {
  Text,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle,
  useAnimatedValue,
} from 'react-native';

import Icon from '@/components/Icon';
import { colors } from '@/themes';

import styles from './styles';

interface RotatingChevronProps {
  headerStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  isOpen: boolean;
  text: string;
  onPressText?: () => void;
  onPress: (open: boolean) => void;
}

const RotatingChevron: React.FC<RotatingChevronProps> = ({
  headerStyle,
  textStyle,
  isOpen,
  text,
  onPressText,
  onPress,
}) => {
  const rotateAnim = useAnimatedValue(0);

  const toggleAccordion = useCallback(() => {
    // Configure layout animation
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    rotateAnim.stopAnimation();

    // Rotate chevron animation
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    onPress(!isOpen);
  }, [isOpen, rotateAnim, onPress]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={toggleAccordion} style={headerStyle}>
      {onPressText ? (
        <Pressable onPress={onPressText}>
          <Text style={[textStyle, styles.linkText]}>{text}</Text>
        </Pressable>
      ) : (
        <Text style={textStyle}>{text}</Text>
      )}
      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        <Icon
          iconFamily="Ionicons"
          iconName="chevron-down"
          iconSize={20}
          iconColor={colors.darkGray}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default RotatingChevron;
