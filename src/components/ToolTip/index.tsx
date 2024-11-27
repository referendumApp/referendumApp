import React from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';

import styles from './styles';

type ToolTipProps = {
  style?: StyleProp<ViewStyle>;
  text: string;
  isError?: boolean;
};

const ToolTip: React.FC<ToolTipProps> = ({ style, text, isError = false }) => {
  return (
    <View style={[styles.tooltipContainer, style]}>
      <View style={[styles.tooltip, style]}>
        <View style={[styles.bubble, isError && styles.errorBubble]}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <View style={[styles.arrow, isError && styles.errorArrow]} />
      </View>
    </View>
  );
};

export default ToolTip;
