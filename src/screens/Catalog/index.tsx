import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button, { IconSize } from '@/components/Button';
import SearchInput from '@/components/SearchInput';
import TabButton from '@/components/TabButton';
import { useGetBillDetailsQuery } from '@/screens/BillDetail/redux/api';
import { useGetLegislatorsQuery } from '@/screens/LegislatorDetail/redux/api';
import { colors } from '@/themes';

import BillList from './BillList';
import LegislatorList from './LegislatorList';
import styles from './styles';
import { TabType } from './types';

const CatalogScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>('bill');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

  useGetBillDetailsQuery();
  useGetLegislatorsQuery();

  const handleSearch = (text: string): void => setSearchQuery(text);

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
              contentColor={colors.tertiary}
              iconSize={IconSize.large}
              iconFamily="Ionicons"
              iconName="filter"
              onPress={() => setIsFilterOpen(true)}
            />
            <Button
              style={styles.button}
              contentColor={colors.tertiary}
              iconSize={IconSize.large}
              iconFamily="Ionicons"
              iconName="swap-vertical"
              onPress={() => setIsSortOpen(true)}
            />
          </View>
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
      {selectedTab === 'bill' ? (
        <BillList
          closeFilter={() => setIsFilterOpen(false)}
          closeSort={() => setIsSortOpen(false)}
          isFilterOpen={isFilterOpen}
          isSortOpen={isSortOpen}
          searchQuery={searchQuery}
        />
      ) : (
        <LegislatorList
          closeFilter={() => setIsFilterOpen(false)}
          closeSort={() => setIsSortOpen(false)}
          isFilterOpen={isFilterOpen}
          isSortOpen={isSortOpen}
          searchQuery={searchQuery}
        />
      )}
    </SafeAreaView>
  );
};

export default CatalogScreen;
