import React, { useCallback, useRef, useState } from 'react';
import { FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Legislator } from '@/appTypes';
import { CatalogStackParamList } from '@/navigation/types';
import SortModal from '@/screens/Catalo/sort/SortModal';
import { useGetLegislatorsQuery, useGetFollowedLegislatorsQuery } from '@/screens/legislator/api';

import { filterConfigs } from './filters/constants';
import FilterModal from './filters/FilterModal';
import FilterProvider from './filters/FilterProvider';
import useCatalogItems from './hooks/useCatalogItems';
import LegislatorItem from './LegislatorItem';
import { sortOptionsMap } from './sort/constants';
import styles, { ITEM_HEIGHT } from './styles';
import { FilterOptions, TabMappingSortFields } from './types';

interface LegislatorListProps {
  closeFilter: () => void;
  closeSort: () => void;
  isFilterOpen: boolean;
  searchQuery: string;
  isSortOpen: boolean;
}

type NavigationProp = StackNavigationProp<CatalogStackParamList, 'Catalog'>

const LegislatorList: React.FC<LegislatorListProps> = React.memo(
  ({ closeFilter, closeSort, isFilterOpen, isSortOpen, searchQuery }) => {
    const navigation = useNavigation<NavigationProp>();

    const flatListRef = useRef<FlatList<Legislator> | null>(null);
    const [filter, setFilter] = useState<FilterOptions>({});
    const [selectedSort, setSelectedSort] = useState<
      TabMappingSortFields<'legislator'> | undefined
    >();
    const { data: legislators } = useGetLegislatorsQuery();
    const { data: followedLegislators } = useGetFollowedLegislatorsQuery();

    const catalogItems = useCatalogItems({
      items: legislators,
      selectedTab: 'legislator',
      filter,
      searchQuery,
      selectedSort,
    });

    const handleFilter = (options: FilterOptions) => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
      setFilter(options);
    };

    const handleSort = (sortField: TabMappingSortFields<'legislator'> | undefined) => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
      setSelectedSort(sortField);
    };

    const handleLegislatorPress = useCallback((legislator: Legislator) => {
      const initialFollow = followedLegislators?.some(follow => follow.id === legislator.id);
      navigation.navigate('LegislatorScreen', { legislator, initialFollow });
    }, [followedLegislators, navigation]);

    const renderItem = useCallback(
      ({ item }: { item: Legislator }) => <LegislatorItem legislator={item} onPress={handleLegislatorPress} />,
      [handleLegislatorPress],
    );

    const keyExtractor = useCallback((item: Legislator) => String(item.id), []);

    const getItemLayout = useCallback(
      (_: any, index: number) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      }),
      [],
    );

    return (
      <>
        <FilterProvider initialFilters={filter}>
          <FilterModal
            filterFields={filterConfigs.legislator.fields}
            isVisible={isFilterOpen}
            setFilter={handleFilter}
            onRequestClose={closeFilter}
          />
        </FilterProvider>
        <SortModal<'legislator'>
          isVisible={isSortOpen}
          onSortSelected={handleSort}
          onRequestClose={closeSort}
          selectedSort={selectedSort}
          sortOptions={sortOptionsMap.legislator}
        />
        <FlatList
          ref={flatListRef}
          data={catalogItems}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          contentContainerStyle={styles.catalogList}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={7}
          windowSize={5}
        />
      </>
    );
  },
);

export default LegislatorList;
