import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Bill } from '@/appTypes';
import Carousel from '@/components/Carousel';

import styles from './styles';

const BillItem: React.FC<{ bill: Bill; onPress: (bill: Bill) => void }> = React.memo(
  ({ bill, onPress }) => {
    const handlePress = useCallback(() => onPress(bill), [bill, onPress]);

    return (
      <TouchableOpacity style={styles.billItem} onPress={handlePress}>
        <View style={styles.billTitleLine}>
          <Text style={styles.itemTitle}>US</Text>
          <View style={styles.dividerVertical} />
          <Text style={styles.itemTitle}>{bill.identifier}</Text>
        </View>
        <Text style={styles.itemDescription} numberOfLines={3} ellipsizeMode="tail">
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
    );
  },
  (prev, next) => prev.bill === next.bill && prev.onPress === next.onPress,
);

export default BillItem;
