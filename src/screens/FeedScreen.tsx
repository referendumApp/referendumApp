import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';

import { colors, componentStyles, typography } from '../styles/globalStyles';

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

// Components
const TagFilterButton: React.FC<{
  tag: string;
  isSelected: boolean;
  onPress: () => void;
}> = ({ tag, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.tagButton, isSelected && styles.tagButtonSelected]}
    onPress={onPress}
  >
    <Text style={[styles.tagButtonText, isSelected && styles.tagButtonTextSelected]}>
      {tag}
    </Text>
  </TouchableOpacity>
);

const TagFilterView: React.FC<{
  allTags: string[];
  selectedTags: Set<string>;
  onTagPress: (tag: string) => void;
}> = ({ allTags, selectedTags, onTagPress }) => (
  <View style={styles.tagFilterContainer}>
    <Text style={styles.tagFilterTitle}>Tags</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {allTags.map((tag: string) => (
        <TagFilterButton
          key={tag}
          tag={tag}
          isSelected={selectedTags.has(tag)}
          onPress={() => onTagPress(tag)}
        />
      ))}
    </ScrollView>
  </View>
);

const AssociatedItemCard: React.FC<{
  item: AssociatedItem;
  onPress: (item: AssociatedItem) => void;
}> = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)}>
    <Text style={styles.associatedItemText}>{item.title}</Text>
  </TouchableOpacity>
);

const AssociatedItemsCarousel: React.FC<{
  items: AssociatedItem[];
  onItemPress: (item: AssociatedItem) => void;
}> = ({ items, onItemPress }) => (
  <FlatList
    data={items}
    renderItem={({ item }: { item: AssociatedItem }) => (
      <AssociatedItemCard item={item} onPress={onItemPress} />
    )}
    keyExtractor={(item: AssociatedItem) => item.id}
    horizontal
    showsHorizontalScrollIndicator={false}
  />
);

const FeedItemView: React.FC<{
  item: FeedItem;
  onAssociatedItemPress: (item: AssociatedItem) => void;
}> = ({ item, onAssociatedItemPress }) => (
  <View style={styles.feedItem}>
    <Text style={styles.feedItemBody}>
      {format(item.date, 'MMM d, yyyy')}
    </Text>
    <Text style={styles.feedItemTitle}>{item.title}</Text>
    <Text style={styles.feedItemBody}>{item.description}</Text>
    <View style={styles.feedItemTags}>
      {item.tags.map((tag: string) => (
        <View key={tag} style={styles.feedItemTag}>
          <Text style={styles.feedItemTagText}>{tag}</Text>
        </View>
      ))}
    </View>
    <AssociatedItemsCarousel
      items={item.associatedItems}
      onItemPress={onAssociatedItemPress}
    />
  </View>
);

// Main component
const FeedScreen: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadFeedItems();
  }, []);

  const loadFeedItems = (): void => {
    // TODO: Replace this with actual API call
    const mockFeedItems: FeedItem[] = [
      {
        id: '1',
        title: 'Town hall announced by a senator you follow',
        description: 'Senator Patty Murray to hold town hall with Fox 13 Seattle',
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
      // ... Add other mock items here
    ];
    setFeedItems(mockFeedItems);
  };

  const allTags: string[] = Array.from(new Set(feedItems.flatMap(item => item.tags))).sort();

  const filteredFeedItems: FeedItem[] = selectedTags.size === 0
    ? feedItems
    : feedItems.filter(item => item.tags.some(tag => selectedTags.has(tag)));

  const handleTagPress = (tag: string): void => {
    setSelectedTags(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tag)) {
        newSet.delete(tag);
      } else {
        newSet.add(tag);
      }
      return newSet;
    });
  };

  const handleAssociatedItemPress = (item: AssociatedItem): void => {
    // TODO: Implement navigation to the appropriate screen based on item type
    console.log(`Navigate to ${item.type} detail page for item ${item.itemId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Feed</Text>
      </View>
      <TagFilterView
        allTags={allTags}
        selectedTags={selectedTags}
        onTagPress={handleTagPress}
      />
      <FlatList
        data={filteredFeedItems}
        renderItem={({ item }: { item: FeedItem }) => (
          <FeedItemView item={item} onAssociatedItemPress={handleAssociatedItemPress} />
        )}
        keyExtractor={(item: FeedItem) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: componentStyles.container,
  header: componentStyles.header,
  headerText: componentStyles.headerText,
  tagFilterContainer: {
    backgroundColor: colors.oldGloryBlue,
    padding: 16,
  },
  tagFilterTitle: {
    ...typography.subtitle,
    paddingBottom: 8,
},
  tagButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.66)',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
  },
  tagButtonSelected: {
    backgroundColor: colors.white,
  },
  tagButtonText: {
    color: colors.oldGloryBlue,
  },
  tagButtonTextSelected: {
    color: colors.oldGloryRed,
  },
  feedItem: componentStyles.card,
  feedItemTitle: {
    ...typography.subtitle,
    color: colors.oldGloryRed,
    marginBottom: 8,
  },
  feedItemBody: {
    ...typography.body,
    marginBottom: 8,
  },
  feedItemTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  feedItemTag: componentStyles.tag,
  feedItemTagText: componentStyles.tagText,
  associatedItemText: {
    ...componentStyles.linkText,
    marginRight: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
});

export default FeedScreen;