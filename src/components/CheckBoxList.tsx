import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export interface Option {
  id: number;
  name: string;
}

type CheckBoxOption<T = {}> = T & Option;

interface CheckBoxListProps<T> {
  options: CheckBoxOption<T>[];
  selectedFilters?: number[];
}

export default function CheckBoxList<T>({
  options,
  selectedFilters = [],
}: CheckBoxListProps<T>): React.ReactElement<CheckBoxListProps<T>> {
  const [tempFilters, setTempFilters] = useState<number[]>(selectedFilters);

  const handleFilterToggle = (value: number) => {
    setTempFilters(prev =>
      prev.includes(value) ? prev.filter(f => f !== value) : [...prev, value],
    );
  };

  return (
    <>
      {options.map(option => (
        <TouchableOpacity
          key={option.id}
          style={styles.optionItem}
          onPress={() => handleFilterToggle(option.id)}>
          <View style={styles.checkboxContainer}>
            <View
              style={[
                styles.checkbox,
                tempFilters.includes(option.id) && styles.checked,
              ]}>
              {tempFilters.includes(option.id) && (
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

const styles = StyleSheet.create({
  optionsContainer: {
    padding: 16,
  },
  optionItem: {
    paddingVertical: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
  },
});
