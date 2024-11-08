import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleProp, TextStyle, ViewStyle } from 'react-native';

import styles from './styles';

export interface CarouselItem {
  id: string;
  title: string;
}

interface CarouselItemViewProps {
  item: CarouselItem;
  isSelected?: boolean;
  onPress: (item: CarouselItem) => void;
  itemStyle?: StyleProp<ViewStyle>;
  itemSelectedStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textSelectedStyle?: StyleProp<TextStyle>;
}

interface CarouselProps {
  items: CarouselItem[];
  selectedItems?: Set<string>;
  onItemPress: (item: CarouselItem) => void;
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  itemSelectedStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textSelectedStyle?: StyleProp<TextStyle>;
  renderItem?: (props: CarouselItemViewProps) => React.ReactElement;
}

const DefaultCarouselItemView: React.FC<CarouselItemViewProps> = React.memo(
  ({ item, isSelected, onPress, itemStyle, itemSelectedStyle, textStyle, textSelectedStyle }) => {
    return (
      <TouchableOpacity
        style={[
          styles.item,
          itemStyle,
          isSelected && styles.itemSelected,
          isSelected && itemSelectedStyle,
        ]}
        onPress={() => onPress(item)}>
        <Text
          style={[
            styles.itemText,
            textStyle,
            isSelected && styles.itemTextSelected,
            isSelected && textSelectedStyle,
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  },
);

const Carousel: React.FC<CarouselProps> = ({
  items,
  selectedItems,
  onItemPress,
  title,
  containerStyle,
  titleStyle,
  itemStyle,
  itemSelectedStyle,
  textStyle,
  textSelectedStyle,
  renderItem,
}) => {
  const renderCarouselItem = useCallback(
    ({ item }: { item: CarouselItem }) => {
      const isSelected = selectedItems?.has(item.id);
      const itemProps: CarouselItemViewProps = {
        item,
        isSelected,
        onPress: onItemPress,
        itemStyle,
        itemSelectedStyle,
        textStyle,
        textSelectedStyle,
      };
      return renderItem ? renderItem(itemProps) : <DefaultCarouselItemView {...itemProps} />;
    },
    [
      selectedItems,
      onItemPress,
      itemStyle,
      itemSelectedStyle,
      textStyle,
      textSelectedStyle,
      renderItem,
    ],
  );

  const keyExtractor = useCallback((item: CarouselItem) => item.id, []);

  return (
    <View style={[styles.container, containerStyle]}>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      <FlatList
        data={items}
        renderItem={renderCarouselItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Carousel;
