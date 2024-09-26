import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Carousel} from '../components/carousel';
import {
  colors,
  componentStyles,
  typography,
  withOpacity,
} from '../styles/styles';
import { CatalogStackParamList } from '../types/navigation';
import { Legislator, Bill, ItemType } from '../types/types';


type NavigationProp = StackNavigationProp<CatalogStackParamList, 'Catalog'>;

// Components
const SearchBar: React.FC<{
  onSearch: (text: string) => void;
  onFilterSort: () => void;
  placeholder?: string;
}> = ({onSearch, onFilterSort, placeholder = 'Search'}) => (
  <View style={styles.searchBarContainer}>
    <View style={[styles.searchContainer]}>
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

const BillItem: React.FC<{bill: Bill; onPress: () => void}> = React.memo(
  ({bill, onPress}) => (
    <TouchableOpacity style={styles.billItem} onPress={onPress}>
      <View style={styles.billTitleLine}>
        <Text style={styles.itemTitle}>US</Text>
        <View style={styles.dividerVertical} />
        <Text style={styles.itemTitle}>{bill.title}</Text>
      </View>
      <Text
        style={styles.itemDescription}
        numberOfLines={3}
        ellipsizeMode="tail">
        {bill.description}
      </Text>
      <Carousel
        items={bill.tags.map(tag => ({id: tag, title: tag}))}
        onItemPress={() => {}}
        containerStyle={styles.tagCarouselContainer}
        itemStyle={styles.tagCarouselItem}
        textStyle={styles.tagCarouselItemText}
      />
    </TouchableOpacity>
  ),
);

const LegislatorItem: React.FC<{legislator: Legislator; onPress: () => void}> =
  React.memo(({legislator, onPress}) => (
    <TouchableOpacity style={styles.legislatorItem} onPress={onPress}>
      <Image
        source={{uri: legislator.imageUrl}}
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
  const [bills, setBills] = useState<Bill[]>([]);
  const [legislators, setLegislators] = useState<Legislator[]>([]);
  const [selectedTab, setSelectedTab] = useState<ItemType>('bill');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadBills = useCallback((): void => {
    // TODO: Replace this with actual API call
    const mockBills: Bill[] = [
      {
        id: '1',
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
        title: 'S.4361',
        description: 'Border Act of 2024',
        tags: ['Immigration', 'Appropriations', 'Border Security', 'Smuggling'],
      },
      {
        id: '3',
        title: 'S.4381',
        description: 'Right to Contraception Act',
        tags: ['Healthcare', 'Contraception'],
      },
      {
        id: '4',
        title: 'S.4802',
        description:
          'Department of the Interior, Environment, and Related Agencies Appropriations Act, 2023',
        tags: ['Appropriations', 'Environment', 'Government Operations'],
      },
    ];
    setBills(mockBills);
  }, []);

  const loadLegislators = useCallback((): void => {
    // TODO: Replace this with actual API call
    const mockLegislators: Legislator[] = [
      {
        id: '1',
        name: 'Bernard Sanders',
        party: 'Independent',
        state: 'VT',
        chamber: 'Senate',
        imageUrl: 'https://www.congress.gov/img/member/s000033_200.jpg',
        topIssues: ['Healthcare'],
        phone: '(202) 224-5141',
        office: '332 Dirksen Senate Office Building Washington, DC 20510',
        facebook: '',
        instagram: '',
        twitter: '',
      },
      {
        id: '2',
        name: 'Bill Cassidy',
        party: 'Republican',
        state: 'LA',
        chamber: 'Senate',
        imageUrl: 'https://www.congress.gov/img/member/c001075_200.jpg',
        topIssues: [],
        phone: '',
        office: '',
        facebook: '',
        instagram: '',
        twitter: '',
      },
      {
        id: '3',
        name: 'Bill Hagerty',
        party: 'Republican',
        state: 'TN',
        chamber: 'Senate',
        imageUrl: 'https://www.congress.gov/img/member/h000601_200.jpg',
        topIssues: [],
        phone: '',
        office: '',
        facebook: '',
        instagram: '',
        twitter: '',
      },
      {
        id: '4',
        name: 'Brian Schatz',
        party: 'Democrat',
        state: 'HI',
        chamber: 'Senate',
        imageUrl: 'https://www.congress.gov/img/member/s001194_200.jpg',
        topIssues: [],
        phone: '',
        office: '',
        facebook: '',
        instagram: '',
        twitter: '',
      },
      {
        id: '5',
        name: 'Catherine Cortez Masto',
        party: 'Democrat',
        state: 'NV',
        chamber: 'Senate',
        imageUrl: 'https://www.congress.gov/img/member/c001113_200.jpg',
        topIssues: [],
        phone: '',
        office: '',
        facebook: '',
        instagram: '',
        twitter: '',
      },
    ];
    setLegislators(mockLegislators);
  }, []);

  useEffect(() => {
    loadBills();
    loadLegislators();
  }, [loadBills, loadLegislators]);

  const filteredItems = useMemo(() => {
    if (selectedTab === 'bill') {
      return bills.filter(
        bill =>
          bill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bill.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    } else {
      return legislators.filter(
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

  const handleFilterSort = useCallback((): void => {
    // TODO: Implement filter and sort functionality
    console.log('Filter & Sort button pressed');
  }, []);

  const handleBillPress = useCallback(
    (bill: Bill) => {
      navigation.navigate('BillScreen', {bill});
    },
    [navigation],
  );

  const handleLegislatorPress = useCallback(
    (legislator: Legislator) => {
      navigation.navigate('LegislatorScreen', {legislator});
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item}: {item: Bill | Legislator}) => {
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

  const keyExtractor = useCallback((item: Bill | Legislator) => item.id, []);

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
        renderItem={renderItem}
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
  billItem: componentStyles.card,
  billTitleLine: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  legislatorItem: {
    ...componentStyles.card,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  legislatorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  legislatorInfo: {
    flex: 1,
  },
  legislatorName: {
    ...typography.subtitle,
    color: colors.oldGloryRed,
    fontWeight: 'bold',
  },
  legislatorDetails: {
    ...typography.body,
    color: colors.darkGray,
  },
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
