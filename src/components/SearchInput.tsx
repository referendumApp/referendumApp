import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { colors, componentStyles } from '@/themes';

const SearchInput: React.FC<{
  onSearch: (text: string) => void;
  placeholder?: string;
}> = ({ onSearch, placeholder = 'Search' }) => {

  return (
      <View style={[styles.searchInputContainer]}>
        <Icon
          name="search"
          size={20}
          color={colors.mediumGray}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor={colors.mediumGray}
          onChangeText={onSearch}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  searchInputContainer: {
    ...componentStyles.input,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  searchInput: {
    flex: 1,
    color: colors.darkGray,
    fontSize: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
});

export default SearchInput;
