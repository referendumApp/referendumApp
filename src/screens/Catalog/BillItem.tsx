import { format } from 'date-fns';
import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { BillDetail } from '@/appTypes';
// import Carousel from '@/components/Carousel';

import styles from './styles';

const BillItem: React.FC<{ bill: BillDetail; onPress: (bill: BillDetail) => void }> = React.memo(
  ({ bill, onPress }) => {
    return (
      <Pressable style={styles.billItem} onPress={() => onPress(bill)}>
        <Text style={styles.statusDate}>{format(new Date(bill.statusDate), 'MMM d, yyyy')}</Text>
        <View style={styles.billTitleLine}>
          <Text style={styles.itemTitle}>US</Text>
          <View style={styles.dividerVertical} />
          <Text style={styles.itemTitle}>{bill.identifier}</Text>
        </View>
        <Text style={styles.itemDescription} numberOfLines={3} ellipsizeMode="tail">
          {bill.title}
        </Text>
        {/* <Carousel
          items={bill?.tags?.map(tag => ({ id: tag, title: tag })) ?? []}
          onItemPress={() => {}}
          containerStyle={styles.tagCarouselContainer}
          itemStyle={styles.tagCarouselItem}
          textStyle={styles.tagCarouselItemText}
        /> */}
      </Pressable>
    );
  },
  (prev, next) => prev.bill === next.bill && prev.onPress === next.onPress,
);

export default BillItem;
