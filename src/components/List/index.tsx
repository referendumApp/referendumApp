import React, { forwardRef } from 'react';
import { FlatList, FlatListProps, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TAB_HEIGHT } from '@/themes/dimensions';

const List = forwardRef<FlatList, FlatListProps<any>>((props, ref) => {
  const insets = useSafeAreaInsets();
  const { contentContainerStyle, ...listProps } = props;

  return Platform.OS === 'ios' && insets.bottom ? (
    <View style={{ paddingBottom: TAB_HEIGHT }}>
      <FlatList ref={ref} contentContainerStyle={[contentContainerStyle]} {...listProps} />
    </View>
  ) : (
    <FlatList ref={ref} contentContainerStyle={contentContainerStyle} {...listProps} />
  );
});

export default List;
