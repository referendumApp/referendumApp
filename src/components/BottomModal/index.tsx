import React, { PropsWithChildren, useEffect } from 'react';
import {
  Animated,
  View,
  Text,
  Modal,
  ModalProps,
  Platform,
  TouchableOpacity,
  useAnimatedValue,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

import Button from '@/components/Button';
import { SCREEN_HEIGHT } from '@/themes/dimensions';

import styles from './styles';

interface BottomModalProps extends ModalProps {
  testID?: string;
  handleApply?: () => void;
  handleReset?: () => void;
  isVisible: boolean;
  onRequestClose: () => void;
  title: string;
  screenHeight?: number;
  hasFooter?: boolean;
}

const BottomModal: React.FC<PropsWithChildren<BottomModalProps>> = ({
  testID,
  children,
  handleApply,
  handleReset,
  isVisible,
  onRequestClose,
  title,
  screenHeight = SCREEN_HEIGHT,
  hasFooter = true,
  transparent = false,
  animationType,
  statusBarTranslucent = false,
  presentationStyle,
}) => {
  const insets = useSafeAreaInsets();
  const calcHeight =
    Platform.OS === 'ios' &&
    (presentationStyle === 'fullScreen' || presentationStyle === 'overFullScreen')
      ? screenHeight - insets.top
      : screenHeight;
  const bottomBar = insets.bottom;
  const slideAnim = useAnimatedValue(0);

  useEffect(() => {
    const animation = Animated.spring(slideAnim, {
      toValue: isVisible ? 1 : 0,
      useNativeDriver: true,
    });

    animation.start();

    return () => slideAnim.stopAnimation();
  }, [isVisible, slideAnim]);

  return (
    <Modal
      testID={testID}
      animationType={animationType}
      transparent={transparent}
      visible={isVisible}
      onRequestClose={onRequestClose}
      statusBarTranslucent={statusBarTranslucent}
      presentationStyle={presentationStyle}>
      <View style={styles.modalContainer}>
        <Animated.View
          style={[
            styles.modalContent,
            { height: calcHeight, paddingBottom: bottomBar },
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [calcHeight, 0], // Adjust based on screen height
                  }),
                },
              ],
            },
          ]}>
          {/* Header */}
          <View style={styles.modalHeader}>
            {title && <Text style={styles.modalTitle}>{title}</Text>}
            <TouchableOpacity onPress={onRequestClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {children}

          {/* Footer */}
          {hasFooter && (
            <View style={styles.modalFooter}>
              {handleReset && (
                <Button
                  style={[styles.footerButton, styles.clearButton]}
                  onPress={handleReset}
                  buttonText="Clear all"
                  buttonTextStyles={styles.clearButtonText}
                />
              )}
              {handleApply && (
                <Button
                  style={[styles.footerButton, styles.applyButton]}
                  onPress={handleApply}
                  buttonText="Apply"
                  buttonTextStyles={styles.applyButtonText}
                />
              )}
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BottomModal;
