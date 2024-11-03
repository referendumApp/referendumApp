import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import BottomModal from '@/components/BottomModal';

import styles from './styles';

interface SortOption {
  label: string;
  value: string;
  icon?: string;
}

interface SortModalProps {
  isVisible: boolean;
  onSortChange: (value: string) => void;
  onRequestClose: () => void;
  selectedSort?: string;
}

const SortModal: React.FC<SortModalProps> = ({
  isVisible,
  onSortChange,
  onRequestClose,
  selectedSort,
}) => {
  const [tempSort, setTempSort] = useState<string | undefined>(selectedSort);

  const sortOptions: SortOption[] = [
    { label: 'Name (A-Z)', value: 'name_asc' },
    { label: 'Name (Z-A)', value: 'name_desc' },
    { label: 'Date (Newest)', value: 'date_desc' },
    { label: 'Date (Oldest)', value: 'date_asc' },
  ];

  const handleApply = () => {
    if (tempSort) {
      onSortChange(tempSort);
    }
    onRequestClose();
  };

  const handleReset = () => {
    setTempSort(undefined);
  };

  return (
    <BottomModal
      handleApply={handleApply}
      handleReset={handleReset}
      isVisible={isVisible}
      onRequestClose={onRequestClose}
      title="Sort">
      <ScrollView style={styles.optionsContainer}>
        {sortOptions.map(option => (
          <TouchableOpacity
            key={option.value}
            style={styles.optionItem}
            onPress={() => setTempSort(option.value)}>
            <View style={styles.radioContainer}>
              <View style={[styles.radio, tempSort === option.value && styles.radioSelected]}>
                {tempSort === option.value && <View style={styles.radioInner} />}
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
