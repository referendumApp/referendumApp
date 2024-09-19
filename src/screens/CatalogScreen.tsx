import React, {useState, useEffect} from 'react';
import {
  View,
  ViewStyle,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

import {colors, componentStyles, typography} from '../styles/globalStyles';

// Types
type ItemType = 'bill' | 'legislator';

interface CatalogItem {
  id: string;
  type: ItemType;
  title: string;
  description: string;
  tags: string[];
}

// Components
const SearchBar: React.FC<{
  onSearch: (text: string) => void;
  onFilterSort: () => void;
  placeholder?: string;
  style?: ViewStyle;
}> = ({onSearch, onFilterSort, placeholder = 'Search', style}) => (
  <View style={styles.subHeader}>
    <View style={[styles.searchContainer, style]}>
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
    <TouchableOpacity style={styles.filterSortButton} onPress={onFilterSort}>
      <Text style={styles.filterSortButtonText}>Filter & Sort</Text>
    </TouchableOpacity>
  </View>
);

const TabButton: React.FC<{
  title: string;
  isSelected: boolean;
  onPress: () => void;
}> = ({title, isSelected, onPress}) => (
  <TouchableOpacity
    style={[styles.tabButton, isSelected && styles.tabButtonSelected]}
    onPress={onPress}>
    <Text
      style={[
        styles.tabButtonText,
        isSelected && styles.tabButtonTextSelected,
      ]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const CatalogItemView: React.FC<{item: CatalogItem}> = ({item}) => (
  <TouchableOpacity style={styles.catalogItem}>
    <View style={styles.catalogTitleLine}>
      <Text style={styles.itemTitle}>
        {item.type === 'bill' ? 'US' : item.type.toUpperCase()}
      </Text>
      <View style={styles.dividerVertical} />
      <Text style={styles.itemTitle}>{item.title}</Text>
    </View>
    <Text style={styles.itemDescription} numberOfLines={3} ellipsizeMode="tail">
      {item.description}
    </Text>
    <View style={styles.tagsContainer}>
      {item.tags.map((tag: string) => (
        <View key={tag} style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>
  </TouchableOpacity>
);

// Main component
const CatalogScreen: React.FC = () => {
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [selectedTab, setSelectedTab] = useState<ItemType>('bill');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    loadCatalogItems();
  }, []);

  const loadCatalogItems = (): void => {
    // TODO: Replace this with actual API call
    const mockCatalogItems: CatalogItem[] = [
      {
        id: '1',
        type: 'bill',
        title: 'H.J.Res.26',
        description:
          'Disapproving the action of the District of Columbia Council in approving the Revised Criminal Code Act of 2022.',
        tags: [
          'Government Operations',
          'Congressional Oversight',
          'Criminal Justice',
        ],
      },
      {
        id: '2',
        type: 'bill',
        title: 'S.4361',
        description: 'Border Act of 2024',
        tags: ['Immigration', 'Appropriations', 'Border Security', 'Smuggling'],
      },
      {
        id: '3',
        type: 'bill',
        title: 'S.4381',
        description: 'Right to Contraception Act',
        tags: ['Healthcare', 'Contraception'],
      },
      {
        id: '4',
        type: 'bill',
        title: 'S.4802',
        description:
          'Department of the Interior, Environment, and Related Agencies Appropriations Act, 2023',
        tags: ['Appropriations', 'Environment', 'Government Operations'],
      },
    ];
    setCatalogItems(mockCatalogItems);
  };

  const filteredItems = catalogItems.filter(
    item =>
      item.type === selectedTab &&
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const handleSearch = (text: string): void => {
    setSearchQuery(text);
  };

  const handleFilterSort = (): void => {
    // TODO: Implement filter and sort functionality
    console.log('Filter & Sort button pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Catalog</Text>
      </View>
      <View style={styles.subHeader}>
        <SearchBar onSearch={handleSearch} onFilterSort={handleFilterSort} />
      </View>
      <View style={styles.tabContainer}>
        <TabButton
          title="Bills"
          isSelected={selectedTab === 'bill'}
          onPress={() => setSelectedTab('bill')}
        />
        <TabButton
          title="Legislators"
          isSelected={selectedTab === 'legislator'}
          onPress={() => setSelectedTab('legislator')}
        />
      </View>
      <FlatList
        data={filteredItems}
        renderItem={({item}: {item: CatalogItem}) => (
          <CatalogItemView item={item} />
        )}
        keyExtractor={(item: CatalogItem) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: componentStyles.container,
  header: componentStyles.header,
  headerText: componentStyles.headerText,
  subHeader: {...componentStyles.subHeader, flexDirection: 'row'},
  searchContainer: {
    ...componentStyles.input,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: colors.white,
    width: '60%',
  },
  searchInput: {
    flex: 1,
    color: colors.darkGray,
    fontSize: 16,
  },
  filterSortButton: {
    ...componentStyles.button,
    backgroundColor: colors.oldGloryRed,
  },
  filterSortButtonText: componentStyles.buttonText,
  searchIcon: {
    marginRight: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  redButton: {
    ...componentStyles.button,
    backgroundColor: colors.oldGloryRed,
  },
  filterButtonText: {
    ...componentStyles.buttonText,
    color: colors.white,
  },
  sortButtonText: {
    ...componentStyles.buttonText,
    marginLeft: 4,
    color: colors.white,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
  },
  tabButtonSelected: {
    borderBottomWidth: 2,
    borderBottomColor: colors.oldGloryRed,
  },
  tabButtonText: {
    ...typography.body,
    color: colors.darkGray,
    fontWeight: '500',
  },
  tabButtonTextSelected: {
    color: colors.oldGloryRed,
    fontWeight: 'bold',
  },
  catalogItem: componentStyles.card,
  catalogTitleLine: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  itemTitle: {
    ...typography.subtitle,
    color: colors.oldGloryRed,
    fontWeight: 'bold',
  },
  itemDescription: typography.body,
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: componentStyles.tag,
  tagText: componentStyles.tagText,
  dividerVertical: componentStyles.dividerVertical,
});

export default CatalogScreen;
