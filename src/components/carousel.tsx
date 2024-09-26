import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, ViewStyle, TextStyle } from 'react-native';
import { componentStyles, typography } from '../styles/globalStyles';

interface CarouselItem {
  id: string;
  title: string;
}

interface CarouselItemViewProps {
  item: CarouselItem;
  isSelected?: boolean;
  onPress: (item: CarouselItem) => void;
  itemStyle?: ViewStyle;
  itemSelectedStyle?: ViewStyle;
  textStyle?: TextStyle;
  textSelectedStyle?: TextStyle;
}

interface CarouselProps {
  items: CarouselItem[];
  selectedItems?: Set<string>;
  onItemPress: (item: CarouselItem) => void;
  title?: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  itemStyle?: ViewStyle;
  itemSelectedStyle?: ViewStyle;
  textStyle?: TextStyle;
  textSelectedStyle?: TextStyle;
}

const CarouselItemView: React.FC<CarouselItemViewProps> = React.memo(({
  item,
  isSelected,
  onPress,
  itemStyle,
  itemSelectedStyle,
  textStyle,
  textSelectedStyle,
}) => (
  <TouchableOpacity
    style={[
      componentStyles.carouselItem,
      itemStyle,
      isSelected && itemSelectedStyle,
    ]}
    onPress={() => onPress(item)}
  >
    <Text
      style={[
        typography.body,
        textStyle,
        isSelected && textSelectedStyle,
      ]}
    >
      {item.title}
    </Text>
  </TouchableOpacity>
));

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
}) => {
  const renderItem = useCallback(({ item }: { item: CarouselItem }) => (
    <CarouselItemView
      item={item}
      isSelected={selectedItems?.has(item.id)}
      onPress={onItemPress}
      itemStyle={itemStyle}
      itemSelectedStyle={itemSelectedStyle}
      textStyle={textStyle}
      textSelectedStyle={textSelectedStyle}
    />
  ), [selectedItems, onItemPress, itemStyle, itemSelectedStyle, textStyle, textSelectedStyle]);

  const keyExtractor = useCallback((item: CarouselItem) => item.id, []);

  return (
    <View style={[componentStyles.carouselContainer, containerStyle]}>
      {title && <Text style={[typography.subtitle, titleStyle]}>{title}</Text>}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export { Carousel, CarouselItemView };
export type { CarouselItem };
