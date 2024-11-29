import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import RotatingChevron from '@/components/RotatingChevron';

import styles from './styles';

interface Option {
  id: number;
  name: string;
  count?: number;
}

type MultiSelectOption<T = {}> = T & Option;

interface MultiSelectProps<T> {
  onSelect: (ids: any[]) => void;
  options?: MultiSelectOption<T>[];
  placeholder?: string;
  searchPlaceholder?: string;
  selectedOptions?: any[];
}

function MultiSelect<T>({
  onSelect,
  options = [],
  placeholder = 'Select items',
  searchPlaceholder = 'Search...',
  selectedOptions = [],
}: MultiSelectProps<T>): React.ReactElement<MultiSelectProps<T>> {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter options based on search query
  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleOption = (id: any) => {
    const updatedItems = selectedOptions.includes(id)
      ? selectedOptions.filter(selectedId => selectedId !== id)
      : [...selectedOptions, id];
    onSelect(updatedItems);
  };

  const getSelectedText = () => {
    if (selectedOptions.length === 0) {
      return placeholder;
    }
    if (selectedOptions.length === 1) {
      const selected = options.find(opt => opt.id === selectedOptions[0]);
      return selected ? selected.name : placeholder;
    }
    return `${selectedOptions.length} items selected`;
  };

  return (
    <View style={styles.container}>
      {/* Dropdown Header */}
      <RotatingChevron
        headerStyle={[styles.header, isOpen && styles.headerOpen]}
        textStyle={[styles.headerText, selectedOptions.length === 0 && styles.placeholder]}
        isOpen={isOpen}
        text={getSelectedText()}
        onPress={(open: boolean) => setIsOpen(open)}
      />

      {/* Dropdown Content */}
      {isOpen && (
        <View style={styles.dropdown}>
          {/* Search Input */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="while-editing"
            />
          </View>

          {/* Options List */}
          <ScrollView style={styles.optionsList} keyboardShouldPersistTaps="handled">
            {filteredOptions.map(option => {
              const isSelected = selectedOptions.includes(option.id);
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[styles.option, isSelected && styles.selectedOption]}
                  onPress={() => toggleOption(option.id)}
                  activeOpacity={0.7}>
                  <View style={styles.optionContent}>
                    <View style={[styles.checkbox, isSelected && styles.checked]}>
                      {isSelected && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                    </View>
                    <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
                      {option.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
            {filteredOptions.length === 0 && <Text style={styles.noResults}>No results found</Text>}
          </ScrollView>

          {
            <Text style={styles.footer}>
              {selectedOptions.length} of {options.length} selected
            </Text>
          }
        </View>
      )}
    </View>
  );
}

export default MultiSelect;
