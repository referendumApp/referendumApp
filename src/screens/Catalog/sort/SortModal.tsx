import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import BottomModal from '@/components/BottomModal';
import { TabMappingSortFields, TabType } from '@/screens/Catalog/types';

import styles from './styles';
import { SortOptions } from './types';

interface SortModalProps<T extends TabType> {
  isVisible: boolean;
  onSortSelected: (sortFields: TabMappingSortFields<T> | undefined) => void;
  onRequestClose: () => void;
  selectedSort?: TabMappingSortFields<T>;
  sortOptions: SortOptions;
}

const SortModal = <T extends TabType>({
  isVisible,
  onSortSelected,
  onRequestClose,
  selectedSort,
  sortOptions = [],
}: SortModalProps<T>) => {
  const onPress = (sortField: TabMappingSortFields<T>) => {
    const newSortField = sortField === selectedSort ? undefined : sortField;
    onSortSelected(newSortField);
    onRequestClose();
  };

  return (
    <BottomModal
      testID="sortModal"
      isVisible={isVisible}
      onRequestClose={onRequestClose}
      title="Sort"
      hasFooter={false}
      transparent={true}
      animationType="fade"
      screenHeight={300}>
      <ScrollView style={styles.optionsContainer}>
        {sortOptions.map(option => (
          <TouchableOpacity
            key={option.field}
            style={styles.optionItem}
            onPress={() => onPress(option.field)}>
            <View style={styles.radioContainer}>
              <View style={[styles.radio, selectedSort === option.field && styles.radioSelected]}>
                {selectedSort === option.field && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.optionText}>{option.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </BottomModal>
  );
};

export default SortModal;
