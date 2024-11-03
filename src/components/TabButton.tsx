import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors, componentStyles, spacing } from '@/themes';

const TabButton: React.FC<{
  title: string;
  isSelected: boolean;
  onPress: () => void;
}> = ({ title, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.tabButton, isSelected && styles.tabButtonSelected]}
    onPress={onPress}>
    <Text style={[styles.tabButtonText, isSelected && styles.tabButtonTextSelected]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    paddingVertical: spacing.s * 1.5,
    alignItems: 'center',
  },
  tabButtonSelected: {
    borderBottomWidth: 2,
    borderBottomColor: colors.oldGloryRed,
  },
  tabButtonText: componentStyles.semiBoldButtonText,
  tabButtonTextSelected: {
    color: colors.oldGloryRed,
    fontWeight: 'bold',
  },
});

export default TabButton;
