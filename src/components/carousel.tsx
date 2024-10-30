import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';

import { Theme } from '@/themes';
import { useTheme } from '@/themes/ThemeProvider';

export interface CarouselItem {
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
  renderItem?: (props: CarouselItemViewProps) => React.ReactElement;
}

const DefaultCarouselItemView: React.FC<CarouselItemViewProps> = React.memo(
  ({
    item,
    isSelected,
    onPress,
    itemStyle,
    itemSelectedStyle,
    textStyle,
    textSelectedStyle,
  }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

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
  const theme = useTheme();
  const styles = createStyles(theme);

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
      return renderItem ? (
        renderItem(itemProps)
      ) : (
        <DefaultCarouselItemView {...itemProps} />
      );
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

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      ...theme.componentStyles.carouselContainer,
    },
    title: {
      ...theme.typography.subtitle,
      marginBottom: theme.spacing.s,
    },
    item: {
      ...theme.componentStyles.carouselItem,
      backgroundColor: theme.colors.white,
    },
    itemSelected: {
      backgroundColor: theme.colors.oldGloryRed,
    },
    itemText: {
      ...theme.typography.body,
      color: theme.colors.oldGloryBlue,
    },
    itemTextSelected: {
      color: theme.colors.white,
    },
  });

export default Carousel;
