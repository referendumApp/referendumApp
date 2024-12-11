import React, { useCallback, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { BillDetail } from '@/appTypes';
import List from '@/components/List';
import { CatalogStackParamList } from '@/navigation/types';
import { useGetFollowedBillsQuery, useGetBillVotesQuery } from '@/screens/BillDetail/redux/api';
import { getBillDetails } from '@/screens/BillDetail/redux/selectors';
import SortModal from '@/screens/Catalog/sort/SortModal';

import BillItem from './BillItem';
import { filterConfigs } from './filters/constants';
import FilterModal from './filters/FilterModal';
import FilterProvider from './filters/FilterProvider';
import useCatalogItems from './hooks/useCatalogItems';
import { sortOptionsMap } from './sort/constants';
import styles, { BILL_ITEM_HEIGHT } from './styles';
import { FilterOptions, TabMappingSortFields } from './types';

interface BillListProps {
  closeFilter: () => void;
  closeSort: () => void;
  isFilterOpen: boolean;
  searchQuery: string;
  isSortOpen: boolean;
}

type NavigationProp = NativeStackNavigationProp<CatalogStackParamList, 'Catalog'>;

const BillList: React.FC<BillListProps> = React.memo(
  ({ closeFilter, closeSort, isFilterOpen, isSortOpen, searchQuery }) => {
    const bills = useSelector(getBillDetails);

    const navigation = useNavigation<NavigationProp>();
    const flatListRef = useRef<FlatList<BillDetail> | null>(null);
    const [filter, setFilter] = useState<FilterOptions>({});
    const [selectedSort, setSelectedSort] = useState<TabMappingSortFields<'bill'> | undefined>();

    const { data: followedBills } = useGetFollowedBillsQuery();
    const { data: userBillVotes } = useGetBillVotesQuery({ billId: undefined });

    const catalogItems = useCatalogItems({
      items: bills,
      selectedTab: 'bill',
      filter,
      searchQuery,
      selectedSort,
    });

    const handleFilter = (options: FilterOptions) => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
      setFilter(options);
    };

    const handleSort = (sortField: TabMappingSortFields<'bill'> | undefined) => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
      setSelectedSort(sortField);
    };

    const handleBillPress = useCallback(
      (bill: BillDetail) => {
        const initialVote = userBillVotes?.find(vote => vote.billId === bill.billId)?.voteChoiceId;
        const initialFollow = followedBills?.some(follow => follow.id === bill.billId);
        navigation.navigate('BillScreen', { bill, initialFollow, initialVote });
      },
      [followedBills, navigation, userBillVotes],
    );

    const renderItem = useCallback(
      ({ item }: { item: BillDetail }) => {
        return <BillItem bill={item} onPress={handleBillPress} />;
      },
      [handleBillPress],
    );

    const keyExtractor = useCallback((item: BillDetail) => String(item.billId), []);

    const getItemLayout = useCallback(
      (_: any, index: number) => ({
        length: BILL_ITEM_HEIGHT,
        offset: BILL_ITEM_HEIGHT * index,
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
        <SortModal<'bill'>
          isVisible={isSortOpen}
          onSortSelected={handleSort}
          onRequestClose={closeSort}
          selectedSort={selectedSort}
          sortOptions={sortOptionsMap.bill}
        />
        <List
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

export default BillList;
