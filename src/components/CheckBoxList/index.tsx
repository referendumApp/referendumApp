import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

interface Option {
  id: number;
  name: string;
}

type CheckBoxOption<T = {}> = T & Option;

interface CheckBoxListProps<T> {
  onSelect: (option: any) => void;
  options?: CheckBoxOption<T>[];
  selectedOptions?: any[];
}

function CheckBoxList<T>({
  onSelect,
  options = [],
  selectedOptions = [],
}: CheckBoxListProps<T>): React.ReactElement<CheckBoxListProps<T>> {
  const handleSelectToggle = (value: any) => {
    onSelect(
      selectedOptions.includes(value)
        ? selectedOptions.filter(id => id !== value)
        : [...selectedOptions, value],
    );
  };

  return (
    <>
      {options.map(option => (
        <TouchableOpacity
          key={option.id}
          style={styles.optionItem}
          onPress={() => handleSelectToggle(option.id)}>
          <View style={styles.checkboxContainer}>
            <View style={[styles.checkbox, selectedOptions.includes(option.id) && styles.checked]}>
              {selectedOptions.includes(option.id) && (
                <Ionicons name="checkmark" size={16} color="white" />
              )}
            </View>
            <Text style={styles.optionText}>{option.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}

export default CheckBoxList;
