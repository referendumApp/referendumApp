import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Legislator, Bill, ItemType } from '@/appTypes';
import Button, { IconSize } from '@/components/Button';
import Carousel from '@/components/Carousel';
import FilterModal from '@/components/FilterModal';
import SearchInput from '@/components/SearchInput';
import SortModal from '@/components/SortModal';
import { useGetBillsQuery } from '@/features/bill/api';
import { useGetLegislatorsQuery } from '@/features/legislator/api';
import { CatalogStackParamList } from '@/navigation/types';
import {
  buttonStyles,
  colors,
  componentStyles,
  spacing,
  typography,
  withOpacity,
} from '@/themes';

type NavigationProp = StackNavigationProp<CatalogStackParamList, 'Catalog'>;

// Components
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

const BillItem: React.FC<{ bill: Bill; onPress: () => void }> = React.memo(
  ({ bill, onPress }) => (
    <TouchableOpacity style={styles.billItem} onPress={onPress}>
      <View style={styles.billTitleLine}>
        <Text style={styles.itemTitle}>US</Text>
        <View style={styles.dividerVertical} />
        <Text style={styles.itemTitle}>{bill.identifier}</Text>
      </View>
      <Text
        style={styles.itemDescription}
        numberOfLines={3}
        ellipsizeMode="tail">
        {bill.title}
      </Text>
      <Carousel
        items={bill?.tags?.map(tag => ({ id: tag, title: tag })) ?? []}
        onItemPress={() => {}}
        containerStyle={styles.tagCarouselContainer}
        itemStyle={styles.tagCarouselItem}
        textStyle={styles.tagCarouselItemText}
      />
    </TouchableOpacity>
  ),
);

const LegislatorItem: React.FC<{
  legislator: Legislator;
  onPress: () => void;
}> = React.memo(({ legislator, onPress }) => (
  <TouchableOpacity style={styles.legislatorItem} onPress={onPress}>
    <Image
      source={{ uri: legislator.imageUrl }}
      style={styles.legislatorImage}
    />
    <View style={styles.legislatorInfo}>
      <Text style={styles.legislatorName}>{legislator.name}</Text>
      <Text style={styles.legislatorDetails}>
        {`${legislator.party} - ${legislator.state}`}
      </Text>
      <Text style={styles.legislatorChamber}>{legislator.chamber}</Text>
    </View>
  </TouchableOpacity>
));

// Main component
const CatalogScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { data: bills } = useGetBillsQuery();
  const { data: legislators } = useGetLegislatorsQuery();
  const [selectedTab, setSelectedTab] = useState<ItemType>('bill');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

  const filteredItems = useMemo(() => {
    if (selectedTab === 'bill') {
      return bills?.filter(
        bill =>
          bill.identifier.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bill.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    } else {
      return legislators?.filter(
        legislator =>
          legislator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          legislator.party.toLowerCase().includes(searchQuery.toLowerCase()) ||
          legislator.state.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
  }, [bills, legislators, selectedTab, searchQuery]);

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
        return (
          <LegislatorItem
            legislator={item}
            onPress={() => handleLegislatorPress(item)}
          />
        );
      }
    },
    [handleBillPress, handleLegislatorPress],
  );

  const keyExtractor = useCallback(
    (item: Bill | Legislator) => String(item.id),
    [],
  );

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
              color={colors.white}
              iconSize={IconSize.large}
              iconName="filter"
              onPress={() => setIsFilterOpen(true)}
            />
            <Button
              style={styles.button}
              color={colors.white}
              iconSize={IconSize.large}
              iconName="swap-vertical"
              onPress={() => setIsFilterOpen(true)}
            />
          </View>
          <FilterModal
            isVisible={isFilterOpen}
            onFilterChange={() => undefined}
            onRequestClose={() => setIsFilterOpen(false)}
          />
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
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.catalogList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: componentStyles.container,
  button: {
    backgroundColor: colors.oldGloryBlue,
    padding: spacing.xs * 0.5,
  },
  buttonContainer: {
    ...componentStyles.rowContainer,
    marginLeft: spacing.xs * 1.5,
  },
  header: componentStyles.header,
  headerText: componentStyles.headerText,
  subHeader: componentStyles.subHeader,
  searchBarContainer: {
    ...componentStyles.rowContainer,
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.s * 1.5,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
  },
  tabButton: {
    flex: 1,
    paddingVertical: spacing.s * 1.5,
    alignItems: 'center',
  },
  tabButtonSelected: {
    borderBottomWidth: 2,
    borderBottomColor: colors.oldGloryRed,
  },
  tabButtonText: componentStyles.semiBoldButtonText,
  tabButtonTextSelected: {
    color: colors.oldGloryRed,
    fontWeight: 'bold',
  },
  catalogList: {
    paddingVertical: spacing.m,
  },
  billItem: componentStyles.card,
  billTitleLine: {
    flexDirection: 'row',
    marginBottom: spacing.s,
  },
  legislatorItem: {
    ...componentStyles.card,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.s * 1.5,
    paddingHorizontal: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  legislatorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: spacing.m,
  },
  legislatorInfo: {
    flex: 1,
  },
  legislatorName: {
    ...typography.subtitle,
    color: colors.oldGloryRed,
    fontWeight: 'bold',
  },
  legislatorDetails: typography.body,
  legislatorChamber: {
    ...typography.small,
    color: colors.darkGray,
  },
  itemTitle: {
    ...typography.subtitle,
    color: colors.oldGloryRed,
    fontWeight: 'bold',
  },
  itemDescription: {
    ...typography.body,
    marginBottom: spacing.s * 1.5,
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
    paddingRight: spacing.s,
    color: colors.oldGloryBlue,
  },
  tagCarouselItem: {
    ...componentStyles.carouselItem,
    backgroundColor: withOpacity(colors.oldGloryBlue, 0.1),
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.s,
  },
  tagCarouselItemText: {
    ...typography.small,
    color: colors.oldGloryBlue,
  },
});

export default CatalogScreen;
