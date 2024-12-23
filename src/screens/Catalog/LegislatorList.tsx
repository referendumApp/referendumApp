import React, { useCallback, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import { Legislator } from '@/appTypes';
import List from '@/components/List';
import SortModal from '@/screens/Catalog/sort/SortModal';
import { getLegislators } from '@/screens/LegislatorDetail/redux/selectors';

import { filterConfigs } from './filters/constants';
import FilterModal from './filters/FilterModal';
import FilterProvider from './filters/FilterProvider';
import useCatalogItems from './hooks/useCatalogItems';
import LegislatorItem from './LegislatorItem';
import { sortOptionsMap } from './sort/constants';
import styles, { LEGISLATOR_ITEM_HEIGHT } from './styles';
import { FilterOptions, TabMappingSortFields } from './types';

interface LegislatorListProps {
  closeFilter: () => void;
  closeSort: () => void;
  isFilterOpen: boolean;
  searchQuery: string;
  isSortOpen: boolean;
}

const LegislatorList: React.FC<LegislatorListProps> = React.memo(
  ({ closeFilter, closeSort, isFilterOpen, isSortOpen, searchQuery }) => {
    const legislators = useSelector(getLegislators);

    const flatListRef = useRef<FlatList<Legislator> | null>(null);
    const [filter, setFilter] = useState<FilterOptions>({});
    const [selectedSort, setSelectedSort] = useState<
      TabMappingSortFields<'legislator'> | undefined
    >();

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

    const renderItem = ({ item }: { item: Legislator }) => <LegislatorItem legislator={item} />;

    const keyExtractor = useCallback((item: Legislator) => String(item.id), []);

    const getItemLayout = useCallback(
      (_: any, index: number) => ({
        length: LEGISLATOR_ITEM_HEIGHT,
        offset: LEGISLATOR_ITEM_HEIGHT * index,
        index,
      }),
      [],
    );

    return (
      <>
        <FilterProvider initialFilters={filter}>
          <FilterModal
            currentFilters={filter}
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
        <List
          testID="legislatorList"
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
