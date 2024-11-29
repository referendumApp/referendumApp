import React, { PropsWithChildren, ReactNode, useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  useAnimatedValue,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface AccordionItemProps {
  title: string;
}

const AccordionItem: React.FC<PropsWithChildren<AccordionItemProps>> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const rotateAnim = useAnimatedValue(0);

  const toggleAccordion = useCallback(() => {
    // Configure layout animation
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    // Rotate chevron animation
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsOpen(!isOpen);
  }, [isOpen, rotateAnim, setIsOpen]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity activeOpacity={0.7} onPress={toggleAccordion} style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </Animated.View>
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
};

interface AccordionProps {
  data: Array<{
    title: string;
    content: ReactNode;
  }>;
}

const Accordion: React.FC<AccordionProps> = React.memo(({ data }) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <AccordionItem key={index} title={item.title}>
          {item.content}
        </AccordionItem>
      ))}
    </View>
  );
});

export default Accordion;
