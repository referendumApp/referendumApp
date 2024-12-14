import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const TabButton: React.FC<{
  testID?: string;
  title: string;
  isSelected: boolean;
  onPress: () => void;
}> = ({ testID, title, isSelected, onPress }) => (
  <TouchableOpacity
    testID={testID}
    style={[styles.tabButton, isSelected && styles.tabButtonSelected]}
    onPress={onPress}>
    <Text style={[styles.tabButtonText, isSelected && styles.tabButtonTextSelected]}>{title}</Text>
  </TouchableOpacity>
);

export default TabButton;
