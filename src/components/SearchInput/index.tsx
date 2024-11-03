import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { colors } from '@/themes';

import styles from './styles';

const SearchInput: React.FC<{
  onSearch: (text: string) => void;
  placeholder?: string;
}> = ({ onSearch, placeholder = 'Search' }) => {
  return (
    <View style={[styles.searchInputContainer]}>
      <Icon name="search" size={20} color={colors.mediumGray} style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor={colors.mediumGray}
        onChangeText={onSearch}
      />
    </View>
  );
};

export default SearchInput;
