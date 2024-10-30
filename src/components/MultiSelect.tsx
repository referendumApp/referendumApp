import React, { useState } from 'react';
import {
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

interface Option {
  id: number;
  name: string;
  count?: number;
}

type MultiSelectOption<T = {}> = T & Option;

interface MultiSelectProps<T> {
  options: MultiSelectOption<T>[];
  selectedIds: number[];
  onSelect: (ids: number[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
}

export default function MultiSelect<T>({
  options,
  selectedIds,
  onSelect,
  placeholder = 'Select items',
  searchPlaceholder = 'Search...',
}: MultiSelectProps<T>): React.ReactElement<MultiSelectProps<T>> {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter options based on search query
  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleOption = (id: number) => {
    if (selectedIds.includes(id)) {
      onSelect(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      onSelect([...selectedIds, id]);
    }
  };

  const getSelectedText = () => {
    if (selectedIds.length === 0) {
      return placeholder;
    }
    if (selectedIds.length === 1) {
      const selected = options.find(opt => opt.id === selectedIds[0]);
      return selected ? selected.name : placeholder;
    }
    return `${selectedIds.length} items selected`;
  };

  return (
    <View style={styles.container}>
      {/* Dropdown Header */}
      <TouchableOpacity
        style={[styles.header, isOpen && styles.headerOpen]}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}>
        <Text
          style={[
            styles.headerText,
            selectedIds.length === 0 && styles.placeholder,
          ]}>
          {getSelectedText()}
        </Text>
        <Animated.View
          style={{
            transform: [
              {
                rotate: isOpen ? '180deg' : '0deg',
              },
            ],
          }}>
          <Ionicons name="chevron-down" size={24} color="#666" />
        </Animated.View>
      </TouchableOpacity>

      {/* Dropdown Content */}
      {isOpen && (
        <View style={styles.dropdown}>
          {/* Search Input */}
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#666"
              style={styles.searchIcon}
            />
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
          <ScrollView
            style={styles.optionsList}
            keyboardShouldPersistTaps="handled">
            {filteredOptions.map(option => {
              const isSelected = selectedIds.includes(option.id);
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[styles.option, isSelected && styles.selectedOption]}
                  onPress={() => toggleOption(option.id)}
                  activeOpacity={0.7}>
                  <View style={styles.optionContent}>
                    <View
                      style={[
                        styles.checkbox,
                        isSelected && styles.checkedBox,
                      ]}>
                      {isSelected && (
                        <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.selectedOptionText,
                      ]}>
                      {option.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
            {filteredOptions.length === 0 && (
              <Text style={styles.noResults}>No results found</Text>
            )}
          </ScrollView>

          {(
            <Text style={styles.footer}>
              {selectedIds.length} of {options.length} selected
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  headerOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerText: {
    fontSize: 16,
    color: '#333',
  },
  placeholder: {
    color: '#999',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#ddd',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    padding: 8,
    fontSize: 16,
  },
  optionsList: {
    maxHeight: 300,
  },
  option: {
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  selectedOption: {
    backgroundColor: '#f0f8ff',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#007AFF',
  },
  noResults: {
    padding: 16,
    textAlign: 'center',
    color: '#666',
  },
  footer: {
    padding: 8,
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ddd',
  },
});
