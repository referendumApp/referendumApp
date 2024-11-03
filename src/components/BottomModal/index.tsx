import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { Animated, Dimensions, View, Text, Modal, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BottomModalProps {
  handleApply: () => void;
  handleReset: () => void;
  isVisible: boolean;
  onRequestClose: () => void;
  title: string;
  screenHeight?: number;
}

const BottomModal: React.FC<PropsWithChildren<BottomModalProps>> = ({
  children,
  handleApply,
  handleReset,
  isVisible,
  onRequestClose,
  title,
  screenHeight = SCREEN_HEIGHT,
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      onRequestClose={onRequestClose}
      statusBarTranslucent={true}
      presentationStyle="fullScreen">
      <View style={styles.modalContainer}>
        <Animated.View
          style={[
            styles.modalContent,
            { height: screenHeight },
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [screenHeight, 0], // Adjust based on screen height
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
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.footerButton, styles.clearButton]}
              onPress={handleReset}>
              <Text style={styles.clearButtonText}>Clear all</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.footerButton, styles.applyButton]}
              onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BottomModal;
