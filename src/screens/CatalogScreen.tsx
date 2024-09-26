import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  ViewStyle,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

import { Carousel } from '../components/carousel';
import { colors, componentStyles, typography, withOpacity } from '../styles/globalStyles';

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
}> = ({ onSearch, onFilterSort, placeholder = 'Search', style }) => (
  <View style={styles.searchBarContainer}>
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
}> = ({ title, isSelected, onPress }) => (
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

const CatalogItemView: React.FC<{ item: CatalogItem }> = React.memo(({ item }) => (
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
    <Carousel
      items={item.tags.map(tag => ({ id: tag, title: tag }))}
      onItemPress={() => {}}
      containerStyle={styles.tagCarouselContainer}
      itemStyle={styles.tagCarouselItem}
      textStyle={styles.tagCarouselItemText}
    />
  </TouchableOpacity>
));

// Main component
const CatalogScreen: React.FC = () => {
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [selectedTab, setSelectedTab] = useState<ItemType>('bill');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadCatalogItems = useCallback((): void => {
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
  }, []);

  useEffect(() => {
    loadCatalogItems();
  }, [loadCatalogItems]);

  const filteredItems = useMemo(() =>
    catalogItems.filter(
      item =>
        item.type === selectedTab &&
        (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
    [catalogItems, selectedTab, searchQuery]
  );

  const handleSearch = useCallback((text: string): void => {
    setSearchQuery(text);
  }, []);

  const handleFilterSort = useCallback((): void => {
    // TODO: Implement filter and sort functionality
    console.log('Filter & Sort button pressed');
  }, []);

  const renderCatalogItem = useCallback(({ item }: { item: CatalogItem }) => (
    <CatalogItemView item={item} />
  ), []);

  const keyExtractor = useCallback((item: CatalogItem) => item.id, []);

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
        renderItem={renderCatalogItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.catalogList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: componentStyles.container,
  header: componentStyles.header,
  headerText: componentStyles.headerText,
  subHeader: componentStyles.subHeader,
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchContainer: {
    ...componentStyles.input,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: colors.darkGray,
    fontSize: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  filterSortButton: {
    ...componentStyles.button,
    backgroundColor: colors.oldGloryRed,
    paddingHorizontal: 12,
  },
  filterSortButtonText: {
    ...componentStyles.buttonText,
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
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
  catalogList: {
    paddingVertical: 16,
  },
  catalogItem: componentStyles.card,
  catalogTitleLine: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  itemTitle: {
    ...typography.subtitle,
    color: colors.oldGloryRed,
    fontWeight: 'bold',
  },
  itemDescription: {
    ...typography.body,
    marginBottom: 12,
  },
  dividerVertical: componentStyles.dividerVertical,
  tagCarouselContainer: {
    ...componentStyles.carouselContainer,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
    paddingLeft: 0,
  },
  tagCarouselTitle: {
    ...typography.body,
    fontWeight: 'bold',
    paddingRight: 8,
    color: colors.oldGloryBlue,
  },
  tagCarouselItem: {
    ...componentStyles.carouselItem,
    backgroundColor: withOpacity(colors.oldGloryBlue, 0.1),
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  tagCarouselItemText: {
    ...typography.small,
    color: colors.oldGloryBlue,
  },
  filterTagsContainer: {
    ...componentStyles.carouselContainer,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.lightGray,
  },
  filterTagsTitle: {
    ...typography.subtitle,
    color: colors.oldGloryBlue,
    paddingBottom: 8,
  },
  filterTagsItem: {
    ...componentStyles.carouselItem,
    backgroundColor: withOpacity(colors.white, 0.6),
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  filterTagsSelectedItem: {
    ...componentStyles.carouselItem,
    backgroundColor: colors.white,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  filterTagsItemText: {
    ...typography.body,
    fontSize: 14,
    color: colors.oldGloryBlue,
  },
  filterTagsSelectedItemText: {
    ...typography.body,
    fontSize: 14,
    color: colors.oldGloryRed,
    fontWeight: 'bold',
  },
});

export default CatalogScreen;
