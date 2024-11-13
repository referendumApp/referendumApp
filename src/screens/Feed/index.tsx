import { format } from 'date-fns';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Carousel, { CarouselItem } from '@/components/Carousel';

import styles from './styles';

// Types
type AssociatedItemType = 'bill' | 'legislator';

interface AssociatedItem {
  id: string;
  type: AssociatedItemType;
  itemId: number;
  title: string;
}

interface FeedItem {
  id: string;
  title: string;
  description: string;
  date: Date;
  associatedItems: AssociatedItem[];
  tags: string[];
}

const FeedItemView: React.FC<{
  item: FeedItem;
  onAssociatedItemPress: (item: AssociatedItem) => void;
}> = React.memo(({ item, onAssociatedItemPress }) => (
  <View style={styles.feedItem}>
    <Text style={styles.feedItemDate}>{format(item.date, 'MMM d, yyyy')}</Text>
    <Text style={styles.feedItemTitle}>{item.title}</Text>
    <Text style={styles.feedItemBody}>{item.description}</Text>
    {item.tags.length > 0 && (
      <Carousel
        items={item.tags.map(tag => ({ id: tag, title: tag }))}
        onItemPress={() => {}}
        containerStyle={styles.feedItemCarouselContainer}
        itemStyle={styles.feedItemCarouselItem}
        textStyle={styles.feedItemCarouselItemText}
      />
    )}
    {item.associatedItems.length > 0 && (
      <Carousel
        items={item.associatedItems.map(assocItem => ({
          id: assocItem.id,
          title: assocItem.title,
        }))}
        onItemPress={pressedItem =>
          onAssociatedItemPress(pressedItem as AssociatedItem)
        }
        title="Links:"
        containerStyle={styles.feedItemCarouselContainer}
        titleStyle={styles.feedItemCarouselLinkTitle}
        textStyle={styles.feedItemCarouselLinkText}
      />
    )}
  </View>
));

// Main component
const FeedScreen: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadFeedItems();
  }, []);

  const loadFeedItems = (): void => {
    setRefreshing(true);
    try {
      // TODO: Replace this with actual API call
      const mockFeedItems: FeedItem[] = [
        {
          id: '1',
          title: 'Town hall announced by a senator you follow',
          description:
            'Senator Patty Murray to hold town hall with Fox 13 Seattle',
          date: new Date(Date.now() + 86400000 * 30), // One month from now
          associatedItems: [
            {
              id: '1',
              type: 'legislator',
              itemId: 92,
              title: 'Senator Patty Murray',
            },
          ],
          tags: ['Town Hall', 'Community Engagement'],
        },
        {
          id: '2',
          title: 'A bill you follow has failed to proceed',
          description:
            'Border Act of 2024 cloture motion fails in Senate, 43-50',
          date: new Date(), // "05/23/2024"
          associatedItems: [
            {
              id: '1',
              type: 'bill',
              itemId: 92,
              title: 'Border Act of 2024',
            },
          ],
          tags: ['Senate', 'Immigration', 'Procedural Vote'],
        },
        {
          id: '3',
          title: 'A bill you follow has progressed',
          description: 'Right to Contraception Act passes Senate',
          date: new Date(), // "05/05/2024"
          associatedItems: [
            {
              id: '3',
              type: 'bill',
              itemId: 92,
              title: 'Right to Contraception Act',
            },
          ],
          tags: ['Healthcare', 'Contraception'],
        },
        {
          id: '4',
          title: 'Hearing scheduled on a topic you follow',
          description:
            'House Education Committee schedules hearing on Voting Access',
          date: new Date(), // "04/21/2024"
          associatedItems: [],
          tags: ['House', 'Voting Access', 'Committee Hearing'],
        },
      ];
      setFeedItems(mockFeedItems);
    } catch (error) {
      console.error('Error loading feed items:', error);
      // TODO: Implement error handling (e.g., show an error message to the user)
    } finally {
      setRefreshing(false);
    }
  };

  const allTags: CarouselItem[] = React.useMemo(
    () =>
      Array.from(new Set(feedItems.flatMap(item => item.tags)))
        .sort()
        .map(tag => ({ id: tag, title: tag })),
    [feedItems],
  );

  const filteredFeedItems: FeedItem[] = React.useMemo(
    () =>
      selectedTags.size === 0
        ? feedItems
        : feedItems.filter(item =>
            item.tags.some(tag => selectedTags.has(tag)),
          ),
    [feedItems, selectedTags],
  );

  const handleTagPress = useCallback((tag: CarouselItem): void => {
    setSelectedTags(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tag.id)) {
        newSet.delete(tag.id);
      } else {
        newSet.add(tag.id);
      }
      return newSet;
    });
  }, []);

  const handleAssociatedItemPress = useCallback(
    (item: AssociatedItem): void => {
      // TODO: Implement navigation to the appropriate screen based on item type
      console.log(
        `Navigate to ${item.type} detail page for item ${item.itemId}`,
      );
    },
    [],
  );

  const renderFeedItem = useCallback(
    ({ item }: { item: FeedItem }) => (
      <FeedItemView
        item={item}
        onAssociatedItemPress={handleAssociatedItemPress}
      />
    ),
    [handleAssociatedItemPress],
  );

  const keyExtractor = useCallback((item: FeedItem) => item.id, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Feed</Text>
      </View>
      <View style={styles.subHeader}>
        <Carousel
          items={allTags}
          selectedItems={selectedTags}
          onItemPress={handleTagPress}
          title="Topics"
          containerStyle={styles.tagCarouselContainer}
          titleStyle={styles.tagCarouselTitle}
          itemStyle={styles.tagCarouselItem}
          itemSelectedStyle={styles.tagCarouselSelectedItem}
          textStyle={styles.tagCarouselItemText}
          textSelectedStyle={styles.tagCarouselSelectedItemText}
        />
      </View>
      <FlatList
        data={filteredFeedItems}
        renderItem={renderFeedItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.feedList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadFeedItems} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No feed items available</Text>
        }
      />
    </SafeAreaView>
  );
};

export default FeedScreen;
