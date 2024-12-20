import React, { PropsWithChildren } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';

import styles from './styles';

interface CardProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

const Card: React.FC<PropsWithChildren<CardProps>> = React.memo(
  ({ title, children, style, headerStyle, contentStyle, titleStyle }) => {
    return (
      <View style={[styles.card, style]}>
        {title && (
          <View style={[styles.cardHeader, headerStyle]}>
            <Text style={[styles.cardTitle, titleStyle]}>{title}</Text>
          </View>
        )}
        <View style={[styles.cardContent, contentStyle]}>{children}</View>
      </View>
    );
  },
);

export default Card;
