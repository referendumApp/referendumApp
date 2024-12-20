import React, { PropsWithChildren, useState } from 'react';
import { Text, View, Pressable, StyleProp, TextStyle, ViewStyle } from 'react-native';

import Card from '@/components/Card';

import styles from './styles';

interface TableProps {
  style?: StyleProp<ViewStyle>;
  expandable?: boolean;
  expandedRows?: React.ReactNode;
  headers: string[];
  headerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Table: React.FC<PropsWithChildren<TableProps>> = React.memo(
  ({ style, expandable = false, expandedRows, headers, headerStyle, textStyle, children }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <Card style={[styles.table, style]} contentStyle={styles.content}>
        <View style={[styles.tableHeader, headerStyle]}>
          {headers.map(header => (
            <Text key={header} style={[styles.tableHeaderText, textStyle]}>
              {header}
            </Text>
          ))}
        </View>
        {children}
        {expanded && expandedRows}
        {expandable && (
          <Pressable style={styles.seeMoreContainer} onPress={() => setExpanded(!expanded)}>
            <Text style={styles.seeMoreText}>{expanded ? 'See less' : 'See more'}</Text>
          </Pressable>
        )}
      </Card>
    );
  },
);

export default Table;
