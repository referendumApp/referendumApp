import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { spacing } from '@/themes';

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
  // const [selectedOption, setSelectedOption] = useState<any[]>(initialValue);
  const handleSelectToggle = (value: any) => {
    onSelect(
      selectedOptions.includes(value)
        ? selectedOptions.filter(id => id !== value)
        : [...selectedOptions, value]
    );
    // setSelectedOption(prev =>
    //   prev.includes(value) ? prev.filter(f => f !== value) : [...prev, value],
    // );
    // onSelect(value);
  };

  return (
    <>
      {options.map(option => (
        <TouchableOpacity
          key={option.id}
          style={styles.optionItem}
          onPress={() => handleSelectToggle(option.id)}>
          <View style={styles.checkboxContainer}>
            <View
              style={[
                styles.checkbox,
                selectedOptions.includes(option.id) && styles.checked,
              ]}>
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

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: spacing.l,
    height: spacing.l,
    borderRadius: spacing.xs * 1.5,
    borderWidth: spacing.xs * 0.5,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionItem: {
    paddingVertical: spacing.s * 1.5,
  },
  optionText: {
    marginLeft: spacing.s * 1.5,
    fontSize: spacing.m,
  },
});

export default CheckBoxList;
