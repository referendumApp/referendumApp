import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import BottomModal from './BottomModal';

interface SortOption {
  label: string;
  value: string;
  icon?: string;
}

interface SortModalProps {
  // sortOptions: SortOption[];
  isVisible: boolean;
  onSortChange: (value: string) => void;
  onRequestClose: () => void;
  selectedSort?: string;
}

const SortModal: React.FC<SortModalProps> = ({
  // sortOptions,
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
              <View
                style={[
                  styles.radio,
                  tempSort === option.value && styles.radioSelected,
                ]}>
                {tempSort === option.value && (
                  <View style={styles.radioInner} />
                )}
              </View>
              <Text style={styles.optionText}>{option.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    padding: 16,
  },
  optionItem: {
    paddingVertical: 12,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#007AFF',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
  },
});

export default SortModal;
