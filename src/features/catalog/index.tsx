import React, { useState, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Legislator, Bill } from '@/appTypes';
import Button, { IconSize } from '@/components/Button';
import SearchInput from '@/components/SearchInput';
import SortModal from '@/components/SortModal';
import TabButton from '@/components/TabButton';
import { useGetBillsQuery } from '@/features/bill/api';
import { useGetLegislatorsQuery } from '@/features/legislator/api';
import { CatalogStackParamList } from '@/navigation/types';
import { colors } from '@/themes';

import BillItem from './BillItem';
import filterConfigs from './filters/filterConfigs';
import FilterModal from './filters/FilterModal';
import FilterProvider from './filters/FilterProvider';
import useCatalogItems from './hooks/useCatalogItems';
import LegislatorItem from './LegislatorItem';
import styles from './styles';
import { FilterOptions, TabType, ValidFilterFields } from './types';

type NavigationProp = StackNavigationProp<CatalogStackParamList, 'Catalog'>;

const CatalogScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { data: bills } = useGetBillsQuery();
  const { data: legislators } = useGetLegislatorsQuery();

  const [selectedTab, setSelectedTab] = useState<TabType>('bill');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterOptions>({});
  const [filterFields, setFilterFields] = useState<ValidFilterFields>(filterConfigs.bill.fields);
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

  const catalogItems = useCatalogItems({
    items: selectedTab === 'bill' ? bills : legislators,
    selectedTab,
    filter,
    searchQuery,
    setFilterFields,
  });

  const handleSearch = useCallback((text: string): void => {
    setSearchQuery(text);
  }, []);

  const handleBillPress = useCallback(
    (bill: Bill) => {
      navigation.navigate('BillScreen', { bill });
    },
    [navigation],
  );

  const handleLegislatorPress = useCallback(
    (legislator: Legislator) => {
      navigation.navigate('LegislatorScreen', { legislator });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: Bill | Legislator }) => {
      if ('title' in item) {
        return <BillItem bill={item} onPress={() => handleBillPress(item)} />;
      } else {
        return <LegislatorItem legislator={item} onPress={() => handleLegislatorPress(item)} />;
      }
    },
    [handleBillPress, handleLegislatorPress],
  );

  const keyExtractor = useCallback((item: Bill | Legislator) => String(item.id), []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Catalog</Text>
      </View>
      <View style={styles.subHeader}>
        <View style={styles.searchBarContainer}>
          <SearchInput onSearch={handleSearch} />
          {/* Filter and Sort */}
          <View style={[styles.buttonContainer]}>
            <Button
              style={styles.button}
              contentColor={colors.white}
              iconSize={IconSize.large}
              iconName="filter"
              onPress={() => setIsFilterOpen(true)}
            />
            <Button
              style={styles.button}
              contentColor={colors.white}
              iconSize={IconSize.large}
              iconName="swap-vertical"
              onPress={() => setIsFilterOpen(true)}
            />
          </View>
          <FilterProvider initialFilters={filter}>
            <FilterModal
              filterFields={filterFields}
              isVisible={isFilterOpen}
              setFilter={options => setFilter(options)}
              onRequestClose={() => setIsFilterOpen(false)}
            />
          </FilterProvider>
          <SortModal
            isVisible={isSortOpen}
            onSortChange={() => undefined}
            onRequestClose={() => setIsSortOpen(false)}
          />
        </View>
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
        data={catalogItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.catalogList}
      />
    </SafeAreaView>
  );
};

export default CatalogScreen;
